import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";
import { bi } from "../i18n/bi.js";
import Reveal from "../components/Reveal.jsx";

const copy = {
  title: bi("Página não encontrada", "Page not found"),
  text: bi(
    "O endereço que você abriu não existe ou mudou de lugar.",
    "The address you opened doesn't exist or has moved."
  ),
  home: bi("Voltar ao início", "Back to home"),
};

// 404 — número metálico gigante com um painel de vidro por cima, desfocando a parte de baixo dos dígitos.
// O número se desloca de leve com o cursor (--gx / --gy, via data-tilt). Não é indexada (noindex).
export default function NotFound() {
  const { L } = useLang();
  useDocumentMeta({ title: L(seo.notFound.title), description: L(seo.notFound.description), noindex: true });

  return (
    <div className="page">
      <section className="not-found" aria-labelledby="nf-title" data-tilt>
        <div className="container not-found__inner">
          <p className="not-found__code" aria-hidden="true">404</p>
          <Reveal className="not-found__panel" variant="scale">
            <h1 id="nf-title" className="not-found__title">{L(copy.title)}</h1>
            <p className="not-found__text">{L(copy.text)}</p>
            <Link to="/" className="btn btn--solid" data-magnetic>{L(copy.home)} <ArrowRight size={16} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
