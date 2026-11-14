import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";
import { bi } from "../i18n/bi.js";

const copy = {
  title: bi("Opa, essa página sumiu.", "Oops, this page is gone."),
  text: bi("O endereço que você abriu não existe ou mudou de lugar.", "The address you opened doesn't exist or has moved."),
  home: bi("Voltar ao início", "Back to home"),
};

// 404 — número gigante em tom suave, com o "0" do meio virando um selo verde. Não é indexada (noindex).
export default function NotFound() {
  const { L } = useLang();
  useDocumentMeta({ title: L(seo.notFound.title), description: L(seo.notFound.description), noindex: true });
  const d = (ms) => ({ "--d": `${ms}ms` });

  return (
    <div className="page">
      <section className="section section--first not-found" aria-labelledby="nf-title">
        <div className="container">
          <p className="not-found__code intro" style={d(80)} aria-hidden="true">4<span>0</span>4</p>
          <h1 id="nf-title" className="h2 intro" style={d(180)}>{L(copy.title)}</h1>
          <p className="lead intro" style={d(260)}>{L(copy.text)}</p>
          <div className="intro" style={d(340)}>
            <Link to="/" className="btn btn--dark"><ArrowLeft size={15} aria-hidden="true" /> {L(copy.home)}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
