import { site } from "../data/site.js";
import { socials } from "../data/socials.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { seo } from "../data/seo.js";
import Rich from "../components/Rich.jsx";
import ContactCard from "../components/ContactCard.jsx";
import SocialLinks from "../components/SocialLinks.jsx";

const all = socials.filter((s) => !s.placeholder && s.name !== "Email").map((s) => s.name);

export default function Contact() {
  const { t, L } = useLang();
  useDocumentMeta({ title: L(seo.contact.title), description: L(seo.contact.description) });
  const d = (ms) => ({ "--d": `${ms}ms` });
  return (
    <div className="page">
      <section className="section section--first" aria-labelledby="contact-h">
        <div className="container contact">
          <h1 id="contact-h" className="h1 intro" style={d(160)}><Rich text={t("contact.rich")} /></h1>
          <p className="lead intro" style={d(240)}>{L(site.contact.text)}</p>
          <div className="intro" style={d(320)}><ContactCard showEmail /></div>
          <div className="contact__social intro" style={d(420)}>
            <p className="label">{t("contact.or")}</p>
            <SocialLinks only={all} />
          </div>
        </div>
      </section>
    </div>
  );
}
