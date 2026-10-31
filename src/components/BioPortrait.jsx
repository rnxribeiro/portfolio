import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";

// Retrato do topo da /bio numa moldura de vidro 3D (mesma linguagem da lâmina do hero):
// a foto fica no plano de trás e desliza dentro da moldura, o reflexo e as etiquetas flutuam à frente
// (translateZ). Inclina com o cursor (data-tilt) e, sem interação, deriva devagar (data-tilt-idle).
export default function BioPortrait({ src, alt, place }) {
  const { L } = useLang();
  return (
    <div className="portrait" data-tilt data-tilt-idle>
      <span className="portrait__shadow" aria-hidden="true" />
      <div className="portrait__body">
        <div className="portrait__frame">
          <img className="portrait__img" src={src} alt={alt} fetchPriority="high" />
        </div>
        <span className="portrait__glass" aria-hidden="true"><span className="portrait__sheen" /></span>
        <span className="portrait__tag portrait__tag--top" aria-hidden="true">{site.brand} / {site.year}</span>
        <span className="portrait__tag portrait__tag--chip" aria-hidden="true"><span className="eyebrow__dot" />{L(place)}</span>
      </div>
    </div>
  );
}
