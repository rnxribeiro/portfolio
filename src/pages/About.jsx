import { Link } from "react-router-dom";
import { ArrowUpRight, Download } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import Rich from "../components/Rich.jsx";
import StackGroups from "../components/StackGroups.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import { site } from "../data/site.js";
import { bioPortrait } from "../data/bio.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";

// /about — abertura com texto e retrato; os blocos (trajetória, conhecimentos, foco, objetivos) em cards;
// ferramentas em bento; e o convite de contato.
export default function About() {
  const { t, L } = useLang();
  useDocumentMeta({ title: L(seo.about.title), description: L(seo.about.description) });
  const d = (ms) => ({ "--d": `${ms}ms` });

  return (
    <div className="page">
      <section className="section section--first" aria-labelledby="about-h">
        <div className="container about about--page">
          <div className="about__copy">
            <span className="pill intro" style={d(80)}>{t("about.tag")}</span>
            <h1 id="about-h" className="h1 intro" style={d(160)}><Rich text={t("about.headlineRich")} /></h1>
            <p className="lead intro" style={d(260)}>{L(site.about.intro)}</p>
            <dl className="facts facts--cards intro" style={d(340)}>
              {site.facts.map((f) => (
                <div key={f.id}>
                  <dt>{L(f.label)}</dt>
                  <dd>{L(f.value)}</dd>
                </div>
              ))}
            </dl>
            <div className="about__actions intro" style={d(420)}>
              <Link to="/projects" className="btn btn--dark">{t("hero.viewProjects")} <ArrowUpRight size={15} aria-hidden="true" /></Link>
              {site.cv && <a className="btn" href={site.cv} download>{t("hero.cv")} <Download size={15} aria-hidden="true" /></a>}
            </div>
          </div>
          <div className="portrait intro" style={d(200)}>
            <img src={bioPortrait.src} alt={t("links.avatarAlt")} fetchPriority="high" />
            <span className="portrait__chip"><span className="dot" aria-hidden="true" />{L(bioPortrait.place)}</span>
            <span className="portrait__name">
              <strong>{site.name}</strong>
              <span>{L(site.hero.role)}</span>
            </span>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="about-more">
        <div className="container">
          <SectionHeader id="about-more" tag={t("about.details")} title={t("about.moreRich")} />
          <ol className="chapters">
            {site.about.sections.map((s, n) => (
              <Reveal as="li" className="chapter" key={s.title["en-US"]} delay={(n % 2) * 90}>
                <p className="chapter__num">{String(n + 1).padStart(2, "0")} <span>/ {String(site.about.sections.length).padStart(2, "0")}</span></p>
                <h3>{L(s.title)}</h3>
                <span className="pcard__bar" aria-hidden="true" />
                {L(s.text).split("\n").map((line, i) => <p key={i}>{line}</p>)}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="about-tools">
        <div className="container">
          <SectionHeader id="about-tools" tag={t("about.toolsTag")} title={t("about.toolsRich")} />
          <StackGroups />
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
