// ──────────────────────────────────────────────────────────────
// RNX · redes sociais
// placeholder: true → URL ainda não definida (o link fica desativado visualmente).
// Para ativar: troque a url e remova a linha "placeholder".
// "icon" liga ao componente SocialIcon.
// ──────────────────────────────────────────────────────────────

export const socials = [
  { name: "GitHub", icon: "github", username: "rnxribeiro", url: "https://github.com/rnxribeiro" },
  { name: "LinkedIn", icon: "linkedin", username: "rnxribeiro", url: "https://www.linkedin.com/in/rnxribeiro" }, // TODO: confirme a URL
  { name: "Instagram", icon: "instagram", username: "@rnxribeiro", url: "https://www.instagram.com/rnxribeiro" },
  { name: "YouTube", icon: "youtube", username: "@rnx.ribeiro", url: "https://www.youtube.com/@rnx.ribeiro" },
  { name: "TikTok", icon: "tiktok", username: "@rnxribeiro", url: "https://www.tiktok.com/@rnxribeiro" },
  { name: "Email", icon: "email", username: "rnxribeiro@gmail.com", url: "mailto:rnxribeiro@gmail.com" },
];

// Usado no hero e no footer (além das redes acima, o e-mail aparece no footer).
export const heroSocials = ["GitHub", "LinkedIn", "Instagram", "YouTube"];

// Ícones da página /bio (embaixo do nome). O e-mail fica só na área de contato, no fim da página.
// Para mostrar o TikTok também no hero/contato, inclua "TikTok" na lista heroSocials acima.
export const bioSocials = ["GitHub", "LinkedIn", "Instagram", "YouTube", "TikTok"];
