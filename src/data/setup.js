// ──────────────────────────────────────────────────────────────
// RNX · setup (equipamentos e desk)
//
// setupItems  → itens do SETUP ATUAL. Aparecem só na lista /bio/setup (o site principal não tem mais página de setup).
// otherItems  → "Outros itens": produtos que NÃO estão no setup atual, mas que a pessoa pode ver e comprar.
//               Aparecem em um grupo à parte ("Outros itens") na lista /bio/setup.
//
// Textos bilíngues: bi("português", "english"). Strings simples valem para os dois idiomas.
// A ORDEM de setupCategories define a ordem das seções, dos filtros e da prévia da Home.
//
// category  → "equipamentos" | "desk"  (define filtro e seção; não é usado em otherItems)
// type      → rótulo pequeno acima do nome (ex.: Monitor)
// image     → foto em src/assets/setup/ (importe abaixo) ou null para mostrar um placeholder com ícone
// icon      → ícone do placeholder (ver iconMap em components/SetupCard.jsx)
// link      → URL do produto ("" = ainda sem link; o card mostra "Link em breve")
// store     → nome da loja do link, ex.: "Mercado Livre" (aparece no card)
// affiliate → true quando for link comissionado (mostra um selo discreto "Afiliado")
// ──────────────────────────────────────────────────────────────
import { bi } from "../i18n/bi.js";
import mesaKappesberg from "../assets/setup/mesa-kappesberg.webp";
import cadeiraLuvinco from "../assets/setup/cadeira-luvinco-bt07.webp";
import monitorLg from "../assets/setup/monitor-lg-ultragear-34.webp";
import relogioDigital from "../assets/setup/relogio-digital-led.webp";
import suporteMonitor from "../assets/setup/suporte-monitor-elevado.webp";
import mousepadElg from "../assets/setup/mousepad-feltro-elg.webp";
import webcamLogitech from "../assets/setup/webcam-logitech-mx-brio.webp";
import bracoFifine from "../assets/setup/braco-fifine-bm88.webp";
import mousepadTitorion from "../assets/setup/mousepad-titorion-perspective.webp";
import filtroDeLinha from "../assets/setup/filtro-de-linha-iclamper.webp";
import bracoMonitorElg from "../assets/setup/braco-monitor-elg-f80n.webp";
import tecladoAjazz from "../assets/setup/teclado-ajazz-ak820.webp";
import mouseAjazz from "../assets/setup/mouse-ajazz-aj139.webp";
import legoMercedes from "../assets/setup/lego-mercedes-w15.webp";
import funkoAntonelli from "../assets/setup/funko-antonelli.webp";
import organizadorCabos from "../assets/setup/organizador-cabos.webp";
import pegboard from "../assets/setup/pegboard.webp";
import cuboMoyu from "../assets/setup/cubo-moyu-meilong.webp";
import portaCaneta from "../assets/setup/porta-caneta-aramado.webp";
import fanRise from "../assets/setup/fan-rise-galaxy.webp";
import hotwheelsAntonelli from "../assets/setup/hotwheels-antonelli.webp";
import funkoSenna from "../assets/setup/funko-senna.webp";
import fitaLed from "../assets/setup/fita-led-quente.webp";

export const setupCategories = [
  { id: "equipamentos", filter: bi("Equipamentos", "Gear"), title: bi("Equipamentos", "Gear"), description: bi("O que uso para trabalhar, estudar e criar.", "What I use to work, study and create.") },
  { id: "desk", filter: "Desk", title: "Desk", description: bi("Meu espaço de trabalho e estudo.", "My work and study space.") },
];

const ML = "Mercado Livre";

export const setupItems = [
  // — Equipamentos —
  { name: 'LG UltraGear Curvo 34"', category: "equipamentos", type: "Monitor", description: bi("Ultrawide curvo, 3440x1440 e 160Hz.", "Curved ultrawide, 3440x1440 at 160Hz."), brand: "LG", icon: "monitor", image: monitorLg, link: "https://meli.la/1vKgqqE", store: ML, affiliate: false },
  { name: "Ajazz AK820", category: "equipamentos", type: bi("Teclado", "Keyboard"), description: bi("Teclado mecânico 75% com fio e knob de volume.", "Wired 75% mechanical keyboard with a volume knob."), brand: "Ajazz", icon: "keyboard", image: tecladoAjazz, link: "https://meli.la/28aLrQZ", store: ML, affiliate: false },
  { name: "Ajazz AJ139 V2", category: "equipamentos", type: "Mouse", description: bi("Mouse sem fio com sensor PixArt PAW3311.", "Wireless mouse with a PixArt PAW3311 sensor."), brand: "Ajazz", icon: "mouse", image: mouseAjazz, link: "https://meli.la/2W3okgg", store: ML, affiliate: false },
  { name: "Logitech MX Brio 4K", category: "equipamentos", type: "Webcam", description: bi("Webcam 4K ultra-wide com sensor de 8,5 MP.", "Ultra-wide 4K webcam with an 8.5 MP sensor."), brand: "Logitech", icon: "monitor", image: webcamLogitech, link: "https://meli.la/21Rhvby", store: ML, affiliate: false },

  // — Desk —
  { name: "Kappesberg Diretor 1,9m", category: "desk", type: bi("Mesa", "Desk"), description: bi("Mesa estilo diretor, com 1,9 m de comprimento.", "Executive-style desk, 1.9 m wide."), brand: "Kappesberg", icon: "table", image: mesaKappesberg, link: "https://meli.la/1RdorbS", store: ML, affiliate: false },
  { name: "Luvinco BT07", category: "desk", type: bi("Cadeira", "Chair"), description: bi("Cadeira ergonômica com apoio de cabeça e de pés.", "Ergonomic chair with head and foot support."), brand: "Luvinco", icon: "chair", image: cadeiraLuvinco, link: "https://meli.la/2HgNWUV", store: ML, affiliate: false },
  { name: "ELG F80N", category: "desk", type: bi("Braço de monitor", "Monitor arm"), description: bi("Braço articulado com pistão a gás para monitores de 17\" a 35\", até 9 kg.", "Gas-spring arm for 17\" to 35\" monitors, up to 9 kg."), brand: "ELG", icon: "monitor", image: bracoMonitorElg, link: "https://meli.la/2vMffrL", store: ML, affiliate: false },
  { name: bi("Suporte de Monitor Elevado", "Raised Monitor Stand"), category: "desk", type: bi("Suporte", "Stand"), description: bi("Suporte elevado, com espaço embaixo para organizar a mesa.", "Raised stand with room underneath to keep the desk tidy."), brand: bi("Acessórios", "Accessories"), icon: "table", image: suporteMonitor, link: "https://meli.la/1BywtXf", store: ML, affiliate: false },
  { name: "Titorion Perspective Preto", category: "desk", type: "Mousepad", description: bi("Mousepad grande preto com estampa em perspectiva.", "Large black mousepad with a perspective-grid print."), brand: "Titorion", icon: "mat", image: mousepadTitorion, link: "https://meli.la/1bUYhFz", store: ML, affiliate: false },
  { name: "Fifine BM88", category: "desk", type: bi("Braço de microfone", "Mic arm"), description: bi("Braço articulado que prende na mesa e sustenta o microfone.", "Articulated arm that clamps to the desk and holds the microphone."), brand: "Fifine", icon: "mic", image: bracoFifine, link: "https://meli.la/1geoiky", store: ML, affiliate: false },
  { name: bi("iCLAMPER Energia 8 Tomadas", "iCLAMPER Energia 8 Outlets"), category: "desk", type: bi("Filtro de linha", "Power strip"), description: bi("Filtro de linha com DPS e 8 tomadas.", "Surge-protected power strip with 8 outlets."), brand: "iCLAMPER", icon: "table", image: filtroDeLinha, link: "https://meli.la/2xrnN6j", store: ML, affiliate: false },
  { name: bi("Organizador de Cabos 0,5m", "Cable Organizer 0.5m"), category: "desk", type: bi("Organização", "Organization"), description: bi("Calha oculta embaixo da mesa para esconder os fios.", "Hidden under-desk tray to tuck cables away."), brand: "ABC Fixadores", icon: "table", image: organizadorCabos, link: "https://meli.la/21Purvp", store: ML, affiliate: false },
  { name: bi("Fita LED Branco-Quente 5m", "Warm White LED Strip 5m"), category: "desk", type: bi("Iluminação", "Lighting"), description: bi("Fita LED colada atrás da mesa para iluminar a parede.", "LED strip stuck behind the desk to light up the wall."), brand: "Maffacioli", icon: "lamp", image: fitaLed, link: "https://meli.la/2K3rDgP", store: ML, affiliate: false },
  { name: bi("Relógio Digital LED", "LED Digital Clock"), category: "desk", type: bi("Relógio", "Clock"), description: bi("Relógio digital de mesa com display LED.", "Digital desk clock with an LED display."), brand: bi("Decoração", "Decor"), icon: "lamp", image: relogioDigital, link: "https://meli.la/1k6HiZW", store: ML, affiliate: false },
];

// Só na /bio/setup: produtos que não estão no setup atual, mas que a pessoa pode ver e comprar.
export const otherItemsLabel = bi("Outros itens", "Other items");
export const otherItems = [
  { name: bi("Pegboard Preto Grande", "Large Black Pegboard"), type: bi("Organização", "Organization"), description: bi("Painel perfurado para organizar acessórios na parede.", "Perforated panel to organize accessories on the wall."), brand: bi("Acessórios", "Accessories"), icon: "table", image: pegboard, link: "https://meli.la/2WXxJb1", store: ML, affiliate: false },
  { name: "ELG Feltro 90x40", type: "Mousepad", description: bi("Mousepad grande de feltro, com 90x40 cm.", "Large felt mousepad, 90x40 cm."), brand: "ELG", icon: "mat", image: mousepadElg, link: "https://meli.la/2b36ifV", store: ML, affiliate: false },
  { name: bi("Porta-Canetas Aramado", "Wire Pen Holder"), type: bi("Organização", "Organization"), description: bi("Porta-canetas redondo aramado para a mesa.", "Round wire pen holder for the desk."), brand: bi("Acessórios", "Accessories"), icon: "pencil", image: portaCaneta, link: "https://meli.la/1CU3rh9", store: ML, affiliate: false },
  { name: "Rise Mode Galaxy 120mm", type: "Fan", description: bi("Fan de 120 mm com LED branco.", "120 mm fan with white LED."), brand: "Rise Mode", icon: "laptop", image: fanRise, link: "https://meli.la/2wH9GP7", store: ML, affiliate: false },
  { name: "MoYu MeiLong 3x3 Magnético", type: bi("Cubo mágico", "Speed cube"), description: bi("Cubo mágico 3x3 magnético, sem adesivos.", "Magnetic stickerless 3x3 speed cube."), brand: "MoYu", icon: "lamp", image: cuboMoyu, link: "https://meli.la/1xkK7yG", store: ML, affiliate: false },
  { name: "LEGO Mercedes-AMG F1 W15", type: bi("Decoração", "Decor"), description: bi("Carro de F1 da linha Speed Champions (77244) para montar.", "Speed Champions F1 car (77244) to build."), brand: "LEGO", icon: "lamp", image: legoMercedes, link: "https://meli.la/1Y552oU", store: ML, affiliate: false },
  { name: "Funko Pop! Kimi Antonelli", type: bi("Decoração", "Decor"), description: bi("Funko Pop! Racing do piloto da Mercedes.", "Funko Pop! Racing of the Mercedes driver."), brand: "Funko", icon: "lamp", image: funkoAntonelli, link: "https://meli.la/2FKVNT9", store: ML, affiliate: false },
  { name: "Funko Pop! Ayrton Senna", type: bi("Decoração", "Decor"), description: bi("Funko Pop! Racing do Senna com a McLaren.", "Funko Pop! Racing of Senna with McLaren."), brand: "Funko", icon: "lamp", image: funkoSenna, link: "https://meli.la/2arzyju", store: ML, affiliate: false },
  { name: "Hot Wheels F1 Mercedes Antonelli", type: bi("Decoração", "Decor"), description: bi("Miniatura do carro de F1 da Mercedes do Kimi Antonelli.", "Die-cast of Kimi Antonelli's Mercedes F1 car."), brand: "Hot Wheels", icon: "lamp", image: hotwheelsAntonelli, link: "https://meli.la/1SoRtmQ", store: ML, affiliate: false },
];
