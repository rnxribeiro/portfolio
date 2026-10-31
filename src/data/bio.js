// ──────────────────────────────────────────────────────────────
// RNX · página /bio (link na bio do Instagram)
// Edite aqui — a página lê tudo deste arquivo.
//
// links     → lista de cards. icon: globe | monitor | book | file | mail | link | github (nome de rede social).
//             enabled: false esconde o item sem apagar (é só trocar para true para voltar).
//             internal: true = rota do próprio site; external: true = abre em nova aba.
//             href vazio ("") = item inativo com "Em breve".
// featured  → cards com borda no fim da página (enabled: false esconde o card).
// youtube   → card do YouTube com espaço para um vídeo.
// listPages → textos das listas /bio/setup e /bio/livros.
// ──────────────────────────────────────────────────────────────
import { bi } from "../i18n/bi.js";
import { site } from "./site.js";
import { socials } from "./socials.js";
import portrait from "../assets/images/renan-portrait.webp";

// Imagem do perfil da /bio (círculo): o avatar do hero (site.hero.photo). Troque por outra importando aqui.
export const profilePhoto = site.hero.photo;

// Retrato do topo da /bio (moldura de vidro 3D). Troque a imagem em src/assets/images/renan-portrait.webp.
export const bioPortrait = { src: portrait, place: bi("São Paulo, Brasil", "São Paulo, Brazil") };

export const links = [
  // 01 — manda direto para o site/portfólio. TODO: se o portfólio for outro endereço, troque o href
  // por uma URL completa e use external: true (em vez de internal: true).
  { enabled: true, title: bi("Meu portfólio", "My portfolio"), description: bi("Projetos e experimentos que já construí.", "Projects and experiments I've built."), href: "/", icon: "globe", internal: true },
  // Setup e Livros abrem listas exclusivas da /bio (BioSetup.jsx e BioBooks.jsx), não as páginas do site.
  { enabled: true, title: bi("Meu setup", "My setup"), description: bi("Equipamentos e itens que utilizo no dia a dia.", "Gear and items I use every day."), href: "/bio/setup", icon: "monitor", internal: true },
  { enabled: true, title: bi("Minha estante", "My bookshelf"), description: bi("Livros que eu recomendo.", "Books I recommend."), href: "/bio/livros", icon: "book", internal: true },

  // ── Guardados para usar depois (troque enabled para true) ──
  // O Media Kit tem card próprio no fim da página, por isso não está na lista.
  { enabled: false, title: "Media Kit", description: bi("Informações para marcas e oportunidades.", "Information for brands and opportunities."), href: "/bio/media-kit", internal: true },
  { enabled: false, title: "GitHub", description: bi("Código, estudos e projetos open source.", "Code, studies and open source projects."), href: "/github", icon: "github", internal: true },
  // O currículo usa o mesmo caminho de site.cv (src/data/site.js). Sem PDF ainda → fica "Em breve".
  { enabled: false, title: bi("Currículo", "Résumé"), description: bi("Experiência, formação e habilidades.", "Experience, education and skills."), href: site.cv, icon: "file", external: true },
  { enabled: false, title: bi("Entre em contato", "Get in touch"), description: bi("Vamos conversar.", "Let's talk."), href: "/contact", icon: "mail", internal: true },
];

// Textos das páginas de lista (/bio/setup e /bio/livros).
export const listPages = {
  setup: { label: "Setup", title: bi("Meu setup", "My setup"), subtitle: bi("Equipamentos e itens que utilizo no dia a dia.", "Gear and items I use every day.") },
  books: { label: bi("Livros", "Books"), title: bi("Minha estante", "My bookshelf"), subtitle: bi("Livros que eu recomendo.", "Books I recommend.") },
};

// Card do YouTube (acima do Media Kit). video: link ou ID de um vídeo do YouTube — quando preenchido, o vídeo
// aparece no card (carrega só ao clicar em play). Vazio = mostra o espaço reservado "Vídeo em breve".
export const youtube = {
  enabled: true,
  label: "YouTube",
  title: bi("Meu canal no YouTube", "My YouTube channel"),
  description: bi("Acompanhe os vídeos que eu publico.", "Follow the videos I publish."),
  cta: bi("Ver no YouTube", "Watch on YouTube"),
  channel: socials.find((x) => x.name === "YouTube").url,
  video: "", // TODO: cole aqui o link (ex.: https://www.youtube.com/watch?v=XXXXXXXXXXX) ou só o ID do vídeo
};

// Media Kit em formato de pasta (card grande no fim da página). enabled: false esconde.
export const mediaKitFolder = {
  enabled: true,
  title: "Media Kit",
  subtitle: bi("plataformas · audiência · parcerias", "platforms · audience · partnerships"),
  href: "/bio/media-kit",
};

// Blocos com borda (cards) opcionais. enabled: false esconde o bloco.
export const featured = [
  {
    id: "rnx-mode",
    enabled: false,
    label: bi("Projeto em destaque", "Featured project"),
    title: "RNX Mode",
    description: bi("Meu espaço pessoal para organizar tarefas, hábitos, projetos e rotina.", "My personal space to organize tasks, habits, projects and routine."),
    cta: bi("Abrir projeto", "Open project"),
    href: "", // TODO: endereço do RNX Mode (ainda não informado). Vazio = "Em breve".
    external: true,
  },
];
