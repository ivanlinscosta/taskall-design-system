import type * as React from "react";

import type { NavItem } from "./registry";

export type PlaygroundValue = string | number | boolean;
export type PlaygroundValues = Record<string, PlaygroundValue>;

/** Controle de playground inferido pelo tipo do valor inicial. */
export type ControlFor<T> = [T] extends [boolean]
  ? { type: "boolean"; label?: string }
  : [T] extends [number]
    ? {
        type: "number";
        label?: string;
        min: number;
        max: number;
        step?: number;
      }
    : [T] extends [string]
      ? | { type: "select"; label?: string; options: readonly T[] }
        | { type: "text"; label?: string }
      : never;

export type PlaygroundDefinition<V extends PlaygroundValues> = {
  /** Nome do componente principal (usado para omitir padrões no código). */
  component: string;
  initial: V;
  controls: { [K in keyof V]: ControlFor<V[K]> };
  render: (values: V) => React.ReactNode;
  code: (values: V) => string;
};

export type ErasedControl =
  | { type: "boolean"; label?: string }
  | { type: "number"; label?: string; min: number; max: number; step?: number }
  | { type: "select"; label?: string; options: readonly string[] }
  | { type: "text"; label?: string };

/** Versão sem genéricos, usada pelo template da página. */
export type PlaygroundSpec = {
  component: string;
  initial: PlaygroundValues;
  controls: Record<string, ErasedControl>;
  render: (values: PlaygroundValues) => React.ReactNode;
  code: (values: PlaygroundValues) => string;
};

/**
 * Define um playground tipado. Os controles são checados contra os valores
 * iniciais; o resultado é "apagado" para caber no template genérico.
 */
export function definePlayground<V extends PlaygroundValues>(
  definition: PlaygroundDefinition<V>,
): PlaygroundSpec {
  return definition as unknown as PlaygroundSpec;
}

export type ExampleKind = "variantes" | "estados" | "aplicado";

export type ExampleDefinition = {
  id: string;
  kind: ExampleKind;
  title: string;
  description: string;
  Component: React.ComponentType;
  code: string;
};

export type Guideline = {
  do: string;
  dont: string;
  doExample?: React.ReactNode;
  dontExample?: React.ReactNode;
};

export type ComponentDoc = {
  page: NavItem;
  /** Parágrafo de abertura da página. */
  description: string;
  whenToUse: string[];
  whenNotToUse: string[];
  /** Importação e uso mínimo, exibidos em "Código". */
  usage: string;
  playground: PlaygroundSpec;
  examples: ExampleDefinition[];
  guidelines: Guideline[];
  accessibility: {
    notes: string[];
    keyboard: Array<{ keys: string; action: string }>;
  };
  api: Array<{
    /** Nome do tipo em generated/api.json (sem o sufixo Props). */
    name: string;
    /** Descrição de cada prop; obrigatória para todas as props do tipo. */
    descriptions: Record<string, string>;
    /** Elemento nativo que recebe os demais atributos (`...props`). */
    native?: string;
  }>;
};

/** Cria uma definição de exemplo a partir do módulo e do código-fonte bruto. */
export function example(
  meta: Omit<ExampleDefinition, "Component" | "code">,
  Component: React.ComponentType,
  code: string,
): ExampleDefinition {
  return { ...meta, Component, code: code.trim() };
}
