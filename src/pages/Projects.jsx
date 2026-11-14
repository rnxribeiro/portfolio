import { useMemo, useState } from "react";
import { projects } from "../data/projects.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";
import ProjectCard from "../components/ProjectCard.jsx";
import FilterBar from "../components/FilterBar.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import Reveal from "../components/Reveal.jsx";

export default function Projects() {
  const { t, L } = useLang();
  useDocumentMeta({ title: L(seo.projects.title), description: L(seo.projects.description) });
  const [cat, setCat] = useState("all");

  // o valor do filtro é o nome em pt-BR (estável); o rótulo exibido segue o idioma atual
  const options = useMemo(() => {
    const seen = new Map();
    projects.forEach((p) => seen.set(p.category["pt-BR"], p.category));
    return [{ value: "all", label: t("common.all") }, ...[...seen].map(([value, c]) => ({ value, label: L(c) }))];
  }, [t, L]);

  const list = cat === "all" ? projects : projects.filter((p) => p.category["pt-BR"] === cat);

  return (
    <div className="page">
      <section className="section section--first" aria-labelledby="projects-h">
        <div className="container">
          <SectionHeader page as="h1" id="projects-h" tag={t("nav.projects")} title={t("projects.rich")} sub={t("projects.sub")} />
          <Reveal className="filters">
            <FilterBar options={options} value={cat} onChange={setCat} label={t("projects.filter")} />
          </Reveal>
          <div className="projects" aria-label={t("projects.list")}>
            {list.map((p, n) => <ProjectCard key={p.id} project={p} index={n} total={list.length} delay={(n % 2) * 100} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
