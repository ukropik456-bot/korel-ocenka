import { useState, useEffect } from "react";
import Logo from "./Logo";

const Header = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <button
        onClick={() => setPage("home")}
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
      >
        <Logo />
        <div style={{ borderLeft: "1px solid rgba(245,240,230,.2)", paddingLeft: 14 }}>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 17, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--cream)" }}>
            КОРЭЛ
          </div>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 15, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(245,240,230,.45)", marginTop: 2 }}>
            Независимая оценка
          </div>
        </div>
      </button>

      <nav style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {[["home", "Главная"], ["services", "Услуги"], ["application", "Контакты"]].map(([p, l]) => (
          <button key={p} className={`nav-link${page === p ? " active" : ""}`} onClick={() => setPage(p)}>
            {l}
          </button>
        ))}
      </nav>

      <button className="btn-primary" onClick={() => setPage("application")}>
        Заказать оценку
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </header>
  );
};

export default Header;
