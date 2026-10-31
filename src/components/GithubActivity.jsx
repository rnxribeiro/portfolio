import { useMemo } from "react";
import { ArrowUpRight, Star, GitFork } from "lucide-react";
import { useGithub } from "../hooks/useGithub.js";
import { githubConfig } from "../data/github.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";
import CountUp from "./CountUp.jsx";

const dayKey = (d) => d.toISOString().slice(0, 10);
const level = (n) => (n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4);

function buildGrid(perDay, weeks) {
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (weeks * 7 - 1) - end.getUTCDay());
  const cells = [];
  for (let i = 0; i < weeks * 7 + end.getUTCDay() + 1; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    if (d > end) break;
    const n = perDay?.[dayKey(d)] || 0;
    cells.push({ key: dayKey(d), n });
  }
  return cells;
}

export default function GithubActivity({ showRepos = true, showGrid = true, weeks = githubConfig.gridWeeks }) {
  const { t, L } = useLang();
  const { status, data } = useGithub();
  const username = githubConfig.username;
  const cells = useMemo(() => buildGrid(data?.perDay, weeks), [data, weeks]);

  const years = data ? Math.max(1, Math.round((Date.now() - new Date(data.createdAt)) / (365.25 * 864e5))) : null;
  const dash = status === "loading" ? "…" : "—";
  const stats = [
    { label: t("gh.repos"), value: data?.publicRepos ?? dash },
    { label: t("gh.years"), value: years ?? dash },
    { label: t("gh.events"), value: data?.eventCount ?? dash },
    { label: t("gh.followers"), value: data?.followers ?? dash },
  ];

  const featured = githubConfig.featuredRepos.map((f) => {
    const real = data?.repos?.find((r) => r.name.toLowerCase() === f.name.toLowerCase());
    return { name: f.name, description: real?.description || L(f.description), stars: real?.stars, forks: real?.forks, url: real?.url || `https://github.com/${username}/${f.name}`, found: Boolean(real) };
  });

  return (
    <div>
      <dl className="stats">
        {stats.map((s, n) => (
          <Reveal className="stat" key={s.label} delay={n * 80}>
            <dt className="label">{s.label}</dt>
            <dd className="stat__value" style={{ margin: 0 }}><CountUp value={s.value} /></dd>
          </Reveal>
        ))}
      </dl>

      {showGrid && (
        <Reveal className="heat" data-spot variant="scale">
          <div className="heat__scroll">
            <div className="heat__grid" role="img" aria-label={t("gh.gridLabel")}>
              {cells.map((c, i) => (
                <span key={c.key} className="heat__cell" data-l={level(c.n)} title={`${c.key}: ${c.n}`} style={{ "--c": Math.floor(i / 7) }} />
              ))}
            </div>
          </div>
          <div className="heat__foot">
            <span>
              {status === "error" ? t("gh.error") : t("gh.note")}
            </span>
            <span className="heat__legend" aria-hidden="true">
              {t("gh.less")} {[0, 1, 2, 3, 4].map((l) => <span key={l} className="heat__cell" data-l={l} />)} {t("gh.more")}
            </span>
          </div>
        </Reveal>
      )}

      {showRepos && (
        <div style={{ marginTop: "var(--space-8)" }}>
          <h3 className="label" style={{ marginBottom: "var(--space-4)" }}>{t("gh.featured")}</h3>
          <div className="grid grid--4">
            {featured.map((r, n) => (
              <Reveal as="a" key={r.name} className="repo-card" href={r.url} target="_blank" rel="noopener noreferrer" delay={n * 80}>
                <span className="repo-card__name">{r.name}</span>
                <span className="repo-card__desc">{r.description}</span>
                <span className="repo-card__meta">
                  {r.found ? (
                    <>
                      <span><Star size={13} aria-hidden="true" /> {r.stars}</span>
                      <span><GitFork size={13} aria-hidden="true" /> {r.forks}</span>
                    </>
                  ) : (
                    <span>{t("gh.viewOn")} <ArrowUpRight size={13} aria-hidden="true" /></span>
                  )}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
