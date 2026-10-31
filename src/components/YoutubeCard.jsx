import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { youtube } from "../data/bio.js";
import { socials } from "../data/socials.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import SocialIcon from "./SocialIcon.jsx";

const handle = socials.find((s) => s.name === "YouTube")?.username;

// Aceita o link do vídeo (watch?v=, youtu.be, shorts, embed) ou só o ID de 11 caracteres.
function videoId(v) {
  if (!v) return "";
  const m = v.match(/(?:youtu\.be\/|[?&]v=|shorts\/|embed\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(v) ? v : "";
}

// Card do YouTube da /bio: cabeçalho do canal, "tela" 16:9 e botão para o canal.
// Sem vídeo → tela vazia elegante (anel de play que respira + barra de progresso decorativa).
// Com vídeo → miniatura; o player (youtube-nocookie) só carrega ao clicar. Inclina com o cursor (data-tilt).
export default function YoutubeCard({ delay = 0 }) {
  const { t, L } = useLang();
  const [playing, setPlaying] = useState(false);
  const id = videoId(youtube.video);

  return (
    <article className="yt rise" style={{ animationDelay: `${delay}ms` }} data-tilt>
      <span className="yt__light" aria-hidden="true" />
      <header className="yt__head">
        <span className="yt__icon" aria-hidden="true"><SocialIcon name="youtube" size={18} /></span>
        <span className="yt__channel">
          <span className="label">{youtube.label}</span>
          {handle && <span className="yt__handle">{handle}</span>}
        </span>
      </header>
      <h3 className="yt__title">{L(youtube.title)}</h3>
      <p className="yt__desc">{L(youtube.description)}</p>

      <div className="yt__screen">
        {id ? (
          playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={t("bio.ytTitle", { name: youtube.label })}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button type="button" className="yt__facade" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` }} onClick={() => setPlaying(true)} aria-label={t("bio.ytPlay")}>
              <span className="yt__play"><Play size={20} aria-hidden="true" /></span>
            </button>
          )
        ) : (
          <div className="yt__empty">
            <span className="yt__play yt__play--idle" aria-hidden="true"><Play size={20} /></span>
            <span className="label">{t("bio.ytSoon")}</span>
            <span className="yt__bar" aria-hidden="true"><span /></span>
          </div>
        )}
      </div>

      <a className="btn btn--solid yt__cta" href={youtube.channel} target="_blank" rel="noopener noreferrer" data-magnetic>
        {L(youtube.cta)} <span className="sr-only">{t("links.external")}</span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
