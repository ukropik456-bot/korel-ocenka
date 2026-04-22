const Page404 = ({ setPage }) => (
  <div className="page-404">
    <div className="page-404-bg" />
    <div style={{ position: "relative", zIndex: 1 }}>
      <div className="num-404">404</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, marginBottom: ".75rem" }}>
        Страница не найдена
      </div>
      <p style={{ fontSize: 18, fontWeight: 300, color: "rgba(245,240,230,.55)", maxWidth: 420, lineHeight: 1.8, marginBottom: "2.5rem" }}>
        Запрошенная страница не существует или была перемещена. Воспользуйтесь навигацией или вернитесь на главную.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={() => setPage("home")}>
          На главную
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
        <button className="btn-outline" onClick={() => setPage("services")}>Все услуги</button>
      </div>
      <div style={{ marginTop: 60, padding: "24px 32px", border: "1px solid rgba(196,162,44,.15)", background: "rgba(58,24,51,.2)", maxWidth: 320, margin: "60px auto 0" }}>
        <div style={{ fontSize: 15, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(245,240,230,.4)", marginBottom: 8 }}>
          Или свяжитесь с нами
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 300, color: "var(--gold)" }}>
          +7 (xxx) xxx-xx-xx
        </div>
      </div>
    </div>
  </div>
);

export default Page404;
