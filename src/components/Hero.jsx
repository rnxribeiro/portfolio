import { ArrowUpRight } from "lucide-react";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import Rich from "./Rich.jsx";

// Hero: rótulo, título em dois tons, texto curto e um botão. À direita, um arco abstrato muito discreto
// (só CSS, decorativo). Sem fotos. Cada bloco entra em sequência (.intro + --d).
export default function Hero({ onNext }) {
  const { t, L } = useLang();
  const h = site.hero;
  const d = (ms) => ({ "--d": `${ms}ms` });

  return (
    <section className="hero" aria-labelledby="hero-title">
      <span className="hero__arc" aria-hidden="true"><span /></span>
      <div className="container hero__inner">
        <p className="eyebrow intro" style={d(80)}>{L(h.label)}</p>
        <h1 id="hero-title" className="hero__title intro" style={d(180)}><Rich text={L(h.headline)} /></h1>
        <p className="hero__text intro" style={d(300)}>{L(h.intro)}</p>
        <div className="intro" style={d(400)}>
          <a className="btn" href="#projects" onClick={onNext}>
            {t("hero.explore")} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <a className="hero__scroll intro" style={d(560)} href="#projects" onClick={onNext}>{t("hero.scroll")}</a>
      </div>
    </section>
  );
}
