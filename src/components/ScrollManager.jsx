import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Volta ao topo a cada troca de página (e respeita âncoras #hash).
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);
  return null;
}
