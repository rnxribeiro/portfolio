import { BookOpen } from "lucide-react";
import { site } from "../data/site.js";
import { listPages } from "../data/bio.js";
import { books, bookThemes } from "../data/books.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import BioLayout from "../components/BioLayout.jsx";
import BioRow from "../components/BioRow.jsx";

// /bio/livros — lista exclusiva da /bio com os livros que eu indico (links de compra), agrupados por tema.
// Cada linha: "autor · editora" acima do título e o gênero logo abaixo.
export default function BioBooks() {
  const { L } = useLang();
  const page = listPages.books;
  useDocumentMeta({ title: `${site.name} — ${L(page.title)}`, description: L(page.subtitle) });
  let n = 0; // contador para escalonar a entrada das linhas entre os grupos

  return (
    <BioLayout back="/bio">
      <section className="bio-head rise" aria-labelledby="bio-list-title">
        <span className="label">{L(page.label)}</span>
        <h1 id="bio-list-title" className="bio-head__title">{L(page.title)}</h1>
        <p className="bio-head__sub">{L(page.subtitle)}</p>
      </section>

      {bookThemes.map((theme) => {
        const list = books.filter((bk) => bk.theme === theme.id);
        if (!list.length) return null;
        return (
          <section className="bio-group" key={theme.id} aria-labelledby={`bio-b-${theme.id}`}>
            <h2 id={`bio-b-${theme.id}`} className="label links-section__label rise">
              {L(theme.title)} <span className="bio-group__count">{String(list.length).padStart(2, "0")}</span>
            </h2>
            <ul className="link-list">
              {list.map((bk) => (
                <BioRow
                  key={L(bk.title)}
                  book
                  title={L(bk.title)}
                  subtitle={`${L(bk.author)} · ${bk.publisher}`}
                  below={L(bk.genre)}
                  image={bk.image}
                  icon={BookOpen}
                  href={bk.link}
                  delay={120 + n++ * 50}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </BioLayout>
  );
}
