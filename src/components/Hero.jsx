import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { site } from "../data/site.js";
import { socials, heroSocials } from "../data/socials.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import SocialIcon from "./SocialIcon.jsx";
import SplitText from "./SplitText.jsx";
import GlassPrism from "./GlassPrism.jsx";

const heroLinks = socials.filter((s) => heroSocials.includes(s.name) && !s.placeholder);

// Hero: conteúdo à esquerda (selo, nome, identidade, descrição, ações, redes) e a lâmina de vidro 3D à direita.
// data-progress="exit": ao rolar, o texto sobe e esmaece e a lâmina inclina para trás (ver .hero no CSS).
export default function Hero({ onNext, onScroll }) {
  const { t, L } = useLang();
  const h = site.hero;
  const ext = { target: "_blank", rel: "noopener noreferrer" };

  return (
    <section className="hero" aria-labelledby="hero-title" data-progress="exit">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow intro" style={{ "--d": "120ms" }}>
            <span className="eyebrow__dot" aria-hidden="true" />{t("hero.portfolio")} — {site.year}
          </p>
          <h1 id="hero-title" className="hero__name"><SplitText text={site.name} delay={220} step={130} /></h1>
          <p className="hero__role intro" style={{ "--d": "560ms" }}>{L(h.role)}</p>
          <p className="hero__tagline intro" style={{ "--d": "650ms" }}>{L(h.tagline)}</p>

          <div className="hero__cta intro" style={{ "--d": "760ms" }}>
            <a className="btn btn--solid" href="#projects" onClick={onNext} data-magnetic>
              {t("hero.viewProjects")} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            {site.cv ? (
              <a className="btn" href={site.cv} download data-magnetic>
                {t("hero.viewCv")} <Download size={16} aria-hidden="true" />
              </a>
            ) : (
              <button type="button" className="btn" aria-disabled="true" aria-label={`${t("hero.viewCv")} (${t("common.soon")})`}>
                {t("hero.viewCv")} <Download size={16} aria-hidden="true" />
              </button>
            )}
            <Link to="/contact" className="link-arrow">{t("hero.contact")} <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>

          <div className="hero__social intro" style={{ "--d": "880ms" }}>
            <p className="label">{t("hero.findMe")}</p>
            <ul>
              {heroLinks.map((s) => (
                <li key={s.name}>
                  <a href={s.url} {...ext}>
                    <SocialIcon name={s.icon} size={15} />{s.name}
                    <span className="sr-only"> {t("links.external")}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero__object intro intro--object" style={{ "--d": "350ms" }}>
          <GlassPrism />
        </div>
      </div>

      <a className="hero__scroll intro" style={{ "--d": "1100ms" }} href="#about" onClick={onScroll}>
        <span className="label">{t("hero.scroll")}</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
