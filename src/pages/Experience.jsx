import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";
import Reveal from "../components/Reveal.jsx";
import ExperienceList from "../components/ExperienceList.jsx";

// /experience — trajetória profissional completa (linha do tempo com todos os detalhes).
export default function Experience() {
  const { t, L } = useLang();
  useDocumentMeta({ title: L(seo.experience.title), description: L(seo.experience.description) });
  return (
    <div className="page">
      <section className="section section--tight" aria-labelledby="exp-h">
        <div className="container">
          <Reveal>
            <span className="label section-header__index">03 — {t("home.expLabel")}</span>
            <h1 id="exp-h" className="h1">{t("home.expTitle")}</h1>
            <p className="lead" style={{ marginTop: "var(--space-4)" }}>{t("home.expSub")}</p>
          </Reveal>
        </div>
      </section>
      <section className="section--tight" style={{ paddingTop: 0, paddingBottom: "var(--space-9)" }} aria-label={t("home.expTitle")}>
        <div className="container">
          <ExperienceList detailed />
        </div>
      </section>
    </div>
  );
}
