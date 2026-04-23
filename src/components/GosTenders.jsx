import { useState, useEffect } from "react";

const STATIC = {
  live: false,
  purchases: 152,
  purchasesSum: "12 млн руб.",
  contracts: 166,
  contractsSum: "13 млн руб.",
  yearsLabel: "10+ лет в реестре",
  winPct: 82,
  notDefinedPct: 10,
  losePct: 8,
  totalTenders: 170,
  topClients: [
    { name: "ТУ Росимущества в Иркутской области", amount: "932 000 ₽", pct: 100 },
    { name: "МТУ Росимущества в Алтайском Крае и Республике Алтай", amount: "816 750 ₽", pct: 88 },
    { name: "МТУ Росимущества в Челябинской и Курганской Областях", amount: "650 000 ₽", pct: 70 },
  ],
  categories: [
    "Финансы и консалтинг",
    "Прочее",
    "Строительство и инженерные услуги",
    "Страхование",
    "Категория неизвестна",
  ],
};

const DonutChart = ({ segments, size = 160, stroke = 22 }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;

  let offset = 0;
  const slices = segments.map((s) => {
    const dash = (s.pct / 100) * circ;
    const gap = circ - dash;
    const slice = { ...s, dash, gap, offset };
    offset += dash;
    return slice;
  });

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      {slices.map((s, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={stroke}
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeDashoffset={-s.offset}
          strokeLinecap="butt"
        />
      ))}
    </svg>
  );
};

const GosTenders = () => {
  const [data, setData] = useState(STATIC);

  useEffect(() => {
    fetch("/api/tenders")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setData(STATIC));
  }, []);

  const segments = [
    { pct: data.winPct,        color: "#C4A22C" },
    { pct: data.notDefinedPct, color: "#6B3F6B" },
    { pct: data.losePct,       color: "#8B2020" },
  ];

  return (
    <section className="section" style={{ background: "var(--plum)", borderTop: "1px solid rgba(196,162,44,.12)", borderBottom: "1px solid rgba(196,162,44,.12)" }}>
      <div className="section-inner">

        {/* Шапка */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div className="section-tag">Прозрачность и репутация</div>
            <h2 className="section-title">Государственные<br />закупки</h2>
            <p className="section-sub">
              Данные реестра закупок подтверждают опыт и надёжность КОРЭЛ как исполнителя по государственным контрактам.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            <a
              href="https://www.rusprofile.ru/id/7132258"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ textDecoration: "none" }}
            >
              Rusprofile.ru
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
            {data.live && (
              <span style={{ fontSize: 13, color: "#6dbf6d", letterSpacing: ".06em" }}>● актуальные данные</span>
            )}
          </div>
        </div>

        {/* Верхние метрики */}
        <div className="gt-metrics-grid">
          {[
            { num: String(data.purchases), label: "закупки",             sub: `на сумму ${data.purchasesSum}` },
            { num: String(data.contracts), label: "контракта заключено", sub: `на сумму ${data.contractsSum}` },
            { num: "10+",                  label: "лет в реестре",       sub: "подтверждённый опыт"           },
          ].map((m, i) => (
            <div key={i} style={{ background: "rgba(58,24,51,.45)", border: "1px solid rgba(196,162,44,.15)", padding: "32px 28px" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 52, fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>
                {m.num}
              </div>
              <div style={{ fontSize: 18, fontWeight: 500, color: "var(--cream)", marginTop: 6 }}>{m.label}</div>
              <div style={{ fontSize: 15, fontWeight: 300, color: "rgba(245,240,230,.5)", marginTop: 4 }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Центральный блок: диаграмма + топ клиентов */}
        <div className="gt-center-grid">

          {/* Диаграмма */}
          <div style={{ background: "rgba(58,24,51,.45)", border: "1px solid rgba(196,162,44,.15)", padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontSize: 15, fontWeight: 400, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 28 }}>Статус закупок</div>
            <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <DonutChart segments={segments} size={160} stroke={22} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>{data.totalTenders}</div>
                  <div style={{ fontSize: 15, fontWeight: 300, color: "rgba(245,240,230,.55)", marginTop: 2 }}>закупок</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { color: "#C4A22C", label: "Выиграно",      pct: `${data.winPct}%`        },
                  { color: "#6B3F6B", label: "Не определено", pct: `${data.notDefinedPct}%` },
                  { color: "#8B2020", label: "Не выиграно",   pct: `${data.losePct}%`       },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 16, fontWeight: 300, color: "rgba(245,240,230,.8)" }}>{s.label}</span>
                    <span style={{ fontSize: 16, fontWeight: 500, color: s.color, marginLeft: "auto", paddingLeft: 12 }}>{s.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Топ заказчиков */}
          <div style={{ background: "rgba(58,24,51,.45)", border: "1px solid rgba(196,162,44,.15)", padding: "36px 32px" }}>
            <div style={{ fontSize: 15, fontWeight: 400, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 28 }}>Топ-3 заказчика</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {data.topClients.map((c, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, gap: 12 }}>
                    <span style={{ fontSize: 16, fontWeight: 300, color: "rgba(245,240,230,.85)", lineHeight: 1.4 }}>{c.name}</span>
                    <span style={{ fontSize: 16, fontWeight: 500, color: "var(--gold)", whiteSpace: "nowrap" }}>{c.amount}</span>
                  </div>
                  <div style={{ height: 3, background: "rgba(245,240,230,.1)", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${c.pct}%`, background: "linear-gradient(90deg, var(--gold), var(--gold2))", borderRadius: 2, transition: "width .8s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Категории */}
        <div style={{ background: "rgba(58,24,51,.45)", border: "1px solid rgba(196,162,44,.15)", padding: "28px 32px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 15, fontWeight: 400, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--gold)", flexShrink: 0 }}>Категории:</span>
          {data.categories.map((cat, i) => (
            <span key={i} style={{
              padding: "6px 16px",
              border: "1px solid rgba(196,162,44,.25)",
              background: "rgba(196,162,44,.08)",
              fontSize: 15,
              fontWeight: 300,
              color: "rgba(245,240,230,.75)",
              letterSpacing: ".02em",
            }}>{cat}</span>
          ))}
        </div>

        {/* Пометка об источнике */}
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0, opacity: .4 }}>
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1"/>
            <path d="M6.5 5.5v4M6.5 4h.01" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 13, fontWeight: 300, color: "rgba(245,240,230,.35)", letterSpacing: ".03em" }}>
            Данные получены из открытых источников —{" "}
            <a
              href="https://www.rusprofile.ru/id/7132258"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(196,162,44,.5)", textDecoration: "none", borderBottom: "1px solid rgba(196,162,44,.25)" }}
            >
              rusprofile.ru
            </a>
            {" "}и реестра государственных закупок РФ.
          </span>
        </div>

      </div>
    </section>
  );
};

export default GosTenders;
