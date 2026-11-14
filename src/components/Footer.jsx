import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { site } from "../data/site.js";
import { socials, heroSocials } from "../data/socials.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import SlashLinks from "./SlashLinks.jsx";

const pages = [
  { to: "/about", key: "nav.about" },
  { to: "/projects", key: "nav.projects" },
  { to: "/experience", key: "nav.experience" },
  { to: "/github", key: "nav.github" },
  { to: "/contact", key: "nav.contact" },
];

export default function Footer() {
  const { t } = useLang();
  const links = socials.filter((s) => heroSocials.includes(s.name) && !s.placeholder);
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Link to="/" className="nav__brand">{site.brand.toLowerCase()}<span aria-hidden="true">.</span></Link>
          <p>{t("footer.tagline")}</p>
        </div>
        <nav className="footer__nav" aria-label={t("footer.pages")}>
          {pages.map((p) => <Link key={p.key} to={p.to}>{t(p.key)}</Link>)}
        </nav>
        <button type="button" className="btn btn--sm" onClick={toTop}>
          {t("common.backToTop")} <ArrowUp size={14} aria-hidden="true" />
        </button>
      </div>
      <p className="footer__mark" aria-hidden="true">{site.name}</p>
      <div className="container footer__bottom">
        <span>© {site.year} {site.name}</span>
        <SlashLinks items={links} label={t("a11y.external")} />
      </div>
    </footer>
  );
}
