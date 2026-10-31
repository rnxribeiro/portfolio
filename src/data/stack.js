// ──────────────────────────────────────────────────────────────
// RNX · "Ferramentas do dia a dia" (dentro de "Sobre mim", na Home e na página Sobre)
// Cada grupo vira uma linha da tabela; cada item vira uma "pílula". Adicione, remova ou reordene livremente.
// TODO: confirme a lista e os grupos.
// ──────────────────────────────────────────────────────────────
import { bi } from "../i18n/bi.js";

export const stack = {
  label: "Stack",
  title: bi("Ferramentas do dia a dia", "Everyday tools"),
  groups: [
    { label: bi("Linguagens", "Languages"), items: ["HTML", "CSS", "JavaScript", "TypeScript"] },
    { label: bi("Frameworks & build", "Frameworks & build"), items: ["React", "Next.js", "Vite", "Tailwind CSS"] },
    { label: bi("Back-end & dados", "Back-end & data"), items: ["Node.js", "PostgreSQL", "APIs REST"] },
    { label: bi("Ferramentas", "Tools"), items: ["Git", "GitHub", "VS Code"] },
  ],
};
