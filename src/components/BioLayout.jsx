import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

// Moldura das páginas /bio: uma folha estreita (formato de celular) sobre o fundo cinza, sem navbar/footer globais.
// back: rota para onde a seta do canto superior esquerdo volta (nas subpáginas). Segue o tema escolhido no site.
export default function BioLayout({ back, children }) {
  const { t } = useLang();
  return (
    <div className="bio">
      <div className="bio__sheet">
        <header className="bio__top">
          {back ? (
            <Link to={back} className="icon-btn" aria-label={t("bio.back")} title={t("bio.back")}>
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          ) : (
            <Link to="/" className="nav__brand" aria-label={t("a11y.brand")}>{site.brand.toLowerCase()}<span aria-hidden="true">.</span></Link>
          )}
          <ThemeToggle />
        </header>

        <main id="main">{children}</main>

        <footer className="bio__foot">
          <span>© {site.year} {site.name}</span>
          {back ? (
            <Link to={back}><ArrowLeft size={13} aria-hidden="true" /> {t("bio.back")}</Link>
          ) : (
            <Link to="/">{t("links.back")} <ArrowUpRight size={13} aria-hidden="true" /></Link>
          )}
        </footer>
      </div>
    </div>
  );
}
