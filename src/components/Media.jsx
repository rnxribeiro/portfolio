import { Image as ImageIcon } from "lucide-react";

// Imagem com placeholder elegante quando ainda não existe arquivo.
export default function Media({ src, alt = "", className = "", children }) {
  return (
    <div className={`media ${className}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      ) : (
        <div className="media__ph" aria-hidden="true">{children || <ImageIcon size={28} strokeWidth={1.25} />}</div>
      )}
    </div>
  );
}
