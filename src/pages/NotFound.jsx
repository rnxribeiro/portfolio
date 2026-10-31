import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";
import { bi } from "../i18n/bi.js";
import Reveal from "../components/Reveal.jsx";
import GlassPrism from "../components/GlassPrism.jsx";

const copy = {
  label: bi("Erro 404", "Error 404"),
  title: bi("Página não encontrada", "Page not found"),
  text: bi(
    "O endereço que você abriu não existe ou mudou de lugar. Volte para o início ou siga por um dos caminhos abaixo.",
    "The address you opened doesn't exist or has moved. Head back home or pick one of the paths below."
  ),
  home: bi("Voltar ao início", "Back to home"),
};

// 404 — mesmo vidro do hero, com "404" no lugar do monograma. Não é indexada (noindex).
export default function NotFound() {
  const { t, L } = useLang();
  const { pathname } = useLocation();
  useDocumentMeta({ title: L(seo.notFound.title), description: L(seo.notFound.description), noindex: true });
  const paths = [
    { to: "/projects", label: t("nav.projects") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <div className="page">
      <section className="section section--tight not-found" aria-labelledby="nf-title">
        <div className="container not-found__grid">
          <Reveal className="not-found__body">
            <span className="label section-header__index">{L(copy.label)}</span>
            <h1 id="nf-title" className="display">{L(copy.title)}</h1>
            <p className="lead not-found__text">{L(copy.text)}</p>
            <p className="not-found__path label" title={pathname}>{pathname}</p>
            <div className="not-found__actions">
              <Link to="/" className="btn btn--solid" data-magnetic><ArrowLeft size={16} aria-hidden="true" /> {L(copy.home)}</Link>
              {paths.map((p) => (
                <Link key={p.to} to={p.to} className="link-arrow">{p.label} <ArrowRight size={14} aria-hidden="true" /></Link>
              ))}
            </div>
          </Reveal>
          <Reveal className="not-found__prism" variant="scale" delay={120} aria-hidden="true">
            <GlassPrism mono="404" words={[]} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
