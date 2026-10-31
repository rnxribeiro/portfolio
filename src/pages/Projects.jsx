import { useMemo, useState } from "react";
import { projects } from "../data/projects.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";
import ProjectCard from "../components/ProjectCard.jsx";
import FilterBar from "../components/FilterBar.jsx";
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
      <section className="section section--tight" aria-labelledby="projects-h">
        <Reveal className="container">
          <span className="label section-header__index">02 — {t("nav.projects")}</span>
          <h1 id="projects-h" className="h1">{t("projects.title")}</h1>
          <p className="lead" style={{ marginTop: "var(--space-4)" }}>{t("projects.sub")}</p>
          <div style={{ marginTop: "var(--space-7)" }}>
            <FilterBar options={options} value={cat} onChange={setCat} label={t("projects.filter")} />
          </div>
        </Reveal>
      </section>
      <section className="section--tight" style={{ paddingTop: 0, paddingBottom: "var(--space-9)" }} aria-label={t("projects.list")}>
        <div className="container">
          <div className="grid grid--3">
            {list.map((p, n) => <ProjectCard key={p.id} project={p} index={n} delay={(n % 3) * 90} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
