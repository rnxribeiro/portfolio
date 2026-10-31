import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Globe, Monitor, BookOpen, FileText, Mail, Link2 } from "lucide-react";
import { useLang } from "../i18n/LanguageContext.jsx";
import SocialIcon from "./SocialIcon.jsx";

const glyphs = { globe: Globe, monitor: Monitor, book: BookOpen, file: FileText, mail: Mail, link: Link2 };

function Glyph({ name }) {
  const Icon = glyphs[name] || null;
  if (Icon) return <Icon size={20} strokeWidth={1.75} aria-hidden="true" />;
  return name ? <SocialIcon name={name} size={20} /> : <Link2 size={20} strokeWidth={1.75} aria-hidden="true" />;
}

// Card de link da /bio: quadrado com ícone + título + descrição + seta.
// Props: title, description, href, icon (chave de ícone), external (nova aba), delay (ms)
export default function LinkItem({ title, description, href, icon, external = false, delay = 0 }) {
  const { t, L } = useLang();

  const inner = (
    <>
      <span className="link-card__light" aria-hidden="true" />
      <span className="link-card__tile"><Glyph name={icon} /></span>
      <span className="link-card__text">
        <span className="link-card__title">
          {L(title)}
          {external && href && <span className="sr-only"> {t("links.external")}</span>}
        </span>
        <span className="link-card__desc">{L(description)}</span>
      </span>
      {href ? (
        external
          ? <ArrowUpRight className="link-card__arrow link-card__arrow--ext" size={18} aria-hidden="true" />
          : <ArrowRight className="link-card__arrow" size={18} aria-hidden="true" />
      ) : (
        <span className="label link-card__soon">{t("links.soon")}</span>
      )}
    </>
  );

  return (
    <li className="rise" style={{ animationDelay: `${delay}ms` }}>
      {!href ? (
        <div className="link-card link-card--off">{inner}</div>
      ) : external ? (
        <a className="link-card" data-tilt href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
      ) : (
        <Link className="link-card" data-tilt to={href}>{inner}</Link>
      )}
    </li>
  );
}
