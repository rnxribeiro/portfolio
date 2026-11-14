import { ArrowUpRight, LayoutGrid } from "lucide-react";
import SocialIcon from "./SocialIcon.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";

// Card do bento de projetos: um painel visual discreto (print da interface, ou um ícone quando não há imagem)
// e as informações ao lado: nome, descrição, tecnologias e links. A seta do canto abre o projeto.
// O tamanho do card no grid vem do CSS (.projects > :nth-child), formando um bento assimétrico.
export default function ProjectCard({ project: p, delay = 0 }) {
  const { t, L } = useLang();
  const ext = { target: "_blank", rel: "noopener noreferrer" };
  const main = p.link || p.github;

  return (
    <Reveal as="article" className="pcard" delay={delay}>
      <div className={`pcard__visual${p.imageInvert ? " is-inverted" : ""}`}>
        {p.image ? (
          <img src={p.image} alt={t("card.shot", { name: p.title })} loading="lazy" decoding="async" />
        ) : (
          <span className="pcard__glyph" aria-hidden="true"><LayoutGrid size={30} strokeWidth={1.25} /></span>
        )}
      </div>
      <div className="pcard__body">
        <p className="pcard__cat">{L(p.category)}</p>
        <h3 className="pcard__title">{p.title}</h3>
        <p className="pcard__desc">{L(p.description)}</p>
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
      {main && (
        <a className="pcard__go" href={main} aria-label={p.link ? t("card.view", { name: p.title }) : t("card.code", { name: p.title })} {...ext}>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
    </Reveal>
  );
}
