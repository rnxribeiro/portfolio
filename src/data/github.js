import { bi } from "../i18n/bi.js";

// RNX · GitHub — dados de fallback (usados se a API pública estiver indisponível)
// e lista de repositórios em destaque.

export const githubConfig = {
  username: "rnxribeiro",
  // Nomes exatos dos repositórios em destaque. Se existirem na API, usamos os dados reais;
  // senão, mostramos o nome e a descrição abaixo. TODO: confirme os nomes.
  featuredRepos: [
    { name: "kanban-frontend", description: bi("App de gerenciamento de tarefas", "Task management app") },
    { name: "qr-code-generator", description: bi("Gerador de QR Code", "QR Code generator") },
    { name: "fundo-magico", description: bi("Removedor de fundo com IA", "AI background remover") },
    { name: "personal-finance", description: bi("App de finanças (em andamento)", "Finance app (in progress)") },
  ],
  // Quantos dias de atividade pública a API de eventos cobre (limite do GitHub: ~90 dias).
  gridWeeks: 26,
};

// Fallback estático — claramente rotulado como exemplo na interface.
export const githubFallback = {
  repos: null,
  followers: null,
  yearsActive: null,
};
