import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AppWindow, Plug, Database, Sparkle, AudioLines, MessageCircle } from "lucide-react";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import Rich from "./Rich.jsx";
import ToolIcon from "./ToolIcon.jsx";
import cutout from "../assets/images/renan-cutout.webp";
import shotA from "../assets/projects/raidens-performance.webp";
import shotB from "../assets/projects/qr-code-generator.webp";
import shotC from "../assets/projects/ourplan.webp";

const orbitIcons = { app: AppWindow, plug: Plug, database: Database };
const tools = ["React", "TypeScript", "Node.js", "PostgreSQL"];

// Inclinação leve com o cursor: grava --px / --py (de -1 a 1) no hero. Cada peça se desloca
// conforme a própria "profundidade" (--depth). Desligado no toque e com "reduzir movimento".
function useParallax(ref) {
  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !fine || reduce) return;
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0;
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

// Card de vidro que orbita o retrato. pos: classe de posição (ver .orb--* no CSS).
function Orb({ pos, delay, depth, children, className = "" }) {
  return (
    <span className={`orb orb--${pos}`} style={{ "--d": `${delay}ms`, "--depth": depth }}>
      <span className={`orb__card ${className}`}>{children}</span>
    </span>
  );
}

// Hero: título em serifa, retrato recortado no centro com cards de vidro em 3D ao redor da cabeça
// (uns atrás, outros na frente), cards laterais ligados por linhas finas, um selo que gira e notas nos cantos.
export default function Hero({ onNext }) {
  const { t, L } = useLang();
  const h = site.hero;
  const ref = useRef(null);
  useParallax(ref);
  const d = (ms) => ({ "--d": `${ms}ms` });
  const orbit = h.orbit.map((o) => ({ ...o, Icon: orbitIcons[o.icon] || AppWindow }));
  const ring = L(h.ring);

  const OrbCard = ({ o }) => (
    <>
      <span className={`orb__icon orb__icon--${o.icon}`}><o.Icon size={14} strokeWidth={2} aria-hidden="true" /></span>
      <span className="orb__text"><strong>{L(o.title)}</strong><span>{o.text}</span></span>
    </>
  );

  return (
    <section className="hero" aria-labelledby="hero-title" ref={ref}>
      <div className="container hero__top">
        <h1 id="hero-title" className="hero__title intro" style={d(120)}><Rich text={L(h.headline)} /></h1>
        <p className="hero__lead intro" style={d(240)}>{L(h.tagline)}</p>
        <div className="hero__cta intro" style={d(340)}>
          <a className="btn btn--dark" href="#projects" onClick={onNext}>
            {t("hero.viewProjects")} <ArrowRight size={15} aria-hidden="true" />
          </a>
          <Link className="btn btn--icon" to="/contact">
            <span className="btn__dot" aria-hidden="true"><MessageCircle size={12} strokeWidth={2.2} /></span> {t("hero.chat")}
          </Link>
        </div>
      </div>

      <div className="hero__seal intro" style={d(600)} aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <defs><path id="seal-path" d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" /></defs>
          <text><textPath href="#seal-path" textLength="236" lengthAdjust="spacing">{ring.toUpperCase()}</textPath></text>
        </svg>
        <Sparkle className="hero__seal-star" size={18} fill="currentColor" />
      </div>

      <div className="hero__stage">
        <span className="hero__ring" aria-hidden="true" />
        {/* decoração: linhas finas ligando os cards laterais ao anel em volta da cabeça */}
        <svg className="hero__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 13.7 37 C 13.7 55, 24 53, 32.7 49" />
          <path d="M 86 65 C 86 76, 75 62, 67.3 50" />
        </svg>

        <div className="hero__side hero__side--left intro" style={d(700)}>
          <span className="hero__side-icon" aria-hidden="true"><AudioLines size={16} /></span>
          <p className="hero__side-title"><Rich text={L(h.cards[0].title)} /></p>
          <p className="hero__side-text">{L(h.cards[0].text)}</p>
        </div>
        <div className="hero__side hero__side--right intro" style={d(820)}>
          <span className="hero__stack" aria-hidden="true">
            {tools.slice(0, 3).map((tool) => <span key={tool}><ToolIcon name={tool} size={13} /></span>)}
            <span>+</span>
          </span>
          <p className="hero__side-title"><Rich text={L(h.cards[1].title)} /></p>
          <p className="hero__side-text">{L(h.cards[1].text)}</p>
        </div>


        <figure className="hero__person" aria-hidden="true">
          {/* atrás da cabeça */}
          <Orb pos="pane-a" delay={900} depth={10} className="orb__shot"><img src={shotC} alt="" /></Orb>
          <Orb pos="shot-a" delay={1000} depth={18} className="orb__shot"><img src={shotA} alt="" /></Orb>
          <Orb pos="shot-b" delay={1100} depth={18} className="orb__shot"><img src={shotB} alt="" /></Orb>
          <Orb pos="back" delay={950} depth={12}><OrbCard o={orbit[1]} /></Orb>

          <img className="hero__cutout intro" style={d(450)} src={cutout} alt="" width="608" height="765" fetchPriority="high" />

          {/* na frente */}
          <Orb pos="front-a" delay={1150} depth={30}><OrbCard o={orbit[0]} /></Orb>
          <Orb pos="front-b" delay={1250} depth={30}><OrbCard o={orbit[2]} /></Orb>
        </figure>
        <div className="hero__corner hero__corner--left intro" style={d(900)}>
          <span className="hero__rule" aria-hidden="true" />
          <p><Rich text={L(h.now)} /></p>
          <Link to="/about" className="hero__stack hero__stack--lg" aria-label={t("nav.about")}>
            {tools.map((tool) => <span key={tool}><ToolIcon name={tool} size={15} /></span>)}
            <span aria-hidden="true">+</span>
          </Link>
        </div>
        <div className="hero__corner hero__corner--right intro" style={d(1000)}>
          <Sparkle className="hero__corner-star" size={18} fill="currentColor" aria-hidden="true" />
          <p><span className="hero__rule" aria-hidden="true" /><span><Rich text={L(h.motto)} /></span></p>
        </div>

      </div>

      <p className="sr-only">{site.name} — {L(site.hero.role)}</p>
    </section>
  );
}
