import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Endereço público do site: usado na imagem de compartilhamento, no link canônico, no robots.txt e no sitemap.
// Para trocar, edite aqui (ou defina VITE_SITE_URL nas variáveis de ambiente da Vercel).
const DEFAULT_SITE_URL = "https://rnxribeiro.vercel.app";
process.env.VITE_SITE_URL ||= DEFAULT_SITE_URL;

// Páginas públicas que entram no sitemap.xml (a 404 fica de fora).
const ROUTES = ["/", "/about", "/projects", "/experience", "/github", "/contact", "/bio", "/bio/setup", "/bio/livros", "/bio/media-kit"];

// Gera robots.txt e sitemap.xml no build, com o endereço de VITE_SITE_URL.
function seoFiles(siteUrl) {
  return {
    name: "rnx-seo-files",
    apply: "build",
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const urls = ROUTES.map((r) => `  <url><loc>${siteUrl}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod></url>`).join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n` });
    },
  };
}

// Duas entradas HTML que carregam o mesmo app: "/" e "/bio".
// bio/index.html existe só para que o /bio tenha title/description/Open Graph próprios
// já no HTML (redes sociais e buscadores não executam JavaScript).
export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, process.cwd(), "VITE_").VITE_SITE_URL || "").replace(/\/$/, "");
  return {
    plugins: [react(), seoFiles(siteUrl)],
    build: {
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, "index.html"),
          bio: resolve(import.meta.dirname, "bio/index.html"),
        },
      },
    },
  };
});
