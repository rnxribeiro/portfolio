// ──────────────────────────────────────────────────────────────
// RNX · informações pessoais e textos principais
// Textos bilíngues: bi("português", "english"). Edite aqui — sem mexer nos componentes.
// Campos com "TODO" são placeholders que aguardam seu conteúdo real.
// ──────────────────────────────────────────────────────────────
import { bi } from "../i18n/bi.js";
import heroPhoto from "../assets/images/renan-avatar.webp";

export const site = {
  brand: "RNX",
  name: "Renan Ribeiro",
  handle: "RENAN.RIBEIRO",
  year: 2026,

  // Tela de carregamento (RNX + barra fina) que aparece ao abrir o site.
  // enabled: false desliga | minMs: tempo mínimo na tela | maxMs: limite caso o carregamento demore
  // excludePaths: rotas que não mostram a tela (ex.: ["/bio"] para a página do link na bio abrir direto)
  splash: { enabled: true, minMs: 1000, maxMs: 3000, excludePaths: [] },

  // Currículo em PDF: coloque o arquivo em /public (ex.: "/curriculo-renan.pdf") e preencha aqui.
  // Enquanto estiver vazio, o botão "Ver currículo" do hero fica inativo.
  cv: "/curriculo-renan-ribeiro.pdf",

  hero: {
    // Hero: rótulo pequeno, título (marcações: ~texto~ = cinza · *texto* = itálico · \n = quebra), texto e botão.
    label: bi("Engenheiro de software", "Software engineer"),
    headline: bi("Construindo experiências\n~digitais melhores.~", "Building better\n~digital experiences.~"),
    intro: bi(
      "Sou Renan Ribeiro, desenvolvedor de software focado em criar aplicações web modernas, resolver problemas reais e construir produtos digitais com propósito.",
      "I'm Renan Ribeiro, a Software Developer focused on creating modern web applications, solving real-world problems and building meaningful digital products."
    ),
    // linha de identidade logo abaixo do nome
    role: bi("Desenvolvedor de Software Jr.", "Jr. Software Developer"),
    // Avatar em traço (line art) do Renan, igual nos temas claro e escuro (traço preto, preenchimento branco,
    // fundo transparente). Para trocar, substitua src/assets/images/renan-avatar.webp ou aponte outro aqui. Com photo: null o espaço fica reservado.
    photo: heroPhoto,
    photoAlt: bi("Ilustração de Renan Ribeiro", "Illustration of Renan Ribeiro"),
  },

  // Metadados curtos (prévia do About na Home e página About).
  facts: [
    { id: "location", label: bi("Localização", "Location"), value: bi("São Paulo, Brasil", "São Paulo, Brazil") },
    { id: "studying", label: bi("Cursando", "Studying"), value: bi("Tecnologia da Informação", "Information Technology") },
    { id: "focus", label: bi("Foco", "Focus"), value: bi("Engenharia de Software", "Software Engineering") },
  ],

  about: {
    // Título da seção "Sobre mim" da Home e áreas de atuação (lista numerada ao lado)
    headline: bi("Acredito em código limpo, soluções simples e visão de *longo prazo.*", "I believe in clean code, simple solutions and long-term *thinking.*"),
    areas: [
      bi("Desenvolvimento Front-end", "Front-end Development"),
      bi("Desenvolvimento Full-Stack", "Full-Stack Development"),
      bi("Engenharia de Software", "Software Engineering"),
      "UI/UX",
      bi("Modelagem de Banco de Dados", "Database Design"),
    ],
    preview: bi(
      "Estudo Tecnologia da Informação e passo boa parte do tempo construindo coisas: apps, integrações e projetos pessoais. Gosto de testar ferramentas novas, entender como os sistemas funcionam por dentro e transformar ideia em produto.",
      "I study Information Technology and spend a good part of my time building things: apps, integrations and side projects. I like trying new tools, understanding how systems work under the hood and turning ideas into products."
    ),
    intro: bi(
      "Sou dev, estudante de TI na UNIVESP e estagiário no SESI. Gosto de entender como as coisas funcionam por dentro, testar ferramentas novas e transformar ideia solta em projeto de verdade, de preferência com uma interface caprichada.",
      "I'm a dev, an IT student at UNIVESP and an intern at SESI. I like understanding how things work under the hood, trying new tools and turning loose ideas into real projects, ideally with a polished interface."
    ),
    // Seções da página /about (textos de "Sobre").
    sections: [
      { title: bi("Trajetória", "Background"), text: bi(
        "Minha jornada na tecnologia começou pela curiosidade em entender como sistemas e aplicações funcionam. Desde então, venho desenvolvendo projetos próprios e adquirindo experiência prática em desenvolvimento de software.",
        "My journey in technology began with a curiosity to understand how systems and applications work. Since then, I have been developing my own projects and gaining practical experience in software development.") },
      // "\n" separa parágrafos dentro de um mesmo texto.
      { title: bi("Conhecimentos", "Knowledge"), text: bi(
        "Desenvolvimento web, lógica de programação, bancos de dados, integração de APIs e design de interfaces. Interesse contínuo em arquitetura de software e boas práticas de desenvolvimento.",
        "Web development, programming logic, databases, API integration, and interface design. Ongoing interest in software architecture and development best practices.") },
      { title: bi("Foco atual", "Current focus"), text: bi(
        "Aprofundando conhecimentos em JavaScript, TypeScript, React, Node.js e PostgreSQL, aplicando essas tecnologias na construção de aplicações e projetos práticos.",
        "Deepening knowledge of JavaScript, TypeScript, React, Node.js, and PostgreSQL, and applying these technologies to build applications and practical projects.") },
      { title: bi("Objetivos", "Goals"), text: bi(
        "Evoluir como desenvolvedor de software, contribuir com equipes de tecnologia e participar da construção de soluções eficientes, escaláveis e relevantes.",
        "To evolve as a software developer, contribute to technology teams, and participate in building efficient, scalable, and meaningful solutions.") },
    ],
  },

  contact: {
    email: "rnxribeiro@gmail.com",
    headline: bi("Vamos conversar.", "Let's talk."),
    // Título do convite de contato (fim da Home e da página Sobre). Mesmas marcações do hero.
    cta: bi("Vamos construir algo\n~incrível juntos.~", "Let's build something\n~great together.~"),
    text: bi("Projeto, vaga, colaboração ou só um papo: me chama que eu respondo.", "A project, a job, a collab or just a chat: drop me a line and I'll reply."),
    subject: bi("Contato pelo site RNX", "Message from the RNX site"),
  },

  github: { username: "rnxribeiro" },
};
