import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
];

// Navbar em pílula flutuante (centralizada). Um pontinho desliza até o link ativo.
// Ao rolar, a pílula ganha sombra. No mobile, os links abrem num painel logo abaixo.
export default function Navbar() {
  const { t, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dot, setDot] = useState(null);
  const { pathname } = useLocation();
  const listRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // posição do pontinho do link ativo (muda com a rota, o idioma e o tamanho da tela)
  useLayoutEffect(() => {
    const measure = () => {
      const a = listRef.current?.querySelector('a[aria-current="page"]');
      setDot(a ? a.offsetLeft + a.offsetWidth / 2 : null);
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname, lang]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="nav__bar">
        <Link to="/" className="nav__brand" aria-label={t("a11y.brand")}>
          {site.brand.toLowerCase()}<span aria-hidden="true">.</span>
        </Link>

        <nav className="nav__links" aria-label={t("a11y.mainNav")} ref={listRef}>
          {links.map((l) => <NavLink key={l.key} to={l.to} end={l.to === "/"}>{t(l.key)}</NavLink>)}
          {dot !== null && <span className="nav__dot" aria-hidden="true" style={{ "--x": `${dot}px` }} />}
        </nav>

        <div className="nav__tools">
          <LangSwitch />
          <ThemeToggle />
          <Link to="/contact" className="btn btn--dark btn--sm nav__cta">{t("nav.talk")}</Link>
          <button
            type="button"
            className="icon-btn nav__toggle"
            aria-label={open ? t("a11y.closeMenu") : t("a11y.openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className="nav__sheet" aria-label={t("a11y.mobileNav")} inert={!open}>
        {[...links, { to: "/contact", key: "nav.contact" }].map((l) => (
          <NavLink key={l.key} to={l.to} end={l.to === "/"}>
            {t(l.key)} <ArrowUpRight size={16} aria-hidden="true" />
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
