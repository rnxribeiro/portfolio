import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Motor de movimento do site, ligado uma vez no App. Tudo é comunicado ao CSS por variáveis:
//
//   [data-progress]        --p de 0 a 1 enquanto o elemento atravessa a tela (entra pela base → sai pelo topo).
//   [data-progress="exit"] --p de 0 a 1 enquanto o elemento sai pelo topo (para o hero, que já começa visível).
//   :root                  --scroll de 0 a 1 = progresso da página inteira.
//   [data-tilt]            --gx / --gy de -1 a 1 = posição do cursor, suavizada a cada quadro (inclinação física).
//                          --mx / --my = posição do cursor em px dentro do elemento (reflexos).
//   [data-tilt-idle]       quando ninguém interage, o elemento deriva devagar sozinho.
//   [data-spot]            só --mx / --my (luz que segue o cursor, sem inclinar).
//   [data-magnetic]        o botão acompanha levemente o cursor (propriedade translate) e recebe --bx.
//
// Sem mouse (toque) ou com "reduzir movimento", a inclinação e o magnetismo ficam desligados;
// o progresso de scroll continua sendo calculado, e o CSS decide o que animar.

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

function startEngine() {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const tracks = () => fine.matches && !reduce.matches;

  // ── progresso de scroll ──
  let scrollQueued = false;
  const updateScroll = () => {
    scrollQueued = false;
    const vh = window.innerHeight;
    const max = root.scrollHeight - vh;
    root.style.setProperty("--scroll", max > 0 ? (window.scrollY / max).toFixed(4) : "0");
    document.querySelectorAll("[data-progress]").forEach((el) => {
      const r = el.getBoundingClientRect();
      const p = el.dataset.progress === "exit"
        ? clamp(-r.top / Math.max(1, r.height))
        : clamp((vh - r.top) / (vh + r.height));
      el.style.setProperty("--p", p.toFixed(4));
    });
    if (!raf) raf = requestAnimationFrame(step); // retoma a deriva quando o objeto volta à tela
  };
  const queueScroll = () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); }
  };

  // ── inclinação suavizada ──
  const state = new Map(); // elemento → { x, y, tx, ty }
  let hovered = null;
  let raf = 0;

  const aim = (el, tx, ty) => {
    const s = state.get(el) || { x: 0, y: 0, tx: 0, ty: 0 };
    s.tx = tx; s.ty = ty;
    state.set(el, s);
    if (!raf) raf = requestAnimationFrame(step);
  };

  const step = (time) => {
    raf = 0;
    let moving = false;
    if (!reduce.matches) {
      document.querySelectorAll("[data-tilt-idle]").forEach((el) => {
        if (el === hovered) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const s = state.get(el) || { x: 0, y: 0, tx: 0, ty: 0 };
        s.tx = Math.sin(time / 2600) * 0.5;
        s.ty = Math.cos(time / 3300) * 0.32;
        state.set(el, s);
        moving = true;
      });
    }
    state.forEach((s, el) => {
      if (!el.isConnected) { state.delete(el); return; }
      s.x += (s.tx - s.x) * 0.085;
      s.y += (s.ty - s.y) * 0.085;
      if (Math.abs(s.tx - s.x) > 0.0005 || Math.abs(s.ty - s.y) > 0.0005) moving = true;
      el.style.setProperty("--gx", s.x.toFixed(4));
      el.style.setProperty("--gy", s.y.toFixed(4));
    });
    if (moving) raf = requestAnimationFrame(step);
  };

  // ── botões magnéticos ──
  let magnet = null;
  const releaseMagnet = () => {
    if (magnet) magnet.style.translate = "";
    magnet = null;
  };

  const onMove = (e) => {
    if (!tracks() || !(e.target instanceof Element)) return;

    const tilt = e.target.closest("[data-tilt]");
    if (hovered && hovered !== tilt) {
      hovered.classList.remove("is-tilting");
      aim(hovered, 0, 0);
    }
    hovered = tilt;
    if (tilt) {
      const r = tilt.getBoundingClientRect();
      tilt.style.setProperty("--mx", `${(e.clientX - r.left).toFixed(1)}px`);
      tilt.style.setProperty("--my", `${(e.clientY - r.top).toFixed(1)}px`);
      tilt.classList.add("is-tilting");
      aim(tilt, ((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    }

    const spot = e.target.closest("[data-spot]");
    if (spot) {
      const r = spot.getBoundingClientRect();
      spot.style.setProperty("--mx", `${(e.clientX - r.left).toFixed(1)}px`);
      spot.style.setProperty("--my", `${(e.clientY - r.top).toFixed(1)}px`);
    }

    const m = e.target.closest("[data-magnetic]");
    if (m !== magnet) releaseMagnet();
    if (m) {
      const r = m.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      m.style.translate = `${(dx * 0.18).toFixed(1)}px ${(dy * 0.28).toFixed(1)}px`;
      m.style.setProperty("--bx", `${(e.clientX - r.left).toFixed(1)}px`);
      magnet = m;
    }
  };

  const onLeave = () => {
    releaseMagnet();
    if (hovered) { hovered.classList.remove("is-tilting"); aim(hovered, 0, 0); hovered = null; }
  };

  window.addEventListener("scroll", queueScroll, { passive: true });
  window.addEventListener("resize", queueScroll);
  document.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
  queueScroll();
  raf = requestAnimationFrame(step); // inicia a deriva dos elementos [data-tilt-idle]

  return {
    refresh: queueScroll,
    stop() {
      cancelAnimationFrame(raf);
      releaseMagnet();
      window.removeEventListener("scroll", queueScroll);
      window.removeEventListener("resize", queueScroll);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    },
  };
}

export default function useMotion() {
  const { pathname } = useLocation();
  const engine = useRef(null);

  useEffect(() => {
    engine.current = startEngine();
    return () => engine.current.stop();
  }, []);

  // a cada troca de página os elementos são outros: recalcula o progresso logo depois de montar
  useEffect(() => {
    const id = setTimeout(() => engine.current?.refresh(), 60);
    return () => clearTimeout(id);
  }, [pathname]);
}
