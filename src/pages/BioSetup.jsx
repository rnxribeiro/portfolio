import { site } from "../data/site.js";
import { listPages } from "../data/bio.js";
import { setupItems, setupCategories, otherItems, otherItemsLabel } from "../data/setup.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import BioLayout from "../components/BioLayout.jsx";
import BioRow from "../components/BioRow.jsx";
import { iconMap } from "../components/setupIcons.js";

// /bio/setup — lista exclusiva da /bio com os itens do setup (links dos produtos). Não é a página /setup do site.
export default function BioSetup() {
  const { L } = useLang();
  const page = listPages.setup;
  useDocumentMeta({ title: `${site.name} — ${L(page.title)}`, description: L(page.subtitle) });

  const groups = setupCategories
    .map((c) => ({ ...c, items: setupItems.filter((i) => i.category === c.id) }))
    .filter((g) => g.items.length > 0);
  let n = 0;

  return (
    <BioLayout back="/bio">
      <section className="bio-head rise" aria-labelledby="bio-list-title">
        <span className="label">{page.label}</span>
        <h1 id="bio-list-title" className="bio-head__title">{L(page.title)}</h1>
        <p className="bio-head__sub">{L(page.subtitle)}</p>
      </section>

      {groups.map((g) => (
        <section className="bio-group" key={g.id} aria-labelledby={`bio-g-${g.id}`}>
          <h2 id={`bio-g-${g.id}`} className="label links-section__label rise" style={{ animationDelay: `${80 + n * 40}ms` }}>{L(g.title)}</h2>
          <ul className="link-list">
            {g.items.map((i) => (
              <BioRow
                key={L(i.name)}
                title={L(i.name)}
                subtitle={L(i.type)}
                affiliate={i.affiliate}
                image={i.image}
                icon={iconMap[i.icon]}
                href={i.link}
                delay={120 + Math.min(n++, 10) * 40}
              />
            ))}
          </ul>
        </section>
      ))}
      {otherItems.length > 0 && (
        <section className="bio-group" aria-labelledby="bio-g-others">
          <h2 id="bio-g-others" className="label links-section__label rise" style={{ animationDelay: `${80 + n * 40}ms` }}>{L(otherItemsLabel)}</h2>
          <ul className="link-list">
            {otherItems.map((i) => (
              <BioRow
                key={L(i.name)}
                title={L(i.name)}
                subtitle={L(i.type)}
                affiliate={i.affiliate}
                image={i.image}
                icon={iconMap[i.icon]}
                href={i.link}
                delay={120 + Math.min(n++, 10) * 40}
              />
            ))}
          </ul>
        </section>
      )}
    </BioLayout>
  );
}
