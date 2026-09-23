/** Busca fuzzy mínima: normaliza acentos e pontua subsequências. */
export function normalize(value: string) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

/**
 * Retorna uma pontuação > 0 quando todas as letras da consulta aparecem em
 * ordem no alvo. Correspondências contíguas e no início de palavras valem mais.
 */
export function fuzzyScore(query: string, target: string) {
  const q = normalize(query).replace(/\s+/g, "");
  const t = normalize(target);
  if (!q) return 0;

  const direct = t.indexOf(q);
  if (direct !== -1) {
    return (
      100 - direct + (direct === 0 || t[direct - 1] === " " ? 50 : 0) + q.length
    );
  }

  let score = 0;
  let lastIndex = -1;
  for (const char of q) {
    const index = t.indexOf(char, lastIndex + 1);
    if (index === -1) return 0;
    score += index === lastIndex + 1 ? 3 : 1;
    if (index === 0 || t[index - 1] === " " || t[index - 1] === "-") score += 2;
    lastIndex = index;
  }
  return score;
}

export type RankField = {
  text: string;
  weight: number;
  /** false: exige a consulta como trecho contínuo (sem subsequência). */
  fuzzy?: boolean;
};

function fieldScore(query: string, field: RankField) {
  if (
    field.fuzzy === false &&
    !normalize(field.text).includes(normalize(query))
  ) {
    return 0;
  }
  return fuzzyScore(query, field.text) * field.weight;
}

export function rankBy<T>(
  items: T[],
  query: string,
  fields: (item: T) => RankField[],
) {
  if (!normalize(query)) return items;

  return items
    .map((item) => ({
      item,
      score: Math.max(
        0,
        ...fields(item).map((field) => fieldScore(query, field)),
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
}
