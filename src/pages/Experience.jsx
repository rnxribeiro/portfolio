import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";
import SectionHeader from "../components/SectionHeader.jsx";
import ExperienceList from "../components/ExperienceList.jsx";

// /experience — trajetória completa (cards com todos os detalhes).
export default function Experience() {
  const { t, L } = useLang();
  useDocumentMeta({ title: L(seo.experience.title), description: L(seo.experience.description) });
  return (
    <div className="page">
      <section className="section section--first" aria-labelledby="exp-h">
        <div className="container container--narrow">
          <SectionHeader page as="h1" id="exp-h" tag={t("home.expLabel")} title={t("exp.rich")} sub={t("home.expSub")} />
          <ExperienceList detailed />
        </div>
      </section>
    </div>
  );
}
