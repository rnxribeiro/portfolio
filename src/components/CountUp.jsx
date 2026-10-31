import { useEffect, useRef, useState } from "react";

// Número que conta de 0 até o valor quando entra na tela. Valores não numéricos ("…", "—") aparecem direto.
export default function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null);
  const numeric = typeof value === "number" && Number.isFinite(value);
  const [shown, setShown] = useState(numeric ? 0 : value);

  useEffect(() => {
    if (!numeric) { setShown(value); return; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { setShown(value); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        setShown(Math.round(value * (1 - Math.pow(2, -10 * p))));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setShown(value);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, numeric, duration]);

  return <span ref={ref}>{shown}</span>;
}
