import { useState, useEffect } from "react";
import "./styles/global.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ApplicationPage from "./pages/ApplicationPage";
import ServicesPage from "./pages/ServicesPage";
import AdminPage from "./pages/AdminPage";
import Page404 from "./pages/Page404";

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Поддержка прямого URL /admin через хэш
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "admin") setPage("admin");
  }, []);

  const isAdmin = page === "admin";

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
      {!isAdmin && <Header page={page} setPage={navigate} />}
      {page === "home" && <HomePage setPage={navigate} />}
      {page === "application" && <ApplicationPage />}
      {page === "services" && <ServicesPage setPage={navigate} />}
      {page === "admin" && <AdminPage />}
      {page === "404" && <Page404 setPage={navigate} />}
      {!isAdmin && page !== "404" && <Footer setPage={navigate} />}
    </div>
  );
}
