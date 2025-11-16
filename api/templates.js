const fs = require("fs");
const formidable = require("formidable");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.multiples = false;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

async function handleList(req, res) {
  const { data, error } = await supabase
    .storage
    .from("twibbon-templates")
    .list("templates", { sortBy: { column: "created_at", order: "desc" } });

  if (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: error.message }));
    return;
  }

  const templates = (data || []).map(item => {
    const path = "templates/" + item.name;
    const { data: publicUrlData } = supabase
      .storage
      .from("twibbon-templates")
      .getPublicUrl(path);

    return {
      id: path,
      title: item.name,
      imageUrl: publicUrlData.publicUrl,
      createdAt: item.created_at || null
    };
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ ok: true, templates }));
}

async function handleUpload(req, res) {
  const { fields, files } = await parseForm(req);

  let file = files.file || files.template;
  if (Array.isArray(file)) file = file[0];

  if (!file) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "Field file tidak ditemukan" }));
    return;
  }

  const titleField = fields.title;
  const originalName = file.originalFilename || "twibbon-template.png";
  const safeTitle =
    (Array.isArray(titleField) ? titleField[0] : titleField) || originalName;

  const ext = originalName.includes(".")
    ? originalName.slice(originalName.lastIndexOf("."))
    : ".png";

  const fileName = Date.now() + "-" + safeTitle.replace(/\s+/g, "-") + ext;
  const storagePath = "templates/" + fileName;

  const filePath = file.filepath || file.path;
  const buffer = fs.readFileSync(filePath);

  const { error: uploadError } = await supabase.storage
    .from("twibbon-templates")
    .upload(storagePath, buffer, {
      contentType: file.mimetype || "image/png",
      upsert: false
    });

  if (uploadError) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: uploadError.message }));
    return;
  }

  const { data: publicUrlData } = supabase
    .storage
    .from("twibbon-templates")
    .getPublicUrl(storagePath);

  const publicUrl = publicUrlData.publicUrl;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      ok: true,
      id: storagePath,
      title: safeTitle,
      imageUrl: publicUrl,
      createdAt: new Date().toISOString()
    })
  );
}

module.exports = async (req, res) => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        ok: false,
        error: "Supabase env tidak lengkap"
      })
    );
    return;
  }

  if (req.method === "GET") {
    try {
      await handleList(req, res);
    } catch (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          ok: false,
          error: err.message || "Gagal mengambil template"
        })
      );
    }
    return;
  }

  if (req.method === "POST") {
    try {
      await handleUpload(req, res);
    } catch (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          ok: false,
          error: err.message || "Gagal upload template"
        })
      );
    }
    return;
  }

  res.setHeader("Allow", "GET, POST");
  res.statusCode = 405;
  res.end("Method Not Allowed");
};
