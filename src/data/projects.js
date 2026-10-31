import { bi } from "../i18n/bi.js";
import raidensPerformance from "../assets/projects/raidens-performance.webp";
import qrCodeGenerator from "../assets/projects/qr-code-generator.webp";
import ourPlan from "../assets/projects/ourplan.webp";

// ──────────────────────────────────────────────────────────────
// RNX · projetos
// Todos os itens abaixo são PLACEHOLDERS editáveis (descrições e tecnologias
// baseadas na referência visual). Troque pelos dados reais quando quiser.
//
// image  → importe de src/assets/projects/ ou deixe null (mostra um placeholder)
// link   → live demo ("" quando ainda não existe)
// github → repositório ("" quando ainda não existe)
// featured → aparece em "Selected Projects" na Home
// ──────────────────────────────────────────────────────────────

export const projects = [
  {
    id: "raidens-performance",
    title: "Raidens Performance",
    description: bi(
      "Painel de desempenho da equipe Raidens na FIRST LEGO League: pontuação, missões e tempo de cada rodada de treino, com login, equipes e papéis.",
      "Performance dashboard for the Raidens FIRST LEGO League team: score, missions and time for every practice round, with login, teams and roles."
    ),
    image: raidensPerformance,
    technologies: ["React", "Vite", "Tailwind", "Supabase"],
    category: bi("Dados", "Data"),
    link: "https://raidens-performance.vercel.app",
    github: "",
    featured: true,
  },
  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    description: bi("Gerador de QR Code simples e intuitivo com React.", "A simple, intuitive QR Code generator built with React."),
    image: qrCodeGenerator,
    technologies: ["React", "TypeScript", "Tailwind"],
    category: bi("Ferramentas", "Tools"),
    link: "https://qrcode-generator-rnx.vercel.app",
    github: "https://github.com/rnxribeiro/qrcode-generator",
    featured: true,
  },
  {
    id: "ourplan",
    title: "OurPlan",
    description: bi(
      "Plataforma de planejamento e gestão financeira para casais: despesas compartilhadas, metas em conjunto e a evolução financeira do casal.",
      "Financial planning and management platform for couples: shared expenses, joint goals and the couple's financial progress."
    ),
    image: ourPlan,
    technologies: ["React", "Node.js", "PostgreSQL"],
    category: bi("Finanças", "Finance"),
    link: "",
    github: "",
    featured: true,
  },
  {
    id: "kanban",
    title: "Kanban",
    description: bi("Interface de gerenciamento de tarefas feita do zero.", "Task management interface built from scratch."),
    image: null,
    technologies: ["HTML", "CSS", "JavaScript"],
    category: bi("Produtividade", "Productivity"),
    link: "",
    github: "https://github.com/rnxribeiro/kanban-frontend",
    featured: true,
  },
  {
    id: "juros-compostos",
    title: "Juros Compostos",
    description: bi("Simulador de juros compostos: veja quanto um investimento rende com aportes ao longo do tempo.", "Compound interest simulator: see how an investment grows with contributions over time."),
    image: null,
    technologies: ["JavaScript"],
    category: bi("Finanças", "Finance"),
    link: "",
    github: "https://github.com/rnxribeiro/juros-compostos",
    featured: false,
  },
];
