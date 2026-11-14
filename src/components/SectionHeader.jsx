import Reveal from "./Reveal.jsx";
import Rich from "./Rich.jsx";

// Cabeçalho de seção: rótulo pequeno + fio + ação opcional na mesma linha; título e subtítulo opcionais abaixo
// (o título aceita as marcações do <Rich>). as="h1" + page → versão maior, usada no topo das páginas internas.
export default function SectionHeader({ id, tag, title, sub, action, as: Tag = "h2", page = false }) {
  return (
    <Reveal as="header" className={`shead${page ? " shead--page" : ""}`}>
      <div className="shead__bar">
        {tag && (title ? <span className="eyebrow">{tag}</span> : <Tag id={id} className="eyebrow">{tag}</Tag>)}
        <span className="shead__rule" aria-hidden="true" />
        {action && <div className="shead__action">{action}</div>}
      </div>
      {title && <Tag id={id} className={page ? "h1" : "h2"}><Rich text={title} /></Tag>}
      {sub && <p className="shead__sub">{sub}</p>}
    </Reveal>
  );
}
