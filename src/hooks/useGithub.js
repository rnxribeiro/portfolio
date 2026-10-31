import { useEffect, useState } from "react";
import { githubConfig } from "../data/github.js";

// Usa só a API pública do GitHub (sem token, sem backend).
// Limite sem autenticação: 60 requisições/hora por IP — por isso guardamos o resultado
// no sessionStorage por 30 minutos. Se algo falhar, devolvemos status "error" e a UI usa o fallback.

const CACHE_KEY = "rnx:github:v1";
const TTL = 30 * 60 * 1000;

async function load(username) {
  const base = `https://api.github.com/users/${username}`;
  const [user, repos, events] = await Promise.all([
    fetch(base).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
    fetch(`${base}/repos?per_page=100&sort=updated`).then((r) => (r.ok ? r.json() : [])),
    Promise.all([1, 2, 3].map((p) => fetch(`${base}/events/public?per_page=100&page=${p}`).then((r) => (r.ok ? r.json() : [])))).then((x) => x.flat()),
  ]);

  // atividade por dia: commits em push + 1 por outro evento
  const perDay = {};
  for (const e of events) {
    const day = e.created_at.slice(0, 10);
    const n = e.type === "PushEvent" ? e.payload?.size || 1 : 1;
    perDay[day] = (perDay[day] || 0) + n;
  }

  return {
    followers: user.followers,
    publicRepos: user.public_repos,
    createdAt: user.created_at,
    perDay,
    eventCount: events.length,
    repos: repos.map((r) => ({ name: r.name, description: r.description, stars: r.stargazers_count, forks: r.forks_count, url: r.html_url, fork: r.fork })),
  };
}

export function useGithub(username = githubConfig.username) {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    let alive = true;
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
      if (cached && Date.now() - cached.at < TTL) {
        setState({ status: "ok", data: cached.data });
        return;
      }
    } catch { /* cache indisponível */ }

    load(username)
      .then((data) => {
        if (!alive) return;
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data })); } catch { /* ignore */ }
        setState({ status: "ok", data });
      })
      .catch(() => alive && setState({ status: "error", data: null }));

    return () => { alive = false; };
  }, [username]);

  return state;
}
