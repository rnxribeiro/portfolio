import { ArrowRight, Mail } from "lucide-react";
import { site } from "../data/site.js";
import { links, featured, youtube, mediaKitFolder, bioPortrait } from "../data/bio.js";
import { bioSocials } from "../data/socials.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import BioLayout from "../components/BioLayout.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import LinkItem from "../components/LinkItem.jsx";
import FeaturedLink from "../components/FeaturedLink.jsx";
import YoutubeCard from "../components/YoutubeCard.jsx";
import MediaKitCard from "../components/MediaKitCard.jsx";
import BioPortrait from "../components/BioPortrait.jsx";
import SplitText from "../components/SplitText.jsx";

// Página /bio — central de links para a bio do Instagram. Independente: sem navbar/footer globais.
// Mesma linguagem do site: retrato em moldura de vidro 3D, nome revelado por máscara, cards de vidro que inclinam.
export default function Bio() {
  const { t, L } = useLang();
  useDocumentMeta({ title: `${site.name} — ${t("links.title")}`, description: t("links.meta") });

  const items = links.filter((l) => l.enabled !== false);
  const blocks = featured.filter((f) => f.enabled);
  const delay = (n) => ({ animationDelay: `${n}ms` });
  const base = 120 + items.length * 60;

  return (
    <BioLayout>
      <section className="bio-hero" aria-labelledby="links-name">
        <div className="bio-hero__object intro intro--object" style={{ "--d": "200ms" }}>
          <BioPortrait src={bioPortrait.src} alt={t("links.avatarAlt")} place={bioPortrait.place} />
        </div>
        <p className="eyebrow intro" style={{ "--d": "350ms" }}><span className="eyebrow__dot" aria-hidden="true" />{t("links.role")}</p>
        <h1 id="links-name" className="bio-hero__name"><SplitText text={site.name} delay={420} step={120} /></h1>
        <div className="intro" style={{ "--d": "700ms" }}><SocialLinks only={bioSocials} /></div>
      </section>

      <section className="links-section" aria-labelledby="links-label">
        <h2 id="links-label" className="label links-section__label rise" style={delay(80)}>{t("links.title")}</h2>
        <ul className="link-cards">
          {items.map((l, n) => (
            <LinkItem key={l.href || l.title["en-US"]} {...l} delay={120 + n * 60} />
          ))}
        </ul>
      </section>

      {(youtube.enabled || blocks.length > 0 || mediaKitFolder.enabled) && (
        <section className="links-section links-featured" aria-label={t("links.title")}>
          {youtube.enabled && <YoutubeCard delay={base} />}
          {blocks.map((f, n) => <FeaturedLink key={f.id} item={f} delay={base + 80 + n * 80} />)}
          {mediaKitFolder.enabled && <MediaKitCard {...mediaKitFolder} delay={base + 160} />}
        </section>
      )}

      <section className="links-section links-cta bio-contact rise" style={delay(base + 260)} aria-labelledby="links-cta-title" data-tilt>
        <span className="contact-panel__light" aria-hidden="true" />
        <span className="label">{t("nav.contact")}</span>
        <h2 id="links-cta-title" className="links-cta__title">{L(site.contact.headline)}</h2>
        <p className="links-cta__text">{t("links.ctaText")}</p>
        <a className="cta-card" data-magnetic href={`mailto:${site.contact.email}?subject=${encodeURIComponent(L(site.contact.subject))}`}>
          <span className="cta-card__tile"><Mail size={20} strokeWidth={1.75} aria-hidden="true" /></span>
          <span className="cta-card__text">
            <span className="cta-card__title">{t("links.sendEmail")}</span>
            <span className="cta-card__sub">{site.contact.email}</span>
          </span>
          <ArrowRight className="cta-card__arrow" size={18} aria-hidden="true" />
        </a>
      </section>
    </BioLayout>
  );
}
