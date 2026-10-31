// ──────────────────────────────────────────────────────────────
// RNX · Trajetória (experiência profissional) — seção na Home
// Para adicionar outra experiência, copie um item da lista (a mais recente primeiro).
// location → local (aparece ao lado da data). details → versão completa, usada na página /experience.
// highlights → pontos curtos (cada um vira uma linha com "→"). tags → pílulas no fim do item.
// ──────────────────────────────────────────────────────────────
import { bi } from "../i18n/bi.js";

export const experience = [
  {
    role: bi("Estagiário de TI", "IT Intern"),
    location: "SESI Alumínio · Alumínio, SP",
    period: bi("mar. de 2025 — dez. de 2026", "Mar 2025 — Dec 2026"),
    summary: bi(
      "Atuo em projetos voltados à inovação, suporte tecnológico e desenvolvimento de equipes de robótica.",
      "I work on projects focused on innovation, tech support and robotics team development."
    ),
    tags: ["Educação Tecnológica", "Cultura Maker", "STEM", "Microsoft 365", "Robótica"],
    details: [
      { title: bi("Projetos Maker", "Maker projects"), text: bi(
        "Atuação em projetos Maker, utilizando tecnologias de fabricação digital como impressoras 3D, cortadora a laser, plotter de recorte e máquinas CNC para desenvolvimento e prototipagem de soluções.",
        "Working on Maker projects with digital fabrication technologies such as 3D printers, laser cutters, vinyl cutters and CNC machines to develop and prototype solutions.") },
      { title: bi("Suporte técnico", "Tech support"), text: bi(
        "Suporte técnico a alunos e professores, realizando atendimento e resolução de demandas relacionadas a hardware, software e ferramentas da Microsoft 365 (Word, Excel, PowerPoint e demais recursos).",
        "Technical support for students and teachers, handling requests related to hardware, software and Microsoft 365 tools (Word, Excel, PowerPoint and more).") },
      { title: bi("Robótica", "Robotics"), text: bi(
        "Acompanhamento das equipes de robótica OBR (Olimpíada Brasileira de Robótica) e FLL (First Lego League), auxiliando em estratégias, programação e desenvolvimento de projetos inovadores.",
        "Mentoring the OBR (Brazilian Robotics Olympiad) and FLL (First Lego League) robotics teams, helping with strategy, programming and the development of innovative projects.") },
      { title: bi("Dados e equipamentos", "Data & equipment"), text: bi(
        "Organização e controle de dados internos por meio da criação e manutenção de planilhas no Excel, apoiando o controle de equipamentos.",
        "Organizing and controlling internal data by creating and maintaining Excel spreadsheets, supporting equipment tracking.") },
      { title: bi("Ambiente e competências", "Environment & skills"), text: bi(
        "Colaboração em um ambiente voltado à inovação e educação tecnológica, desenvolvendo habilidades em resolução de problemas, trabalho em equipe e suporte a projetos multidisciplinares.",
        "Collaborating in an environment focused on innovation and technology education, developing problem-solving, teamwork and multidisciplinary project support skills.") },
    ],
    highlights: [
      bi("Projetos Maker com fabricação digital: impressoras 3D, cortadora a laser, plotter de recorte e CNC.", "Maker projects with digital fabrication: 3D printers, laser cutter, vinyl cutter and CNC machines."),
      bi("Suporte técnico a alunos e professores em hardware, software e Microsoft 365.", "Tech support for students and teachers on hardware, software and Microsoft 365."),
      bi("Acompanhamento das equipes de robótica OBR e FLL: estratégia, programação e projetos.", "Mentoring the OBR and FLL robotics teams: strategy, programming and projects."),
      bi("Controle de equipamentos por meio de planilhas no Excel.", "Equipment tracking through Excel spreadsheets."),
    ],
  },
  {
    role: bi("Bacharelado em Tecnologia da Informação", "B.Sc. in Information Technology"),
    location: "UNIVESP · Universidade Virtual do Estado de São Paulo",
    period: bi("jul. de 2024 — jun. de 2027", "Jul 2024 — Jun 2027"),
    summary: bi(
      "Graduação em andamento, com previsão de conclusão em junho de 2027.",
      "Degree in progress, expected to finish in June 2027."
    ),
    tags: ["HTML", "CSS", "JavaScript", "Python", "Banco de Dados"],
  },
];
