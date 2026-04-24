import { useState } from "react";

const AdminPage = () => {
  const [pwd, setPwd] = useState("");
  const [authed, setAuthed] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/applications?pwd=${encodeURIComponent(pwd)}`);
      const data = await res.json();
      if (res.ok) {
        setRows(data.rows);
        setAuthed(true);
      } else {
        setError(data.error || "Ошибка");
      }
    } catch {
      setError("Нет соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/applications?pwd=${encodeURIComponent(pwd)}`);
      const data = await res.json();
      if (res.ok) setRows(data.rows);
    } finally {
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 380, background: "rgba(58,24,51,.3)", border: "1px solid rgba(196,162,44,.2)", padding: "48px 36px" }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 300, marginBottom: 8 }}>
            Панель заявок
          </div>
          <div style={{ fontSize: 15, color: "rgba(245,240,230,.45)", marginBottom: 32 }}>
            Введите пароль для доступа
          </div>
          <input
            type="password"
            className="form-input"
            placeholder="Пароль"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            style={{ marginBottom: 16 }}
          />
          {error && (
            <div style={{ fontSize: 14, color: "#e57373", marginBottom: 16 }}>{error}</div>
          )}
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={login} disabled={loading}>
            {loading ? "Проверка..." : "Войти"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "100px 20px 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Шапка */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="section-tag">Администрирование</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 300 }}>
              Заявки на оценку
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 15, color: "rgba(245,240,230,.4)" }}>
              Всего: <strong style={{ color: "var(--gold)" }}>{rows.length}</strong>
            </span>
            <button className="btn-ghost" onClick={refresh} disabled={loading}>
              {loading ? "Обновление..." : "Обновить"}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>

        {/* Пусто */}
        {rows.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(245,240,230,.3)", fontSize: 18 }}>
            Заявок пока нет
          </div>
        )}

        {/* Карточки заявок */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {rows.map((r, i) => (
            <div key={r.id} style={{
              background: "rgba(58,24,51,.25)",
              border: "1px solid rgba(196,162,44,.1)",
              padding: "24px 28px",
              display: "grid",
              gridTemplateColumns: "auto 1fr 1fr 1fr",
              gap: "16px 28px",
              alignItems: "start",
            }}>
              {/* Номер */}
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: "rgba(196,162,44,.4)", lineHeight: 1, paddingTop: 4 }}>
                {String(rows.length - i).padStart(2, "0")}
              </div>

              {/* Контакты */}
              <div>
                <div style={{ fontSize: 17, fontWeight: 500, color: "var(--cream)", marginBottom: 4 }}>{r.name}</div>
                <a href={`tel:${r.phone.replace(/\D/g, "")}`} style={{ fontSize: 15, color: "var(--gold)", textDecoration: "none", display: "block" }}>
                  {r.phone}
                </a>
                {r.email && (
                  <a href={`mailto:${r.email}`} style={{ fontSize: 14, color: "rgba(245,240,230,.4)", textDecoration: "none", display: "block", marginTop: 2 }}>
                    {r.email}
                  </a>
                )}
              </div>

              {/* Услуга и комментарий */}
              <div>
                {r.service && (
                  <div style={{ display: "inline-block", padding: "3px 10px", background: "rgba(196,162,44,.12)", border: "1px solid rgba(196,162,44,.25)", fontSize: 13, color: "var(--gold)", marginBottom: 8 }}>
                    {r.service}
                  </div>
                )}
                {r.comment && (
                  <div style={{ fontSize: 14, color: "rgba(245,240,230,.5)", lineHeight: 1.6 }}>
                    {r.comment}
                  </div>
                )}
              </div>

              {/* Дата */}
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, color: "rgba(245,240,230,.35)", letterSpacing: ".04em" }}>{r.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
