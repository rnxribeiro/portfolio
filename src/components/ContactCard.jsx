import { useRef, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { site } from "../data/site.js";
import { socials } from "../data/socials.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import SocialIcon from "./SocialIcon.jsx";

const quick = ["LinkedIn", "GitHub"].map((name) => socials.find((s) => s.name === name)).filter(Boolean);

// Ações de contato: mandar e-mail (abre o app), copiar o e-mail e dois atalhos (LinkedIn e GitHub).
// showEmail: mostra o endereço em destaque acima dos botões (página de contato).
export default function ContactCard({ showEmail = false }) {
  const { t, L } = useLang();
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

  const mailto = `mailto:${email}?subject=${encodeURIComponent(L(site.contact.subject))}`;

  return (
    <div className="contact-actions">
      {showEmail && <a className="contact-actions__email" href={mailto}>{email}</a>}
      <div className="contact-actions__row">
        <a className="btn btn--dark" href={mailto}><Mail size={15} aria-hidden="true" /> {t("contact.send")}</a>
        <button type="button" className={`btn${copied ? " is-done" : ""}`} onClick={copy}>
          {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
          {copied ? t("contact.copied") : t("contact.copy")}
        </button>
        {quick.map((s) => (
          <a key={s.name} className="btn" href={s.url} target="_blank" rel="noopener noreferrer">
            <SocialIcon name={s.icon} size={14} /> {s.name}<span className="sr-only"> {t("links.external")}</span>
          </a>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{copied ? t("contact.copied") : ""}</p>
    </div>
  );
}
