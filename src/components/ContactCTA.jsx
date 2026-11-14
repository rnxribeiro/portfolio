import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { site } from "../data/site.js";
import { socials } from "../data/socials.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";
import Rich from "./Rich.jsx";

const ext = ["GitHub", "LinkedIn"].map((n) => socials.find((s) => s.name === n)).filter(Boolean);

// Convite final de contato (Home e Sobre): um card com rótulo, título, links (GitHub, LinkedIn, e-mail) e o botão.
export default function ContactCTA() {
  const { t, L } = useLang();
  return (
    <section className="section cta" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta__card">
          <div className="cta__copy">
            <p className="eyebrow">{t("home.contactLabel")}</p>
            <h2 id="cta-title" className="cta__title"><Rich text={L(site.contact.cta)} /></h2>
            <ul className="cta__links">
              {ext.map((s) => (
                <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}<span className="sr-only"> {t("links.external")}</span></a></li>
              ))}
              <li><a href={`mailto:${site.contact.email}`}>{t("common.email")}</a></li>
            </ul>
          </div>
          <Link to="/contact" className="btn">{t("home.contactCta")} <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </Reveal>
      </div>
    </section>
  );
}
