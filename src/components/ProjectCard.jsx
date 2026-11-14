import { ArrowUpRight } from "lucide-react";
import SocialIcon from "./SocialIcon.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";

// Card de projeto: número, título e seta no topo, barrinha, descrição, tecnologias, links e a imagem embaixo.
// Projeto sem imagem → card escuro com o nome em tipografia gigante (nada de interface inventada).
export default function ProjectCard({ project: p, index = 0, total = 1, delay = 0 }) {
  const { t, L } = useLang();
  const ext = { target: "_blank", rel: "noopener noreferrer" };
  const pad = (n) => String(n).padStart(2, "0");
  const main = p.link || p.github;

  return (
    <Reveal as="article" className={`pcard${p.image ? "" : " pcard--dark"}`} delay={delay}>
      <header className="pcard__head">
        <div>
          <p className="pcard__num">{pad(index + 1)}<span> / {pad(total)}</span> · {L(p.category)}</p>
          <h3 className="pcard__title">{p.title}</h3>
        </div>
        {main && (
          <a className="pcard__go" href={main} aria-label={p.link ? t("card.view", { name: p.title }) : t("card.code", { name: p.title })} {...ext}>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        )}
      </header>
      <span className="pcard__bar" aria-hidden="true" />
      <p className="pcard__desc">{L(p.description)}</p>

      <div className="pcard__foot">
        <ul className="chips" aria-label={t("card.stack")}>
          {p.technologies.map((tech) => <li key={tech} className="chip">{tech}</li>)}
        </ul>
        <div className="pcard__links">
          {p.github && (
            <a href={p.github} {...ext}><SocialIcon name="github" size={13} /> {t("card.codeLabel")}<span className="sr-only"> {t("links.external")}</span></a>
          )}
          {p.link ? (
            <a href={p.link} {...ext}>{t("card.demo")} <ArrowUpRight size={13} aria-hidden="true" /><span className="sr-only"> {t("links.external")}</span></a>
          ) : (
            <span className="is-off">{t("common.comingSoon")}</span>
          )}
        </div>
      </div>

      <div className={`pcard__media${p.imageInvert ? " is-inverted" : ""}`}>
        {p.image ? (
          <img src={p.image} alt={t("card.shot", { name: p.title })} loading="lazy" decoding="async" />
        ) : (
          <span className="pcard__type" aria-hidden="true">{p.title}</span>
        )}
      </div>
    </Reveal>
  );
}
