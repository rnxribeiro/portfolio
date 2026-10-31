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
    greeting: bi("Olá, eu sou o", "Hi, I'm"),
    // linha de identidade logo abaixo do nome
    role: bi("Desenvolvedor de Software Jr.", "Jr. Software Developer"),
    tagline: bi(
      "Interessado em desenvolvimento de software e inovação, criando aplicações e soluções digitais que geram valor.",
      "Interested in software development and innovation, creating applications and digital solutions that generate value."
    ),
    // palavras posicionadas em profundidades diferentes dentro do objeto de vidro do hero
    prism: [bi("Desenvolvimento de aplicações", "Application development"), bi("APIs e integração de sistemas", "APIs and systems integration"), bi("Banco de dados e arquitetura", "Database and architecture")],
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
    preview: bi(
      "Sou estudante de Tecnologia da Informação e desenvolvedor de software, interessado na construção de aplicações e soluções tecnológicas. Tenho explorado diferentes tecnologias e ferramentas para desenvolver projetos, integrar sistemas e transformar ideias em soluções funcionais.",
      "I am an Information Technology student and software developer, interested in building applications and technological solutions. I have been exploring various technologies and tools to develop projects, integrate systems, and transform ideas into functional solutions."
    ),
    intro: bi(
      "Sou estudante de Tecnologia da Informação e desenvolvedor de software, interessado na construção de aplicações e soluções tecnológicas. Tenho explorado diferentes tecnologias e ferramentas para desenvolver projetos, integrar sistemas e transformar ideias em soluções funcionais.",
      "I am an Information Technology student and software developer, interested in building applications and technological solutions. I have been exploring various technologies and tools to develop projects, integrate systems, and transform ideas into functional solutions."
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
    text: bi("Tem um projeto, colaboração ou ideia?", "Have a project, collaboration or idea?"),
    subject: bi("Contato pelo site RNX", "Message from the RNX site"),
  },

  github: { username: "rnxribeiro" },
};
