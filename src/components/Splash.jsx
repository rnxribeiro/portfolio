import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";

// Tela de carregamento: aparece uma vez a cada abertura do site (não nas trocas de página).
// Some quando passou o tempo mínimo E as fontes/imagens terminaram de carregar (com limite máximo).
// Com "reduzir movimento" ativo no sistema, ela não aparece.
const cfg = site.splash;

function shouldShow(pathname) {
  if (!cfg.enabled) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return !cfg.excludePaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export default function Splash() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const [phase, setPhase] = useState(() => (shouldShow(pathname) ? "show" : "gone")); // show → hide → gone

  // enquanto a tela está visível: trava a rolagem e segura as animações de entrada da página
  useLayoutEffect(() => {
    if (phase !== "show") return;
    const root = document.documentElement;
    root.classList.add("is-loading");
    return () => root.classList.remove("is-loading");
  }, [phase]);

  useEffect(() => {
    if (phase !== "show") return;
    let cancelled = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    const loaded = document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true }));

    Promise.race([Promise.all([wait(cfg.minMs), fonts, loaded]), wait(cfg.maxMs)]).then(() => {
      if (!cancelled) setPhase("hide");
    });
    return () => { cancelled = true; };
  }, [phase]);

  useEffect(() => {
    if (phase !== "hide") return;
    const id = setTimeout(() => setPhase("gone"), 500);
    return () => clearTimeout(id);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div className={`splash${phase === "hide" ? " is-hiding" : ""}`} role="status" aria-live="polite" style={{ "--splash-ms": `${cfg.minMs}ms` }}>
      <span className="sr-only">{t("splash.loading")}</span>
      <div className="splash__inner" aria-hidden="true">
        <span className="splash__mark">{site.brand}</span>
        <span className="splash__handle">{site.handle}</span>
        <span className="splash__bar" />
      </div>
    </div>
  );
}
