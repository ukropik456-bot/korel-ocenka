import { useEffect, useRef, useState } from "react";

const ApplicationPage = () => {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: "", comment: "",
    agreePrivacy: false, agreeData: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Введите имя";
    if (!form.phone.trim() || form.phone.length < 10) e.phone = "Введите корректный номер";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Введите корректный email";
    if (!form.service) e.service = "Выберите услугу";
    if (!form.agreePrivacy) e.agreePrivacy = "Необходимо согласие";
    if (!form.agreeData)    e.agreeData    = "Необходимо согласие";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Ошибка при отправке. Пожалуйста, попробуйте ещё раз.");
      }
    } catch {
      alert("Нет соединения с сервером. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const services = [
    "Оценка квартиры для ипотеки", "Оценка коммерческой недвижимости", "Оценка дома / коттеджа",
    "Оценка земельного участка", "Оценка транспортного средства", "Оценка бизнеса",
    "Оценка ущерба", "Оценка при изъятии", "Оценка при сносе жилья", "Другое",
  ];

  const benefits = [
    { icon: "⚡", title: "Быстро",            text: "Готовый отчёт уже на следующий день после получения документов" },
    { icon: "⚖", title: "Официально",         text: "Отчёты соответствуют ФЗ-135 и принимаются банками, судами и налоговой" },
    { icon: "☎", title: "Поддержка",          text: "Специалист на связи 7 дней в неделю с 7:00 до 21:00" },
    { icon: "❖", title: "Прозрачные цены",   text: "Стоимость оговаривается до начала работы — никаких скрытых платежей" },
  ];

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
  }, [submitted]);

  const Arrow = (props) => (
    <svg className="arrow" width="14" height="9" viewBox="0 0 14 9" fill="none" {...props}>
      <path d="M9 1L13 4.5M13 4.5L9 8M13 4.5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );

  return (
    <div className="page-v2" ref={rootRef}>

      {/* ── HERO ── */}
      <section className="page-hero-v2">
        <div className="wrap-v2 page-hero-v2__inner">
          <div className="reveal-v2">
            <div className="eyebrow-v2 page-hero-v2__eyebrow">Шаг 1 из 1</div>
            <h1>Заявка<br />на <em>оценку</em></h1>
            <p className="page-hero-v2__sub">
              Заполните форму — специалист свяжется с вами в течение 15 минут для уточнения деталей
              и стоимости. Принимаем заявки ежедневно, без выходных.
            </p>
          </div>
        </div>
      </section>

      {/* ── ФОРМА / УСПЕХ ── */}
      <section className="form-section-v2">
        <div className="wrap-v2">
          {submitted ? (
            <div className="success-v2 reveal-v2">
              <div className="success-v2__icon">✓</div>
              <h2>Заявка принята</h2>
              <p>
                Спасибо, <strong>{form.name}</strong>. Наш специалист свяжется с вами
                по номеру <strong>{form.phone}</strong> в течение 15 минут.
              </p>
              <button
                className="btn-v2 btn-v2--ghost"
                onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", service: "", comment: "", agreePrivacy: false, agreeData: false }); }}
              >
                <span>Подать ещё заявку</span>
                <Arrow />
              </button>
            </div>
          ) : (
            <div className="form-grid-v2">
              {/* Левая колонка — форма */}
              <div className="form-block-v2 reveal-v2">
                <h2>Контактные данные</h2>
                <p className="form-block-v2__sub">Все поля, кроме email и комментария, обязательны</p>

                <div className="form-fields-v2">
                  <div className="form-field-v2">
                    <label>Ваше имя *</label>
                    <input placeholder="Иван Иванов" value={form.name}
                      onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: null }); }} />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className="form-field-v2">
                    <label>Телефон *</label>
                    <input placeholder="+7 (___) ___-__-__" value={form.phone}
                      onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: null }); }} />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>

                  <div className="form-field-v2">
                    <label>Email</label>
                    <input placeholder="email@example.com" value={form.email}
                      onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: null }); }} />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  <div className="form-field-v2">
                    <label>Вид оценки *</label>
                    <select value={form.service}
                      onChange={e => { setForm({ ...form, service: e.target.value }); setErrors({ ...errors, service: null }); }}>
                      <option value="">Выберите услугу...</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service && <span className="form-error">{errors.service}</span>}
                  </div>

                  <div className="form-field-v2 full">
                    <label>Комментарий</label>
                    <textarea placeholder="Опишите объект, цель оценки, пожелания по срокам..."
                      value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} />
                  </div>
                </div>

                <div className="form-consents-v2">
                  <label className={`form-checkbox-v2${errors.agreePrivacy ? " has-error" : ""}`}>
                    <input
                      type="checkbox"
                      checked={form.agreePrivacy}
                      onChange={e => { setForm({ ...form, agreePrivacy: e.target.checked }); setErrors({ ...errors, agreePrivacy: null }); }}
                    />
                    <span className="form-checkbox-v2__box" aria-hidden>
                      <svg viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                      </svg>
                    </span>
                    <span className="form-checkbox-v2__text">
                      Я принимаю{" "}
                      <a href="/docs/privacy-policy.pdf" target="_blank" rel="noopener noreferrer">политику конфиденциальности</a>
                      {" "}*
                    </span>
                  </label>

                  <label className={`form-checkbox-v2${errors.agreeData ? " has-error" : ""}`}>
                    <input
                      type="checkbox"
                      checked={form.agreeData}
                      onChange={e => { setForm({ ...form, agreeData: e.target.checked }); setErrors({ ...errors, agreeData: null }); }}
                    />
                    <span className="form-checkbox-v2__box" aria-hidden>
                      <svg viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                      </svg>
                    </span>
                    <span className="form-checkbox-v2__text">
                      Согласен на{" "}
                      <a href="/docs/data-processing.pdf" target="_blank" rel="noopener noreferrer">обработку персональных данных</a>
                      {" "}*
                    </span>
                  </label>
                </div>

                <div className="form-submit-row">
                  <button className="btn-v2 btn-v2--gold" onClick={handleSubmit} disabled={loading}>
                    <span>{loading ? "Отправляем..." : "Отправить заявку"}</span>
                    {!loading && <Arrow />}
                  </button>
                  {(errors.agreePrivacy || errors.agreeData) && (
                    <p style={{ color: "#C97070" }}>Подтвердите согласие с документами выше</p>
                  )}
                </div>
              </div>

              {/* Правая колонка — преимущества и контакт */}
              <aside className="form-aside-v2 reveal-v2">
                <h3>Почему выбирают КОРЭЛ</h3>
                {benefits.map((b, i) => (
                  <div key={i} className="benefit-v2">
                    <div className="benefit-v2__icon">{b.icon}</div>
                    <div>
                      <div className="benefit-v2__title">{b.title}</div>
                      <div className="benefit-v2__text">{b.text}</div>
                    </div>
                  </div>
                ))}

                <div className="form-aside-v2__phone-block">
                  <div className="form-aside-v2__phone-label">Или позвоните напрямую</div>
                  <a className="form-aside-v2__phone" href="tel:+79051011881" style={{ textDecoration: "none" }}>
                    +7 (905) 101-18-81
                  </a>
                  <div className="form-aside-v2__hours">Ежедневно 7:00 – 21:00</div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default ApplicationPage;
