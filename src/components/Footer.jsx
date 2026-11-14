import { Link } from "react-router-dom";
import { site } from "../data/site.js";
import { socials } from "../data/socials.js";
import { useLang } from "../i18n/LanguageContext.jsx";

const ext = ["GitHub", "LinkedIn"].map((n) => socials.find((s) => s.name === n)).filter(Boolean);

// Rodapé enxuto: marca à esquerda; GitHub, LinkedIn, e-mail e o copyright à direita.
export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer__row">
        <Link to="/" className="nav__brand" aria-label={t("a11y.brand")}>{site.brand}</Link>
        <nav className="footer__links" aria-label={t("a11y.external")}>
          {ext.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">{s.name}<span className="sr-only"> {t("links.external")}</span></a>
          ))}
          <a href={`mailto:${site.contact.email}`}>{t("common.email")}</a>
          <span className="footer__dot" aria-hidden="true" />
          <span className="footer__copy">© {site.year} {site.brand}. {t("footer.rights")}</span>
        </nav>
      </div>
    </footer>
  );
}
