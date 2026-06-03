import { useEffect, useRef } from "react";
import GosTenders from "../components/GosTenders";

const HomePage = ({ setPage }) => {
  // ── СЕРВИСЫ для главной (6 шт.) ──────────────────────────────
  const services = [
    {
      num:  "I.3",
      img:  "/images/services/house.jpg",
      name: "Оценка дома и коттеджа",
      desc: "Жилые дома, дачи, загородные коттеджи — для сделок, ипотеки и налогообложения.",
      price: "от 7 000", time: "2 дня",
    },
    {
      num:  "I.4",
      img:  "/images/services/commercial.jpg",
      name: "Коммерческая недвижимость",
      desc: "Офисы, склады, торговые и производственные помещения — для сделок и залога.",
      price: "от 15 000", time: "3 дня",
    },
    {
      num:  "II.1",
      img:  "/images/services/court.jpg",
      name: "Оценка для суда",
      desc: "Официальные заключения, признаваемые судами всех инстанций Российской Федерации.",
      price: "от 10 000", time: "3 дня",
    },
    {
      num:  "III.1",
      img:  "/images/services/car.jpg",
      name: "Оценка транспорта",
      desc: "Легковые автомобили, грузовой транспорт, спецтехника и самоходные машины.",
      price: "от 3 000", time: "1 день",
    },
    {
      num:  "IV.1",
      img:  "/images/services/business.jpg",
      name: "Оценка бизнеса",
      desc: "Компании, доли, акции и нематериальные активы — для сделок M&A и реструктуризации.",
      price: "от 30 000", time: "7 дней",
    },
    {
      num:  "I.5",
      img:  "/images/services/land.jpg",
      name: "Оценка земельного участка",
      desc: "ИЖС, СНТ, сельхозугодья, участки под коммерческую застройку.",
      price: "от 5 000", time: "2 дня",
    },
  ];

  // ── ОТЗЫВЫ ─────────────────────────────────────────────────
  const reviewSide = [
    {
      stars: 5,
      text: "Оценка нежилого помещения для сделки купли-продажи. Всё чётко, в срок, документы в полном порядке. Рекомендую КОРЭЛ коллегам.",
      author: "Сергей Михайлов", date: "15.01.2026",
    },
    {
      stars: 5,
      text: "Нужна была срочная оценка для суда. Откликнулись быстро, объяснили процесс. Суд принял заключение без вопросов.",
      author: "Елена Васильева", date: "03.12.2025",
    },
    {
      stars: 5,
      text: "Работали с КОРЭЛ по оценке промышленного оборудования. Внимание к деталям и понимание специфики — на высоте.",
      author: "Андрей Петров", date: "18.10.2025",
    },
  ];

  // ── Reveal-анимация на скролл ──────────────────────────────
  const rootRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rootRef.current?.querySelectorAll(".reveal-v2").forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    rootRef.current?.querySelectorAll(".reveal-v2").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const Arrow = (props) => (
    <svg className="arrow" width="14" height="9" viewBox="0 0 14 9" fill="none" {...props}>
      <path d="M9 1L13 4.5M13 4.5L9 8M13 4.5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );

  const CardArrow = () => (
    <svg className="service-card-v2__arrow" viewBox="0 0 14 14" fill="none">
      <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );

  return (
    <div className="home-v2" ref={rootRef}>

      {/* ═════════════════════════════ HERO ═════════════════════════════ */}
      <section className="hero-v2">
        <div className="wrap-v2 hero-v2__inner">
          <div className="hero-v2__sidemark">Independent Appraisal · Since 2015</div>

          <div className="hero-v2__plate reveal-v2">
            <div className="hero-v2__plate-frame">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80"
                alt="Премиальная недвижимость"
                loading="eager"
              />
            </div>
            <p className="hero-v2__plate-label">
              <small>Кейс № 0814 · 2026</small>
              Особняк, оценка для ипотеки
            </p>
          </div>

          <div className="reveal-v2">
            <div className="eyebrow-v2 hero-v2__eyebrow">Независимая оценка имущества</div>
            <h1 className="hero-v2__title">
              Точная
              <span className="line2"><em>—</em>&nbsp;оценка</span>
              <span className="line3">для важных решений</span>
            </h1>
          </div>

          <div className="hero-v2__lower reveal-v2">
            <p className="hero-v2__sub">
              С 2015 года КОРЭЛ готовит официальные отчёты, признаваемые банками,
              судами и государственными органами Российской Федерации. Выверенная
              методология. Прозрачные сроки. Без лишних обещаний.
            </p>
            <div className="hero-v2__actions">
              <button className="btn-v2 btn-v2--ghost" onClick={() => setPage("services")}>
                <span>Перейти к услугам</span>
                <Arrow />
              </button>
              <button className="btn-v2 btn-v2--gold" onClick={() => setPage("application")}>
                <span>Получить расчёт</span>
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════ УСЛУГИ ═════════════════════════════ */}
      <section className="services-v2">
        <div className="wrap-v2">
          <div className="services-v2__head reveal-v2">
            <div className="services-v2__head-top">
              <div className="eyebrow-v2">Наши услуги</div>
              <h2>Оцениваем любые виды <em>имущества</em></h2>
            </div>
            <div className="services-v2__head-meta">
              <p>Шесть наиболее частых направлений — из 21 услуги, которыми занимается компания. Полный реестр — на странице «Все услуги».</p>
              <button className="link-v2" onClick={() => setPage("services")}>
                <span>Все услуги</span>
                <Arrow />
              </button>
            </div>
          </div>

          <div className="services-grid-v2 reveal-v2">
            {services.map((s, i) => (
              <button key={i} className="service-card-v2" onClick={() => setPage("application")}>
                <div className="service-card-v2__photo">
                  <img src={s.img} alt="" />
                </div>
                <div className="service-card-v2__sep" />
                <div className="service-card-v2__body">
                  <span className="service-card-v2__num">{s.num}</span>
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

      {/* ═════════════════════════════ МАНИФЕСТ ═════════════════════════════ */}
      <section className="manifesto-v2">
        <div className="wrap-v2 manifesto-v2__inner reveal-v2">
          <span className="manifesto-v2__mark">“</span>
          <p className="manifesto-v2__text">
            Мы относимся к оценке как к <strong>ремеслу</strong> — внимательно,
            неторопливо и с уважением к тому, что за каждым отчётом стоит
            решение клиента.
          </p>
          <div className="manifesto-v2__attr">— Принципы КОРЭЛ</div>
        </div>
      </section>

      {/* ═════════════════════════════ ГОСЗАКУПКИ ═════════════════════════════ */}
      <GosTenders />

      {/* ═════════════════════════════ ОТЗЫВЫ ═════════════════════════════ */}
      <section className="reviews-v2" id="reviews">
        <div className="wrap-v2">
          <div className="reviews-v2__head reveal-v2">
            <div className="eyebrow-v2" style={{ marginBottom: 24 }}>Слова клиентов</div>
            <h2>Доверие, <em>которое</em> оборачивается рекомендацией</h2>
          </div>

          <div className="reviews-v2__layout">
            <div className="review-feature reveal-v2">
              <div className="review-feature__stars">★★★★★</div>
              <p className="review-feature__text">
                Обратилась для оценки квартиры под ипотеку. Отчёт был готов уже на следующий день,
                банк принял без замечаний. Очень профессиональная команда — и человеческое отношение,
                которое сейчас редко встретишь.
              </p>
              <div className="review-feature__meta">
                <div className="review-feature__author">
                  Диана Ковалева
                  <small>Москва · Оценка квартиры</small>
                </div>
                <div className="review-feature__date">20 февраля 2026</div>
              </div>
            </div>

            <div className="review-side">
              {reviewSide.map((r, i) => (
                <div key={i} className="review-side__item reveal-v2">
                  <div className="review-side__stars">{"★".repeat(r.stars)}</div>
                  <p className="review-side__text">{r.text}</p>
                  <div className="review-side__meta"><strong>{r.author}</strong> · {r.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════ ПРОЦЕСС — Четыре такта ═════════════════════════════ */}
      <section className="process-v2" id="process">
        <div className="wrap-v2">
          <div className="process-v2__head reveal-v2">
            <h2>Четыре <em>такта</em><br />от заявки до отчёта</h2>
            <p>
              Прозрачный и предсказуемый процесс. Сроки фиксируются на первой
              встрече и не меняются. Большинство отчётов готовы уже на следующий
              рабочий день.
            </p>
          </div>

          <div className="chambers-wrap reveal-v2">
            {/* Соединяющая линия с точками-якорями */}
            <div className="chambers-rail">
              <div className="chambers-rail__line" />
              <div className="chambers-rail__dots">
                {[0, 1, 2, 3].map((i) => <span key={i} className="chambers-rail__dot" />)}
              </div>
            </div>

            <div className="chambers">
              {[
                { n: "I",   t: "Принимаем заявку",  d: "Отвечаем на звонок или форму в течение пятнадцати минут — в любой день недели, с 7:00 до 21:00.",        time: "15 минут" },
                { n: "II",  t: "Уточняем детали",   d: "Согласовываем объект, цель оценки и сроки. Сообщаем точную стоимость и перечень документов, которые потребуются.", time: "30 минут" },
                { n: "III", t: "Проводим оценку",   d: "Выезжаем к объекту или работаем дистанционно — по обстоятельствам. Каждый отчёт проходит внутренний контроль качества.", time: "1–3 дня"  },
                { n: "IV",  t: "Передаём отчёт",    d: "Официальный отчёт по ФЗ-135 и ФСО. Принимается банками, судами и государственными органами без дополнительных согласований.", time: "1 день"   },
              ].map((s, i) => (
                <div key={i} className="chamber">
                  <div className="chamber__num"><em>{s.n}</em></div>
                  <div className="chamber__rule" />
                  <h4 className="chamber__title">{s.t}</h4>
                  <p className="chamber__desc">{s.d}</p>
                  <div className="chamber__time">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                      <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    <span>{s.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Завершающая полоса с обещанием + CTA */}
          <div className="process-v2__foot reveal-v2">
            <p>
              <strong>Большинство отчётов готовы на следующий рабочий день.</strong>
              {" "}Сроки фиксируем на первой встрече — и не меняем.
            </p>
            <button className="link-v2" onClick={() => setPage("application")}>
              <span>Подать заявку</span>
              <Arrow />
            </button>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════ CTA ═════════════════════════════ */}
      <section className="cta-v2">
        <div className="wrap-v2">
          <div className="cta-v2__inner reveal-v2">
            <div className="cta-v2__lead">
              <div className="eyebrow-v2">Готовы начать?</div>
              <h2>Оставьте заявку — <em>мы перезвоним</em><br />в течение пятнадцати минут</h2>
            </div>
            <div className="cta-v2__side">
              <p>Расскажите о вашей задаче — мы подберём нужный вид оценки и озвучим точную стоимость. Принимаем заявки ежедневно, без выходных.</p>
              <button className="btn-v2 btn-v2--gold" onClick={() => setPage("application")}>
                <span>Заказать оценку</span>
                <Arrow />
              </button>
              <span className="cta-v2__note">Ответим в течение 15 минут · Ежедневно 7:00–21:00</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
