import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";
import Rich from "./Rich.jsx";
import ContactCard from "./ContactCard.jsx";

// Convite final de contato (Home e Sobre): título em dois tons e as ações.
export default function ContactCTA() {
  const { L } = useLang();
  return (
    <section className="section cta" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta__card">
          <h2 id="cta-title" className="h2"><Rich text={L(site.contact.cta)} /></h2>
          <p className="cta__text">{L(site.contact.text)}</p>
          <ContactCard />
        </Reveal>
      </div>
    </section>
  );
}
