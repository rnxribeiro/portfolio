import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";

// Lâmina de vidro 3D (hero do site e topo da /bio). Tudo acontece em CSS 3D (transform-style: preserve-3d):
//   face traseira fosca · 8 fatias que desenham a espessura com cantos arredondados ·
//   conteúdo em profundidades diferentes (--z) · face frontal com reflexo e ponto especular.
// Como cada palavra tem o próprio translateZ, ao inclinar o objeto ela se desloca de acordo com a
// perspectiva — parece estar fisicamente entre as duas superfícies.
// A inclinação vem do motor de movimento (--gx / --gy, via data-tilt); quando ninguém interage,
// o objeto deriva devagar (data-tilt-idle). Decorativo: o nome de verdade está no <h1>.
//   words: palavras da base (padrão: site.hero.prism) · className: variação de tamanho (ex.: "prism--sm")
//   mono: texto grande do centro (padrão: site.brand; a 404 usa "404")
const SLICES = 8;

export default function GlassPrism({ words: wordsProp, mono = site.brand, className = "" }) {
  const { L } = useLang();
  const words = (wordsProp || site.hero.prism).map(L);

  return (
    <div className={`prism${className ? ` ${className}` : ""}`} data-tilt data-tilt-idle aria-hidden="true">
      <span className="prism__shadow" />
      <div className="prism__body">
        <span className="prism__face prism__face--back"><span className="prism__grid" /></span>
        {Array.from({ length: SLICES }, (_, i) => (
          <span key={i} className="prism__slice" style={{ "--k": i / (SLICES - 1) }} />
        ))}

        <span className="prism__layer prism__mono" style={{ "--z": "-10px" }}>{mono}</span>
        <span className="prism__layer prism__meta prism__meta--tl" style={{ "--z": "26px" }}>{site.name}</span>
        <span className="prism__layer prism__meta prism__meta--tr" style={{ "--z": "26px" }}>{site.year}</span>
        <ul className="prism__words">
          {words.map((w, i) => (
            <li key={w} className="prism__layer prism__word" style={{ "--z": `${30 - i * 16}px`, "--row": i }}>{w}</li>
          ))}
        </ul>

        <span className="prism__face prism__face--front">
          <span className="prism__sheen" />
          <span className="prism__spec" />
        </span>
      </div>
    </div>
  );
}
