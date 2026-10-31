import { useEffect, useRef, useState } from "react";

// Faz o elemento aparecer (fade + subida leve) quando entra na tela ao rolar a página.
// - delay: atraso em ms (use para escalonar itens de uma lista)
// - as: tag HTML a renderizar (div, section, article, a, li…) — o resto das props vai direto para ela
// Sem IntersectionObserver ou com "reduzir movimento" ativo no sistema, o conteúdo aparece direto.
const skipMotion = () =>
  typeof window === "undefined" ||
  !("IntersectionObserver" in window) ||
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// - variant: "up" (padrão, sobe com leve desfoque), "mask" (recorte que abre de baixo para cima),
//   "scale" (aproxima de leve) ou "side" (entra pela lateral) — cada seção usa o ritmo que combina com ela
export default function Reveal({ as: Tag = "div", delay = 0, instant = false, variant = "up", className = "", style, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(() => instant || skipMotion());

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant}${shown ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { ...style, "--reveal-delay": `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
