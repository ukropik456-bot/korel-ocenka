import { useState, useEffect, useRef } from "react";

/* ── GLOBAL STYLES ───────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

    :root {
      --ink:    #1A0D14;
      --plum:   #3A1833;
      --plum2:  #4E2348;
      --cream:  #F5F0E6;
      --cream2: #EDE8DC;
      --cream3: #E3DDD0;
      --gold:   #A8841A;
      --gold2:  #C4A22C;
      --muted:  rgba(26,13,20,.75);
      --subtle: rgba(26,13,20,.60);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Jost', sans-serif;
      background: var(--cream);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
    }

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--cream2); }
    ::-webkit-scrollbar-thumb { background: var(--gold2); border-radius: 3px; }

    /* ── TYPOGRAPHY ── */
    .display { font-family: 'Cormorant Garamond', serif; }

    /* ── GOLD LINE ── */
    .gold-line { display:block; width:48px; height:2px; background:var(--gold2); margin-bottom:1.5rem; }

    /* ── BUTTONS ── */
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 15px 36px;
      background: var(--plum);
      color: var(--cream);
      font-family: 'Jost', sans-serif;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: .08em;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      transition: all .3s ease;
      clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
    }
    .btn-primary:hover {
      background: var(--plum2);
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(58,24,51,.25);
    }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 34px;
      background: transparent;
      color: var(--plum);
      font-family: 'Jost', sans-serif;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: .08em;
      text-transform: uppercase;
      border: 1px solid rgba(58,24,51,.35);
      cursor: pointer;
      transition: all .3s ease;
    }
    .btn-outline:hover {
      border-color: var(--plum);
      background: rgba(58,24,51,.06);
      transform: translateY(-2px);
    }

    .btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 0;
      background: transparent;
      color: var(--gold);
      font-family: 'Jost', sans-serif;
      font-weight: 500;
      font-size: 13px;
      letter-spacing: .1em;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      transition: all .25s;
    }
    .btn-ghost:hover { gap: 14px; opacity: .75; }

    /* ── HEADER ── */
    .site-header {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 60px;
      height: 76px;
      background: rgba(245,240,230,.97);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(58,24,51,.12);
      box-shadow: 0 2px 24px rgba(26,13,20,.06);
      transition: all .4s ease;
    }
    .nav-link {
      font-family: 'Jost', sans-serif;
      font-weight: 400;
      font-size: 13px;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: rgba(26,13,20,.80);
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px 0;
      position: relative;
      transition: color .25s;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0; right: 100%;
      height: 1px;
      background: var(--plum);
      transition: right .3s ease;
    }
    .nav-link:hover { color: var(--ink); }
    .nav-link:hover::after { right: 0; }
    .nav-link.active { color: var(--plum); }
    .nav-link.active::after { right: 0; }

    /* ── HERO ── */
    .hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      position: relative;
      overflow: hidden;
    }
    .hero-left {
      padding: 160px 60px 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      z-index: 2;
      background: var(--cream);
    }
    .hero-right {
      position: relative;
      background: var(--plum);
      overflow: hidden;
    }
    .hero-right::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 80% 80% at 70% 40%, rgba(196,162,44,.12) 0%, transparent 70%),
        linear-gradient(135deg, rgba(58,24,51,.8) 0%, transparent 60%);
    }
    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 11px;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 2rem;
    }
    .hero-tag span {
      width: 32px; height: 1px;
      background: var(--gold2);
    }
    .hero-h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(52px, 6vw, 80px);
      font-weight: 300;
      line-height: 1.05;
      letter-spacing: -.01em;
      margin-bottom: 1.5rem;
      color: var(--ink);
    }
    .hero-h1 em {
      font-style: italic;
      color: var(--plum);
    }
    .hero-sub {
      font-size: 15px;
      font-weight: 300;
      line-height: 1.8;
      color: rgba(26,13,20,.82);
      max-width: 480px;
      margin-bottom: 2.5rem;
    }
    .hero-ctas {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .hero-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      margin-top: 5rem;
      padding-top: 2.5rem;
      border-top: 1px solid rgba(26,13,20,.10);
    }
    .hero-stat { padding: 0; }
    .hero-stat + .hero-stat {
      padding-left: 2rem;
      border-left: 1px solid rgba(26,13,20,.10);
    }
    .hero-stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 42px;
      font-weight: 300;
      color: var(--plum);
      line-height: 1;
    }
    .hero-stat-label {
      font-size: 12px;
      letter-spacing: .06em;
      color: rgba(26,13,20,.72);
      margin-top: 4px;
      text-transform: uppercase;
    }

    /* Hero right — stays dark, unchanged */
    .hero-deco-text {
      position: absolute;
      right: -20px;
      top: 50%;
      transform: translateY(-50%) rotate(90deg);
      font-family: 'Cormorant Garamond', serif;
      font-size: 120px;
      font-weight: 700;
      letter-spacing: -.05em;
      color: rgba(196,162,44,.06);
      white-space: nowrap;
      pointer-events: none;
      user-select: none;
    }
    .hero-badge {
      position: absolute;
      bottom: 80px;
      right: 60px;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 1px solid rgba(196,162,44,.4);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 4px;
    }
    .hero-badge-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 40px;
      font-weight: 300;
      color: var(--gold2);
      line-height: 1;
    }
    .hero-badge-label {
      font-size: 10px;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: rgba(245,240,230,.55);
      max-width: 80px;
      line-height: 1.4;
    }

    /* ── SECTIONS ── */
    .section { padding: 100px 60px; }
    .section-inner { max-width: 1200px; margin: 0 auto; }
    .section-tag {
      font-size: 11px;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 1rem;
    }
    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(36px, 4vw, 56px);
      font-weight: 300;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: var(--ink);
    }
    .section-sub {
      font-size: 15px;
      font-weight: 300;
      color: rgba(26,13,20,.80);
      line-height: 1.8;
      max-width: 540px;
    }
    .section-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 60px;
      gap: 30px;
      flex-wrap: wrap;
    }

    /* ── SERVICES GRID ── */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2px;
      background: var(--cream3);
    }
    .service-card {
      background: var(--cream);
      border: none;
      padding: 40px 36px;
      cursor: pointer;
      transition: all .35s ease;
      position: relative;
      overflow: hidden;
    }
    .service-card::before {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 0; height: 2px;
      background: var(--plum);
      transition: width .4s ease;
    }
    .service-card:hover {
      background: var(--plum);
      transform: translateY(-4px);
      box-shadow: 0 12px 36px rgba(58,24,51,.18);
    }
    .service-card:hover .service-name,
    .service-card:hover .service-desc,
    .service-card:hover .service-price { color: var(--cream); }
    .service-card:hover .service-icon { border-color: rgba(245,240,230,.25); color: var(--gold2); }
    .service-card:hover::before { width: 100%; }
    .service-icon {
      width: 44px;
      height: 44px;
      border: 1px solid rgba(58,24,51,.20);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      color: var(--plum);
      font-size: 20px;
      transition: border-color .35s, color .35s;
    }
    .service-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px;
      font-weight: 500;
      margin-bottom: .75rem;
      line-height: 1.3;
      color: var(--ink);
      transition: color .35s;
    }
    .service-desc {
      font-size: 13px;
      font-weight: 300;
      color: rgba(26,13,20,.80);
      line-height: 1.7;
      margin-bottom: 1.5rem;
      transition: color .35s;
    }
    .service-price {
      font-size: 13px;
      color: var(--gold);
      letter-spacing: .05em;
      font-weight: 500;
      transition: color .35s;
    }

    /* ── STEPS ── */
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0;
      position: relative;
    }
    .steps-grid::before {
      content: '';
      position: absolute;
      top: 28px;
      left: calc(12.5% + 20px);
      right: calc(12.5% + 20px);
      height: 1px;
      background: linear-gradient(90deg, var(--plum) 0%, rgba(58,24,51,.15) 100%);
    }
    .step { padding: 0 24px; text-align: center; }
    .step-num {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--cream);
      border: 1px solid rgba(58,24,51,.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px;
      font-weight: 300;
      color: var(--plum);
      margin: 0 auto 1.5rem;
      position: relative;
      z-index: 1;
    }
    .step-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      font-weight: 500;
      margin-bottom: .75rem;
      color: var(--ink);
    }
    .step-desc {
      font-size: 13px;
      font-weight: 300;
      color: rgba(26,13,20,.80);
      line-height: 1.7;
    }

    /* ── REVIEWS ── */
    .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--cream3); }
    .review-card {
      background: var(--cream);
      padding: 36px 32px;
      transition: background .3s;
    }
    .review-card:hover { background: var(--cream2); }
    .review-stars { color: var(--gold2); font-size: 14px; margin-bottom: 1rem; letter-spacing: 3px; }
    .review-text {
      font-size: 14px;
      font-weight: 300;
      line-height: 1.8;
      color: rgba(26,13,20,.85);
      margin-bottom: 1.5rem;
      font-style: italic;
    }
    .review-author { font-size: 13px; font-weight: 500; letter-spacing: .05em; color: var(--ink); }
    .review-date { font-size: 11px; color: rgba(26,13,20,.65); margin-top: 4px; letter-spacing: .08em; }

    /* ── CTA BANNER — stays dark ── */
    .cta-banner {
      background: linear-gradient(135deg, var(--plum) 0%, #5B2255 100%);
      padding: 80px 60px;
      position: relative;
      overflow: hidden;
    }
    .cta-banner::before {
      content: '';
      position: absolute;
      right: -100px; top: -100px;
      width: 500px; height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(196,162,44,.15) 0%, transparent 70%);
      pointer-events: none;
    }
    .cta-banner-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
    }

    /* ── FOOTER — stays dark ── */
    .footer {
      background: #1A0D14;
      padding: 60px 60px 40px;
      border-top: 1px solid rgba(196,162,44,.15);
    }
    .footer-inner { max-width: 1200px; margin: 0 auto; }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 60px;
      margin-bottom: 50px;
    }
    .footer-title {
      font-size: 11px;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: var(--gold2);
      margin-bottom: 1.2rem;
    }
    .footer-link {
      display: block;
      font-size: 13px;
      font-weight: 300;
      color: rgba(245,240,230,.50);
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      padding: 4px 0;
      letter-spacing: .02em;
      transition: color .2s;
    }
    .footer-link:hover { color: var(--gold2); }
    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 30px;
      border-top: 1px solid rgba(245,240,230,.08);
    }
    .footer-copy { font-size: 12px; color: rgba(245,240,230,.28); letter-spacing: .04em; }

    /* ── FORM ── */
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .form-group { display: flex; flex-direction: column; gap: 8px; }
    .form-group.full { grid-column: span 2; }
    .form-label {
      font-size: 11px;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: var(--gold);
    }
    .form-input {
      background: var(--cream);
      border: 1px solid rgba(58,24,51,.18);
      padding: 14px 18px;
      color: var(--ink);
      font-family: 'Jost', sans-serif;
      font-size: 14px;
      font-weight: 300;
      outline: none;
      transition: border-color .25s, box-shadow .25s;
      width: 100%;
      appearance: none;
    }
    .form-input:focus {
      border-color: var(--plum);
      box-shadow: 0 0 0 3px rgba(58,24,51,.08);
    }
    .form-input::placeholder { color: rgba(26,13,20,.30); }
    .form-input option { background: var(--cream); color: var(--ink); }
    textarea.form-input { resize: vertical; min-height: 120px; }

    /* ── PAGE: APPLICATION ── */
    .app-page {
      min-height: 100vh;
      padding-top: 76px;
      background: var(--cream);
    }
    .app-banner {
      background: linear-gradient(135deg, var(--plum) 0%, #4E1E48 100%);
      padding: 80px 60px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .app-banner::before {
      content: 'ОЦЕНКА';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      font-family: 'Cormorant Garamond', serif;
      font-size: 200px;
      font-weight: 700;
      color: rgba(196,162,44,.05);
      white-space: nowrap;
      pointer-events: none;
    }
    .app-form-section { padding: 80px 60px; background: var(--cream); }
    .app-form-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1fr 380px; gap: 60px; align-items: start; }
    .app-benefits { display: flex; flex-direction: column; gap: 20px; }
    .app-benefit { display: flex; gap: 16px; align-items: flex-start; }
    .app-benefit-icon {
      width: 40px; height: 40px; flex-shrink: 0;
      border: 1px solid rgba(58,24,51,.20);
      display: flex; align-items: center; justify-content: center;
      color: var(--plum);
    }
    .app-benefit-text { font-size: 14px; font-weight: 300; color: rgba(26,13,20,.82); line-height: 1.7; }
    .app-benefit-title { font-weight: 500; color: var(--ink); margin-bottom: 3px; font-size: 15px; }

    /* ── SUCCESS ── */
    .success-state { text-align: center; padding: 60px 40px; }
    .success-icon {
      width: 80px; height: 80px;
      border: 2px solid var(--plum);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 2rem;
      color: var(--plum);
      font-size: 32px;
    }

    /* ── PAGE: SERVICES — hero stays dark ── */
    .services-page { padding-top: 76px; background: var(--cream); }
    .services-hero {
      background: var(--plum);
      padding: 80px 60px 60px;
      position: relative;
      overflow: hidden;
    }
    .services-hero::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(196,162,44,.5), transparent);
    }
    .services-all-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1px;
      background: var(--cream3);
    }
    .service-card-full {
      background: var(--cream);
      padding: 40px 36px;
      border-bottom: 2px solid transparent;
      transition: all .3s;
    }
    .service-card-full:hover {
      background: var(--cream2);
      border-bottom-color: var(--plum);
    }
    .service-price-tag {
      display: inline-block;
      padding: 4px 12px;
      background: rgba(58,24,51,.07);
      border: 1px solid rgba(58,24,51,.18);
      color: var(--plum);
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 1rem;
      letter-spacing: .03em;
    }

    /* ── 404 ── */
    .page-404 {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px;
      position: relative;
      overflow: hidden;
      background: var(--cream);
    }
    .page-404-bg {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at center, rgba(58,24,51,.06) 0%, transparent 70%);
      pointer-events: none;
    }
    .num-404 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(120px, 20vw, 240px);
      font-weight: 300;
      line-height: 1;
      color: transparent;
      -webkit-text-stroke: 1px rgba(58,24,51,.25);
      letter-spacing: -.04em;
      user-select: none;
      margin-bottom: -20px;
    }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

    .anim-fade-up { animation: fadeUp .7s ease forwards; }
    .anim-fade-up-d1 { animation: fadeUp .7s .1s ease both; }
    .anim-fade-up-d2 { animation: fadeUp .7s .2s ease both; }
    .anim-fade-up-d3 { animation: fadeUp .7s .3s ease both; }
    .anim-fade-up-d4 { animation: fadeUp .7s .4s ease both; }
    .anim-fade-in { animation: fadeIn .6s ease forwards; }

    /* ── RESPONSIVE ── */
    @media (max-width: 900px) {
      .site-header { padding: 0 24px; }
      .hero { grid-template-columns: 1fr; }
      .hero-right { display: none; }
      .hero-left { padding: 120px 24px 80px; }
      .section { padding: 70px 24px; }
      .services-grid, .services-all-grid, .reviews-grid, .steps-grid {
        grid-template-columns: 1fr;
      }
      .steps-grid::before { display: none; }
      .footer-grid { grid-template-columns: 1fr 1fr; gap: 30px; }
      .app-form-inner { grid-template-columns: 1fr; }
      .form-grid { grid-template-columns: 1fr; }
      .form-group.full { grid-column: span 1; }
      .cta-banner-inner { flex-direction: column; }
      .cta-banner, .app-form-section { padding: 60px 24px; }
      .app-banner { padding: 60px 24px; }
      .services-hero { padding: 60px 24px 50px; }
    }
  `}</style>
);

/* ── LOGO SVG ──────────────────────────────────────────────────── */
const Logo = ({ fill = "#1A0D14", goldFill = "#A8841A" }) => (
  <svg width="72" height="41" viewBox="0 0 81 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.9816 40.7481C17.4275 40.3438 14.3475 39.1501 11.7419 37.1666C9.17876 35.1484 7.29135 32.6188 6.0797 29.577C4.9105 26.5009 4.51442 23.2577 4.8914 19.8472C5.33265 15.8554 6.70329 12.5579 9.00329 9.95465C11.3076 7.31267 14.0868 5.45064 17.3409 4.36857C20.6332 3.29087 23.9035 2.93663 27.152 3.3059C30.7826 3.71861 33.8774 4.95335 36.4362 7.01014C38.9994 9.02814 40.8506 11.5343 41.9903 14.5285C43.1678 17.5271 43.5812 20.6153 43.2298 23.7932C42.8401 27.32 41.5652 30.4518 39.4051 33.1886C37.245 35.9256 34.523 37.9706 31.239 39.3241C27.9932 40.6817 24.574 41.1563 20.9816 40.7481ZM23.1294 39.6972C25.5753 39.9752 27.8434 39.5855 29.9339 38.5281C32.0243 37.4708 33.7586 35.7843 35.137 33.4688C36.5575 31.1187 37.4565 28.2385 37.8334 24.828C38.2318 21.2237 37.9567 17.9354 37.0083 14.9629C36.0982 11.9947 34.5652 9.58364 32.4096 7.72968C30.2922 5.88006 27.7048 4.78147 24.6474 4.43391C20.6729 3.9821 17.4252 5.00603 14.9044 7.5057C12.388 9.96661 10.8641 13.5999 10.3329 18.4056C9.92597 22.0873 10.1881 25.492 11.1194 28.6195C12.0507 31.747 13.5496 34.2916 15.6159 36.2531C17.7204 38.2191 20.2249 39.3671 23.1294 39.6972Z" fill={fill}/>
    <path d="M56.9406 16.8884C57.147 17.2203 57.3764 17.5435 57.6281 17.8565L57.087 18.3993L65.4663 29.4802C68.1583 33.1459 70.2155 35.7397 71.6383 37.2606C73.0611 38.7423 74.1574 39.6393 74.9263 39.9513C75.7339 40.2632 76.8494 40.4194 78.2722 40.4194C78.3875 40.4194 78.4453 40.5363 78.4453 40.7702C78.4453 41.0041 78.3875 41.1213 78.2722 41.1213H71.8114L70.0235 41.1797C69.4849 41.1797 69.062 41.1016 68.7543 40.9458C68.4851 40.7896 68.1579 40.4971 67.7737 40.0682C67.4274 39.639 66.8313 38.8398 65.9854 37.6697C65.6394 37.2408 65.1778 36.6363 64.6009 35.8566C64.024 35.0377 63.2359 33.9651 62.2361 32.6392L53.8127 21.6808L52.141 23.3562V36.383C52.141 37.592 52.2375 38.4692 52.4295 39.0154C52.6604 39.5612 53.0834 39.9318 53.6986 40.1265C54.3525 40.3215 55.3907 40.4194 56.8135 40.4194C56.9288 40.4194 56.9867 40.5363 56.9867 40.7702C56.9867 41.0041 56.9288 41.1213 56.8135 41.1213C55.583 41.1213 54.6215 41.1016 53.9292 41.0627L49.8337 41.0041L45.7959 41.0627C45.0653 41.1016 44.0651 41.1213 42.796 41.1213C42.7193 41.121 42.681 41.0041 42.681 40.7702C42.681 40.5363 42.7193 40.4194 42.796 40.4194C44.1804 40.4194 45.1998 40.3215 45.8537 40.1265C46.5073 39.9315 46.9497 39.5612 47.1803 39.0154C47.4493 38.4303 47.5838 37.5528 47.5838 36.383V23.5587L52.141 20.4009V21.7935L56.9406 16.8884ZM56.8135 4.56055C56.8905 4.56055 56.9288 4.67749 56.9288 4.91138C56.9288 5.14536 56.8905 5.2625 56.8135 5.26253C55.4677 5.26253 54.4678 5.37941 53.8139 5.61336C53.1603 5.84732 52.7179 6.25688 52.4873 6.84176C52.2566 7.38773 52.141 8.24596 52.141 9.41591V17.9602L47.5838 21.045V9.29887C47.5838 8.12901 47.4688 7.27102 47.2378 6.72501C47.0072 6.17907 46.5651 5.80835 45.9112 5.61336C45.2959 5.37938 44.2958 5.26253 42.9116 5.26253C42.7963 5.2625 42.7385 5.14533 42.7385 4.91138C42.7385 4.67752 42.7963 4.56058 42.9116 4.56055L45.7959 4.61908C47.488 4.69706 48.8338 4.73612 49.8337 4.73612C50.9105 4.73612 52.295 4.69706 53.9867 4.61908L56.8135 4.56055Z" fill={fill}/>
    <path d="M40.212 38.0634L25.0763 18.4648L40.212 27.8741C40.648 27.8301 49.3162 21.8765 80.5 0L40.212 38.0634Z" fill={goldFill}/>
  </svg>
);

/* ── HEADER ────────────────────────────────────────────────────── */
const Header = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
        <Logo />
        <div style={{ borderLeft: "1px solid rgba(26,13,20,.15)", paddingLeft: 14 }}>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink)" }}>
            КОРЭЛ
          </div>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(26,13,20,.75)", marginTop: 2 }}>
            Независимая оценка
          </div>
        </div>
      </button>
      <nav style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {[["home","Главная"],["services","Услуги"],["application","Контакты"]].map(([p, l]) => (
          <button key={p} className={`nav-link${page === p ? " active" : ""}`} onClick={() => setPage(p)}>{l}</button>
        ))}
      </nav>
      <button className="btn-primary" onClick={() => setPage("application")}>
        Заказать оценку
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>
    </header>
  );
};

/* ── FOOTER ────────────────────────────────────────────────────── */
const Footer = ({ setPage }) => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.2rem" }}>
            <Logo fill="#F5F0E6" goldFill="#C4A22C" />
            <div style={{ borderLeft: "1px solid rgba(196,162,44,.3)", paddingLeft: 12 }}>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase", color: "#F5F0E6" }}>КОРЭЛ</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: ".18em", color: "#C4A22C", marginTop: 2 }}>Независимая оценка</div>
            </div>
          </div>
          <p style={{ fontSize: 13, fontWeight: 300, color: "rgba(245,240,230,.45)", lineHeight: 1.8, maxWidth: 280 }}>
            Профессиональная независимая оценка имущества и активов для физических и юридических лиц. Более 10 лет опыта.
          </p>
        </div>
        <div>
          <div className="footer-title">Навигация</div>
          {[["home","Главная"],["services","Услуги"],["application","Заказать оценку"]].map(([p, l]) => (
            <button key={p} className="footer-link" onClick={() => setPage(p)}>{l}</button>
          ))}
        </div>
        <div>
          <div className="footer-title">Услуги</div>
          {["Оценка недвижимости","Оценка для ипотеки","Оценка бизнеса","Оценка транспорта","Оценка ущерба","Оценка имущества"].map(s => (
            <button key={s} className="footer-link" onClick={() => setPage("services")}>{s}</button>
          ))}
        </div>
        <div>
          <div className="footer-title">Контакты</div>
          <div style={{ fontSize: 13, fontWeight: 300, color: "rgba(245,240,230,.50)", lineHeight: 2 }}>
            <div style={{ color: "#C4A22C", fontWeight: 500, fontSize: 15, marginBottom: 4 }}>+7 (xxx) xxx-xx-xx</div>
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

/* ══════════════════════════════════════════════════════════════
   PAGE: ГЛАВНАЯ
══════════════════════════════════════════════════════════════ */
const HomePage = ({ setPage }) => {
  const services = [
    { icon: "🏠", name: "Оценка недвижимости", desc: "Квартиры, дома, коттеджи, апартаменты — для сделок, ипотеки и налогообложения.", price: "от 3 500 ₽" },
    { icon: "🏢", name: "Оценка коммерческой недвижимости", desc: "Офисы, склады, торговые помещения, производственные здания.", price: "от 15 000 ₽" },
    { icon: "⚖️", name: "Оценка для суда", desc: "Официальные заключения, признаваемые судами всех инстанций РФ.", price: "от 10 000 ₽" },
    { icon: "🚗", name: "Оценка транспорта", desc: "Легковые авто, грузовой транспорт, спецтехника и самоходные машины.", price: "от 3 000 ₽" },
    { icon: "💼", name: "Оценка бизнеса", desc: "Оценка компаний, долей, акций и нематериальных активов.", price: "от 30 000 ₽" },
    { icon: "📋", name: "Оценка ущерба", desc: "Ущерб от затопления, пожара, ДТП — для страховых компаний и суда.", price: "от 5 000 ₽" },
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
            <span />Брянск и Брянская область<span />
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
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
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
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 80, fontWeight: 300, color: "#C4A22C", opacity: 0.15, lineHeight: 1 }}>ОК</div>
            <div style={{ width: 1, height: 160, background: "linear-gradient(to bottom, transparent, rgba(196,162,44,.4), transparent)", margin: "20px auto" }} />
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(245,240,230,.3)" }}>НЕЗАВИСИМАЯ ОЦЕНКА</div>
          </div>
          <div className="hero-badge">
            <div className="hero-badge-num">1</div>
            <div className="hero-badge-label">день на готовый отчёт</div>
          </div>
          <div style={{ position: "absolute", top: 60, left: 60, display: "flex", flexDirection: "column", gap: 8 }}>
            {["Аккредитованная компания","Член СРО РОО","Полис страхования"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 6, height: 6, background: "#C4A22C", borderRadius: "50%", flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "rgba(245,240,230,.6)", letterSpacing: ".04em" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" style={{ background: "var(--cream2)" }}>
        <div className="section-inner">
          <div className="section-header">
            <div>
              <div className="section-tag">Наши услуги</div>
              <h2 className="section-title">Оцениваем любые<br />виды имущества</h2>
            </div>
            <button className="btn-ghost" onClick={() => setPage("services")}>
              Все услуги
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M11 1L15 5M15 5L11 9M15 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card" onClick={() => setPage("application")}>
                <div className="service-icon">{s.icon}</div>
                <div className="service-name">{s.name}</div>
                <div className="service-desc">{s.desc}</div>
                <div className="service-price">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ background: "var(--cream)", borderTop: "1px solid var(--cream3)", borderBottom: "1px solid var(--cream3)" }}>
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

      {/* REVIEWS */}
      <section className="section" style={{ background: "var(--cream2)" }}>
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

      {/* CTA BANNER — stays plum dark */}
      <div className="cta-banner">
        <div className="cta-banner-inner">
          <div>
            <div className="section-tag">Готовы начать?</div>
            <h2 className="section-title" style={{ color: "#F5F0E6", marginBottom: ".75rem" }}>
              Получите бесплатную<br />консультацию
            </h2>
            <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(245,240,230,.70)", maxWidth: 460, lineHeight: 1.7 }}>
              Расскажите о вашей задаче — мы подберём оптимальный вид оценки и озвучим стоимость ещё до заключения договора.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <button className="btn-primary" style={{ fontSize: 15, padding: "18px 44px", background: "#C4A22C", color: "#1A0D14" }} onClick={() => setPage("application")}>
              Заказать оценку
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            <div style={{ textAlign: "center", fontSize: 12, color: "rgba(245,240,230,.40)", letterSpacing: ".06em" }}>
              Ответим в течение 15 минут
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   PAGE: ЗАЯВКА
══════════════════════════════════════════════════════════════ */
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

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  const services = ["Оценка квартиры для ипотеки","Оценка коммерческой недвижимости","Оценка дома / коттеджа","Оценка земельного участка","Оценка транспортного средства","Оценка бизнеса","Оценка ущерба","Оценка при изъятии","Оценка при сносе жилья","Другое"];

  return (
    <div className="app-page">
      <div className="app-banner">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="section-tag" style={{ marginBottom: 12 }}>Шаг 1 из 1</div>
          <h1 className="display" style={{ fontSize: "clamp(40px,5vw,68px)", fontWeight: 300, lineHeight: 1.1, marginBottom: "1rem", color: "#F5F0E6" }}>
            Заявка на оценку
          </h1>
          <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(245,240,230,.70)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Заполните форму — наш специалист свяжется с вами в течение 15 минут для уточнения деталей и стоимости
          </p>
        </div>
      </div>

      <div className="app-form-section">
        {submitted ? (
          <div className="success-state" style={{ maxWidth: 560, margin: "0 auto" }}>
            <div className="success-icon">✓</div>
            <h2 className="display" style={{ fontSize: 42, fontWeight: 300, marginBottom: ".75rem", color: "var(--ink)" }}>Заявка принята!</h2>
            <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(26,13,20,.60)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Спасибо, {form.name}! Наш специалист свяжется с вами по номеру{" "}
              <strong style={{ color: "var(--plum)" }}>{form.phone}</strong> в течение 15 минут.
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
                <h2 className="display" style={{ fontSize: 36, fontWeight: 300, marginBottom: ".5rem", color: "var(--ink)" }}>
                  Ваши контактные данные
                </h2>
                <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(26,13,20,.75)" }}>
                  Все поля, кроме email и комментария, обязательны
                </p>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Ваше имя *</label>
                  <input className="form-input" placeholder="Иван Иванов" value={form.name}
                    onChange={e => { setForm({...form, name: e.target.value}); setErrors({...errors, name: null}); }} />
                  {errors.name && <span style={{ fontSize: 12, color: "#c0392b" }}>{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Телефон *</label>
                  <input className="form-input" placeholder="+7 (___) ___-__-__" value={form.phone}
                    onChange={e => { setForm({...form, phone: e.target.value}); setErrors({...errors, phone: null}); }} />
                  {errors.phone && <span style={{ fontSize: 12, color: "#c0392b" }}>{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" placeholder="email@example.com" value={form.email}
                    onChange={e => { setForm({...form, email: e.target.value}); setErrors({...errors, email: null}); }} />
                  {errors.email && <span style={{ fontSize: 12, color: "#c0392b" }}>{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Вид оценки *</label>
                  <select className="form-input" value={form.service}
                    onChange={e => { setForm({...form, service: e.target.value}); setErrors({...errors, service: null}); }}>
                    <option value="">Выберите услугу...</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <span style={{ fontSize: 12, color: "#c0392b" }}>{errors.service}</span>}
                </div>
                <div className="form-group full">
                  <label className="form-label">Комментарий</label>
                  <textarea className="form-input" placeholder="Опишите объект, цель оценки, пожелания по срокам..."
                    value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} />
                </div>
              </div>
              <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <button className="btn-primary" style={{ fontSize: 15, padding: "17px 44px" }} onClick={handleSubmit} disabled={loading}>
                  {loading ? "Отправляем..." : "Отправить заявку"}
                  {!loading && <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                </button>
                <p style={{ fontSize: 12, color: "rgba(26,13,20,.68)", letterSpacing: ".02em", maxWidth: 300 }}>
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </div>
            </div>

            <div>
              <div style={{ background: "var(--cream2)", border: "1px solid var(--cream3)", padding: "36px 28px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 400, marginBottom: "1.5rem", color: "var(--ink)" }}>
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
                <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid var(--cream3)" }}>
                  <div style={{ fontSize: 12, color: "rgba(26,13,20,.72)", marginBottom: 8, letterSpacing: ".08em", textTransform: "uppercase" }}>
                    Или позвоните напрямую
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: "var(--plum)" }}>
                    +7 (xxx) xxx-xx-xx
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(26,13,20,.72)", marginTop: 4 }}>Ежедневно 7:00 – 21:00</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   PAGE: УСЛУГИ
══════════════════════════════════════════════════════════════ */
const ServicesPage = ({ setPage }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const services = [
    { cat: "realty", icon: "🏠", name: "Оценка квартиры", desc: "Для ипотеки, купли-продажи, налогообложения, вступления в наследство.", price: "от 3 500 ₽", time: "1 день" },
    { cat: "realty", icon: "🏡", name: "Оценка дома и коттеджа", desc: "Жилые дома, дачи, загородные коттеджи. Земля в составе объекта или отдельно.", price: "от 7 000 ₽", time: "2 дня" },
    { cat: "realty", icon: "🏢", name: "Коммерческая недвижимость", desc: "Офисные, торговые, складские и производственные помещения.", price: "от 15 000 ₽", time: "3 дня" },
    { cat: "realty", icon: "🌲", name: "Оценка земельного участка", desc: "ИЖС, СНТ, сельхозугодья, участки под коммерческую застройку.", price: "от 5 000 ₽", time: "2 дня" },
    { cat: "special", icon: "⚖️", name: "Оценка для суда", desc: "Независимая судебная экспертиза и оценочные заключения для судебных разбирательств.", price: "от 10 000 ₽", time: "3 дня" },
    { cat: "special", icon: "🔨", name: "Оценка при изъятии", desc: "Определение размера возмещения при изъятии имущества для государственных нужд.", price: "15 000 ₽", time: "5 дней" },
    { cat: "special", icon: "🏚", name: "Оценка при сносе жилья", desc: "Ветхое и аварийное жильё, участки в зонах реновации.", price: "от 15 000 ₽", time: "3 дня" },
    { cat: "transport", icon: "🚗", name: "Оценка автомобиля", desc: "Легковые автомобили для продажи, страхования, нотариуса, суда.", price: "от 3 000 ₽", time: "1 день" },
    { cat: "transport", icon: "🚛", name: "Оценка грузового транспорта", desc: "Грузовики, автобусы, прицепы, специальная техника и оборудование.", price: "от 5 000 ₽", time: "2 дня" },
    { cat: "business", icon: "💼", name: "Оценка бизнеса", desc: "Оценка компаний и предприятий для сделок, залога, реструктуризации.", price: "от 30 000 ₽", time: "7 дней" },
    { cat: "business", icon: "📊", name: "Оценка ценных бумаг", desc: "Акции, доли в ООО, векселя, облигации и прочие финансовые активы.", price: "от 20 000 ₽", time: "5 дней" },
    { cat: "other", icon: "🐄", name: "Оценка крупного рогатого скота", desc: "Рыночная оценка сельскохозяйственных животных для страхования и учёта.", price: "от 7 000 ₽", time: "2 дня" },
  ];

  const filters = [
    { id: "all", label: "Все услуги" },
    { id: "realty", label: "Недвижимость" },
    { id: "special", label: "Судебные / Изъятие" },
    { id: "transport", label: "Транспорт" },
    { id: "business", label: "Бизнес и активы" },
    { id: "other", label: "Прочее" },
  ];

  const filtered = activeFilter === "all" ? services : services.filter(s => s.cat === activeFilter);

  return (
    <div className="services-page">
      <div className="services-hero">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-tag">Полный каталог</div>
          <h1 className="display" style={{ fontSize: "clamp(44px,6vw,72px)", fontWeight: 300, lineHeight: 1.05, maxWidth: 700, marginBottom: "1rem", color: "#F5F0E6" }}>
            Все виды<br />оценки имущества
          </h1>
          <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(245,240,230,.65)", maxWidth: 540, lineHeight: 1.8 }}>
            50+ видов оценки. Официальные отчёты по ФЗ-135 и ФСО. Принимаются всеми банками, судами и государственными органами РФ.
          </p>
        </div>
      </div>

      <div style={{ padding: "0 60px", background: "var(--cream)", borderBottom: "1px solid var(--cream3)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 4, overflowX: "auto", padding: "20px 0" }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)} style={{
              padding: "9px 22px",
              border: `1px solid ${activeFilter === f.id ? "var(--plum)" : "rgba(58,24,51,.20)"}`,
              background: activeFilter === f.id ? "var(--plum)" : "transparent",
              color: activeFilter === f.id ? "#F5F0E6" : "rgba(26,13,20,.65)",
              fontFamily: "'Jost',sans-serif", fontWeight: 500, fontSize: 13,
              letterSpacing: ".06em", textTransform: "uppercase",
              cursor: "pointer", whiteSpace: "nowrap", transition: "all .25s",
            }}>{f.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "2px 60px 80px", background: "var(--cream2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="services-all-grid">
            {filtered.map((s, i) => (
              <div key={i} className="service-card-full">
                <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                <div className="service-price-tag">{s.price}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 500, marginBottom: ".6rem", lineHeight: 1.2, color: "var(--ink)" }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 13, fontWeight: 300, color: "rgba(26,13,20,.80)", lineHeight: 1.7, marginBottom: 16 }}>
                  {s.desc}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ fontSize: 12, color: "rgba(26,13,20,.68)", letterSpacing: ".06em" }}>⏱ {s.time}</div>
                  <button className="btn-ghost" onClick={() => setPage("application")}>
                    Заказать
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   PAGE: 404
══════════════════════════════════════════════════════════════ */
const Page404 = ({ setPage }) => (
  <div className="page-404">
    <div className="page-404-bg" />
    <div style={{ position: "relative", zIndex: 1 }}>
      <div className="num-404">404</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(24px,4vw,42px)", fontWeight: 300, marginBottom: ".75rem", color: "var(--ink)" }}>
        Страница не найдена
      </div>
      <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(26,13,20,.55)", maxWidth: 420, lineHeight: 1.8, marginBottom: "2.5rem" }}>
        Запрошенная страница не существует или была перемещена. Воспользуйтесь навигацией или вернитесь на главную.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={() => setPage("home")}>
          На главную
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        <button className="btn-outline" onClick={() => setPage("services")}>Все услуги</button>
      </div>
      <div style={{ marginTop: 60, padding: "24px 32px", border: "1px solid var(--cream3)", background: "var(--cream2)", maxWidth: 320, margin: "60px auto 0" }}>
        <div style={{ fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(26,13,20,.68)", marginBottom: 8 }}>
          Или свяжитесь с нами
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: "var(--plum)" }}>
          +7 (xxx) xxx-xx-xx
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   SCENARIO GUIDE
══════════════════════════════════════════════════════════════ */
const ScenarioGuide = ({ visible, onClose }) =>
  visible ? (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(26,13,20,.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 680, width: "100%", background: "var(--cream)", border: "1px solid var(--cream3)", padding: 48, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 300, color: "var(--ink)" }}>Сценарии целей</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(26,13,20,.40)", fontSize: 24 }}>×</button>
        </div>
        {[
          { label: "🎯 Основной сценарий", color: "#3A1833", steps: ["Пользователь заходит на Главную","Видит УТП и CTA «Получить оценку» на первом экране","Нажимает → попадает на страницу Заявки","Выбирает вид оценки, заполняет имя и телефон","Нажимает «Отправить заявку»","Видит страницу «Заявка принята!» с подтверждением"] },
          { label: "➕ Дополнительный сценарий", color: "#4a7a3a", steps: ["Пользователь хочет сравнить услуги","Нажимает «Все услуги» на Главной или в шапке","Фильтрует по категории","Находит нужную услугу, смотрит цену и срок","Нажимает «Заказать» на карточке","Попадает на страницу Заявки и заполняет форму"] },
          { label: "⚠️ Сценарий ошибки (404)", color: "#8b3a2e", steps: ["Пользователь вводит неверный URL","Видит страницу 404 с крупным номером","Получает ссылку «На главную» и «Все услуги»","Видит номер телефона для прямого контакта","Возвращается в нормальный сценарий"] },
        ].map((sc, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <div style={{ color: sc.color, fontWeight: 600, fontSize: 15, letterSpacing: ".04em", marginBottom: 12 }}>{sc.label}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {sc.steps.map((s, j) => (
                <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ minWidth: 22, height: 22, borderRadius: "50%", background: `${sc.color}15`, border: `1px solid ${sc.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: sc.color, fontWeight: 600, flexShrink: 0 }}>{j + 1}</div>
                  <div style={{ fontSize: 13, fontWeight: 300, color: "rgba(26,13,20,.70)", lineHeight: 1.6 }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;

/* ══════════════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [showScenarios, setShowScenarios] = useState(false);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <GlobalStyle />
      <Header page={page} setPage={navigate} />
      {page === "home" && <HomePage setPage={navigate} />}
      {page === "application" && <ApplicationPage />}
      {page === "services" && <ServicesPage setPage={navigate} />}
      {page === "404" && <Page404 setPage={navigate} />}
      {page !== "404" && <Footer setPage={navigate} />}

      <button onClick={() => setShowScenarios(true)} style={{ position: "fixed", bottom: 24, left: 24, zIndex: 500, background: "rgba(245,240,230,.95)", border: "1px solid rgba(58,24,51,.20)", color: "var(--plum)", fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "10px 18px", cursor: "pointer", backdropFilter: "blur(8px)", boxShadow: "0 2px 12px rgba(26,13,20,.08)" }}>
        📋 Сценарии
      </button>
      <button onClick={() => navigate("404")} style={{ position: "fixed", bottom: 24, left: 160, zIndex: 500, background: "rgba(245,240,230,.95)", border: "1px solid rgba(58,24,51,.12)", color: "rgba(26,13,20,.45)", fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "10px 18px", cursor: "pointer", backdropFilter: "blur(8px)", boxShadow: "0 2px 12px rgba(26,13,20,.06)" }}>
        ↗ 404
      </button>

      <ScenarioGuide visible={showScenarios} onClose={() => setShowScenarios(false)} />
    </div>
  );
}
