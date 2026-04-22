import Logo from "./Logo";

const Footer = ({ setPage }) => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.2rem" }}>
            <Logo fill="#C6A43F" />
            <div style={{ borderLeft: "1px solid rgba(196,162,44,.3)", paddingLeft: 12 }}>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 16, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--cream)" }}>
                КОРЭЛ
              </div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 15, letterSpacing: ".18em", color: "var(--gold)", marginTop: 2 }}>
                Независимая оценка
              </div>
            </div>
          </div>
          <p style={{ fontSize: 16, fontWeight: 300, color: "rgba(245,240,230,.5)", lineHeight: 1.8, maxWidth: 280 }}>
            Профессиональная независимая оценка имущества и активов для физических и юридических лиц. Более 10 лет опыта.
          </p>
        </div>

        <div>
          <div className="footer-title">Навигация</div>
          {[["home", "Главная"], ["services", "Услуги"], ["application", "Заказать оценку"]].map(([p, l]) => (
            <button key={p} className="footer-link" onClick={() => setPage(p)}>{l}</button>
          ))}
        </div>

        <div>
          <div className="footer-title">Услуги</div>
          {["Оценка недвижимости", "Оценка для ипотеки", "Оценка бизнеса", "Оценка транспорта", "Оценка ущерба", "Оценка имущества"].map(s => (
            <button key={s} className="footer-link" onClick={() => setPage("services")}>{s}</button>
          ))}
        </div>

        <div>
          <div className="footer-title">Контакты</div>
          <div style={{ fontSize: 16, fontWeight: 300, color: "rgba(245,240,230,.55)", lineHeight: 2 }}>
            <div style={{ color: "var(--gold)", fontWeight: 500, fontSize: 18, marginBottom: 4 }}>+7 (xxx) xxx-xx-xx</div>
            <div>Ежедневно 7:00 — 21:00</div>
            <div>Брянск и БО</div>
            <div style={{ marginTop: 12 }}>info@korel-ocenka.ru</div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">© 2024 Оценка КОРЭЛ. Все права защищены.</div>
        <div className="footer-copy">СРО: АО «Российское общество оценщиков»</div>
      </div>
    </div>
  </footer>
);

export default Footer;
