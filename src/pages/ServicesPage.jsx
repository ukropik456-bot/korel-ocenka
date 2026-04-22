import { useState } from "react";

const ServicesPage = ({ setPage }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const services = [
    { cat: "realty", icon: "🏠", name: "Оценка квартиры", desc: "Для ипотеки, купли-продажи, налогообложения, вступления в наследство.", price: "от 3 500 ₽", time: "1 день" },
    { cat: "realty", icon: "🏡", name: "Оценка дома и коттеджа", desc: "Жилые дома, дачи, загородные коттеджи. Земля в составе объекта или отдельно.", price: "от 7 000 ₽", time: "2 дня" },
    { cat: "realty", icon: "🏢", name: "Коммерческая недвижимость", desc: "Офисные, торговые, складские и производственные помещения.", price: "от 15 000 ₽", time: "3 дня" },
    { cat: "realty", icon: "🌲", name: "Оценка земельного участка", desc: "ИЖС, СНТ, сельхозугодья, участки под коммерческую застройку.", price: "от 5 000 ₽", time: "2 дня" },
    { cat: "special", icon: "⚖️", name: "Оценка для суда", desc: "Независимая судебная экспертиза и оценочные заключения для судебных разбирательств.", price: "от 10 000 ₽", time: "3 дня" },
    { cat: "special", icon: "🔨", name: "Оценка при изъятии", desc: "Определение размера возмещения при изъятии имущества для государственных нужд.", price: "15 000 ₽", time: "5 дней" },
    { cat: "special", icon: "🏚", name: "Оценка при сносе жилья", desc: "Ветхое и аварийное жильё, участки в зонах реновации.", price: "от 15 000 ₽", time: "3 дня" },
    { cat: "transport", icon: "🚗", name: "Оценка автомобиля", desc: "Легковые автомобили для продажи, страхования, нотариуса, суда.", price: "от 3 000 ₽", time: "1 день" },
    { cat: "transport", icon: "🚛", name: "Оценка грузового транспорта", desc: "Грузовики, автобусы, прицепы, специальная техника и оборудование.", price: "от 5 000 ₽", time: "2 дня" },
    { cat: "business", icon: "💼", name: "Оценка бизнеса", desc: "Оценка компаний и предприятий для сделок, залога, реструктуризации.", price: "от 30 000 ₽", time: "7 дней" },
    { cat: "business", icon: "📊", name: "Оценка ценных бумаг", desc: "Акции, доли в ООО, векселя, облигации и прочие финансовые активы.", price: "от 20 000 ₽", time: "5 дней" },
    { cat: "other", icon: "🐄", name: "Оценка крупного рогатого скота", desc: "Рыночная оценка сельскохозяйственных животных для страхования и учёта.", price: "от 7 000 ₽", time: "2 дня" },
  ];

  const filters = [
    { id: "all", label: "Все услуги" },
    { id: "realty", label: "Недвижимость" },
    { id: "special", label: "Судебные / Изъятие" },
    { id: "transport", label: "Транспорт" },
    { id: "business", label: "Бизнес и активы" },
    { id: "other", label: "Прочее" },
  ];

  const filtered = activeFilter === "all" ? services : services.filter(s => s.cat === activeFilter);

  return (
    <div className="services-page">
      <div className="services-hero">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-tag">Полный каталог</div>
          <h1 className="display" style={{ fontSize: "clamp(50px,6.5vw,80px)", fontWeight: 300, lineHeight: 1.05, maxWidth: 700, marginBottom: "1rem" }}>
            Все виды<br />оценки имущества
          </h1>
          <p style={{ fontSize: 18, fontWeight: 300, color: "rgba(245,240,230,.65)", maxWidth: 540, lineHeight: 1.8 }}>
            50+ видов оценки. Официальные отчёты по ФЗ-135 и ФСО. Принимаются всеми банками, судами и государственными органами РФ.
          </p>
        </div>
      </div>

      <div style={{ padding: "0 60px", background: "var(--ink)", borderBottom: "1px solid rgba(196,162,44,.1)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 4, overflowX: "auto", padding: "20px 0" }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)} style={{
              padding: "9px 22px",
              border: `1px solid ${activeFilter === f.id ? "var(--gold)" : "rgba(245,240,230,.15)"}`,
              background: activeFilter === f.id ? "var(--gold)" : "transparent",
              color: activeFilter === f.id ? "var(--ink)" : "rgba(245,240,230,.7)",
              fontFamily: "'Jost',sans-serif", fontWeight: 500, fontSize: 15,
              letterSpacing: ".06em", textTransform: "uppercase",
              cursor: "pointer", whiteSpace: "nowrap", transition: "all .25s",
            }}>{f.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "2px 60px 80px", background: "var(--ink)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="services-all-grid">
            {filtered.map((s, i) => (
              <div key={i} className="service-card-full">
                <div style={{ fontSize: 34, marginBottom: 16 }}>{s.icon}</div>
                <div className="service-price-tag">{s.price}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 25, fontWeight: 500, marginBottom: ".6rem", lineHeight: 1.2 }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 16, fontWeight: 300, color: "rgba(245,240,230,.6)", lineHeight: 1.7, marginBottom: 16 }}>
                  {s.desc}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ fontSize: 15, color: "rgba(245,240,230,.4)", letterSpacing: ".06em" }}>⏱ {s.time}</div>
                  <button className="btn-ghost" onClick={() => setPage("application")}>
                    Заказать
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
