import { ArrowRight, Download, Mail } from "lucide-react";
import { site } from "../data/site.js";
import { mediaKit } from "../data/mediakit.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import BioLayout from "../components/BioLayout.jsx";
import Reveal from "../components/Reveal.jsx";

function Block({ label, children, delay = 0 }) {
  return (
    <Reveal as="section" className="kit-card" aria-label={label} delay={delay}>
      <h2 className="label kit-card__label">{label}</h2>
      {children}
    </Reveal>
  );
}

// /bio/media-kit — o Media Kit mora só dentro da /bio (como o setup e a estante), em blocos de vidro.
// Os números ainda são placeholders de src/data/mediakit.js ("XX") até você preencher os reais.
export default function BioMediaKit() {
  const { t, L } = useLang();
  const hasPdf = Boolean(mediaKit.pdf);
  useDocumentMeta({ title: `${site.name} — Media Kit`, description: t("kit.sub") });

  return (
    <BioLayout back="/bio">
      <section className="bio-head rise" aria-labelledby="bio-list-title">
        <span className="label">{t("links.brands")}</span>
        <h1 id="bio-list-title" className="bio-head__title">Media Kit</h1>
        <p className="bio-head__sub">{t("kit.sub")}</p>
        <div className="kit-head__actions">
          <a
            className="btn btn--solid"
            href={hasPdf ? mediaKit.pdf : undefined}
            aria-disabled={!hasPdf || undefined}
            download={hasPdf || undefined}
          >
            {t("kit.download")} <Download size={16} aria-hidden="true" />
          </a>
          {!hasPdf && <span className="note">{t("kit.pdfSoon")}</span>}
        </div>
      </section>

      <div className="kit-cards">
        <Block label={t("kit.about")}>
          <p className="kit-card__text">{L(mediaKit.about)}</p>
        </Block>

        <Block label={t("kit.platforms")} delay={60}>
          <ul className="kit-platforms">
            {mediaKit.platforms.map((p) => (
              <li key={p.name}>
                <span className="kit-platforms__name">{p.name}</span>
                <span className="kit-platforms__metric">{L(p.followers)}</span>
                <span className="kit-platforms__metric">{L(p.metric)}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block label={t("kit.audience")} delay={120}>
          <dl className="kit-stats">
            {mediaKit.audience.map((a) => (
              <div key={a.label["en-US"]}>
                <dt className="label">{L(a.label)}</dt>
                <dd>{a.value}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block label={t("kit.formats")} delay={180}>
          <ul className="bio-formats">{mediaKit.formats.map((f) => <li className="chip-pill" key={L(f)}>{L(f)}</li>)}</ul>
        </Block>

        <Block label={t("kit.partnerships")} delay={240}>
          <ul className="kit-partners">
            {mediaKit.partnerships.map((p, n) => (
              <li key={p.title["en-US"]}>
                <span className="kit-partners__num">{String(n + 1).padStart(2, "0")}</span>
                <span>
                  <span className="kit-partners__title">{L(p.title)}</span>
                  <span className="kit-partners__text">{L(p.text)}</span>
                </span>
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <Reveal as="section" className="links-section links-cta bio-contact" aria-labelledby="kit-contact" data-tilt>
        <span className="contact-panel__light" aria-hidden="true" />
        <span className="label">{t("kit.contact")}</span>
        <h2 id="kit-contact" className="links-cta__title">{t("kit.getInTouch")}</h2>
        <p className="links-cta__text">{t("kit.contactText")}</p>
        <a className="cta-card" data-magnetic href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Media Kit — " + site.name)}`}>
          <span className="cta-card__tile"><Mail size={20} strokeWidth={1.75} aria-hidden="true" /></span>
          <span className="cta-card__text">
            <span className="cta-card__title">{t("links.sendEmail")}</span>
            <span className="cta-card__sub">{site.contact.email}</span>
          </span>
          <ArrowRight className="cta-card__arrow" size={18} aria-hidden="true" />
        </a>
      </Reveal>
    </BioLayout>
  );
}
