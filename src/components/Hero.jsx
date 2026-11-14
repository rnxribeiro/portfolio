import { Link } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";
import { site } from "../data/site.js";
import { socials, heroSocials } from "../data/socials.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import Rich from "./Rich.jsx";
import SlashLinks from "./SlashLinks.jsx";

const heroLinks = socials.filter((s) => heroSocials.includes(s.name) && !s.placeholder);

// Hero centralizado: avatar com adesivo do nome, selo "Agora", título em dois tons com palavra em destaque,
// texto curto, dois botões e as redes. Cada bloco entra em sequência (.intro + --d).
export default function Hero({ onNext }) {
  const { t, L } = useLang();
  const h = site.hero;
  const d = (ms) => ({ "--d": `${ms}ms` });

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__avatar intro" style={d(80)}>
          <span className="hero__photo"><img src={h.photo} alt={L(h.photoAlt)} width="104" height="104" fetchPriority="high" /></span>
          <span className="sticker">{site.name} <span aria-hidden="true">👋</span></span>
        </div>

        <Link to={h.badge.to} className="badge intro" style={d(180)}>
          <span className="badge__tag">{L(h.badge.tag)}</span>
          {L(h.badge.text)}
          <ChevronRight size={14} aria-hidden="true" />
        </Link>

        <h1 id="hero-title" className="display hero__title intro" style={d(260)}>
          <Rich text={L(h.headline)} />
        </h1>
        <p className="hero__lead intro" style={d(360)}>{L(h.tagline)}</p>

        <div className="hero__cta intro" style={d(460)}>
          <a className="btn btn--dark" href="#projects" onClick={onNext}>
            <Sparkles size={15} aria-hidden="true" /> {t("hero.viewProjects")}
          </a>
          <Link className="btn" to="/contact">
            <img className="btn__avatar" src={h.photo} alt="" width="22" height="22" /> {t("hero.chat")}
          </Link>
        </div>

        <SlashLinks items={heroLinks} label={t("hero.findMe")} className="hero__social intro" />
      </div>
    </section>
  );
}
