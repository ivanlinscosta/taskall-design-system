/**
 * Catálogo de navegação da documentação. Leve de propósito: a sidebar e a busca
 * usam apenas estes metadados, e o conteúdo de cada página fica no chunk da rota.
 */
export type NavSection = "fundamentos" | "componentes" | "guias";

export type NavItem = {
  section: NavSection;
  slug: string;
  path: string;
  title: string;
  summary: string;
  keywords: string[];
};

type ComponentEntry = Omit<NavItem, "section" | "path">;

const componentEntries: ComponentEntry[] = [
  {
    slug: "alert-notification",
    title: "AlertNotification",
    summary:
      "Feedback de sistema curto, com status, link e fechamento opcionais.",
    keywords: [
      "alerta",
      "notificação",
      "aviso",
      "erro",
      "sucesso",
      "toast",
      "feedback",
    ],
  },
  {
    slug: "avatar",
    title: "Avatar",
    summary: "Identifica pessoas com foto, iniciais e indicador de presença.",
    keywords: ["foto", "perfil", "usuário", "iniciais", "pessoa"],
  },
  {
    slug: "avatar-group",
    title: "AvatarGroup",
    summary:
      "Empilha participantes de uma equipe ou turma com contagem de excedentes.",
    keywords: ["equipe", "turma", "participantes", "pilha", "avatares"],
  },
  {
    slug: "badge",
    title: "Badge",
    summary: "Rótulo curto para status, contagem ou marcador visual.",
    keywords: ["etiqueta", "tag", "contador", "status", "chip"],
  },
  {
    slug: "button",
    title: "Button",
    summary: "Dispara ações: salvar, enviar, confirmar ou excluir.",
    keywords: ["botão", "ação", "cta", "enviar", "submit"],
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    summary: "Seleção múltipla e independente, com estado parcial.",
    keywords: [
      "caixa de seleção",
      "marcar",
      "consentimento",
      "filtro",
      "indeterminado",
    ],
  },
  {
    slug: "content",
    title: "Content",
    summary: "Linha compacta com avatar ou ícone, rótulo, descrição e badge.",
    keywords: ["lista", "item", "linha", "metadado", "list item"],
  },
  {
    slug: "divider",
    title: "Divider",
    summary: "Separador de conteúdo em linha, com texto ou ícone central.",
    keywords: ["separador", "linha", "hr", "divisor"],
  },
  {
    slug: "dropdown",
    title: "Dropdown",
    summary: "Seleção única em lista suspensa com teclado e portal.",
    keywords: ["select", "seleção", "lista", "opções", "combobox"],
  },
  {
    slug: "heading",
    title: "Heading",
    summary: "Títulos com semântica (h1–h6) desacoplada da aparência.",
    keywords: ["título", "h1", "h2", "cabeçalho", "tipografia"],
  },
  {
    slug: "icon-button",
    title: "IconButton",
    summary: "Botão quadrado só com ícone para ações compactas e recorrentes.",
    keywords: [
      "botão",
      "ícone",
      "icon button",
      "ação",
      "toolbar",
      "fechar",
      "editar",
    ],
  },
  {
    slug: "label-text",
    title: "LabelText",
    summary: "Rótulos curtos em semibold na escala de labels.",
    keywords: ["rótulo", "label", "legenda", "tipografia"],
  },
  {
    slug: "modal",
    title: "Modal",
    summary: "Diálogo que interrompe o fluxo para decisões importantes.",
    keywords: ["diálogo", "dialog", "popup", "confirmação", "janela"],
  },
  {
    slug: "paragraph",
    title: "Paragraph",
    summary: "Texto corrido nas escalas l, m, s e xs.",
    keywords: ["texto", "parágrafo", "corpo", "tipografia"],
  },
  {
    slug: "progress-bar",
    title: "ProgressBar",
    summary: "Progresso quantitativo de uploads, metas e etapas.",
    keywords: ["progresso", "barra", "porcentagem", "carregamento", "meta"],
  },
  {
    slug: "radio",
    title: "Radio",
    summary: "Escolha única entre opções visíveis, com RadioGroup.",
    keywords: ["opção", "radio button", "grupo", "escolha única", "fieldset"],
  },
  {
    slug: "rating",
    title: "Rating",
    summary: "Avaliação por estrelas ou corações, editável ou somente leitura.",
    keywords: ["avaliação", "estrelas", "nota", "corações", "review"],
  },
  {
    slug: "slot",
    title: "Slot",
    summary: "Contêiner compacto para ícones e marcadores pequenos.",
    keywords: ["ícone", "contêiner", "caixa", "atalho"],
  },
  {
    slug: "slot-group",
    title: "SlotGroup",
    summary: "Agrupa slots em linha ou coluna com espaçamento consistente.",
    keywords: ["grupo", "ícones", "atalhos", "slots"],
  },
  {
    slug: "status-indicator",
    title: "StatusIndicator",
    summary: "Marcador mínimo de presença, verificação ou ação.",
    keywords: ["presença", "online", "status", "ponto", "indicador"],
  },
  {
    slug: "tab-menu",
    title: "TabMenu",
    summary: "Abas para alternar entre visões irmãs de uma mesma área.",
    keywords: ["abas", "tabs", "navegação", "seções"],
  },
  {
    slug: "text-input",
    title: "TextInput",
    summary: "Campo de texto com rótulo, apoio, ícones e erro inline.",
    keywords: ["campo", "input", "formulário", "texto", "entrada"],
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    summary: "Dica contextual curta exibida no hover ou foco.",
    keywords: ["dica", "hint", "ajuda", "popover", "hover"],
  },
];

const foundationEntries: ComponentEntry[] = [
  {
    slug: "cores",
    title: "Cores",
    summary:
      "Tokens semânticos de conteúdo, fundo, borda, marca, ação e status.",
    keywords: ["cor", "paleta", "tokens", "color", "contraste"],
  },
  {
    slug: "tipografia",
    title: "Tipografia",
    summary:
      "Escala de display, headings, parágrafos, labels e links em Archivo.",
    keywords: ["fonte", "texto", "typography", "archivo", "escala"],
  },
  {
    slug: "espacamento",
    title: "Espaçamento",
    summary: "Escala primitiva em px e steps que respondem à densidade.",
    keywords: ["spacing", "espaço", "margem", "padding", "densidade"],
  },
  {
    slug: "raios",
    title: "Raios",
    summary: "Níveis de arredondamento remapeados pela forma do tema.",
    keywords: ["radius", "borda", "canto", "arredondamento", "shape"],
  },
  {
    slug: "grid",
    title: "Grid",
    summary: "Colunas, breakpoints e composição de layout com tokens.",
    keywords: ["layout", "colunas", "breakpoint", "responsivo"],
  },
  {
    slug: "temas",
    title: "Temas",
    summary: "TaskAllProvider: modo, marca, densidade e forma.",
    keywords: ["tema", "dark mode", "marca", "brand", "provider", "densidade"],
  },
  {
    slug: "icones",
    title: "Ícones",
    summary:
      "Conjunto oficial de ícones SVG com busca por palavras-chave em PT e EN.",
    keywords: ["icons", "svg", "ícone", "pictograma"],
  },
];

const guideEntries: ComponentEntry[] = [
  {
    slug: "primeiros-passos",
    title: "Primeiros passos",
    summary: "Instalação, estilos, TaskAllProvider e o primeiro componente.",
    keywords: [
      "instalar",
      "setup",
      "começar",
      "npm",
      "pnpm",
      "getting started",
    ],
  },
  {
    slug: "boas-praticas",
    title: "Boas práticas",
    summary:
      "Convenções do TaskAll: tokens, estados data-*, foco, alvos de toque.",
    keywords: [
      "convenções",
      "regras",
      "guidelines",
      "padrões",
      "acessibilidade",
    ],
  },
  {
    slug: "padroes",
    title: "Padrões aplicados",
    summary: "Telas do Task All montadas só com componentes do TaskAll.",
    keywords: [
      "exemplos",
      "telas",
      "dashboard",
      "formulário",
      "tarefas",
      "patterns",
    ],
  },
  {
    slug: "contribuicao",
    title: "Contribuição",
    summary: "Como propor, construir, testar e documentar um componente.",
    keywords: ["contribuir", "pull request", "changeset", "contributing"],
  },
  {
    slug: "changelog",
    title: "Changelog",
    summary: "Histórico de versões de @taskall/react.",
    keywords: ["versões", "release", "mudanças", "histórico"],
  },
];

const byTitle = (a: ComponentEntry, b: ComponentEntry) =>
  a.title.localeCompare(b.title, "pt-BR");

export const COMPONENTS: NavItem[] = [...componentEntries]
  .sort(byTitle)
  .map((entry) => ({
    ...entry,
    section: "componentes",
    path: `/componentes/${entry.slug}`,
  }));

export const FOUNDATIONS: NavItem[] = foundationEntries.map((entry) => ({
  ...entry,
  section: "fundamentos",
  path: `/fundamentos/${entry.slug}`,
}));

export const GUIDES: NavItem[] = guideEntries.map((entry) => ({
  ...entry,
  section: "guias",
  path: `/guias/${entry.slug}`,
}));

export const NAV_GROUPS: {
  id: NavSection;
  title: string;
  path: string;
  items: NavItem[];
}[] = [
  {
    id: "fundamentos",
    title: "Fundamentos",
    path: "/fundamentos/cores",
    items: FOUNDATIONS,
  },
  {
    id: "componentes",
    title: "Componentes",
    path: "/componentes",
    items: COMPONENTS,
  },
  {
    id: "guias",
    title: "Guias",
    path: "/guias/primeiros-passos",
    items: GUIDES,
  },
];

export const ALL_PAGES: NavItem[] = [...FOUNDATIONS, ...COMPONENTS, ...GUIDES];

export function findPage(section: NavSection, slug: string): NavItem {
  const page = ALL_PAGES.find(
    (item) => item.section === section && item.slug === slug,
  );
  if (!page) {
    throw new Error(`Página não registrada: ${section}/${slug}`);
  }
  return page;
}

export function pageTitle(title: string) {
  return `${title} · TaskAll Design System`;
}
