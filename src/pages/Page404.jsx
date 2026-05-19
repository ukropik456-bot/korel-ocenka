const Page404 = ({ setPage }) => (
  <div className="page-v2">
    <div className="page-404-v2">
      <div className="page-404-v2__inner">
        <div className="num-404-v2">404</div>
        <h1>Страница не найдена</h1>
        <p>
          Запрошенная страница не существует или была перемещена.
          Воспользуйтесь навигацией или вернитесь на главную.
        </p>

        <div className="page-404-v2__actions">
          <button className="btn-v2 btn-v2--gold" onClick={() => setPage("home")}>
            <span>На главную</span>
            <svg className="arrow" width="14" height="9" viewBox="0 0 14 9" fill="none">
              <path d="M9 1L13 4.5M13 4.5L9 8M13 4.5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </button>
          <button className="btn-v2 btn-v2--ghost" onClick={() => setPage("services")}>
            <span>Все услуги</span>
            <svg className="arrow" width="14" height="9" viewBox="0 0 14 9" fill="none">
              <path d="M9 1L13 4.5M13 4.5L9 8M13 4.5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </button>
        </div>

        <div className="page-404-v2__contact">
          <div className="page-404-v2__contact-label">Или свяжитесь с нами</div>
          <a className="page-404-v2__contact-phone" href="tel:+79051011881" style={{ textDecoration: "none" }}>
            +7 (905) 101-18-81
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Page404;
