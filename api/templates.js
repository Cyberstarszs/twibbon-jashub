const fs = require("fs");
const { google } = require("googleapis");
const formidable = require("formidable");

function getDriveClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;
  const auth = new google.auth.JWT(
    email,
    null,
    key.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/drive"]
  );
  return google.drive({ version: "v3", auth });
}

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.multiples = false;
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

module.exports = async (req, res) => {
  const drive = getDriveClient();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (req.method === "GET") {
    try {
      const result = await drive.files.list({
        q: "'" + folderId + "' in parents and trashed=false",
        fields: "files(id, name, createdTime)",
        orderBy: "createdTime desc"
      });

      const files = result.data.files || [];
      const templates = files.map(f => {
        return {
          id: f.id,
          title: f.name,
          imageUrl: "https://drive.google.com/uc?export=view&id=" + f.id,
          createdAt: f.createdTime
        };
      });

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(templates));
    } catch (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Gagal mengambil daftar template" }));
    }
    return;
  }

  if (req.method === "POST") {
    try {
      const { fields, files } = await parseForm(req);
      const file = files.file;
      if (!file) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "File tidak ditemukan" }));
        return;
      }

      const titleField = fields.title;
      const title =
        (Array.isArray(titleField) ? titleField[0] : titleField) ||
        file.originalFilename ||
        "twibbon-template";

      const fileMetadata = {
        name: title,
        parents: [folderId]
      };

      const filePath = file.filepath || file.path;
      const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(filePath)
      };

      const driveRes = await drive.files.create({
        requestBody: fileMetadata,
        media,
        fields: "id, name"
      });

      const fileId = driveRes.data.id;

      await drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone"
        }
      });

      const imageUrl = "https://drive.google.com/uc?export=view&id=" + fileId;

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          id: fileId,
          title: driveRes.data.name,
          imageUrl,
          createdAt: new Date().toISOString()
        })
      );
    } catch (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Gagal upload template" }));
    }
    return;
  }

  res.setHeader("Allow", "GET, POST");
  res.statusCode = 405;
  res.end("Method Not Allowed");
};
