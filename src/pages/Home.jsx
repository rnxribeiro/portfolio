import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, AppWindow, Plug, Database, Download } from "lucide-react";
import { site } from "../data/site.js";
import { projects } from "../data/projects.js";
import { bioPortrait } from "../data/bio.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";
import Hero from "../components/Hero.jsx";
import StackStrip from "../components/StackStrip.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import GithubActivity from "../components/GithubActivity.jsx";
import ExperienceList from "../components/ExperienceList.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import Reveal from "../components/Reveal.jsx";
import Rich from "../components/Rich.jsx";

const serviceIcons = { app: AppWindow, plug: Plug, database: Database };

export default function Home() {
  const { t, L } = useLang();
  useDocumentMeta({ title: L(seo.home.title), description: L(seo.home.description) });
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  const toProjects = (e) => {
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("projects")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      <Hero onNext={toProjects} />
      <StackStrip />

      {/* SOBRE — retrato à esquerda, "cartão de missão" à direita */}
      <section className="section" id="about" aria-labelledby="about-title">
        <div className="container about">
          <Reveal className="portrait">
            <img src={bioPortrait.src} alt={t("links.avatarAlt")} loading="lazy" decoding="async" />
            <span className="portrait__chip"><span className="dot" aria-hidden="true" />{L(bioPortrait.place)}</span>
            <span className="portrait__name">
              <strong>{site.name}</strong>
              <span>{L(site.hero.role)}</span>
            </span>
          </Reveal>

          <Reveal className="card about__card" delay={100}>
            <span className="pill pill--flat">{t("home.aboutTag")}</span>
            <h2 id="about-title" className="h3 about__title"><Rich text={t("home.aboutTitle")} /></h2>
            <p className="about__text">{L(site.about.preview)}</p>
            <dl className="facts">
              {site.facts.map((f) => (
                <div key={f.id}>
                  <dt>{L(f.label)}:</dt>
                  <dd>{L(f.value)}</dd>
                </div>
              ))}
            </dl>
            <div className="about__actions">
              <Link to="/about" className="btn btn--dark">{t("common.learnMore")} <ArrowRight size={15} aria-hidden="true" /></Link>
              {site.cv && <a className="btn" href={site.cv} download>{t("hero.cv")} <Download size={15} aria-hidden="true" /></a>}
            </div>
          </Reveal>
        </div>
      </section>

      {/* O QUE EU FAÇO — três cards com ícone num círculo escuro */}
      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <SectionHeader id="services-title" tag={t("home.servicesTag")} title={t("home.servicesTitle")} sub={t("home.servicesSub")} />
          <div className="services">
            {site.services.map((s, n) => {
              const Icon = serviceIcons[s.icon] || AppWindow;
              return (
                <Reveal className="service" key={s.icon} delay={n * 90}>
                  <span className="service__icon" aria-hidden="true"><Icon size={18} strokeWidth={1.75} /></span>
                  <h3>{L(s.title)}</h3>
                  <p>{L(s.text)}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="container">
          <SectionHeader
            id="projects-title" tag={t("home.projectsTag")} title={t("home.projectsTitle")} sub={t("projects.sub")}
          />
          <div className="projects">
            {featured.map((p, n) => <ProjectCard key={p.id} project={p} index={n} total={featured.length} delay={(n % 2) * 100} />)}
          </div>
          <Reveal className="more">
            <Link to="/projects" className="btn">{t("home.viewAllProjects")} <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      {/* TRAJETÓRIA */}
      <section className="section" aria-labelledby="exp-title">
        <div className="container container--narrow">
          <SectionHeader id="exp-title" tag={t("home.expTag")} title={t("home.expHeading")} sub={t("home.expSub")} />
          <ExperienceList />
          <Reveal className="more">
            <Link to="/experience" className="btn">{t("home.expMore")} <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      {/* GITHUB */}
      <section className="section" aria-labelledby="github-title">
        <div className="container">
          <SectionHeader id="github-title" tag={t("home.ghTag")} title={t("home.ghTitle")} />
          <GithubActivity weeks={40} showRepos={false} />
          <Reveal className="more">
            <Link to="/github" className="btn">{t("home.githubMore")} <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
