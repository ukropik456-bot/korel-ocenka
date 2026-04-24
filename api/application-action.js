import { sql } from "@vercel/postgres";

const PASSWORD = process.env.ADMIN_PASSWORD || "korel2024";

export default async function handler(req, res) {
  const { pwd, id } = req.query;

  if (pwd !== PASSWORD) return res.status(401).json({ error: "Неверный пароль" });
  if (!id) return res.status(400).json({ error: "Не указан id" });

  if (req.method === "PATCH") {
    const { status } = req.query;
    const allowed = ["new", "in_work", "done"];
    if (!allowed.includes(status)) return res.status(400).json({ error: "Неверный статус" });
    try {
      await sql`UPDATE applications SET status = ${status} WHERE id = ${Number(id)}`;
      res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Ошибка базы данных" });
    }

  } else if (req.method === "DELETE") {
    try {
      await sql`DELETE FROM applications WHERE id = ${Number(id)}`;
      res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Ошибка базы данных" });
    }

  } else {
    res.status(405).end();
  }
}
