import { useEffect, useRef, useState } from "react";

const ServicesPage = ({ setPage }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const services = [
    /* Недвижимость */
    { cat: "realty",    img: "/images/services/apartment.jpg",  name: "Оценка квартиры",                 desc: "Оценка для ипотеки, продажи, наследства, раздела имущества.",                          price: "от 5 000",  time: "1 день" },
    { cat: "realty",    img: "/images/services/room.jpg",       name: "Оценка комнаты",                  desc: "Комнаты в коммунальных квартирах и общежитиях для сделок и суда.",                     price: "от 3 500",  time: "1 день" },
    { cat: "realty",    img: "/images/services/house.jpg",      name: "Оценка дома и коттеджа",          desc: "Жилые дома, дачи, загородные коттеджи — для сделок, ипотеки и налогообложения.",        price: "от 7 000",  time: "2 дня" },
    { cat: "realty",    img: "/images/services/commercial.jpg", name: "Коммерческая недвижимость",       desc: "Офисные, торговые, складские и производственные помещения.",                            price: "от 15 000", time: "3 дня" },
    { cat: "realty",    img: "/images/services/land.jpg",       name: "Оценка земельного участка",       desc: "ИЖС, СНТ, сельхозугодья, участки под коммерческую застройку.",                          price: "от 5 000",  time: "2 дня" },
    { cat: "realty",    img: "/images/services/garage.jpg",     name: "Гараж и машино-место",            desc: "Капитальные гаражи, машино-места в паркингах, гаражные боксы.",                         price: "от 3 000",  time: "1 день" },

    /* Судебные и специальные */
    { cat: "special",   img: "/images/services/court.jpg",      name: "Оценка для суда",                 desc: "Независимые оценочные заключения, признаваемые судами всех инстанций РФ.",              price: "от 10 000", time: "3 дня" },
    { cat: "special",   img: "/images/services/expertise.jpg",  name: "Судебная экспертиза",             desc: "Проведение экспертных исследований по назначению суда и по инициативе сторон.",          price: "от 3 500",  time: "3 дня" },
    { cat: "special",   img: "/images/services/seizure.jpg",    name: "Оценка при изъятии",              desc: "Определение размера возмещения при изъятии имущества для государственных нужд.",         price: "от 15 000", time: "5 дней" },
    { cat: "special",   img: "/images/services/demolition.jpg", name: "Оценка при сносе жилья",          desc: "Ветхое и аварийное жильё, участки в зонах реновации.",                                  price: "от 15 000", time: "3 дня" },
    { cat: "special",   img: "/images/services/review.jpg",     name: "Рецензирование отчётов",          desc: "Проверка и анализ уже подготовленных отчётов об оценке на соответствие ФСО.",            price: "от 6 500",  time: "2 дня" },

    /* Транспорт */
    { cat: "transport", img: "/images/services/car.jpg",        name: "Оценка автомобиля",               desc: "Легковые автомобили для продажи, страхования, нотариуса и суда.",                       price: "от 3 000",  time: "1 день" },
    { cat: "transport", img: "/images/services/truck.jpg",      name: "Оценка грузового транспорта",     desc: "Грузовые автомобили, самосвалы, тягачи, полуприцепы и спецтехника.",                    price: "от 5 000",  time: "2 дня" },
    { cat: "transport", img: "/images/services/moto.jpg",       name: "Оценка мотоцикла",                desc: "Мотоциклы, мопеды и квадроциклы для сделок, страхования и судебных разбирательств.",     price: "от 3 000",  time: "1 день" },
    { cat: "transport", img: "/images/services/agri.jpg",       name: "Оценка сельхозтехники",           desc: "Тракторы, комбайны, культиваторы и прочие сельскохозяйственные машины.",                price: "от 5 000",  time: "2 дня" },

    /* Бизнес и активы */
    { cat: "business",  img: "/images/services/business.jpg",   name: "Оценка бизнеса",                  desc: "Оценка компаний и предприятий для сделок, залога и реструктуризации.",                   price: "от 30 000", time: "7 дней" },
    { cat: "business",  img: "/images/services/patent.jpg",     name: "Оценка патента",                  desc: "Оценка исключительных прав на изобретения, полезные модели и промышленные образцы.",     price: "от 15 000", time: "5 дней" },
    { cat: "business",  img: "/images/services/equipment.jpg",  name: "Оценка оборудования",             desc: "Промышленное оборудование, станки, производственные линии для залога и учёта.",          price: "от 10 000", time: "3 дня" },
    { cat: "business",  img: "/images/services/jewelry.jpg",    name: "Ювелирные изделия",               desc: "Ювелирные украшения, антиквариат и предметы искусства для наследства и страхования.",     price: "от 5 000",  time: "2 дня" },

    /* Прочее */
    { cat: "other",     img: "/images/services/cattle.jpg",     name: "Крупный рогатый скот",            desc: "Рыночная оценка сельскохозяйственных животных для страхования и учёта.",                price: "от 7 000",  time: "2 дня" },
    { cat: "other",     img: "/images/services/scrap.jpg",      name: "Оценка металлолома",              desc: "Определение рыночной стоимости лома чёрных и цветных металлов для сделок и учёта.",     price: "от 5 000",  time: "2 дня" },
  ];

  const filters = [
    { id: "all",       label: "Все услуги"    },
    { id: "realty",    label: "Недвижимость"   },
    { id: "special",   label: "Суд и государство" },
    { id: "transport", label: "Транспорт"      },
    { id: "business",  label: "Бизнес"         },
    { id: "other",     label: "Прочее"         },
  ];

  const filtered = activeFilter === "all" ? services : services.filter(s => s.cat === activeFilter);

  const rootRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rootRef.current?.querySelectorAll(".reveal-v2").forEach(el => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    rootRef.current?.querySelectorAll(".reveal-v2").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [activeFilter]);

  const CardArrow = () => (
    <svg className="service-card-v2__arrow" viewBox="0 0 14 14" fill="none">
      <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );

  return (
    <div className="page-v2" ref={rootRef}>

      {/* ── HERO ── */}
      <section className="page-hero-v2">
        <div className="wrap-v2 page-hero-v2__inner">
          <div className="services-hero-v2__grid reveal-v2">
            <div>
              <div className="eyebrow-v2 page-hero-v2__eyebrow">Полный каталог</div>
              <h1>Все виды<br /><em>оценки</em> имущества</h1>
              <p className="page-hero-v2__sub">
                21 направление независимой оценки — для физических лиц, банков, юридических компаний
                и государственных органов. Каждый отчёт соответствует ФЗ-135 и федеральным стандартам оценки.
              </p>
            </div>

            <aside className="services-hero-v2__meta">
              <div className="services-hero-v2__meta-row">
                <div className="services-hero-v2__meta-num">21</div>
                <div className="services-hero-v2__meta-label">направление оценки</div>
              </div>
              <div className="services-hero-v2__meta-row">
                <div className="services-hero-v2__meta-num">5</div>
                <div className="services-hero-v2__meta-label">категорий имущества</div>
              </div>
              <div className="services-hero-v2__meta-row">
                <div className="services-hero-v2__meta-num services-hero-v2__meta-num--small">от 3 000 ₽</div>
                <div className="services-hero-v2__meta-label">минимальная цена</div>
              </div>
              <div className="services-hero-v2__meta-row">
                <div className="services-hero-v2__meta-num services-hero-v2__meta-num--small">1 день</div>
                <div className="services-hero-v2__meta-label">минимальный срок</div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── ФИЛЬТРЫ ── */}
      <div className="filters-v2">
        <div className="wrap-v2 filters-v2__row">
          {filters.map(f => (
            <button
              key={f.id}
              className={activeFilter === f.id ? "active" : ""}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── КАТАЛОГ ── */}
      <section className="services-all-v2">
        <div className="wrap-v2">
          <div className="services-all-v2__grid reveal-v2">
            {filtered.map((s, i) => (
              <button key={`${activeFilter}-${i}`} className="service-card-v2" onClick={() => setPage("application")}>
                <div className="service-card-v2__photo">
                  <img src={s.img} alt="" />
                </div>
                <div className="service-card-v2__sep" />
                <div className="service-card-v2__body">
                  <span className="service-card-v2__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="service-card-v2__name">{s.name}</h3>
                  <p className="service-card-v2__desc">{s.desc}</p>
                  <div className="service-card-v2__foot">
                    <div className="service-card-v2__price">{s.price} <small>₽</small></div>
                    <div className="service-card-v2__time">{s.time}</div>
                  </div>
                </div>
                <CardArrow />
              </button>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;
