import { useState, useEffect } from "react";
import Logo from "./Logo";

const Header = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Закрывать меню при смене страницы
  const navigate = (p) => {
    setPage(p);
    setMenuOpen(false);
  };

  // Блокировать скролл пока меню открыто
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [["home", "Главная"], ["services", "Услуги"], ["application", "Заказать оценку"]];

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        {/* Логотип */}
        <button
          onClick={() => navigate("home")}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
        >
          <Logo />
          <div className="header-logo-text" style={{ borderLeft: "1px solid rgba(245,240,230,.2)", paddingLeft: 14 }}>
            <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 17, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--cream)" }}>
              КОРЭЛ
            </div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 15, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(245,240,230,.45)", marginTop: 2 }}>
              Независимая оценка
            </div>
          </div>
        </button>

        {/* Десктопная навигация */}
        <nav className="header-nav-desktop" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {navItems.slice(0, 2).map(([p, l]) => (
            <button key={p} className={`nav-link${page === p ? " active" : ""}`} onClick={() => navigate(p)}>
              {l}
            </button>
          ))}
        </nav>

        {/* Десктопная кнопка */}
        <button className="btn-primary header-cta-desktop" onClick={() => navigate("application")}>
          Заказать оценку
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Бургер (мобильный) */}
        <button
          className="burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <span className={`burger-line${menuOpen ? " open" : ""}`} />
          <span className={`burger-line${menuOpen ? " open" : ""}`} />
          <span className={`burger-line${menuOpen ? " open" : ""}`} />
        </button>
      </header>

      {/* Мобильное меню */}
      <div className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}>
        <nav className="mobile-menu-nav">
          {navItems.map(([p, l]) => (
            <button
              key={p}
              className={`mobile-nav-link${page === p ? " active" : ""}`}
              onClick={() => navigate(p)}
            >
              {l}
            </button>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <a href="tel:+79051011881" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: "var(--gold)", textDecoration: "none" }}>
            +7 (905) 101-18-81
          </a>
          <div style={{ fontSize: 14, color: "rgba(245,240,230,.4)", marginTop: 6 }}>Ежедневно 7:00 – 21:00</div>
        </div>
      </div>

      {/* Затемнение фона */}
      {menuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
