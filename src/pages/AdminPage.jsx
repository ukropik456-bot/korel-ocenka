import { useState, useMemo } from "react";

const STATUS = {
  new:     { label: "Новая",     color: "#C4A22C",              bg: "rgba(196,162,44,.13)",   border: "rgba(196,162,44,.35)"  },
  in_work: { label: "В работе",  color: "#6dbf6d",              bg: "rgba(109,191,109,.11)",  border: "rgba(109,191,109,.35)" },
  done:    { label: "Завершена", color: "rgba(245,240,230,.4)", bg: "rgba(245,240,230,.06)",  border: "rgba(245,240,230,.18)" },
};

const SORT_OPTIONS = [
  { value: "date_desc", label: "Сначала новые" },
  { value: "date_asc",  label: "Сначала старые" },
  { value: "name_asc",  label: "По имени (А–Я)" },
  { value: "status",    label: "По статусу" },
];

const FILTERS = [
  { value: "all",     label: "Все"       },
  { value: "new",     label: "Новые"     },
  { value: "in_work", label: "В работе"  },
  { value: "done",    label: "Завершены" },
];

/* ── StatusBadge ─────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const s = STATUS[status] || STATUS.new;
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 11px",
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: s.color,
      background: s.bg,
      border: `1px solid ${s.border}`,
      borderRadius: 2,
      whiteSpace: "nowrap",
    }}>
      {s.label}
    </span>
  );
};

/* ── AdminPage ───────────────────────────────────────────── */
const AdminPage = () => {
  const [pwd, setPwd]           = useState("");
  const [authed, setAuthed]     = useState(false);
  const [rows, setRows]         = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [filter, setFilter]     = useState("all");
  const [sort, setSort]         = useState("date_desc");
  const [confirmId, setConfirmId] = useState(null); // id заявки на удаление
  const [actionLoading, setActionLoading] = useState(null); // id в процессе

  /* ── Авторизация / загрузка ──────────────────────────── */
  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const res  = await fetch(`/api/applications?pwd=${encodeURIComponent(pwd)}`);
      const data = await res.json();
      if (res.ok) { setRows(data.rows); setAuthed(true); }
      else setError(data.error || "Ошибка");
    } catch { setError("Нет соединения с сервером"); }
    finally { setLoading(false); }
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/applications?pwd=${encodeURIComponent(pwd)}`);
      const data = await res.json();
      if (res.ok) setRows(data.rows);
    } finally { setLoading(false); }
  };

  /* ── Смена статуса ───────────────────────────────────── */
  const changeStatus = async (id, status) => {
    setActionLoading(id);
    try {
      const res = await fetch(
        `/api/application-action?pwd=${encodeURIComponent(pwd)}&id=${id}&status=${status}`,
        { method: "PATCH" }
      );
      if (res.ok) {
        setRows(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      }
    } finally { setActionLoading(null); }
  };

  /* ── Удаление ────────────────────────────────────────── */
  const deleteRow = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch(
        `/api/application-action?pwd=${encodeURIComponent(pwd)}&id=${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setRows(prev => prev.filter(r => r.id !== id));
        setConfirmId(null);
      }
    } finally { setActionLoading(null); }
  };

  /* ── Следующий статус ────────────────────────────────── */
  const nextStatus = (cur) => {
    if (cur === "new")     return "in_work";
    if (cur === "in_work") return "done";
    return "new";
  };
  const nextStatusLabel = (cur) => {
    if (cur === "new")     return "Взять в работу";
    if (cur === "in_work") return "Завершить";
    return "В новые";
  };

  /* ── Фильтрация и сортировка ─────────────────────────── */
  const counts = useMemo(() => ({
    all:     rows.length,
    new:     rows.filter(r => r.status === "new").length,
    in_work: rows.filter(r => r.status === "in_work").length,
    done:    rows.filter(r => r.status === "done").length,
  }), [rows]);

  const displayed = useMemo(() => {
    let list = filter === "all" ? [...rows] : rows.filter(r => r.status === filter);
    if (sort === "date_desc") list.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === "date_asc")  list.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === "name_asc")  list.sort((a, b) => a.name.localeCompare(b.name, "ru"));
    if (sort === "status") {
      const order = { new: 0, in_work: 1, done: 2 };
      list.sort((a, b) => order[a.status] - order[b.status]);
    }
    return list;
  }, [rows, filter, sort]);

  /* ── Экран логина ────────────────────────────────────── */
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
          {error && <div style={{ fontSize: 14, color: "#e57373", marginBottom: 16 }}>{error}</div>}
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={login} disabled={loading}>
            {loading ? "Проверка..." : "Войти"}
          </button>
        </div>
      </div>
    );
  }

  /* ── Основной экран ──────────────────────────────────── */
  return (
    <div style={{ minHeight: "100vh", padding: "60px 20px 80px", color: "var(--cream)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>

        {/* ── Шапка ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="section-tag">Администрирование</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 300, margin: 0 }}>
              Заявки на оценку
            </h1>
          </div>
          <button className="btn-ghost" onClick={refresh} disabled={loading} style={{ marginTop: 8 }}>
            {loading ? "Обновление..." : "Обновить"}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* ── Счётчики по статусам ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, marginBottom: 32 }}>
          {[
            { key: "all",     label: "Всего",     color: "var(--gold)" },
            { key: "new",     label: "Новые",     color: STATUS.new.color },
            { key: "in_work", label: "В работе",  color: STATUS.in_work.color },
            { key: "done",    label: "Завершены", color: STATUS.done.color },
          ].map(({ key, label, color }) => (
            <div key={key} style={{
              background: "rgba(58,24,51,.35)",
              border: "1px solid rgba(196,162,44,.1)",
              padding: "20px 24px",
              cursor: "pointer",
              outline: filter === key ? `1px solid ${color}` : "none",
              transition: "opacity .15s",
              opacity: filter === key ? 1 : 0.7,
            }} onClick={() => setFilter(key)}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 300, color, lineHeight: 1 }}>
                {counts[key]}
              </div>
              <div style={{ fontSize: 14, color: "rgba(245,240,230,.5)", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── Панель фильтров и сортировки ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          {/* Фильтр-таблетки */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {FILTERS.map(f => (
              <button key={f.value} onClick={() => setFilter(f.value)} style={{
                padding: "7px 18px",
                fontSize: 14,
                background: filter === f.value ? "rgba(196,162,44,.18)" : "rgba(58,24,51,.4)",
                border: `1px solid ${filter === f.value ? "rgba(196,162,44,.5)" : "rgba(245,240,230,.1)"}`,
                color: filter === f.value ? "var(--gold)" : "rgba(245,240,230,.55)",
                cursor: "pointer",
                transition: "all .15s",
                letterSpacing: ".03em",
              }}>
                {f.label}
                <span style={{ marginLeft: 6, opacity: .6 }}>({counts[f.value]})</span>
              </button>
            ))}
          </div>

          {/* Сортировка */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 14, color: "rgba(245,240,230,.35)", letterSpacing: ".04em" }}>Сортировка:</span>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{
              background: "rgba(58,24,51,.5)",
              border: "1px solid rgba(196,162,44,.2)",
              color: "rgba(245,240,230,.8)",
              padding: "7px 12px",
              fontSize: 14,
              cursor: "pointer",
              outline: "none",
            }}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* ── Пусто ── */}
        {displayed.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(245,240,230,.25)", fontSize: 18 }}>
            {filter === "all" ? "Заявок пока нет" : "Нет заявок с таким статусом"}
          </div>
        )}

        {/* ── Список заявок ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {displayed.map((r, i) => {
            const isDeleting   = confirmId === r.id;
            const isProcessing = actionLoading === r.id;
            const statusStyle  = STATUS[r.status] || STATUS.new;

            return (
              <div key={r.id} style={{
                background: isDeleting ? "rgba(139,32,32,.12)" : "rgba(58,24,51,.28)",
                border: `1px solid ${isDeleting ? "rgba(139,32,32,.35)" : "rgba(196,162,44,.08)"}`,
                padding: "22px 26px",
                transition: "background .2s, border .2s",
                opacity: isProcessing ? 0.6 : 1,
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "44px 1fr auto", gap: "12px 24px", alignItems: "start" }}>

                  {/* Номер */}
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 300, color: "rgba(196,162,44,.35)", lineHeight: 1, paddingTop: 3 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Основная информация */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
                      <span style={{ fontSize: 17, fontWeight: 500, color: "var(--cream)" }}>{r.name}</span>
                      <StatusBadge status={r.status} />
                      {r.service && (
                        <span style={{
                          display: "inline-block", padding: "3px 10px",
                          background: "rgba(196,162,44,.1)", border: "1px solid rgba(196,162,44,.22)",
                          fontSize: 12, color: "var(--gold)", letterSpacing: ".04em",
                        }}>
                          {r.service}
                        </span>
                      )}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", marginBottom: r.comment ? 10 : 0 }}>
                      <a href={`tel:${r.phone.replace(/\D/g,"")}`} style={{ fontSize: 15, color: "var(--gold)", textDecoration: "none" }}>
                        {r.phone}
                      </a>
                      {r.email && (
                        <a href={`mailto:${r.email}`} style={{ fontSize: 14, color: "rgba(245,240,230,.4)", textDecoration: "none" }}>
                          {r.email}
                        </a>
                      )}
                    </div>

                    {r.comment && (
                      <div style={{ fontSize: 14, color: "rgba(245,240,230,.45)", lineHeight: 1.6, maxWidth: 600 }}>
                        {r.comment}
                      </div>
                    )}
                  </div>

                  {/* Дата + кнопки действий */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, minWidth: 160 }}>
                    <div style={{ fontSize: 13, color: "rgba(245,240,230,.3)", letterSpacing: ".04em", whiteSpace: "nowrap" }}>
                      {r.date}
                    </div>

                    {/* Кнопка смены статуса */}
                    {!isDeleting && (
                      <button
                        onClick={() => changeStatus(r.id, nextStatus(r.status))}
                        disabled={isProcessing}
                        style={{
                          padding: "6px 14px",
                          fontSize: 13,
                          color: statusStyle.color,
                          background: statusStyle.bg,
                          border: `1px solid ${statusStyle.border}`,
                          cursor: isProcessing ? "not-allowed" : "pointer",
                          whiteSpace: "nowrap",
                          transition: "opacity .15s",
                        }}
                      >
                        {isProcessing ? "..." : nextStatusLabel(r.status)}
                      </button>
                    )}

                    {/* Удаление */}
                    {!isDeleting ? (
                      <button
                        onClick={() => setConfirmId(r.id)}
                        disabled={isProcessing}
                        style={{
                          padding: "6px 14px",
                          fontSize: 13,
                          color: "rgba(245,240,230,.35)",
                          background: "transparent",
                          border: "1px solid rgba(245,240,230,.1)",
                          cursor: "pointer",
                          transition: "color .15s, border-color .15s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color="#e57373"; e.currentTarget.style.borderColor="rgba(229,115,115,.4)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color="rgba(245,240,230,.35)"; e.currentTarget.style.borderColor="rgba(245,240,230,.1)"; }}
                      >
                        Удалить
                      </button>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                        <div style={{ fontSize: 13, color: "#e57373", marginBottom: 2 }}>Удалить заявку?</div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button
                            onClick={() => deleteRow(r.id)}
                            disabled={isProcessing}
                            style={{ padding: "5px 14px", fontSize: 13, color: "#e57373", background: "rgba(229,115,115,.12)", border: "1px solid rgba(229,115,115,.4)", cursor: "pointer" }}
                          >
                            {isProcessing ? "..." : "Да, удалить"}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            style={{ padding: "5px 12px", fontSize: 13, color: "rgba(245,240,230,.45)", background: "transparent", border: "1px solid rgba(245,240,230,.15)", cursor: "pointer" }}
                          >
                            Отмена
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AdminPage;
