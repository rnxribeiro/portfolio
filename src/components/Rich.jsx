// Texto com marcações leves, usado nos títulos (dados em src/data e src/i18n/ui.js):
//   *texto* → itálico serifado (o "toque" de personalidade)
//   ~texto~ → tom suave (cinza), para a segunda metade de um título em dois tons
//   [texto] → selo verde, para a palavra de destaque
//   \n      → quebra de linha
const TOKEN = /(\*[^*]+\*|~[^~]+~|\[[^\]]+\])/g;

function inline(line, key) {
  return line.split(TOKEN).filter(Boolean).map((part, i) => {
    const k = `${key}-${i}`;
    const body = part.slice(1, -1);
    if (part[0] === "*") return <em key={k} className="rt-em">{body}</em>;
    if (part[0] === "~") return <span key={k} className="rt-soft">{body}</span>;
    if (part[0] === "[") return <span key={k} className="rt-chip">{body}</span>;
    return part;
  });
}

export default function Rich({ text }) {
  const lines = String(text ?? "").split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {inline(line, i)}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}
