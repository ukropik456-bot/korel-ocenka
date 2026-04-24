import { sql } from "@vercel/postgres";

const PASSWORD = process.env.ADMIN_PASSWORD || "korel2024";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { pwd } = req.query;
  if (pwd !== PASSWORD) {
    return res.status(401).json({ error: "Неверный пароль" });
  }

  try {
    // Добавляем колонку status если её ещё нет
    await sql`
      ALTER TABLE applications
      ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'new'
    `;

    const { rows } = await sql`
      SELECT id, name, phone, email, service, comment, status,
             to_char(created_at AT TIME ZONE 'Europe/Moscow', 'DD.MM.YYYY HH24:MI') AS date,
             created_at
      FROM applications
      ORDER BY created_at DESC
    `;
    res.status(200).json({ rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка базы данных" });
  }
}
