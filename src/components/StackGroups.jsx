import { stack } from "../data/stack.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";
import ToolIcon from "./ToolIcon.jsx";

// Ferramentas em bento: um card por grupo, com contagem, barrinha e as ferramentas em pílulas com logo.
// Só os itens de src/data/stack.js — sem níveis nem habilidades inventadas.
export default function StackGroups() {
  const { L } = useLang();
  return (
    <div className="tools">
      {stack.groups.map((g, n) => (
        <Reveal as="section" className="tools__card" key={g.label["en-US"]} delay={n * 80} aria-label={L(g.label)}>
          <header className="tools__head">
            <h3>{L(g.label)}</h3>
            <span className="tools__count" aria-hidden="true">{String(g.items.length).padStart(2, "0")}</span>
          </header>
          <span className="pcard__bar" aria-hidden="true" />
          <ul className="tools__list">
            {g.items.map((item) => (
              <li key={item} className="tools__item"><ToolIcon name={item} size={15} />{item}</li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
