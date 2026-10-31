// Parágrafo que acende palavra por palavra conforme o scroll avança (usa o --p do motor de movimento).
// Sem JS ou com "reduzir movimento", o texto aparece inteiro.
export default function ScrollWords({ text, as: Tag = "p", className = "" }) {
  const words = String(text).split(/\s+/).filter(Boolean);
  return (
    <Tag className={`scroll-words ${className}`} data-progress style={{ "--n": words.length }}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="scroll-words__w" style={{ "--i": i }}>{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
