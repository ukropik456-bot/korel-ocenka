import { sql } from "@vercel/postgres";

// ── Helpers ──────────────────────────────────────────────────────────────
function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Шлёт уведомление через Resend HTTP API.
// Не падает — все ошибки логируются, но не блокируют ответ клиенту.
async function sendEmailNotification({ name, phone, email, service, comment }) {
  const KEY = process.env.RESEND_API_KEY;
  const TO  = process.env.NOTIFY_EMAIL;
  const FROM = process.env.RESEND_FROM || "КОРЭЛ <noreply@korel-ocenka.ru>";

  if (!KEY || !TO) {
    console.log("[email] skipped — env vars not set");
    return;
  }

  const row = (label, value) => value
    ? `<tr>
         <td style="padding:8px 14px;font-family:Arial,sans-serif;font-size:13px;color:#888;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid #eee;vertical-align:top">${label}</td>
         <td style="padding:8px 14px;font-family:Arial,sans-serif;font-size:15px;color:#252525;border-bottom:1px solid #eee">${value}</td>
       </tr>`
    : "";

  const html = `
<!doctype html>
<html><body style="margin:0;padding:0;background:#F5F0E6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E6;padding:32px 0;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" width="560" style="background:#fff;border:1px solid #e5dfd1;">
        <tr>
          <td style="background:#190F23;padding:28px 32px;">
            <div style="color:#C4A22C;font-size:12px;letter-spacing:.32em;text-transform:uppercase;margin-bottom:6px">Новая заявка</div>
            <div style="color:#F5F0E6;font-family:Georgia,serif;font-size:28px;font-weight:300;letter-spacing:.04em">КОРЭЛ</div>
          </td>
        </tr>
        <tr>
          <td style="padding:0">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row("Имя",       escapeHtml(name))}
              ${row("Телефон",   `<a href="tel:${escapeHtml(phone)}" style="color:#C4A22C;text-decoration:none">${escapeHtml(phone)}</a>`)}
              ${row("Email",     email ? `<a href="mailto:${escapeHtml(email)}" style="color:#C4A22C;text-decoration:none">${escapeHtml(email)}</a>` : "")}
              ${row("Услуга",    escapeHtml(service || ""))}
              ${row("Комментарий", comment ? escapeHtml(comment).replace(/\n/g, "<br>") : "")}
              ${row("Время",     new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }) + " (МСК)")}
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#F5F0E6;padding:18px 32px;font-family:Arial,sans-serif;font-size:13px;color:#888;text-align:center">
            Это автоматическое уведомление с сайта korel-ocenka.ru
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    "Новая заявка КОРЭЛ",
    "",
    `Имя:      ${name}`,
    `Телефон:  ${phone}`,
    email   && `Email:    ${email}`,
    service && `Услуга:   ${service}`,
    comment && `Коммент:  ${comment}`,
    "",
    `Время:    ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} (МСК)`,
  ].filter(Boolean).join("\n");

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${KEY}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({
        from:    FROM,
        to:      TO.split(",").map(s => s.trim()),  // поддержка нескольких получателей
        subject: `Новая заявка — ${name}${service ? ` · ${service}` : ""}`,
        html,
        text,
        reply_to: email || undefined,                // ответ менеджера сразу пойдёт клиенту
      }),
    });
    if (!resp.ok) {
      const errText = await resp.text();
      console.error("[email] Resend HTTP", resp.status, errText);
    }
  } catch (err) {
    console.error("[email] fetch failed:", err);
  }
}

// ── Handler ──────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Создаём таблицу если её ещё нет
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

    if (!name || !phone) {
      return res.status(400).json({ error: "Имя и телефон обязательны" });
    }

    // 1) Сохраняем в БД (основной источник правды)
    await sql`
      INSERT INTO applications (name, phone, email, service, comment)
      VALUES (${name}, ${phone}, ${email || null}, ${service || null}, ${comment || null})
    `;

    // 2) Уведомление на почту — ОБЯЗАТЕЛЬНО await, иначе Vercel прибивает функцию до отправки.
    // Внутри sendEmailNotification ошибки ловятся, заявка не сорвётся даже если Resend упал.
    await sendEmailNotification({ name, phone, email, service, comment });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
}
