import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollManager from "./components/ScrollManager.jsx";
import Splash from "./components/Splash.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Github from "./pages/Github.jsx";
import Experience from "./pages/Experience.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useLang } from "./i18n/LanguageContext.jsx";

export default function App() {
  const { t } = useLang();
  const { pathname } = useLocation();

  // a chave por rota faz cada página entrar com a própria transição
  const routes = (
    <div key={pathname} className="route">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/github" element={<Github />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );

  return (
    <>
      <a className="skip-link" href="#main">{t("a11y.skip")}</a>
      <Splash />
      <ScrollManager />
      {/* a "folha": o site inteiro fica num painel arredondado sobre o fundo, com linhas-guia nas laterais */}
      <div className="sheet">
        <Navbar />
        <main id="main">{routes}</main>
        <Footer />
      </div>
    </>
  );
}
