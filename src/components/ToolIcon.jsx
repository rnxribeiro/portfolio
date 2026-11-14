import {
  siReact, siTypescript, siJavascript, siNextdotjs, siNodedotjs, siPostgresql, siTailwindcss, siVite,
  siHtml5, siCss, siGit, siGithub, siSupabase,
} from "simple-icons";

// Logos das ferramentas (simple-icons). Ferramenta sem logo → inicial dentro de um círculo.
const icons = {
  React: siReact, TypeScript: siTypescript, JavaScript: siJavascript, "Next.js": siNextdotjs, "Node.js": siNodedotjs,
  PostgreSQL: siPostgresql, "Tailwind CSS": siTailwindcss, Tailwind: siTailwindcss, Vite: siVite, HTML: siHtml5, CSS: siCss,
  Git: siGit, GitHub: siGithub, Supabase: siSupabase,
};

export const hasToolIcon = (name) => Boolean(icons[name]);

export default function ToolIcon({ name, size = 20 }) {
  const icon = icons[name];
  if (!icon) {
    return <span className="tool-glyph" style={{ width: size, height: size }} aria-hidden="true">{name.charAt(0)}</span>;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={icon.path} />
    </svg>
  );
}
