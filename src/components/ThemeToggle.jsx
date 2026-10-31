import { useState } from "react";
import { flushSync } from "react-dom";
import { Sun, Moon } from "lucide-react";
import { useLang } from "../i18n/LanguageContext.jsx";

const STORAGE_KEY = "rnx:theme-v2";

// Escuro é o tema padrão; o claro é opcional e a escolha fica salva no navegador.
// O atributo data-theme é aplicado antes do React carregar (script em index.html), evitando "flash".
export default function ThemeToggle() {
  const { t } = useLang();
  const [theme, setTheme] = useState(() => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"));
  const [spin, setSpin] = useState(false);

  const toggle = (e) => {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const apply = () => {
      flushSync(() => setTheme(next));
      root.dataset.theme = next;
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#080808" : "#f6f6f4");
    };
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
    setSpin(true);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return apply();

    if (document.startViewTransition) {
      // o novo tema "abre" em círculo a partir do botão
      const r = e.currentTarget.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      root.style.setProperty("--tx", `${x}px`);
      root.style.setProperty("--ty", `${y}px`);
      root.style.setProperty("--r", `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`);
      document.startViewTransition(apply);
    } else {
      // navegadores sem View Transitions: transição suave de cores
      root.classList.add("theme-fade");
      apply();
      setTimeout(() => root.classList.remove("theme-fade"), 450);
    }
  };

  const label = theme === "dark" ? t("a11y.toLight") : t("a11y.toDark");
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={label} title={label}>
      {theme === "dark"
        ? <Sun key="sun" className={spin ? "icon-spin" : undefined} size={16} aria-hidden="true" />
        : <Moon key="moon" className={spin ? "icon-spin" : undefined} size={16} aria-hidden="true" />}
    </button>
  );
}
