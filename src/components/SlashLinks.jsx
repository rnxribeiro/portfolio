import { useLang } from "../i18n/LanguageContext.jsx";

// Links de redes separados por barra ("GitHub / LinkedIn / Instagram"). items: lista de socials.js.
export default function SlashLinks({ items, label, className = "" }) {
  const { t } = useLang();
  return (
    <ul className={`slash-links${className ? ` ${className}` : ""}`} aria-label={label}>
      {items.map((s) => (
        <li key={s.name}>
          <a href={s.url} target="_blank" rel="noopener noreferrer">
            {s.name}<span className="sr-only"> {t("links.external")}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
