import { useEffect, useRef } from "react";
import { experience } from "../data/experience.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";

// Linha do tempo: uma linha vertical vai se preenchendo conforme a página rola, e cada marcador
// "acende" quando a linha chega nele (como percorrer uma jornada).
export default function ExperienceList({ detailed = false }) {
  const { L } = useLang();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6; // altura da tela onde a "ponta" da linha acompanha a leitura
      const start = 12; // centro do primeiro marcador
      const p = Math.min(1, Math.max(0, (anchor - rect.top - start) / Math.max(1, rect.height - start)));
      el.style.setProperty("--p", p.toFixed(4));
      el.querySelectorAll(".exp__node").forEach((n) => {
        const r = n.getBoundingClientRect();
        n.classList.toggle("is-reached", r.top + r.height / 2 <= anchor);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="timeline" ref={ref}>
      <span className="timeline__line" aria-hidden="true"><span className="timeline__fill" /></span>
      {experience.map((e, n) => (
        <Reveal as="article" className="exp" key={`${e.location}-${n}`} delay={n * 90}>
          <span className="exp__node" aria-hidden="true" />
          <p className="exp__date label">{L(e.period)}</p>
          <h3 className="exp__role">{L(e.role)}</h3>
          <p className="exp__org">{e.location}</p>
          <p className="exp__summary">{L(e.summary)}</p>
          {detailed && e.details ? (
            <div className="exp__details">
              {e.details.map((d) => (
                <div className="exp__detail" key={d.title["en-US"]}>
                  <span className="label">{L(d.title)}</span>
                  <p>{L(d.text)}</p>
                </div>
              ))}
            </div>
          ) : e.highlights && (
            <ul className="exp__list">
              {e.highlights.map((h, i) => <li key={i}>{L(h)}</li>)}
            </ul>
          )}
          {e.tags && (
            <ul className="exp__tags" aria-label="Tags">
              {e.tags.map((tg) => <li key={tg} className="chip-pill">{tg}</li>)}
            </ul>
          )}
        </Reveal>
      ))}
    </div>
  );
}
