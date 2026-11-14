import { useEffect, useRef, useState } from "react";

// Faz o elemento aparecer (sobe 16px saindo de um leve desfoque) quando entra na tela.
// - delay: atraso em ms (escalona itens de uma lista) · as: tag HTML (o resto das props vai direto para ela)
// Sem IntersectionObserver ou com "reduzir movimento" ativo no sistema, o conteúdo aparece direto.
const skipMotion = () =>
  typeof window === "undefined" ||
  !("IntersectionObserver" in window) ||
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(skipMotion);

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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { ...style, "--reveal-delay": `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
