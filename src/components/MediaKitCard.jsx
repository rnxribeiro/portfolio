import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";

const topics = ["kit.platforms", "kit.audience", "kit.formats", "kit.partnerships"];

// Card do Media Kit da /bio: um maço de folhas de vidro em leque (que se abre no hover/foco) ao lado do texto,
// tópicos do kit e o convite para abrir. Inclina com o cursor (data-tilt). As folhas são só decoração.
export default function MediaKitCard({ title, href, delay = 0 }) {
  const { t, L } = useLang();
  return (
    <Link to={href} className="mk rise" style={{ animationDelay: `${delay}ms` }} data-tilt>
      <span className="mk__light" aria-hidden="true" />
      <span className="mk__stack" aria-hidden="true">
        <span className="mk__sheet mk__sheet--3" />
        <span className="mk__sheet mk__sheet--2" />
        <span className="mk__sheet mk__sheet--1">
          <span className="mk__sheet-brand">{site.brand}</span>
          <span className="mk__sheet-title">{title}</span>
          <span className="mk__sheet-year">{site.year}</span>
        </span>
      </span>
      <span className="mk__body">
        <span className="label">{t("links.brands")}</span>
        <span className="mk__title">{L(title)}</span>
        <span className="mk__topics">
          {topics.map((k) => <span key={k} className="mk__topic">{t(k)}</span>)}
        </span>
        <span className="mk__cta">{t("home.kitCta")} <span className="mk__cta-btn"><ArrowRight size={16} aria-hidden="true" /></span></span>
      </span>
    </Link>
  );
}
