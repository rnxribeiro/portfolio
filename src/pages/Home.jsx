import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { site } from "../data/site.js";
import { projects } from "../data/projects.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";
import Hero from "../components/Hero.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import GithubActivity from "../components/GithubActivity.jsx";
import ContactCard from "../components/ContactCard.jsx";
import ExperienceList from "../components/ExperienceList.jsx";
import Reveal from "../components/Reveal.jsx";
import SplitText from "../components/SplitText.jsx";
import ScrollWords from "../components/ScrollWords.jsx";
import BioPortrait from "../components/BioPortrait.jsx";
import { bioPortrait } from "../data/bio.js";
import Marquee from "../components/Marquee.jsx";
import { stack } from "../data/stack.js";

const stackWords = stack.groups.flatMap((g) => g.items);

// Qual card de projeto está no centro da tela (alimenta o contador "01 / 03" da coluna fixa).
function useActiveIndex(ref) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const cards = ref.current?.querySelectorAll("[data-index]");
    if (!cards?.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.index))),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [ref]);
  return active;
}

export default function Home() {
  const { t, L } = useLang();
  useDocumentMeta({ title: L(seo.home.title), description: L(seo.home.description) });
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const listRef = useRef(null);
  const active = useActiveIndex(listRef);
  const total = String(featured.length).padStart(2, "0");

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      <Hero onNext={scrollTo("projects")} onScroll={scrollTo("about")} />

      {/* STACK — faixa discreta correndo devagar entre dois fios */}
      <section className="stack-band" aria-label={L(stack.title)}>
        <div className="container">
          <Reveal><Marquee items={stackWords} label={L(stack.title)} /></Reveal>
        </div>
      </section>

      {/* SOBRE — retrato em moldura de vidro 3D à esquerda; texto que acende ao rolar e fatos à direita */}
      <section className="section about" id="about" aria-labelledby="about-title">
        <div className="container about__grid">
          <Reveal className="about__photo" variant="scale">
            <BioPortrait src={bioPortrait.src} alt={t("links.avatarAlt")} place={bioPortrait.place} />
          </Reveal>
          <div className="about__body">
            <Reveal as="p" className="section-header__index" data-progress>
              <span className="label">01</span>
              <span className="section-header__rule" aria-hidden="true" />
              <span className="label">{t("nav.about")}</span>
            </Reveal>
            <Reveal as="h2" id="about-title" className="h2 about__title"><SplitText text={t("home.aboutTitle")} step={80} /></Reveal>
            <ScrollWords text={L(site.about.preview)} className="about__statement" />
            <dl className="about__facts">
              {site.facts.map((f, n) => (
                <Reveal className="about__fact" key={f.id} delay={n * 90}>
                  <dt className="label">{L(f.label)}</dt>
                  <dd>{L(f.value)}</dd>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={200}>
              <Link to="/about" className="btn" data-magnetic>{t("common.learnMore")} <ArrowRight size={16} aria-hidden="true" /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROJETOS — coluna fixa com contador enquanto os cards correm ao lado */}
      <section className="section projects" id="projects" aria-labelledby="projects-title">
        <div className="container projects__grid">
          <div className="projects__aside">
            <SectionHeader
              id="projects-title" index="02" label={t("nav.projects")} title={t("projects.title")} subtitle={t("home.projectsSub")}
              action={<Link to="/projects" className="link-arrow">{t("home.viewAllProjects")} <ArrowRight size={14} aria-hidden="true" /></Link>}
            />
            <p className="projects__counter" aria-live="polite">
              <span className="sr-only">{t("home.projectsCount", { n: active + 1, total: featured.length })}</span>
              <span aria-hidden="true">
                <span className="projects__counter-now" key={active}>{String(active + 1).padStart(2, "0")}</span>
                <span className="projects__counter-total"> / {total}</span>
              </span>
            </p>
          </div>
          <div className="projects__list" ref={listRef}>
            {featured.map((p, n) => <ProjectCard key={p.id} project={p} index={n} />)}
          </div>
        </div>
      </section>

      {/* TRAJETÓRIA */}
      <section className="section" aria-labelledby="exp-title">
        <div className="container">
          <SectionHeader
            id="exp-title" index="03" label={t("home.expLabel")} title={t("home.expTitle")} subtitle={t("home.expSub")}
            action={<Link to="/experience" className="link-arrow">{t("home.expMore")} <ArrowRight size={14} aria-hidden="true" /></Link>}
          />
          <ExperienceList />
        </div>
      </section>

      {/* GITHUB */}
      <section className="section" aria-labelledby="github-title">
        <div className="container">
          <SectionHeader
            id="github-title" index="04" label="GitHub" title="GitHub" subtitle={t("gh.sub")}
            action={<Link to="/github" className="link-arrow">{t("home.githubMore")} <ArrowRight size={14} aria-hidden="true" /></Link>}
          />
          <GithubActivity weeks={40} showRepos={false} />
        </div>
      </section>

      {/* CONTATO — painel de vidro que inclina com o cursor */}
      <section className="section section--contact" aria-labelledby="contact-title">
        <div className="container">
          <Reveal className="contact-panel" data-tilt variant="scale">
            <span className="contact-panel__light" aria-hidden="true" />
            <div className="contact-panel__content">
              <p className="section-header__index">
                <span className="label">05</span>
                <span className="section-header__rule" aria-hidden="true" />
                <span className="label">{t("nav.contact")}</span>
              </p>
              <h2 id="contact-title" className="contact-panel__title"><SplitText text={L(site.contact.headline)} step={110} /></h2>
              <p className="section-header__sub">{L(site.contact.text)}</p>
              <ContactCard size="md" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
