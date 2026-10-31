import { stack } from "../data/stack.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";
import SplitText from "./SplitText.jsx";

// Ferramentas: um painel de vidro por grupo (inclina com o cursor e ganha reflexo, como os cards de projeto).
// Cada painel mostra o nome do grupo, a contagem em número grande e as ferramentas numeradas em duas colunas.
// Só os itens de src/data/stack.js — sem níveis nem habilidades inventadas.
export default function StackGroups() {
  const { L } = useLang();
  return (
    <div className="toolbox">
      <Reveal as="header" className="toolbox__head" data-progress>
        <p className="section-header__index">
          <span className="label">{stack.label}</span>
          <span className="section-header__rule" aria-hidden="true" />
        </p>
        <h2 className="h2 toolbox__title"><SplitText text={L(stack.title)} step={80} /></h2>
      </Reveal>
      <div className="toolbox__groups">
        {stack.groups.map((g, n) => (
          <Reveal as="section" className="tool-panel" key={g.label["en-US"]} delay={n * 110} variant="scale" data-tilt aria-label={L(g.label)}>
            <span className="tool-panel__light" aria-hidden="true" />
            <header className="tool-panel__head">
              <span className="label">{L(g.label)}</span>
              <span className="tool-panel__count" aria-hidden="true">{String(g.items.length).padStart(2, "0")}</span>
            </header>
            <ul className="tool-panel__list">
              {g.items.map((item, i) => (
                <li key={item} className="tool-panel__item">
                  <span className="tool-panel__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
