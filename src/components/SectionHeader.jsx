import Reveal from "./Reveal.jsx";
import SplitText from "./SplitText.jsx";

// Cabeçalho de seção: índice com um fio que se desenha conforme o scroll (data-progress → --p),
// título revelado por máscara, subtítulo e ação opcional.
export default function SectionHeader({ id, index, label, title, subtitle, as: Tag = "h2", action }) {
  return (
    <Reveal as="header" className="section-header" data-progress>
      <div className="section-header__main">
        {index && (
          <p className="section-header__index">
            <span className="label">{index}</span>
            <span className="section-header__rule" aria-hidden="true" />
            <span className="label">{label}</span>
          </p>
        )}
        <Tag id={id} className="h2 section-header__title"><SplitText text={title} step={70} /></Tag>
        {subtitle && <p className="section-header__sub">{subtitle}</p>}
      </div>
      {action && <div className="section-header__action">{action}</div>}
    </Reveal>
  );
}
