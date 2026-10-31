// Título revelado por máscara: cada palavra sobe de dentro de uma fenda, uma após a outra.
// Dentro de um <Reveal>, só começa quando o bloco aparece. O texto inteiro fica para leitores de tela.
export default function SplitText({ text, delay = 0, step = 70 }) {
  const words = String(text).split(/\s+/).filter(Boolean);
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" key={text}>
        {words.map((w, i) => (
          <span key={`${w}-${i}`}>
            <span className="split__word">
              <span className="split__inner" style={{ "--d": `${delay + i * step}ms` }}>{w}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
}
