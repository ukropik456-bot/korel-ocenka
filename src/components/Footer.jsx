import Logo from "./Logo";

const Footer = ({ setPage }) => (
  <footer className="footer-v2">
    <div className="wrap-v2">
      <div className="footer-v2__top">
        <div>
          <button
            className="footer-v2__brand-logo"
            onClick={() => setPage("home")}
            aria-label="КОРЭЛ — на главную"
          >
            <Logo />
            <span className="wm">КОРЭЛ</span>
          </button>
          <p className="footer-v2__brand-tag">
            Независимая оценка имущества — работаем по всей России с 2015 года.
          </p>
        </div>

        <div>
          <h4>Навигация</h4>
          <ul>
            {[
              ["home",        "Главная"],
              ["services",    "Услуги"],
              ["application", "Заказать оценку"],
            ].map(([p, l]) => (
              <li key={p}>
                <button onClick={() => setPage(p)}>{l}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Услуги</h4>
          <ul>
            {[
              "Оценка недвижимости",
              "Оценка для ипотеки",
              "Оценка бизнеса",
              "Оценка транспорта",
              "Оценка для суда",
              "Оценка земли",
            ].map((s) => (
              <li key={s}>
                <button onClick={() => setPage("services")}>{s}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-v2__contact">
          <h4>Связь</h4>
          <b>+7 (905) 101-18-81</b>
          info@korel-ocenka.ru<br />
          Работаем по всей России
          <small>Ежедневно 7:00–21:00</small>
        </div>
      </div>

      <div className="footer-v2__bottom">
        <span>© 2026 КОРЭЛ. Все права защищены</span>
        <span className="footer-v2__docs">
          <a href="/docs/privacy-policy.pdf" target="_blank" rel="noopener noreferrer">
            Политика конфиденциальности
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden style={{ marginLeft: 6, verticalAlign: "middle" }}>
              <path d="M3 1H10V8M10 1L1 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
            </svg>
          </a>
          <a href="/docs/data-processing.pdf" target="_blank" rel="noopener noreferrer">
            Обработка персональных данных
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden style={{ marginLeft: 6, verticalAlign: "middle" }}>
              <path d="M3 1H10V8M10 1L1 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
            </svg>
          </a>
        </span>
        <span>СРО: АО «Российское общество оценщиков»</span>
      </div>
    </div>
  </footer>
);

export default Footer;
