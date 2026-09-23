import { describe, expect, it } from "vitest";

import { fuzzyScore, rankBy } from "./fuzzy";

describe("fuzzy", () => {
  it("ignora acentos e caixa", () => {
    expect(fuzzyScore("icone", "Ícones")).toBeGreaterThan(0);
  });

  it("aceita subsequências e rejeita letras fora de ordem", () => {
    expect(fuzzyScore("txtin", "TextInput")).toBeGreaterThan(0);
    expect(fuzzyScore("zzz", "Button")).toBe(0);
  });

  it("campos não-fuzzy exigem trecho contínuo", () => {
    const items = [
      { title: "Raios", summary: "Níveis de arredondamento pela forma" },
    ];
    const fields = (item: (typeof items)[number]) => [
      { text: item.title, weight: 3 },
      { text: item.summary, weight: 1, fuzzy: false },
    ];
    expect(rankBy(items, "estrela", fields)).toEqual([]);
    expect(rankBy(items, "arredond", fields)).toHaveLength(1);
  });

  it("ordena correspondências diretas primeiro", () => {
    const items = ["Radio", "Rating", "ProgressBar"];
    expect(rankBy(items, "rat", (item) => [{ text: item, weight: 1 }])[0]).toBe(
      "Rating",
    );
  });
});
