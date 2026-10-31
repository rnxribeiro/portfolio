// ──────────────────────────────────────────────────────────────
// RNX · SEO — título (aba do navegador / Google) e descrição de cada página do portfólio.
// As páginas da /bio definem os seus em src/data/bio.js (listPages) e nos próprios arquivos.
// Mantenha os títulos curtos (até ~60 caracteres) e as descrições entre ~120 e 160 caracteres.
// ──────────────────────────────────────────────────────────────
import { bi } from "../i18n/bi.js";

export const seo = {
  home: {
    title: bi("Renan Ribeiro — Desenvolvedor de Software", "Renan Ribeiro — Software Developer"),
    description: bi(
      "Portfólio de Renan Ribeiro, desenvolvedor de software. Projetos com React, TypeScript, Node.js e PostgreSQL, trajetória e contato.",
      "Portfolio of Renan Ribeiro, software developer. Projects with React, TypeScript, Node.js and PostgreSQL, experience and contact."
    ),
  },
  about: {
    title: bi("Sobre — Renan Ribeiro", "About — Renan Ribeiro"),
    description: bi(
      "Quem é Renan Ribeiro: estudante de Tecnologia da Informação na UNIVESP, desenvolvedor de software e as ferramentas que usa no dia a dia.",
      "Who Renan Ribeiro is: Information Technology student at UNIVESP, software developer, and an everyday toolkit."
    ),
  },
  projects: {
    title: bi("Projetos — Renan Ribeiro", "Projects — Renan Ribeiro"),
    description: bi(
      "Projetos de Renan Ribeiro: aplicações web com React, TypeScript, Node.js e PostgreSQL, com demo e código no GitHub.",
      "Renan Ribeiro's projects: web applications built with React, TypeScript, Node.js and PostgreSQL, with live demos and code on GitHub."
    ),
  },
  experience: {
    title: bi("Trajetória — Renan Ribeiro", "Experience — Renan Ribeiro"),
    description: bi(
      "Trajetória de Renan Ribeiro: estágio de TI no SESI, projetos maker, robótica educacional e o bacharelado em TI na UNIVESP.",
      "Renan Ribeiro's experience: IT internship at SESI, maker projects, educational robotics and the IT degree at UNIVESP."
    ),
  },
  github: {
    title: bi("GitHub — Renan Ribeiro", "GitHub — Renan Ribeiro"),
    description: bi(
      "Atividade e repositórios de Renan Ribeiro no GitHub: contribuições recentes e projetos em destaque.",
      "Renan Ribeiro's GitHub activity and repositories: recent contributions and featured projects."
    ),
  },
  contact: {
    title: bi("Contato — Renan Ribeiro", "Contact — Renan Ribeiro"),
    description: bi(
      "Fale com Renan Ribeiro por e-mail, GitHub ou LinkedIn sobre oportunidades, projetos e parcerias.",
      "Get in touch with Renan Ribeiro by email, GitHub or LinkedIn about opportunities, projects and partnerships."
    ),
  },
  notFound: {
    title: bi("Página não encontrada — Renan Ribeiro", "Page not found — Renan Ribeiro"),
    description: bi("Esta página não existe ou mudou de endereço.", "This page doesn't exist or has moved."),
  },
};
