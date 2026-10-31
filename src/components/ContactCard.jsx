import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "../data/site.js";
import { socials } from "../data/socials.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import SocialIcon from "./SocialIcon.jsx";

const quick = ["GitHub", "LinkedIn"].map((name) => socials.find((s) => s.name === name)).filter(Boolean);

// Contato do site: e-mail em destaque (abre o app de e-mail), botão para copiar e dois botões discretos (GitHub e LinkedIn).
// size="lg" (página de contato) ou "md" (seção da Home).
export default function ContactCard({ size = "lg" }) {
  const { t } = useLang();
  const { email } = site.contact;
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // alternativa para navegadores/contextos sem a API de área de transferência
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* ignore */ }
      ta.remove();
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`contact-card contact-card--${size}`}>
      <a className="contact-card__email" href={`mailto:${email}`}>{email}</a>
      <div className="contact-card__actions">
        <button type="button" className="btn btn--solid" onClick={copy} data-magnetic>
          {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          {copied ? t("contact.copied") : t("contact.copy")}
        </button>
        {quick.map((s) => (
          <a key={s.name} className="btn btn--quiet" data-magnetic href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} (${t("links.external")})`}>
            <SocialIcon name={s.icon} size={15} /> {s.name}
          </a>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{copied ? t("contact.copied") : ""}</p>
    </div>
  );
}
