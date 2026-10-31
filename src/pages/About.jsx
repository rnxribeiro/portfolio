import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import StackGroups from "../components/StackGroups.jsx";
import SplitText from "../components/SplitText.jsx";
import BioPortrait from "../components/BioPortrait.jsx";
import { site } from "../data/site.js";
import { bioPortrait } from "../data/bio.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";

// /about — abertura com retrato em vidro 3D e apresentação; os blocos (trajetória, interesses, foco, objetivos)
// como um índice editorial numerado; ferramentas; e um convite final para projetos e contato.
export default function About() {
  const { t, L } = useLang();
  useDocumentMeta({ title: L(seo.about.title), description: L(seo.about.description) });
  return (
    <div className="page about-page">
      <section className="section section--tight" aria-labelledby="about-h">
        <div className="container about-page__intro">
          <div className="about-page__copy">
            <p className="eyebrow intro" style={{ "--d": "100ms" }}><span className="eyebrow__dot" aria-hidden="true" />01 — {t("nav.about")}</p>
            <h1 id="about-h" className="about-page__title"><SplitText text={t("about.headline")} delay={180} step={110} /></h1>
            <p className="about-page__lead intro" style={{ "--d": "520ms" }}>{L(site.about.intro)}</p>
            <dl className="about__facts intro" style={{ "--d": "640ms" }}>
              {site.facts.map((f) => (
                <div className="about__fact" key={f.id}>
                  <dt className="label">{L(f.label)}</dt>
                  <dd>{L(f.value)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="about-page__photo intro intro--object" style={{ "--d": "300ms" }}>
            <BioPortrait src={bioPortrait.src} alt={t("links.avatarAlt")} place={bioPortrait.place} />
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="about-more">
        <div className="container">
          <Reveal as="p" className="section-header__index" data-progress>
            <span className="label">02</span>
            <span className="section-header__rule" aria-hidden="true" />
            <span className="label">{t("about.details")}</span>
          </Reveal>
          <Reveal as="h2" id="about-more" className="h2 about-page__h2"><SplitText text={t("about.moreTitle")} step={80} /></Reveal>
          <ol className="about-index">
            {site.about.sections.map((s, n) => {
              const text = L(s.text);
              return (
                <Reveal as="li" className="about-index__row" key={s.title["en-US"]} delay={n * 80} variant="side">
                  <span className="about-index__num">{String(n + 1).padStart(2, "0")}</span>
                  <h3 className="about-index__title">{L(s.title)}</h3>
                  <div className={`about-index__text${text.startsWith("TODO") ? " todo" : ""}`}>
                    {text.split("\n").map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section section--tight" aria-label="Stack">
        <div className="container"><StackGroups /></div>
      </section>

      <section className="section section--contact" aria-labelledby="about-next">
        <div className="container">
          <Reveal className="contact-panel about-page__next" data-tilt variant="scale">
            <span className="contact-panel__light" aria-hidden="true" />
            <div className="contact-panel__content">
              <h2 id="about-next" className="contact-panel__title"><SplitText text={t("about.nextTitle")} step={90} /></h2>
              <p className="section-header__sub">{t("about.nextText")}</p>
              <div className="hero__cta">
                <Link to="/projects" className="btn btn--solid" data-magnetic>{t("hero.viewProjects")} <ArrowUpRight size={16} aria-hidden="true" /></Link>
                <Link to="/contact" className="btn" data-magnetic>{t("nav.contact")} <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
