// Faixa discreta com a stack correndo devagar entre dois fios, com as pontas esmaecidas.
// O conteúdo é duplicado para o loop não ter emenda; a cópia fica oculta para leitores de tela.
export default function Marquee({ items, label }) {
  return (
    <div className="marquee" role="region" aria-label={label}>
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee__group" aria-hidden={copy === 1 || undefined}>
            {items.map((w) => <li key={w}>{w}</li>)}
          </ul>
        ))}
      </div>
    </div>
  );
}
