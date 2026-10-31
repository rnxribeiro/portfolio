import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext.jsx";

// Bloco de destaque (borda sutil) da página /bio. Sem href → mostra "Em breve".
export default function FeaturedLink({ item, delay = 0 }) {
  const { t, L } = useLang();
  const { label, title, description, cta, href, external } = item;
  const Arrow = external ? ArrowUpRight : ArrowRight;

  const body = (
    <>
      <span className="label">{L(label)}</span>
      <h3 className="featured__title">{L(title)}</h3>
      <p className="featured__desc">{L(description)}</p>
    </>
  );

  const ctaInner = (
    <>
      {L(cta)}
      {external && <span className="sr-only"> {t("links.external")}</span>}
      <Arrow size={14} aria-hidden="true" />
    </>
  );

  return (
    <article className="featured rise" style={{ animationDelay: `${delay}ms` }}>
      {body}
      {!href ? (
        <span className="label featured__soon">{t("links.soon")}</span>
      ) : external ? (
        <a className="link-arrow featured__cta" href={href} target="_blank" rel="noopener noreferrer">{ctaInner}</a>
      ) : (
        <Link className="link-arrow featured__cta" to={href}>{ctaInner}</Link>
      )}
    </article>
  );
}
