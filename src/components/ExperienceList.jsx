import { Check } from "lucide-react";
import { experience } from "../data/experience.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";

// Trajetória em cards: à esquerda o período e o local; à direita o cargo, o resumo e os destaques com ✓.
// detailed → versão completa (página /experience) com os blocos de details.
export default function ExperienceList({ detailed = false }) {
  const { L } = useLang();
  return (
    <ol className="xp">
      {experience.map((e, n) => (
        <Reveal as="li" className="xp__item" key={`${e.location}-${n}`} delay={n * 90}>
          <div className="xp__aside">
            <span className="pill pill--flat">{L(e.period)}</span>
            <p className="xp__org">{e.location}</p>
          </div>
          <div className="xp__body">
            <h3 className="xp__role">{L(e.role)}</h3>
            <p className="xp__summary">{L(e.summary)}</p>
            {detailed && e.details ? (
              <div className="xp__details">
                {e.details.map((d) => (
                  <div className="xp__detail" key={d.title["en-US"]}>
                    <h4>{L(d.title)}</h4>
                    <p>{L(d.text)}</p>
                  </div>
                ))}
              </div>
            ) : e.highlights && (
              <ul className="checks">
                {e.highlights.map((h, i) => <li key={i}><Check size={14} aria-hidden="true" />{L(h)}</li>)}
              </ul>
            )}
            {e.tags && (
              <ul className="chips" aria-label="Tags">
                {e.tags.map((tg) => <li key={tg} className="chip">{tg}</li>)}
              </ul>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
