import { useEffect, useRef } from "react";

// Retrato feito de 0 e 1 (canvas). Cada célula da grade amostra a foto recortada: onde a foto é escura
// (cabelo, camiseta) o dígito fica forte; onde é clara (pele), fica suave; fora da silhueta não há dígito.
// Interação: perto do cursor (ou do dedo), os dígitos são empurrados, trocam de valor e acendem na cor de
// destaque; depois voltam ao lugar como molas. Ao montar, os dígitos "caem" até a posição.
// Parado, alguns trocam de vez em quando. Com "reduzir movimento": desenho estático, sem efeitos.
//   src: imagem com fundo transparente · cell: tamanho da célula em px (largura; a altura é 1.5x)
const RADIUS = 70;          // raio de influência do cursor (px)
const PUSH = 2.6;           // força do empurrão
const SPRING = 0.075;       // força de volta para casa
const DAMPING = 0.8;        // atrito

export default function BinaryPortrait({ src, alt = "", cell = 4.4, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    let parts = [];           // { hx, hy, x, y, vx, vy, a, bold, ch, heat }
    let W = 0, H = 0, dpr = 1;
    let raf = 0, flickerId = 0, visible = true, alive = true;
    let mouse = { x: -9999, y: -9999, active: false };
    let ink = "#111", accent = "#0e9f86", darkTheme = false;
    let introStart = 0;
    let sprites = {};         // carimbos pré-desenhados de cada dígito (mais rápido que fillText)
    const img = new Image();

    const readColors = () => {
      const cs = getComputedStyle(root);
      ink = cs.getPropertyValue("--ink").trim() || ink;
      accent = cs.getPropertyValue("--accent").trim() || accent;
      darkTheme = root.dataset.theme === "dark";
      // no tema claro o dígito forte é a parte escura da foto; no escuro, a parte clara (como um negativo do negativo)
      for (const p of parts) shade(p);
    };

    const shade = (p) => {
      const v = darkTheme ? 1 - p.dark : p.dark;
      p.a = Math.min(1, (darkTheme ? 0.16 : 0.07) + Math.pow(v, 1.35) * 0.95) * p.mask;
      p.bold = v > 0.7;
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      if (!W || !H || !img.complete || !img.naturalWidth) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      const cw = cell, ch = cell * 1.5;
      const cols = Math.floor(W / cw), rows = Math.floor(H / ch);
      // reduz a foto para uma grade (1 pixel = 1 célula) e lê brilho e transparência
      const off = document.createElement("canvas");
      off.width = cols; off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      octx.drawImage(img, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;

      parts = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          const alpha = data[i + 3] / 255;
          if (alpha < 0.45) continue;
          const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          // estica o contraste (níveis 0.12–0.82) para os traços do rosto aparecerem
          const dark = 1 - Math.min(1, Math.max(0, (lum - 0.12) / 0.7));
          const hx = c * cw + cw / 2, hy = r * ch + ch / 2;
          parts.push({
            hx, hy,
            x: hx, y: reduce ? hy : hy - 40 - Math.random() * 160,
            vx: 0, vy: 0,
            dark, mask: Math.min(1, alpha * 1.2), a: 0, bold: false,
            ch: Math.random() < 0.5 ? "0" : "1",
            heat: 0,
            delay: reduce ? 0 : (r / rows) * 650 + Math.random() * 350,
          });
        }
      }
      for (const p of parts) shade(p);
      makeSprites();
      introStart = performance.now();
      draw(true);
      kick();
    };

    // um carimbo por combinação de dígito × peso × cor, desenhado uma vez na resolução da tela
    const makeSprites = () => {
      const size = cell * 1.36;
      const sw = Math.ceil(cell * 1.6 * dpr), sh = Math.ceil(cell * 1.8 * dpr);
      sprites = {};
      for (const [key, color] of [["n", ink], ["h", accent]]) {
        for (const weight of [500, 700]) {
          for (const digit of ["0", "1"]) {
            const c = document.createElement("canvas");
            c.width = sw; c.height = sh;
            const g = c.getContext("2d");
            g.scale(dpr, dpr);
            g.fillStyle = color;
            g.textAlign = "center";
            g.textBaseline = "middle";
            g.font = `${weight} ${size}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
            g.fillText(digit, sw / dpr / 2, sh / dpr / 2);
            sprites[`${key}${weight}${digit}`] = c;
          }
        }
      }
    };

    const draw = (force = false) => {
      if (!sprites.n5000) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const sw = sprites.n5000.width, sh = sprites.n5000.height;
      const now = performance.now();
      // primeiro os normais, depois os "quentes" (perto do cursor) por cima, na cor de destaque
      for (let pass = 0; pass < 2; pass++) {
        for (const p of parts) {
          const hot = p.heat > 0.3;
          if ((pass === 1) !== hot) continue;
          const t = reduce ? 1 : Math.min(1, Math.max(0, (now - introStart - p.delay) / 700));
          if (t <= 0 && !force) continue;
          ctx.globalAlpha = hot ? Math.min(1, 0.45 + p.heat) : p.a * t;
          const sprite = sprites[`${hot ? "h" : "n"}${p.bold || hot ? 700 : 500}${p.ch}`];
          ctx.drawImage(sprite, Math.round(p.x * dpr - sw / 2), Math.round(p.y * dpr - sh / 2));
        }
      }
      ctx.globalAlpha = 1;
    };

    // física: só roda enquanto algo está se mexendo (intro, cursor por perto ou partículas voltando)
    const step = () => {
      raf = 0;
      if (!alive || !visible) return;
      const now = performance.now();
      const intro = now - introStart < 1800;
      let moving = intro;
      for (const p of parts) {
        if (intro && now - introStart < p.delay) continue;
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < RADIUS * RADIUS) {
            const d = Math.sqrt(d2) || 1;
            const force = (1 - d / RADIUS) * PUSH;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
            p.heat = Math.min(1, p.heat + 0.25 * (1 - d / RADIUS));
            if (Math.random() < 0.12) p.ch = p.ch === "0" ? "1" : "0";
          }
        }
        p.vx += (p.hx - p.x) * SPRING;
        p.vy += (p.hy - p.y) * SPRING;
        p.vx *= DAMPING; p.vy *= DAMPING;
        p.x += p.vx; p.y += p.vy;
        p.heat *= 0.94;
        if (Math.abs(p.vx) + Math.abs(p.vy) > 0.02 || Math.abs(p.hx - p.x) + Math.abs(p.hy - p.y) > 0.3 || p.heat > 0.02) moving = true;
        else { p.x = p.hx; p.y = p.hy; p.heat = 0; }
      }
      draw();
      if (moving || mouse.active) raf = requestAnimationFrame(step);
    };
    const kick = () => { if (!reduce && !raf && visible) raf = requestAnimationFrame(step); };

    // parado: alguns dígitos trocam de valor de vez em quando
    const flicker = () => {
      if (!visible || !parts.length) return;
      for (let k = 0; k < 14; k++) {
        const p = parts[(Math.random() * parts.length) | 0];
        p.ch = p.ch === "0" ? "1" : "0";
      }
      if (!raf) draw();
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      mouse.active = x > -RADIUS && y > -RADIUS && x < r.width + RADIUS && y < r.height + RADIUS;
      mouse.x = x; mouse.y = y;
      if (mouse.active) kick();
    };
    const onLeave = () => { mouse.active = false; kick(); };

    readColors();
    img.decoding = "async";
    img.onload = build;
    img.src = src;

    const ro = new ResizeObserver(() => build());
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { draw(); kick(); } });
    io.observe(canvas);
    const mo = new MutationObserver(() => { readColors(); makeSprites(); draw(); });
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
      window.addEventListener("blur", onLeave);
      flickerId = window.setInterval(flicker, 140);
    }

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      clearInterval(flickerId);
      ro.disconnect(); io.disconnect(); mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [src, cell]);

  return <canvas ref={canvasRef} className={className} role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true} />;
}
