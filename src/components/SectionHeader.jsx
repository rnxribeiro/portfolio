import Reveal from "./Reveal.jsx";
import Rich from "./Rich.jsx";

// Cabeçalho de seção centralizado: pílula com o nome da seção, título (aceita as marcações do <Rich>),
// subtítulo e uma ação opcional. as="h1" + page → versão maior, usada no topo das páginas internas.
export default function SectionHeader({ id, tag, title, sub, action, as: Tag = "h2", page = false, align = "center" }) {
  return (
    <Reveal as="header" className={`shead shead--${align}${page ? " shead--page" : ""}`}>
      {tag && <span className="pill">{tag}</span>}
      <Tag id={id} className={page ? "h1" : "h2"}><Rich text={title} /></Tag>
      {sub && <p className="shead__sub">{sub}</p>}
      {action && <div className="shead__action">{action}</div>}
    </Reveal>
  );
}
