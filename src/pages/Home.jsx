import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { site } from "../data/site.js";
import { projects } from "../data/projects.js";
import { experience } from "../data/experience.js";
import { stack } from "../data/stack.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";
import Hero from "../components/Hero.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import GithubActivity from "../components/GithubActivity.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import Reveal from "../components/Reveal.jsx";
import Rich from "../components/Rich.jsx";

const pad = (n) => String(n).padStart(2, "0");

export default function Home() {
  const { t, L } = useLang();
  useDocumentMeta({ title: L(seo.home.title), description: L(seo.home.description) });
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  const toProjects = (e) => {
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("projects")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const viewAll = (to, key) => (
    <Link to={to} className="link-arrow">{t(key)} <ArrowUpRight size={14} aria-hidden="true" /></Link>
  );

  return (
    <>
      <Hero onNext={toProjects} />

      {/* PROJETOS — bento assimétrico */}
      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="container">
          <SectionHeader id="projects-title" tag={t("home.projectsLabel")} action={viewAll("/projects", "home.viewAllProjects")} />
          <div className="projects">
            {featured.map((p, n) => <ProjectCard key={p.id} project={p} delay={(n % 2) * 90} />)}
          </div>
        </div>
      </section>

      {/* SOBRE — título, texto e áreas de atuação em três colunas */}
      <section className="section" id="about" aria-labelledby="about-title">
        <div className="container">
          <SectionHeader id="about-title" tag={t("home.aboutLabel")} />
          <div className="about-row">
            <Reveal as="p" className="about-row__title"><Rich text={L(site.about.headline)} /></Reveal>
            <Reveal className="about-row__text" delay={90}>
              <p>{L(site.about.preview)}</p>
              {viewAll("/about", "common.learnMore")}
            </Reveal>
            <Reveal as="ol" className="areas" delay={180}>
              {site.about.areas.map((a, n) => (
                <li key={L(a)}><span>{pad(n + 1)}</span>{L(a)}</li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIA & SKILLS — bento: trajetória, ferramentas e GitHub */}
      <section className="section" id="experience" aria-labelledby="exp-title">
        <div className="container">
          <SectionHeader id="exp-title" tag={t("home.expSkills")} action={viewAll("/experience", "home.expMore")} />
          <div className="bento">
            <Reveal className="bento__card bento__card--wide">
              <ol className="timeline">
                {experience.map((e) => (
                  <li key={e.location}>
                    <p className="timeline__period">{L(e.period)}</p>
                    <h3 className="timeline__role">{L(e.role)}</h3>
                    <p className="timeline__org">{e.location}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal className="bento__card bento__card--skills" delay={80}>
              <p className="eyebrow">{t("home.skills")}</p>
              <dl className="skills">
                {stack.groups.map((g) => (
                  <div key={g.label["en-US"]}>
                    <dt>{L(g.label)}</dt>
                    <dd>{g.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="bento__card bento__card--gh" delay={160}>
              <div className="bento__head">
                <p className="eyebrow">GitHub</p>
                {viewAll("/github", "home.githubMore")}
              </div>
              <GithubActivity weeks={18} showRepos={false} />
            </Reveal>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
