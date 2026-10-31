import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollManager from "./components/ScrollManager.jsx";
import Splash from "./components/Splash.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Github from "./pages/Github.jsx";
import Experience from "./pages/Experience.jsx";
import BioMediaKit from "./pages/BioMediaKit.jsx";
import Contact from "./pages/Contact.jsx";
import Bio from "./pages/Bio.jsx";
import BioSetup from "./pages/BioSetup.jsx";
import BioBooks from "./pages/BioBooks.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useLang, FixedLanguage } from "./i18n/LanguageContext.jsx";
import useMotion from "./hooks/useMotion.js";

export default function App() {
  const { t } = useLang();
  // /bio e suas subpáginas são independentes (link na bio do Instagram): sem navbar/footer globais,
  // sempre em pt-BR e no tema escuro (ver BioLayout).
  const { pathname } = useLocation();
  const bare = pathname === "/bio" || pathname.startsWith("/bio/");
  useMotion();

  // a chave por rota faz cada página entrar com a própria transição
  const routes = (
    <div key={pathname} className="route">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/github" element={<Github />} />
        {/* o Media Kit mora só dentro da /bio; o endereço antigo leva para lá */}
        <Route path="/media-kit" element={<Navigate to="/bio/media-kit" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/bio/setup" element={<BioSetup />} />
        <Route path="/bio/livros" element={<BioBooks />} />
        <Route path="/bio/media-kit" element={<BioMediaKit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );

  return (
    <>
      <a className="skip-link" href="#main">{t("a11y.skip")}</a>
      <Splash />
      <ScrollManager />
      {!bare && <Navbar />}
      {bare ? <FixedLanguage lang="pt-BR">{routes}</FixedLanguage> : <main id="main">{routes}</main>}
      {!bare && <Footer />}
    </>
  );
}
