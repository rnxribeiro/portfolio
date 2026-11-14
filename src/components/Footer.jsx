import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "../data/site.js";
import { socials, heroSocials } from "../data/socials.js";
import { useLang } from "../i18n/LanguageContext.jsx";

const pages = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/projects", key: "nav.projects" },
  { to: "/experience", key: "nav.experience" },
  { to: "/github", key: "nav.github" },
];

// Rodapé em colunas: marca (com e-mail e contato) · páginas · redes. Embaixo, o nome grande e
// uma linha com o copyright e o "voltar ao topo".
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
          <Link to="/" className="nav__brand" aria-label={t("a11y.brand")}>{site.brand.toLowerCase()}<span aria-hidden="true">.</span></Link>
          <p>{t("footer.tagline")}</p>
          <a className="footer__email" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </div>

        <nav className="footer__col" aria-label={t("footer.pages")}>
          <p className="footer__title">{t("footer.pages")}</p>
          <ul>
            {pages.map((p) => <li key={p.key}><Link to={p.to}>{t(p.key)}</Link></li>)}
            <li><Link to="/contact">{t("nav.contact")}</Link></li>
          </ul>
        </nav>

        <nav className="footer__col" aria-label={t("a11y.external")}>
          <p className="footer__title">{t("footer.social")}</p>
          <ul>
            {links.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.name} <ArrowUpRight size={13} aria-hidden="true" />
                  <span className="sr-only"> {t("links.external")}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="footer__mark" aria-hidden="true">{site.name}</p>

      <div className="container footer__bottom">
        <span>© {site.year} {site.name} · {t("footer.built")}</span>
        <button type="button" className="footer__top-btn" onClick={toTop}>
          {t("common.backToTop")} <ArrowUp size={14} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
