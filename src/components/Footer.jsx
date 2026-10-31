import { ArrowUp } from "lucide-react";
import { site } from "../data/site.js";
import { socials, heroSocials } from "../data/socials.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Footer() {
  const { t } = useLang();
  const links = socials.filter((s) => heroSocials.includes(s.name) && !s.placeholder);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <p className="footer__name">{site.name.toUpperCase()}</p>
            <p className="footer__role">{t("footer.role")}</p>
          </div>
          <nav className="footer__links" aria-label={t("a11y.external")}>
            {links.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
            ))}
            <a href={`mailto:${site.contact.email}`}>{t("common.email")}</a>
          </nav>
        </div>
        <p className="footer__mark" aria-hidden="true" data-progress>{site.brand}</p>
        <div className="footer__bottom">
          <span>© {site.year} {site.name} · {t("footer.built")}</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {t("common.backToTop")} <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
