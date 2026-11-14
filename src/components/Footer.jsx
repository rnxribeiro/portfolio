import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { site } from "../data/site.js";
import { socials, heroSocials } from "../data/socials.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import SocialIcon from "./SocialIcon.jsx";

const pages = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/projects", key: "nav.projects" },
];
const more = [
  { to: "/experience", key: "nav.experience" },
  { to: "/github", key: "nav.github" },
  { to: "/contact", key: "nav.contact" },
];

// Rodapé minimalista: um card com a marca, a frase e os ícones das redes à esquerda, duas colunas de links
// à direita e, embaixo, o copyright e o "voltar ao topo". Atrás, o nome grande e bem apagado.
export default function Footer() {
  const { t } = useLang();
  const links = socials.filter((s) => heroSocials.includes(s.name) && !s.placeholder);
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };
  const col = (title, items) => (
    <nav className="footer__col" aria-label={title}>
      <p className="footer__title">{title}</p>
      <ul>{items.map((p) => <li key={p.key}><Link to={p.to}>{t(p.key)}</Link></li>)}</ul>
    </nav>
  );

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__card">
          <div className="footer__top">
            <div className="footer__brand">
              <Link to="/" className="nav__brand" aria-label={t("a11y.brand")}>{site.brand.toLowerCase()}<span aria-hidden="true">.</span></Link>
              <p>{t("footer.tagline")}</p>
              <ul className="footer__social" aria-label={t("a11y.external")}>
                {links.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} ${t("links.external")}`}>
                      <SocialIcon name={s.icon} size={16} />
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.contact.email}`} aria-label={t("common.email")}><SocialIcon name="email" size={16} /></a>
                </li>
              </ul>
            </div>
            <div className="footer__cols">
              {col(t("footer.pages"), pages)}
              {col(t("footer.more"), more)}
            </div>
          </div>
          <div className="footer__bottom">
            <span>© {site.year} {site.name}. {t("footer.rights")}</span>
            <button type="button" className="footer__top-btn" onClick={toTop}>
              {t("common.backToTop")} <ArrowUp size={13} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <p className="footer__mark" aria-hidden="true">{site.name}</p>
    </footer>
  );
}
