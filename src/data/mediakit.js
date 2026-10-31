// ──────────────────────────────────────────────────────────────
// RNX · media kit
// Nenhum número real foi informado: tudo com "XX" é placeholder.
// ──────────────────────────────────────────────────────────────
import { bi } from "../i18n/bi.js";

export const mediaKit = {
  pdf: "", // TODO: coloque o PDF em /public (ex.: "/media-kit-rnx.pdf") e preencha aqui
  about: bi(
    "Desenvolvedor e criador de conteúdo sobre tecnologia, desenvolvimento, produtividade e estilo de vida.",
    "Developer and content creator about technology, development, productivity and lifestyle."
  ),
  platforms: [
    { name: "Instagram", followers: bi("XX.XK seguidores", "XX.XK followers"), metric: bi("XX.XK visualizações/mês", "XX.XK monthly views") },
    { name: "YouTube", followers: bi("XX.XK inscritos", "XX.XK subscribers"), metric: bi("XX.XK visualizações/mês", "XX.XK monthly views") },
    { name: "TikTok", followers: bi("XX.XK seguidores", "XX.XK followers"), metric: bi("XX.XK visualizações/mês", "XX.XK monthly views") },
    { name: "LinkedIn", followers: bi("XX.XK seguidores", "XX.XK followers"), metric: bi("XX.XK impressões/mês", "XX.XK monthly impressions") },
  ],
  audience: [
    { label: bi("Faixa etária", "Age range"), value: "XX–XX" },
    { label: bi("País principal", "Top country"), value: "XX%" },
    { label: bi("Gênero", "Gender split"), value: "XX% / XX%" },
    { label: bi("Principais interesses", "Top interests"), value: "TODO" },
  ],
  formats: [
    bi("Reels e vídeos curtos", "Reels and short videos"),
    bi("Vídeos longos", "Long-form videos"),
    bi("Posts e carrosséis", "Posts and carousels"),
    bi("Reviews de setup e ferramentas", "Setup and tool reviews"),
    "Stories",
  ],
  partnerships: [
    { title: bi("Conteúdo patrocinado", "Sponsored content"), text: bi("TODO — descreva como funciona.", "TODO — describe how it works.") },
    { title: bi("Reviews de produtos", "Product reviews"), text: bi("TODO — descreva como funciona.", "TODO — describe how it works.") },
    { title: bi("Links de afiliado", "Affiliate links"), text: bi("Produtos e ferramentas que uso, com link comissionado quando aplicável.", "Products and tools I use, with commissioned links when applicable.") },
  ],
};
