import { useState, useEffect } from "react";

const STATIC = {
  live: false,
  purchases: 152,
  purchasesSum: "12 млн ₽",
  contracts: 166,
  contractsSum: "13 млн ₽",
  yearsLabel: "10+ лет в реестре",
  winPct: 82,
  notDefinedPct: 10,
  losePct: 8,
  totalTenders: 170,
  topClients: [
    { name: "ТУ Росимущества в Иркутской области",                       amount: "932 000 ₽", pct: 100 },
    { name: "МТУ Росимущества в Алтайском Крае и Республике Алтай",       amount: "816 750 ₽", pct: 88  },
    { name: "МТУ Росимущества в Челябинской и Курганской Областях",       amount: "650 000 ₽", pct: 70  },
  ],
  categories: [
    "Финансы и консалтинг",
    "Строительство и инженерные услуги",
    "Страхование",
    "Прочее",
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
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="oklch(28% 0.04 320)"
        strokeWidth={stroke}
      />
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
    { pct: data.winPct,        color: "#C4A22C" },  /* brand gold */
    { pct: data.notDefinedPct, color: "#8B7842" },  /* muted gold-olive */
    { pct: data.losePct,       color: "#5C2030" },  /* dark burgundy plum */
  ];

  return (
    <section className="tenders-v2" id="tenders">
      <div className="wrap-v2">

        {/* ── ЗАГОЛОВОК ──────────────────────────────────── */}
        <div className="tenders-v2__head reveal-v2">
          <div>
            <div className="eyebrow-v2" style={{ marginBottom: 16 }}>Прозрачность и репутация</div>
            <h2>Государственные<br /><em>закупки</em></h2>
            <p>
              Данные реестра государственных закупок РФ подтверждают опыт и
              надёжность КОРЭЛ как исполнителя по контрактам по 44-ФЗ и 223-ФЗ.
            </p>
          </div>
          <div className="actions">
            <a
              href="https://www.rusprofile.ru/id/7132258"
              target="_blank"
              rel="noopener noreferrer"
              className="link-v2"
            >
              <span>Rusprofile.ru</span>
              <svg className="arrow" width="14" height="9" viewBox="0 0 14 9" fill="none">
                <path d="M9 1L13 4.5M13 4.5L9 8M13 4.5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── МЕТРИКИ ────────────────────────────────────── */}
        <div className="tenders-v2__metrics reveal-v2">
          <div className="t-metric">
            <div className="t-metric__num">{data.purchases}</div>
            <div className="t-metric__label">закупки</div>
            <div className="t-metric__sub">на сумму {data.purchasesSum}</div>
          </div>
          <div className="t-metric">
            <div className="t-metric__num">{data.contracts}</div>
            <div className="t-metric__label">контрактов заключено</div>
            <div className="t-metric__sub">на сумму {data.contractsSum}</div>
          </div>
          <div className="t-metric">
            <div className="t-metric__num">10+</div>
            <div className="t-metric__label">лет в реестре</div>
            <div className="t-metric__sub">подтверждённый опыт</div>
          </div>
        </div>

        {/* ── ДИАГРАММА + ТОП-3 ─────────────────────────── */}
        <div className="tenders-v2__center reveal-v2">
          <div className="t-panel">
            <div className="t-panel__title">Статус закупок</div>
            <div className="t-donut-row">
              <div className="t-donut-wrap">
                <DonutChart segments={segments} size={160} stroke={22} />
                <div className="t-donut-center">
                  <div className="t-donut-num">{data.totalTenders}</div>
                  <div className="t-donut-label">закупок</div>
                </div>
              </div>
              <div className="t-legend">
                {[
                  { color: "#C4A22C", label: "Выиграно",      pct: `${data.winPct}%`        },
                  { color: "#B89F70", label: "Не определено", pct: `${data.notDefinedPct}%` },
                  { color: "#A04050", label: "Не выиграно",   pct: `${data.losePct}%`       },
                ].map((s, i) => (
                  <div key={i} className="t-legend__row">
                    <div className="t-legend__dot" style={{ background: i === 0 ? "#C4A22C" : i === 1 ? "#8B7842" : "#5C2030" }} />
                    <span className="t-legend__name">{s.label}</span>
                    <span className="t-legend__pct" style={{ color: s.color }}>{s.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="t-panel">
            <div className="t-panel__title">Топ-3 заказчика</div>
            <div className="t-clients">
              {data.topClients.map((c, i) => (
                <div key={i}>
                  <div className="t-client__row">
                    <span className="t-client__name">{c.name}</span>
                    <span className="t-client__amount">{c.amount}</span>
                  </div>
                  <div className="t-client__bar">
                    <div className="t-client__bar-fill" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── КАТЕГОРИИ ──────────────────────────────────── */}
        <div className="tenders-v2__cats reveal-v2">
          <span className="tenders-v2__cats-label">Категории</span>
          {data.categories.map((c, i) => (
            <span key={i} className="t-chip">{c}</span>
          ))}
        </div>

        {/* ── ИСТОЧНИК ──────────────────────────────────── */}
        <p className="tenders-v2__source">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0, opacity: .55 }}>
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1" />
            <path d="M6.5 5.5v4M6.5 4h.01" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          Данные получены из открытых источников —{" "}
          <a href="https://www.rusprofile.ru/id/7132258" target="_blank" rel="noopener noreferrer">rusprofile.ru</a>
          {" "}и реестра государственных закупок РФ.
        </p>

      </div>
    </section>
  );
};

export default GosTenders;
