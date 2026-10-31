import { ArrowRight } from "lucide-react";
import GithubActivity from "../components/GithubActivity.jsx";
import { githubConfig } from "../data/github.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";
import Reveal from "../components/Reveal.jsx";

export default function Github() {
  const { t, L } = useLang();
  useDocumentMeta({ title: L(seo.github.title), description: L(seo.github.description) });
  return (
    <div className="page">
      <section className="section section--tight" aria-labelledby="gh-h">
        <Reveal className="container">
          <span className="label section-header__index">04 — GitHub</span>
          <h1 id="gh-h" className="h1">GitHub</h1>
          <p className="lead" style={{ marginTop: "var(--space-4)" }}>{t("gh.sub")}</p>
          <a className="btn" style={{ marginTop: "var(--space-6)" }} href={`https://github.com/${githubConfig.username}`} target="_blank" rel="noopener noreferrer">
            github.com/{githubConfig.username} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </section>
      <section className="section--tight" style={{ paddingTop: 0, paddingBottom: "var(--space-9)" }} aria-label={t("gh.activity")}>
        <div className="container"><GithubActivity /></div>
      </section>
    </div>
  );
}
