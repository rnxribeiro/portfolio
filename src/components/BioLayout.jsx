import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";

// Moldura das páginas /bio: cabeçalho enxuto + rodapé simples (sem navbar/footer globais).
// back: rota para onde a seta do canto superior esquerdo volta (nas subpáginas). Sem back (a /bio) → sem cabeçalho.
// A /bio fica sempre no tema escuro: força ao abrir e devolve o tema anterior ao sair (não grava a escolha).
function useDarkTheme() {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.dataset.theme;
    root.dataset.theme = "dark";
    return () => { root.dataset.theme = previous; };
  }, []);
}

export default function BioLayout({ back, children }) {
  const { t } = useLang();
  useDarkTheme();
  return (
    <div className="links-page">
      {back && (
      <header className="links-header">
        <div className="links-header__bar">
          {back ? (
            <Link to={back} className="icon-btn" aria-label={t("bio.back")} title={t("bio.back")}>
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          ) : (
            <Link to="/" className="brand" aria-label={t("a11y.brand")}>
              <span className="brand__mark">{site.brand}</span>
              <span className="brand__sep" aria-hidden="true">/</span>
              <span className="brand__name">{site.handle}</span>
            </Link>
          )}
        </div>
      </header>
      )}

      <main id="main">{children}</main>

      <footer className="links-footer">
        <div>
          <p className="footer__name">{site.brand} / {site.handle}</p>
          <p className="footer__role">© {site.year} {site.name}</p>
        </div>
        {back ? (
          <Link to={back} className="link-arrow link-arrow--back"><ArrowLeft size={14} aria-hidden="true" /> {t("bio.back")}</Link>
        ) : (
          <Link to="/" className="link-arrow">{t("links.back")} <ArrowRight size={14} aria-hidden="true" /></Link>
        )}
      </footer>
    </div>
  );
}
