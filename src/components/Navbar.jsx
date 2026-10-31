import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import LangSwitch from "./LangSwitch.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/projects", key: "nav.projects" },
  { to: "/experience", key: "nav.experience" },
  { to: "/github", key: "nav.github" },
  { to: "/contact", key: "nav.contact" },
];

// Barra flutuante de vidro. No topo da página fica leve; ao rolar ganha fundo, borda e sombra.
// Um indicador desliza até o link ativo e um fio na base mostra o progresso da página (--scroll).
export default function Navbar() {
  const { t, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mark, setMark] = useState(null); // posição do indicador do link ativo
  const { pathname } = useLocation();
  const listRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mede o link ativo (muda com a rota, o idioma e o tamanho da tela)
  useLayoutEffect(() => {
    const measure = () => {
      const active = listRef.current?.querySelector('a[aria-current="page"]');
      setMark(active ? { x: active.offsetLeft, w: active.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname, lang]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const renderLink = (l, children) => <NavLink key={l.key} to={l.to} end={l.to === "/"}>{children}</NavLink>;

  return (
    <header className={`navbar${scrolled || open ? " is-scrolled" : ""}`}>
      <div className="navbar__bar">
        <Link to="/" className="brand" aria-label={t("a11y.brand")}>
          <span className="brand__mark">{site.brand}</span>
          <span className="brand__sep" aria-hidden="true">/</span>
          <span className="brand__name">{site.handle}</span>
        </Link>

        <nav className="nav-links" aria-label={t("a11y.mainNav")} ref={listRef}>
          {mark && <span className="nav-links__mark" aria-hidden="true" style={{ "--x": `${mark.x}px`, "--w": `${mark.w}px` }} />}
          {links.map((l) => renderLink(l, t(l.key)))}
        </nav>

        <div className="nav-tools">
          <LangSwitch />
          <ThemeToggle />
          <button
            className="nav-toggle"
            aria-label={open ? t("a11y.closeMenu") : t("a11y.openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <span className="navbar__progress" aria-hidden="true" />
      </div>

      <nav id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} aria-label={t("a11y.mobileNav")} inert={!open}>
        {links.map((l) => renderLink(l, <>{t(l.key)}<ArrowRight size={18} aria-hidden="true" /></>))}
      </nav>
    </header>
  );
}
