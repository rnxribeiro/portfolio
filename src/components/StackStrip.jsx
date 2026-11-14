import { useState } from "react";
import { stack } from "../data/stack.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import ToolIcon, { hasToolIcon } from "./ToolIcon.jsx";

const items = stack.strip
  .filter(hasToolIcon)
  .map((name) => ({ name, group: stack.groups.find((g) => g.items.includes(name))?.label }));

// Faixa de logos da stack. Um item por vez fica "em destaque" (cartão branco + barrinha que enche);
// quando a barra termina, o destaque passa para o próximo. Passar o mouse ou focar pausa.
// Com "reduzir movimento", a barra não anima e o destaque só muda no clique.
export default function StackStrip() {
  const { t, L } = useLang();
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section className="strip" aria-label={L(stack.title)}>
      <div className="container">
        <ul className="strip__row">
          {items.map((it, i) => (
            <li key={it.name}>
              <button type="button" className="strip__item" aria-label={it.name} aria-pressed={i === active} onClick={() => setActive(i)}>
                <ToolIcon name={it.name} size={20} />
                <span className="strip__name">{it.name}</span>
                {i === active && <span className="strip__bar" aria-hidden="true" onAnimationEnd={(e) => e.animationName === "fill" && setActive((i + 1) % items.length)} />}
              </button>
            </li>
          ))}
        </ul>
        <p className="strip__caption" key={current.name}>
          <strong>{current.name}</strong>
          <span>{t("stack.caption")}{current.group ? ` · ${L(current.group)}` : ""}</span>
        </p>
      </div>
    </section>
  );
}
