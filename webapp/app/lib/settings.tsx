import * as React from "react";
import type { TaskAllProviderProps } from "@taskall/react";

export type ColorMode = NonNullable<TaskAllProviderProps["colorMode"]>;
export type Brand = NonNullable<TaskAllProviderProps["brand"]>;
export type Density = NonNullable<TaskAllProviderProps["density"]>;
export type Shape = NonNullable<TaskAllProviderProps["shape"]>;

export type ThemeSettings = {
  colorMode: ColorMode;
  brand: Brand;
  density: Density;
  shape: Shape;
};

export type SettingKey = keyof ThemeSettings;

type Option<T extends string> = { value: T; label: string };

export const SETTING_OPTIONS: {
  colorMode: Option<ColorMode>[];
  brand: Option<Brand>[];
  density: Option<Density>[];
  shape: Option<Shape>[];
} = {
  colorMode: [
    { value: "light", label: "Claro" },
    { value: "dark", label: "Escuro" },
  ],
  brand: [
    { value: "coral", label: "Coral" },
    { value: "gestao", label: "Gestão" },
    { value: "estudantes", label: "Estudantes" },
    { value: "responsaveis", label: "Responsáveis" },
  ],
  density: [
    { value: "compact", label: "Compacta" },
    { value: "default", label: "Padrão" },
    { value: "expanded", label: "Expandida" },
  ],
  shape: [
    { value: "sharp", label: "Reta" },
    { value: "default", label: "Padrão" },
    { value: "rounded", label: "Arredondada" },
  ],
};

export const SETTING_LABELS: Record<SettingKey, string> = {
  colorMode: "Modo",
  brand: "Marca",
  density: "Densidade",
  shape: "Forma",
};

export const DEFAULT_SETTINGS: ThemeSettings = {
  colorMode: "light",
  brand: "coral",
  density: "default",
  shape: "default",
};

export const STORAGE_KEY = "taskall-docs:settings";

const ATTRIBUTE_BY_KEY: Record<SettingKey, string> = {
  colorMode: "data-color-mode",
  brand: "data-brand",
  density: "data-density",
  shape: "data-shape",
};

function isOption<K extends SettingKey>(
  key: K,
  value: unknown,
): value is ThemeSettings[K] {
  return SETTING_OPTIONS[key].some((option) => option.value === value);
}

function prefersDark() {
  return typeof window !== "undefined" &&
    typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false;
}

type StoredSettings = Partial<ThemeSettings>;

function readStored(): StoredSettings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    const source = parsed as Record<string, unknown>;
    const result: StoredSettings = {};
    if (isOption("colorMode", source.colorMode))
      result.colorMode = source.colorMode;
    if (isOption("brand", source.brand)) result.brand = source.brand;
    if (isOption("density", source.density)) result.density = source.density;
    if (isOption("shape", source.shape)) result.shape = source.shape;
    return result;
  } catch {
    return {};
  }
}

function writeStored(value: StoredSettings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* armazenamento indisponível (modo privado): mantém só em memória */
  }
}

export function resolveSettings(
  stored: StoredSettings,
  systemDark: boolean,
): ThemeSettings {
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    colorMode: stored.colorMode ?? (systemDark ? "dark" : "light"),
  };
}

/**
 * Script inline executado antes da primeira pintura: aplica as preferências
 * salvas no <html> e no TaskAllProvider raiz para evitar "flash" de tema claro
 * nas páginas pré-renderizadas. Mantém a mesma regra de `resolveSettings`.
 */
export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var d=${JSON.stringify(
  DEFAULT_SETTINGS,
)},s={};try{s=JSON.parse(localStorage.getItem(${JSON.stringify(
  STORAGE_KEY,
)})||"{}")||{}}catch(e){}var m=s.colorMode||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var v={"data-color-mode":m,"data-brand":s.brand||d.brand,"data-density":s.density||d.density,"data-shape":s.shape||d.shape};window.__taskallTheme=v;var h=document.documentElement;for(var k in v)h.setAttribute(k,v[k]);}catch(e){}})();`;

/** Aplica as mesmas preferências ao elemento pai (TaskAllProvider raiz). */
export const PROVIDER_BOOTSTRAP_SCRIPT = `(function(){var v=window.__taskallTheme,p=document.currentScript&&document.currentScript.parentElement;if(!v||!p)return;p.setAttribute("data-color-mode",v["data-color-mode"]);p.setAttribute("data-brand",v["data-brand"]);})();`;

type SettingsContextValue = {
  settings: ThemeSettings;
  setSetting: <K extends SettingKey>(key: K, value: ThemeSettings[K]) => void;
  reset: () => void;
};

const SettingsContext = React.createContext<SettingsContextValue | null>(null);

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = React.useState<StoredSettings>({});
  const [systemDark, setSystemDark] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    setStored(readStored());
    setSystemDark(prefersDark());
    setReady(true);

    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) =>
      setSystemDark(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const settings = React.useMemo(
    () => resolveSettings(stored, systemDark),
    [stored, systemDark],
  );

  React.useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    (Object.keys(ATTRIBUTE_BY_KEY) as SettingKey[]).forEach((key) => {
      root.setAttribute(ATTRIBUTE_BY_KEY[key], settings[key]);
    });
  }, [ready, settings]);

  const setSetting = React.useCallback(
    <K extends SettingKey>(key: K, value: ThemeSettings[K]) => {
      setStored((current) => {
        const next = { ...current, [key]: value };
        writeStored(next);
        return next;
      });
    },
    [],
  );

  const reset = React.useCallback(() => {
    writeStored({});
    setStored({});
  }, []);

  const value = React.useMemo(
    () => ({ settings, setSetting, reset }),
    [settings, setSetting, reset],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings precisa estar dentro de <SettingsProvider>.");
  }
  return context;
}
