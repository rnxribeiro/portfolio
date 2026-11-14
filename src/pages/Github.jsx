import { ArrowUpRight } from "lucide-react";
import GithubActivity from "../components/GithubActivity.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import SocialIcon from "../components/SocialIcon.jsx";
import { githubConfig } from "../data/github.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";

export default function Github() {
  const { t, L } = useLang();
  useDocumentMeta({ title: L(seo.github.title), description: L(seo.github.description) });
  return (
    <div className="page">
      <section className="section section--first" aria-labelledby="gh-h">
        <div className="container">
          <SectionHeader
            page as="h1" id="gh-h" tag="GitHub" title={t("gh.rich")} sub={t("gh.note")}
            action={
              <a className="btn btn--dark" href={`https://github.com/${githubConfig.username}`} target="_blank" rel="noopener noreferrer">
                <SocialIcon name="github" size={14} /> github.com/{githubConfig.username} <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            }
          />
          <GithubActivity />
        </div>
      </section>
    </div>
  );
}
