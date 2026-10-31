import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Endereço público do site (definido em vite.config.js → VITE_SITE_URL). Usado no link canônico e no og:url.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");

// Atualiza <title>, description, Open Graph, Twitter e o link canônico enquanto a página está aberta e restaura ao sair.
// A imagem de compartilhamento (og:image) é fixa e fica no index.html, porque WhatsApp/LinkedIn não executam JavaScript.
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  const created = !el;
  if (created) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  const previous = el.getAttribute("content");
  el.setAttribute("content", content);
  return () => (created ? el.remove() : el.setAttribute("content", previous ?? ""));
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  const created = !el;
  if (created) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  const previous = el.getAttribute("href");
  el.setAttribute("href", href);
  return () => (created ? el.remove() : el.setAttribute("href", previous ?? ""));
}

export function useDocumentMeta({ title, description, noindex = false }) {
  const { pathname } = useLocation();
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
    const undo = [
      setMeta("name", "description", description),
      setMeta("property", "og:title", title),
      setMeta("property", "og:description", description),
      setMeta("property", "og:url", url),
      setMeta("name", "twitter:title", title),
      setMeta("name", "twitter:description", description),
      setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow"),
      setCanonical(url),
    ];
    return () => {
      document.title = prevTitle;
      undo.forEach((fn) => fn());
    };
  }, [title, description, noindex, pathname]);
}
