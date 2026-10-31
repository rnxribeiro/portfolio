import { useLang } from "../i18n/LanguageContext.jsx";

const options = [
  { code: "pt-BR", short: "PT", labelKey: "a11y.langPt" },
  { code: "en-US", short: "EN", labelKey: "a11y.langEn" },
];

export default function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang-switch" role="group" aria-label={t("a11y.langGroup")}>
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          lang={o.code}
          aria-pressed={lang === o.code}
          aria-label={t(o.labelKey)}
          onClick={() => setLang(o.code)}
        >
          {o.short}
        </button>
      ))}
    </div>
  );
}
