import { stack } from "../data/stack.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";

// Ferramentas: um card por grupo, com contagem e os itens em lista. Só os itens de src/data/stack.js —
// sem níveis, porcentagens ou coleções de ícones.
export default function StackGroups() {
  const { L } = useLang();
  return (
    <div className="tools">
      {stack.groups.map((g, n) => (
        <Reveal as="section" className="tools__card" key={g.label["en-US"]} delay={n * 70} aria-label={L(g.label)}>
          <header className="tools__head">
            <h3>{L(g.label)}</h3>
            <span className="tools__count" aria-hidden="true">{String(g.items.length).padStart(2, "0")}</span>
          </header>
          <ul className="tools__list">
            {g.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
