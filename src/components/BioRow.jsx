import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext.jsx";

// Linha de uma lista da /bio (setup ou livros): miniatura + textos + seta. Abre o produto em nova aba.
// Props: title, subtitle (mono, acima do título), below (texto logo abaixo do título), tag, store (nome da loja, ex.: "Mercado Livre"), affiliate, image,
//        icon (placeholder), book (capa vertical), href, delay
export default function BioRow({ title, subtitle, below, tag, store, affiliate = false, image, icon: Icon, book = false, href, delay = 0 }) {
  const { t } = useLang();

  const inner = (
    <>
      <span className={`bio-thumb${book ? " bio-thumb--book" : ""}`}>
        {image ? <img src={image} alt="" loading="lazy" decoding="async" /> : Icon && <Icon size={22} strokeWidth={1.2} aria-hidden="true" />}
      </span>
      <span className="bio-row__text">
        {subtitle && <span className="label">{subtitle}</span>}
        <span className="link-item__title">
          {title}
          {href && <span className="sr-only"> {t("links.external")}</span>}
        </span>
        {below && <span className="bio-row__below">{below}</span>}
        {(tag || store || affiliate) && (
          <span className="bio-row__meta">
            {tag && <span className="tag">{tag}</span>}
            {store && <span className="aff">{store}</span>}
            {affiliate && <span className="aff" title={t("card.affiliateTitle")}>{t("card.affiliate")}</span>}
          </span>
        )}
      </span>
      {href ? (
        <ArrowUpRight className="link-item__arrow link-item__arrow--ext" size={18} aria-hidden="true" />
      ) : (
        <span className="label link-item__soon">{t("links.soon")}</span>
      )}
    </>
  );

  return (
    <li className="link-row rise" style={{ animationDelay: `${delay}ms` }}>
      {href ? (
        <a className="link-item bio-row" href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
      ) : (
        <div className="link-item link-item--off bio-row">{inner}</div>
      )}
    </li>
  );
}
