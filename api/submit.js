import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS applications (
        id        SERIAL PRIMARY KEY,
        name      TEXT NOT NULL,
        phone     TEXT NOT NULL,
        email     TEXT,
        service   TEXT,
        comment   TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    const { name, phone, email, service, comment } = req.body;
    if (!name || !phone) return res.status(400).json({ error: "Имя и телефон обязательны" });
    await sql`
      INSERT INTO applications (name, phone, email, service, comment)
      VALUES (${name}, ${phone}, ${email || null}, ${service || null}, ${comment || null})
    `;
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
}
