export default function handler(req, res) {
  res.status(200).json({
    SUPABASE_URL: process.env.SUPABASE_URL ? "OK" : "MISSING",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "OK" : "MISSING"
  });
}
