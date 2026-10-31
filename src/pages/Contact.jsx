import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";
import Reveal from "../components/Reveal.jsx";
import ContactCard from "../components/ContactCard.jsx";

export default function Contact() {
  const { t, L } = useLang();
  useDocumentMeta({ title: L(seo.contact.title), description: L(seo.contact.description) });
  return (
    <div className="page">
      <section className="section section--tight" aria-labelledby="contact-h">
        <div className="container contact-page">
          <Reveal>
            <span className="label section-header__index">06 — {t("nav.contact")}</span>
            <h1 id="contact-h" className="display">{L(site.contact.headline)}</h1>
            <p className="lead" style={{ marginTop: "var(--space-5)" }}>{L(site.contact.text)}</p>
          </Reveal>
          <Reveal delay={120}>
            <ContactCard size="lg" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
