import GosTenders from "../components/GosTenders";

const HomePage = ({ setPage }) => {
  const services = [
    { img: "/images/services/house.jpg",      icon: "🏡", name: "Оценка дома и коттеджа",         desc: "Жилые дома, дачи, загородные коттеджи — для сделок, ипотеки и налогообложения.", price: "от 7 000 ₽"  },
    { img: "/images/services/commercial.jpg", icon: "🏢", name: "Оценка коммерческой недвижимости",desc: "Офисы, склады, торговые помещения, производственные здания.", price: "от 15 000 ₽" },
    { img: "/images/services/court.jpg",      icon: "⚖️", name: "Оценка для суда",                desc: "Официальные заключения, признаваемые судами всех инстанций РФ.", price: "от 10 000 ₽" },
    { img: "/images/services/car.jpg",        icon: "🚗", name: "Оценка транспорта",              desc: "Легковые авто, грузовой транспорт, спецтехника и самоходные машины.", price: "от 3 000 ₽"  },
    { img: "/images/services/business.jpg",   icon: "💼", name: "Оценка бизнеса",                 desc: "Оценка компаний, долей, акций и нематериальных активов.", price: "от 30 000 ₽" },
    { img: "/images/services/land.jpg",       icon: "🌲", name: "Оценка земельного участка",      desc: "ИЖС, СНТ, сельхозугодья, участки под коммерческую застройку.", price: "от 5 000 ₽"  },
  ];

  const reviews = [
    { stars: 5, text: "Обратилась для оценки квартиры под ипотеку. Отчёт готов был уже на следующий день, банк принял без замечаний. Очень профессиональная команда!", author: "Диана Ковалева", date: "20.02.2026" },
    { stars: 5, text: "Проводили оценку нежилого помещения для сделки купли-продажи. Всё чётко, в срок, документы в полном порядке. Рекомендую КОРЭЛ коллегам.", author: "Сергей Михайлов", date: "15.01.2026" },
    { stars: 5, text: "Нужна была срочная оценка для суда. Откликнулись быстро, объяснили весь процесс, сделали качественный отчёт. Суд принял заключение без вопросов.", author: "Елена Васильева", date: "03.12.2025" },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag anim-fade-up">
            <span />Работаем по всей России<span />
          </div>
          <h1 className="hero-h1 anim-fade-up-d1">
            Профессиональная<br /><em>независимая</em><br />оценка имущества
          </h1>
          <p className="hero-sub anim-fade-up-d2">
            Официальные отчёты об оценке, признаваемые банками, судами и налоговыми органами. Более 10 лет опыта. Работаем ежедневно с 7:00 до 21:00.
          </p>
          <div className="hero-ctas anim-fade-up-d3">
            <button className="btn-primary" onClick={() => setPage("application")}>
              Получить оценку
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
            <button className="btn-outline" onClick={() => setPage("services")}>Все услуги</button>
          </div>
          <div className="hero-stats anim-fade-up-d4">
            <div className="hero-stat">
              <div className="hero-stat-num">10+</div>
              <div className="hero-stat-label">лет опыта</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">50+</div>
              <div className="hero-stat-label">видов оценки</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">7/7</div>
              <div className="hero-stat-label">рабочих дней</div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-deco-text">ОЦЕНКА</div>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", zIndex: 2 }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 80, fontWeight: 300, color: "var(--gold)", opacity: 0.15, lineHeight: 1 }}>ОК</div>
            <div style={{ width: 1, height: 160, background: "linear-gradient(to bottom, transparent, rgba(196,162,44,.4), transparent)", margin: "20px auto" }} />
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(245,240,230,.3)" }}>НЕЗАВИСИМАЯ ОЦЕНКА</div>
          </div>
          <div className="hero-badge">
            <div className="hero-badge-num">1</div>
            <div className="hero-badge-label">день на готовый отчёт</div>
          </div>
          <div style={{ position: "absolute", top: 60, left: 60, display: "flex", flexDirection: "column", gap: 8 }}>
            {["Аккредитованная компания", "Член СРО РОО", "Полис страхования"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 6, height: 6, background: "var(--gold)", borderRadius: "50%", flexShrink: 0 }} />
                <span style={{ fontSize: 15, color: "rgba(245,240,230,.6)", letterSpacing: ".04em" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" style={{ background: "var(--ink)" }}>
        <div className="section-inner">
          <div className="section-header">
            <div>
              <div className="section-tag">Наши услуги</div>
              <h2 className="section-title">Оцениваем любые<br />виды имущества</h2>
            </div>
            <button className="btn-ghost" onClick={() => setPage("services")}>
              Все услуги
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M11 1L15 5M15 5L11 9M15 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card" onClick={() => setPage("application")}>
                <div
                  className="service-card-bg"
                  style={s.img ? { backgroundImage: `url(${s.img})` } : {}}
                />
                <div className="service-card-overlay" />
                <div className="service-card-body">
                  <div className="service-name">{s.name}</div>
                  <div className="service-price">{s.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS — перемещён выше */}
      <section className="section" style={{ background: "var(--ink)" }}>
        <div className="section-inner">
          <div className="section-header">
            <div>
              <div className="section-tag">Отзывы клиентов</div>
              <h2 className="section-title">Нам доверяют</h2>
            </div>
          </div>
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-stars">{"★".repeat(r.stars)}</div>
                <div className="review-text">«{r.text}»</div>
                <div className="review-author">{r.author}</div>
                <div className="review-date">{r.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ГОСЗАКУПКИ */}
      <GosTenders />

      {/* HOW IT WORKS — перемещён ниже */}
      <section className="section" style={{ background: "rgba(58,24,51,.2)", borderTop: "1px solid rgba(196,162,44,.08)", borderBottom: "1px solid rgba(196,162,44,.08)" }}>
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-tag">Процесс работы</div>
            <h2 className="section-title">Всего 4 простых шага</h2>
          </div>
          <div className="steps-grid">
            {[
              { n: "01", t: "Оставьте заявку", d: "Позвоните или заполните форму на сайте — мы ответим в течение 15 минут." },
              { n: "02", t: "Согласуем детали", d: "Уточним объект, цель оценки и сроки. Расскажем какие документы подготовить." },
              { n: "03", t: "Проводим оценку", d: "Выезд специалиста или камеральная обработка документов. В сроки, которые согласовали." },
              { n: "04", t: "Получаете отчёт", d: "Официальный отчёт об оценке в соответствии с ФЗ-135 и ФСО. Принимается везде." },
            ].map((s, i) => (
              <div key={i} className="step">
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.t}</div>
                <div className="step-desc">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner">
        <div className="cta-banner-inner">
          <div>
            <div className="section-tag">Готовы начать?</div>
            <h2 className="section-title" style={{ marginBottom: ".75rem" }}>
              Получите бесплатную<br />консультацию
            </h2>
            <p style={{ fontSize: 18, fontWeight: 300, color: "rgba(245,240,230,.7)", maxWidth: 460, lineHeight: 1.7 }}>
              Расскажите о вашей задаче — мы подберём оптимальный вид оценки и озвучим стоимость ещё до заключения договора.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <button className="btn-primary" style={{ fontSize: 15, padding: "18px 44px" }} onClick={() => setPage("application")}>
              Заказать оценку
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
            <div style={{ textAlign: "center", fontSize: 15, color: "rgba(245,240,230,.4)", letterSpacing: ".06em" }}>
              Ответим в течение 15 минут
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
