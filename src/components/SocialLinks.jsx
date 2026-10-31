import { ArrowUpRight } from "lucide-react";
import { socials, heroSocials } from "../data/socials.js";
import SocialIcon from "./SocialIcon.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

// variant="icons" → círculos (hero/footer) · variant="list" → linhas (contact)
const ext = (url) => (url.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" });

export default function SocialLinks({ variant = "icons", only = heroSocials }) {
  const { t } = useLang();
  const items = socials.filter((s) => only.includes(s.name));

  if (variant === "list") {
    return (
      <div className="socials socials--list">
        {items.map((s) => (
          <a
            key={s.name}
            className="social-row"
            href={s.placeholder ? undefined : s.url}
            aria-disabled={s.placeholder || undefined}
            {...ext(s.url)}
          >
            <span className="social-row__left">
              <SocialIcon name={s.icon} />
              {s.name}
            </span>
            <span className="social-row__left">
              <span className="social-row__user">{s.placeholder ? t("common.soon") : s.username}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="socials">
      {items.map((s) => (
        <a
          key={s.name}
          className="social-btn"
          href={s.placeholder ? undefined : s.url}
          aria-label={s.placeholder ? `${s.name} (${t("common.soon")})` : s.name}
          aria-disabled={s.placeholder || undefined}
          {...ext(s.url)}
        >
          <SocialIcon name={s.icon} />
        </a>
      ))}
    </div>
  );
}
