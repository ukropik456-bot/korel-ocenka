import { useState } from "react";

const ApplicationPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Введите имя";
    if (!form.phone.trim() || form.phone.length < 10) e.phone = "Введите корректный номер";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Введите корректный email";
    if (!form.service) e.service = "Выберите услугу";
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

  return (
    <div className="app-page">
      <div className="app-banner">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="section-tag" style={{ marginBottom: 12 }}>Шаг 1 из 1</div>
          <h1 className="display" style={{ fontSize: "clamp(46px,5.5vw,76px)", fontWeight: 300, lineHeight: 1.1, marginBottom: "1rem" }}>
            Заявка на оценку
          </h1>
          <p style={{ fontSize: 18, fontWeight: 300, color: "rgba(245,240,230,.7)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Заполните форму — наш специалист свяжется с вами в течение 15 минут для уточнения деталей и стоимости
          </p>
        </div>
      </div>

      <div className="app-form-section">
        {submitted ? (
          <div className="success-state" style={{ maxWidth: 560, margin: "0 auto" }}>
            <div className="success-icon">✓</div>
            <h2 className="display" style={{ fontSize: 46, fontWeight: 300, marginBottom: ".75rem" }}>Заявка принята!</h2>
            <p style={{ fontSize: 18, fontWeight: 300, color: "rgba(245,240,230,.7)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Спасибо, {form.name}! Наш специалист свяжется с вами по номеру{" "}
              <strong style={{ color: "var(--gold)" }}>{form.phone}</strong> в течение 15 минут.
            </p>
            <button className="btn-outline" onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", service: "", comment: "" }); }}>
              Подать ещё заявку
            </button>
          </div>
        ) : (
          <div className="app-form-inner" style={{ maxWidth: 900, margin: "0 auto" }}>
            <div>
              <div style={{ marginBottom: 36 }}>
                <span className="gold-line" />
                <h2 className="display" style={{ fontSize: 40, fontWeight: 300, marginBottom: ".5rem" }}>
                  Ваши контактные данные
                </h2>
                <p style={{ fontSize: 17, fontWeight: 300, color: "rgba(245,240,230,.55)" }}>
                  Все поля, кроме email и комментария, обязательны
                </p>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Ваше имя *</label>
                  <input className="form-input" placeholder="Иван Иванов" value={form.name}
                    onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: null }); }} />
                  {errors.name && <span style={{ fontSize: 15, color: "#e57373" }}>{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Телефон *</label>
                  <input className="form-input" placeholder="+7 (___) ___-__-__" value={form.phone}
                    onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: null }); }} />
                  {errors.phone && <span style={{ fontSize: 15, color: "#e57373" }}>{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" placeholder="email@example.com" value={form.email}
                    onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: null }); }} />
                  {errors.email && <span style={{ fontSize: 15, color: "#e57373" }}>{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Вид оценки *</label>
                  <select className="form-input" value={form.service}
                    onChange={e => { setForm({ ...form, service: e.target.value }); setErrors({ ...errors, service: null }); }}>
                    <option value="">Выберите услугу...</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <span style={{ fontSize: 15, color: "#e57373" }}>{errors.service}</span>}
                </div>
                <div className="form-group full">
                  <label className="form-label">Комментарий</label>
                  <textarea className="form-input" placeholder="Опишите объект, цель оценки, пожелания по срокам..."
                    value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} />
                </div>
              </div>
              <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <button className="btn-primary" style={{ fontSize: 15, padding: "17px 44px" }} onClick={handleSubmit} disabled={loading}>
                  {loading ? "Отправляем..." : "Отправить заявку"}
                  {!loading && <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                </button>
                <p style={{ fontSize: 15, color: "rgba(245,240,230,.35)", letterSpacing: ".02em", maxWidth: 300 }}>
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </div>
            </div>

            <div>
              <div style={{ background: "rgba(58,24,51,.3)", border: "1px solid rgba(196,162,44,.15)", padding: "36px 28px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 25, fontWeight: 400, marginBottom: "1.5rem" }}>
                  Почему выбирают КОРЭЛ
                </div>
                <div className="app-benefits">
                  {[
                    { icon: "⚡", title: "Быстро", text: "Готовый отчёт уже на следующий день после получения документов" },
                    { icon: "🏛", title: "Официально", text: "Отчёты соответствуют ФЗ-135 и принимаются банками, судами, налоговой" },
                    { icon: "📞", title: "Поддержка", text: "Специалист на связи 7 дней в неделю с 7:00 до 21:00" },
                    { icon: "💰", title: "Прозрачные цены", text: "Стоимость оговаривается до начала работы — никаких скрытых платежей" },
                  ].map((b, i) => (
                    <div key={i} className="app-benefit">
                      <div className="app-benefit-icon">{b.icon}</div>
                      <div>
                        <div className="app-benefit-title">{b.title}</div>
                        <div className="app-benefit-text">{b.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(245,240,230,.1)" }}>
                  <div style={{ fontSize: 15, color: "rgba(245,240,230,.4)", marginBottom: 8, letterSpacing: ".08em", textTransform: "uppercase" }}>
                    Или позвоните напрямую
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 300, color: "var(--gold)" }}>
                    +7 (905) 101-18-81
                  </div>
                  <div style={{ fontSize: 15, color: "rgba(245,240,230,.4)", marginTop: 4 }}>Ежедневно 7:00 – 21:00</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationPage;
