import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import LangSwitch from "./LangSwitch.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  { to: "/projects", key: "nav.projects" },
  { to: "/about", key: "nav.about" },
  { to: "/experience", key: "nav.experience" },
  { to: "/contact", key: "nav.contact" },
];

// Navbar compacta: marca à esquerda, um fio que liga até os links e as ferramentas (idioma e tema).
// Um traço curto acompanha o link ativo. No mobile, os links abrem num painel logo abaixo.
export default function Navbar() {
  const { t, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mark, setMark] = useState(null);
  const { pathname } = useLocation();
  const listRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const a = listRef.current?.querySelector('a[aria-current="page"]');
      setMark(a ? { x: a.offsetLeft, w: a.offsetWidth } : null);
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
        <Link to="/" className="nav__brand" aria-label={t("a11y.brand")}>{site.brand}</Link>
        <span className="nav__rule" aria-hidden="true" />
        <nav className="nav__links" aria-label={t("a11y.mainNav")} ref={listRef}>
          {links.map((l) => <NavLink key={l.key} to={l.to}>{t(l.key)}</NavLink>)}
          {mark && <span className="nav__mark" aria-hidden="true" style={{ "--x": `${mark.x}px`, "--w": `${mark.w}px` }} />}
        </nav>
        <div className="nav__tools">
          <LangSwitch />
          <ThemeToggle />
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
        {[{ to: "/", key: "nav.home" }, ...links].map((l) => (
          <NavLink key={l.key} to={l.to} end={l.to === "/"}>
            {t(l.key)} <ArrowUpRight size={16} aria-hidden="true" />
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
