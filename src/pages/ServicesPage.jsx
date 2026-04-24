import { useState } from "react";

const ServicesPage = ({ setPage }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const services = [
    /* ── Недвижимость ── */
    { cat: "realty",    img: "/images/services/apartment.jpg",  icon: "🏠", name: "Оценка квартиры",                  desc: "Оценка для ипотеки, продажи, наследства, раздела имущества.", price: "от 5 000 ₽",  time: "1 день"  },
    { cat: "realty",    img: "/images/services/room.jpg",       icon: "🛏", name: "Оценка комнаты",                   desc: "Комнаты в коммунальных квартирах и общежитиях для сделок и суда.", price: "от 3 500 ₽",  time: "1 день"  },
    { cat: "realty",    img: "/images/services/house.jpg",      icon: "🏡", name: "Оценка дома и коттеджа",           desc: "Жилые дома, дачи, загородные коттеджи — для сделок, ипотеки и налогообложения.", price: "от 7 000 ₽",  time: "2 дня"   },
    { cat: "realty",    img: "/images/services/commercial.jpg", icon: "🏢", name: "Коммерческая недвижимость",        desc: "Офисные, торговые, складские и производственные помещения.", price: "от 15 000 ₽", time: "3 дня"   },
    { cat: "realty",    img: "/images/services/land.jpg",       icon: "🌲", name: "Оценка земельного участка",        desc: "ИЖС, СНТ, сельхозугодья, участки под коммерческую застройку.", price: "от 5 000 ₽",  time: "2 дня"   },
    { cat: "realty",    img: "/images/services/garage.jpg",     icon: "🅿️", name: "Оценка гаража и машино-места",    desc: "Капитальные гаражи, машино-места в паркингах, гаражные боксы.", price: "от 3 000 ₽",  time: "1 день"  },

    /* ── Судебные и специальные ── */
    { cat: "special",   img: "/images/services/court.jpg",      icon: "⚖️", name: "Оценка для суда",                  desc: "Независимые оценочные заключения, признаваемые судами всех инстанций РФ.", price: "от 10 000 ₽", time: "3 дня"   },
    { cat: "special",   img: "/images/services/expertise.jpg",  icon: "🔍", name: "Судебная экспертиза",              desc: "Проведение экспертных исследований по назначению суда и по инициативе сторон.", price: "от 3 500 ₽",  time: "3 дня"   },
    { cat: "special",   img: "/images/services/seizure.jpg",    icon: "🔨", name: "Оценка при изъятии",               desc: "Определение размера возмещения при изъятии имущества для государственных нужд.", price: "от 15 000 ₽", time: "5 дней"  },
    { cat: "special",   img: "/images/services/demolition.jpg", icon: "🏚", name: "Оценка при сносе жилья",           desc: "Ветхое и аварийное жильё, участки в зонах реновации.", price: "от 15 000 ₽", time: "3 дня"   },
    { cat: "special",   img: "/images/services/review.jpg",     icon: "📋", name: "Рецензирование отчётов",           desc: "Проверка и анализ уже подготовленных отчётов об оценке на соответствие ФСО.", price: "от 6 500 ₽",  time: "2 дня"   },

    /* ── Транспорт ── */
    { cat: "transport", img: "/images/services/car.jpg",        icon: "🚗", name: "Оценка автомобиля",                desc: "Легковые автомобили для продажи, страхования, нотариуса и суда.", price: "от 3 000 ₽",  time: "1 день"  },
    { cat: "transport", img: "/images/services/truck.jpg",      icon: "🚛", name: "Оценка грузового транспорта",      desc: "Грузовые автомобили, самосвалы, тягачи, полуприцепы и спецтехника.", price: "от 5 000 ₽",  time: "2 дня"   },
    { cat: "transport", img: "/images/services/moto.jpg",       icon: "🏍", name: "Оценка мотоцикла",                 desc: "Мотоциклы, мопеды и квадроциклы для сделок, страхования и судебных разбирательств.", price: "от 3 000 ₽",  time: "1 день"  },
    { cat: "transport", img: "/images/services/agri.jpg",       icon: "🚜", name: "Оценка сельхозтехники",            desc: "Тракторы, комбайны, культиваторы и прочие сельскохозяйственные машины.", price: "от 5 000 ₽",  time: "2 дня"   },

    /* ── Бизнес и активы ── */
    { cat: "business",  img: "/images/services/business.jpg",   icon: "💼", name: "Оценка бизнеса",                   desc: "Оценка компаний и предприятий для сделок, залога и реструктуризации.", price: "от 30 000 ₽", time: "7 дней"  },
    { cat: "business",  img: "/images/services/patent.jpg",     icon: "📜", name: "Оценка патента",                   desc: "Оценка исключительных прав на изобретения, полезные модели и промышленные образцы.", price: "от 15 000 ₽", time: "5 дней"  },
    { cat: "business",  img: "/images/services/equipment.jpg",  icon: "⚙️", name: "Оценка оборудования",              desc: "Промышленное оборудование, станки, производственные линии для залога и учёта.", price: "от 10 000 ₽", time: "3 дня"   },
    { cat: "business",  img: "/images/services/jewelry.jpg",    icon: "💎", name: "Оценка ювелирных изделий",         desc: "Ювелирные украшения, антиквариат и предметы искусства для наследства, страхования и сделок.", price: "от 5 000 ₽",  time: "2 дня"   },

    /* ── Прочее ── */
    { cat: "other",     img: "/images/services/cattle.jpg",     icon: "🐄", name: "Оценка крупного рогатого скота",  desc: "Рыночная оценка сельскохозяйственных животных для страхования и учёта.", price: "от 7 000 ₽",  time: "2 дня"   },
    { cat: "other",     img: "/images/services/scrap.jpg",      icon: "🔩", name: "Оценка металлолома",               desc: "Определение рыночной стоимости лома чёрных и цветных металлов для сделок и учёта.", price: "от 5 000 ₽",  time: "2 дня"   },
  ];

  const filters = [
    { id: "all",       label: "Все услуги"         },
    { id: "realty",    label: "Недвижимость"        },
    { id: "special",   label: "Судебные / Изъятие" },
    { id: "transport", label: "Транспорт"           },
    { id: "business",  label: "Бизнес и активы"    },
    { id: "other",     label: "Прочее"              },
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

      {/* Фильтры */}
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

      {/* Сетка карточек */}
      <div style={{ padding: "2px 60px 80px", background: "var(--ink)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="services-all-grid">
            {filtered.map((s, i) => (
              <div key={i} className="service-card-full" onClick={() => setPage("application")}>
                {/* Photo */}
                <div className="sc-photo">
                  <div className="service-card-full-bg" style={{ backgroundImage: `url(${s.img})` }} />
                  <span className="sc-idx">{String(i + 1).padStart(2, "0")}</span>
                </div>

                {/* Separator */}
                <div className="sc-sep" />

                {/* Info */}
                <div className="service-card-full-body">
                  <div className="sc-meta">
                    <span className="service-price-tag">{s.price}</span>
                    <span className="sc-time">{s.time}</span>
                  </div>
                  <div className="service-card-full-name">{s.name}</div>
                  <div className="sc-desc">{s.desc}</div>
                  <div className="sc-cta">
                    Заказать оценку
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M8 1L11 4M11 4L8 7M11 4H1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>
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
