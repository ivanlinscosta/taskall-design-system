/**
 * Gera os componentes de ícone a partir de src/assets/icons/*.svg (grade 20×20).
 *
 * - Cada SVG vira src/icons/<NomePascal>.tsx usando IconBase e `currentColor`.
 * - clipPath de 20×20 (sem efeito visual) é descartado para evitar ids duplicados.
 * - Regenera src/icons/index.ts e src/icons/iconSearch.ts (palavras-chave EN + PT).
 *
 * Uso: pnpm --filter @taskall/react generate:icons
 */
import * as fs from "node:fs";
import * as path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS_DIR = path.join(ROOT, "src/assets/icons");
const OUT_DIR = path.join(ROOT, "src/icons");
const INDEX_FILE = path.join(OUT_DIR, "index.ts");
const SEARCH_FILE = path.join(OUT_DIR, "iconSearch.ts");
const GENERATED_MARK =
  "// Gerado por scripts/generate-icons.ts — não edite manualmente.";

/**
 * Nomes da API anterior mantidos por compatibilidade, apontando para o
 * desenho equivalente do novo conjunto.
 */
const ALIASES: Record<string, string> = {
  Bell: "BellNotification",
  Calendar: "BlankCalendar",
  ChevronDown: "TaillessLineArrowDown",
  ChevronLeft: "TaillessLineArrowLeft",
  ChevronRight: "TaillessLineArrowRight",
  ChevronUp: "TaillessLineArrowUp",
  Close: "Delete",
  Download: "DownloadTray",
  Link: "LinkChain",
  Mail: "MailSendEnvelope",
  Search: "MagnifyingGlass",
  Settings: "Cog",
  Upload: "UploadTray",
  User: "UserCircleSingle",
};

/** Ícones complementares sem equivalente no conjunto oficial (desenho próprio). */
const KEPT = [
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "Menu",
  "Minus",
  "More",
];

const PT: Record<string, string[]> = {
  add: ["adicionar", "novo", "mais"],
  ai: ["ia", "inteligência artificial"],
  alarm: ["alarme", "despertador"],
  announcement: ["anúncio", "comunicado"],
  arrow: ["seta"],
  attachment: ["anexo"],
  avatar: ["perfil"],
  bar: ["barra"],
  bell: ["sino", "notificação"],
  bookmark: ["favorito", "marcador", "salvar"],
  brightness: ["brilho"],
  broken: ["quebrado"],
  bubble: ["balão", "conversa"],
  building: ["prédio", "escola", "empresa"],
  button: ["botão"],
  calendar: ["calendário", "agenda", "data"],
  camera: ["câmera", "foto"],
  card: ["cartão"],
  cart: ["carrinho", "compras"],
  chat: ["conversa", "mensagem"],
  check: ["confirmar", "concluído", "ok"],
  circle: ["círculo"],
  clock: ["relógio", "hora", "prazo"],
  cloud: ["nuvem"],
  code: ["código"],
  cog: ["configurações", "engrenagem", "ajustes"],
  coin: ["moeda", "dinheiro"],
  computer: ["computador"],
  copy: ["copiar"],
  credit: ["crédito", "pagamento"],
  crown: ["coroa", "premium"],
  cursor: ["cursor", "clique"],
  customer: ["cliente"],
  daily: ["diário"],
  delete: ["fechar", "x", "excluir", "remover"],
  diamond: ["diamante"],
  disable: ["desativar"],
  dislike: ["não curtir"],
  document: ["documento", "arquivo"],
  download: ["baixar"],
  earth: ["mundo", "global"],
  edit: ["editar"],
  email: ["e-mail", "correio"],
  empty: ["vazio"],
  expand: ["expandir"],
  face: ["rosto"],
  file: ["arquivo"],
  filled: ["preenchido"],
  filter: ["filtro", "filtrar"],
  finger: ["dedo", "toque"],
  fingerprint: ["digital", "biometria"],
  folder: ["pasta"],
  gear: ["engrenagem", "configurações"],
  gift: ["presente"],
  grid: ["grade"],
  half: ["metade"],
  happy: ["feliz"],
  heart: ["coração", "curtir", "favorito"],
  help: ["ajuda", "suporte"],
  home: ["início", "casa"],
  image: ["imagem"],
  inbox: ["caixa de entrada"],
  information: ["informação", "info"],
  invisible: ["ocultar", "esconder"],
  landscape: ["paisagem"],
  laptop: ["notebook"],
  layers: ["camadas"],
  layout: ["layout", "grade"],
  light: ["claro", "luz"],
  lightbulb: ["ideia", "lâmpada"],
  like: ["curtir", "gostei"],
  link: ["link", "ligação"],
  loading: ["carregando"],
  location: ["localização", "mapa"],
  lock: ["cadeado", "bloqueio"],
  login: ["entrar", "acesso"],
  logout: ["sair"],
  loop: ["repetir"],
  love: ["amor"],
  magic: ["mágica"],
  magnifying: ["lupa", "buscar", "pesquisar"],
  mail: ["e-mail", "correio"],
  map: ["mapa"],
  megaphone: ["megafone", "comunicado"],
  message: ["mensagem"],
  mode: ["modo"],
  monthly: ["mensal"],
  moon: ["lua", "escuro"],
  music: ["música"],
  network: ["rede"],
  new: ["novo"],
  notepad: ["bloco de notas", "anotação"],
  notification: ["notificação", "alerta"],
  padlock: ["cadeado"],
  password: ["senha"],
  pause: ["pausar"],
  pay: ["pagar"],
  payment: ["pagamento"],
  pen: ["caneta"],
  pencil: ["lápis", "editar"],
  pictures: ["fotos"],
  pin: ["fixar", "alfinete"],
  play: ["reproduzir", "play"],
  question: ["pergunta", "dúvida"],
  recycle: ["lixeira", "reciclar"],
  remove: ["remover"],
  robot: ["robô"],
  rotate: ["girar"],
  ruler: ["régua"],
  scan: ["escanear"],
  scanner: ["scanner", "leitor"],
  search: ["buscar", "pesquisar"],
  security: ["segurança"],
  send: ["enviar"],
  setting: ["configuração"],
  settings: ["configurações"],
  share: ["compartilhar"],
  shield: ["escudo", "proteção"],
  shopping: ["compras"],
  signal: ["sinal"],
  slider: ["controle deslizante"],
  smiley: ["emoji", "carinha"],
  sparkles: ["brilho", "ia"],
  spark: ["brilho", "ia"],
  star: ["estrela", "avaliação", "favorito"],
  stop: ["parar"],
  stopwatch: ["cronômetro"],
  store: ["loja"],
  subtract: ["subtrair", "remover", "menos"],
  sun: ["sol", "claro"],
  tag: ["etiqueta", "rótulo"],
  tailless: ["chevron"],
  target: ["alvo", "meta"],
  text: ["texto"],
  toggle: ["alternar", "interruptor"],
  translate: ["traduzir"],
  trending: ["tendência"],
  trophy: ["troféu", "conquista"],
  upload: ["enviar", "carregar"],
  user: ["usuário", "pessoa", "perfil"],
  video: ["vídeo"],
  visible: ["visível", "mostrar"],
  voice: ["voz"],
  volume: ["volume", "som"],
  warning: ["aviso", "alerta", "atenção"],
  zoom: ["zoom", "ampliar"],
};

function toPascal(kebab: string) {
  return kebab
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function attr(tag: string, name: string) {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
}

function convert(svg: string, file: string) {
  if (!/viewBox="0 0 20 20"/.test(svg)) {
    throw new Error(`${file}: esperado viewBox="0 0 20 20"`);
  }
  const paths = [...svg.matchAll(/<path\b[^>]*\/>/g)].map(([tag]) => {
    const d = attr(tag, "d");
    if (!d) throw new Error(`${file}: <path> sem d`);
    const fillRule = attr(tag, "fill-rule");
    const clipRule = attr(tag, "clip-rule");
    const opacity = attr(tag, "fill-opacity");
    return [
      "<path",
      fillRule ? ` fillRule="${fillRule}"` : "",
      clipRule ? ` clipRule="${clipRule}"` : "",
      ` d="${d}"`,
      ' fill="currentColor"',
      opacity && opacity !== "1" ? ` fillOpacity={${opacity}}` : "",
      " />",
    ].join("");
  });
  if (paths.length === 0) throw new Error(`${file}: nenhum <path>`);
  return paths;
}

const files = fs
  .readdirSync(ASSETS_DIR)
  .filter((file) => file.endsWith(".svg"))
  .sort();

const generated: string[] = [];
const searchEntries: Array<{
  name: string;
  componentName: string;
  keywords: string[];
}> = [];

for (const file of files) {
  const kebab = file.replace(/\.svg$/, "");
  const componentName = toPascal(kebab);
  const paths = convert(
    fs.readFileSync(path.join(ASSETS_DIR, file), "utf8"),
    file,
  );

  const source = `${GENERATED_MARK}
import type { IconProps } from "./Icon";
import { IconBase } from "./Icon";

export function ${componentName}(props: IconProps) {
  return (
    <IconBase {...props}>
${paths.map((p) => `      ${p}`).join("\n")}
    </IconBase>
  );
}
`;
  fs.writeFileSync(path.join(OUT_DIR, `${componentName}.tsx`), source);
  generated.push(componentName);

  const tokens = kebab.split("-").filter((token) => !/^\d+$/.test(token));
  const keywords = [
    ...new Set([...tokens, ...tokens.flatMap((token) => PT[token] ?? [])]),
  ];
  searchEntries.push({ name: kebab, componentName, keywords });
}

for (const [alias, target] of Object.entries(ALIASES)) {
  if (!generated.includes(target))
    throw new Error(`Alias ${alias} → ${target}: ícone inexistente`);
  if (generated.includes(alias))
    throw new Error(`Alias ${alias} colide com um ícone gerado`);
}
for (const name of KEPT) {
  if (!fs.existsSync(path.join(OUT_DIR, `${name}.tsx`)))
    throw new Error(`Ícone mantido ${name}.tsx não existe`);
}

// Remove arquivos da API antiga substituídos por aliases.
for (const alias of Object.keys(ALIASES)) {
  const legacy = path.join(OUT_DIR, `${alias}.tsx`);
  if (fs.existsSync(legacy)) fs.rmSync(legacy);
}

const keptEntries = KEPT.map((componentName) => {
  const kebab = componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  const extra: Record<string, string[]> = {
    ArrowDown: ["arrow", "down", "seta", "baixo", "descer"],
    ArrowLeft: ["arrow", "left", "seta", "esquerda", "voltar"],
    ArrowRight: ["arrow", "right", "seta", "direita", "avançar"],
    ArrowUp: ["arrow", "up", "seta", "cima", "subir"],
    Menu: ["menu", "hamburger", "navegação", "lista"],
    Minus: ["minus", "menos", "subtrair", "indeterminado"],
    More: ["more", "ellipsis", "mais", "opções", "reticências"],
  };
  return {
    name: kebab,
    componentName,
    keywords: extra[componentName] ?? kebab.split("-"),
  };
});

const allSearch = [...searchEntries, ...keptEntries].sort((a, b) =>
  a.name.localeCompare(b.name),
);

fs.writeFileSync(
  SEARCH_FILE,
  `${GENERATED_MARK}
export type IconSearchEntry = { name: string; keywords: string[]; componentName: string };

export const iconSearchIndex: IconSearchEntry[] = ${JSON.stringify(allSearch, null, 2)};
`,
);

const exportsList = [...generated, ...KEPT].sort();
fs.writeFileSync(
  INDEX_FILE,
  `${GENERATED_MARK}
export type { IconProps, IconComponent } from "./Icon";
export { IconBase } from "./Icon";
export { iconSearchIndex, type IconSearchEntry } from "./iconSearch";

${exportsList.map((name) => `export { ${name} } from "./${name}";`).join("\n")}

// Compatibilidade: nomes anteriores apontando para o desenho do conjunto atual.
${Object.entries(ALIASES)
  .map(
    ([alias, target]) => `export { ${target} as ${alias} } from "./${target}";`,
  )
  .join("\n")}
`,
);

console.log(
  `${generated.length} ícones gerados, ${KEPT.length} mantidos, ${Object.keys(ALIASES).length} aliases.`,
);
