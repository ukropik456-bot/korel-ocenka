import { useState } from "react";
import "./styles/global.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ApplicationPage from "./pages/ApplicationPage";
import ServicesPage from "./pages/ServicesPage";
import Page404 from "./pages/Page404";

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
      <Header page={page} setPage={navigate} />
      {page === "home" && <HomePage setPage={navigate} />}
      {page === "application" && <ApplicationPage />}
      {page === "services" && <ServicesPage setPage={navigate} />}
      {page === "404" && <Page404 setPage={navigate} />}
      {page !== "404" && <Footer setPage={navigate} />}
    </div>
  );
}
