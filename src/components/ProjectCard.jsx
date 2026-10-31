import { ArrowUpRight } from "lucide-react";
import SocialIcon from "./SocialIcon.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";

// Card de projeto em 3D: o card inclina seguindo o cursor (data-tilt, suavizado pelo motor de movimento),
// a imagem fica no plano do card e desliza dentro dos próprios limites, e o bloco de texto flutua à frente
// (translateZ). Um reflexo acompanha o mouse. data-progress: o preview se revela por recorte ao entrar na tela.
// Sem imagem → placeholder tipográfico com o número e a categoria (nada de interface inventada).
export default function ProjectCard({ project: p, index = 0, delay = 0 }) {
  const { t, L } = useLang();
  const ext = { target: "_blank", rel: "noopener noreferrer" };
  const num = String(index + 1).padStart(2, "0");

  return (
    <Reveal as="article" className="pcard" delay={delay} variant="scale" data-tilt data-progress data-index={index}>
      <div className="pcard__inner">
        <div className="pcard__media">
          {p.image ? (
            <img src={p.image} alt={t("card.shot", { name: p.title })} loading="lazy" decoding="async" />
          ) : (
            <div className="pcard__ph" aria-hidden="true">
              <span className="label">{L(p.category)}</span>
              <span className="pcard__ph-num">{num}</span>
            </div>
          )}
        </div>
        <span className="pcard__light" aria-hidden="true" />

        <div className="pcard__meta">
          <div className="pcard__head">
            <span className="label">{num} · {L(p.category)}</span>
            <h3 className="pcard__title">{p.title}</h3>
          </div>
          <p className="pcard__desc">{L(p.description)}</p>
          <div className="pcard__foot">
            <ul className="tags" aria-label={t("card.stack")}>
              {p.technologies.map((tech) => <li key={tech} className="tag">{tech}</li>)}
            </ul>
            <div className="pcard__links">
              {p.github ? (
                <a className="icon-link" href={p.github} aria-label={t("card.code", { name: p.title })} {...ext}>
                  <SocialIcon name="github" size={15} /> {t("card.codeLabel")}
                </a>
              ) : null}
              {p.link ? (
                <a className="icon-link" href={p.link} aria-label={t("card.view", { name: p.title })} {...ext}>
                  {t("card.demo")} <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ) : (
                <span className="icon-link icon-link--off">{t("common.comingSoon")}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
