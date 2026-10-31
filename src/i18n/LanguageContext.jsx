import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ui } from "./ui.js";

export const LANGS = ["pt-BR", "en-US"];
const STORAGE_KEY = "rnx:lang";
const Ctx = createContext(null);

// Idioma principal: pt-BR. Só muda se a pessoa escolher en-US (a escolha fica salva no navegador).
function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch { /* storage indisponível */ }
  return "pt-BR";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const setLang = (next) => {
      setLangState(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
    };
    // L → resolve um texto de dados: string simples ou objeto { "pt-BR": "...", "en-US": "..." }
    const L = (v) => (v && typeof v === "object" ? v[lang] ?? v["pt-BR"] : v);
    // t → texto da interface (src/i18n/ui.js), com variáveis {nome}
    const t = (key, vars) => {
      let s = ui[lang][key] ?? ui["pt-BR"][key] ?? key;
      if (vars) for (const k of Object.keys(vars)) s = s.replaceAll(`{${k}}`, vars[k]);
      return s;
    };
    return { lang, setLang, L, t };
  }, [lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

// Idioma fixo para um trecho do app (ex.: as páginas /bio, sempre em pt-BR). Não grava a escolha no navegador
// e, ao sair, devolve o atributo lang da página ao idioma que a pessoa usa no resto do site.
export function FixedLanguage({ lang, children }) {
  const outer = useContext(Ctx);
  useEffect(() => {
    const previous = document.documentElement.lang;
    // depois do provedor de fora, que também define o lang da página no mesmo ciclo
    queueMicrotask(() => { document.documentElement.lang = lang; });
    return () => { document.documentElement.lang = previous; };
  }, [lang]);
  const value = useMemo(() => {
    const L = (v) => (v && typeof v === "object" ? v[lang] ?? v["pt-BR"] : v);
    const t = (key, vars) => {
      let s = ui[lang][key] ?? ui["pt-BR"][key] ?? key;
      if (vars) for (const k of Object.keys(vars)) s = s.replaceAll(`{${k}}`, vars[k]);
      return s;
    };
    return { lang, setLang: outer?.setLang ?? (() => {}), L, t };
  }, [lang, outer]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
