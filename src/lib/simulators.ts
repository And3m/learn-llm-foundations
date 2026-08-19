export type AdaptationMode = "features" | "partial" | "full";

export function trainablePercent(mode: AdaptationMode, unfrozenLayers = 4, totalLayers = 12) {
  if (mode === "features") return 1;
  if (mode === "full") return 100;
  return Math.min(99, Math.round(((Math.max(0, Math.min(unfrozenLayers, totalLayers)) + 0.12) / totalLayers) * 100));
}

export function maskedTokenCount(tokenCount: number, maskRate: number) {
  return Math.max(1, Math.round(tokenCount * Math.max(0, Math.min(maskRate, 1))));
}

export function normalizedProbabilities(values: number[]) {
  const max = Math.max(...values);
  const exps = values.map((value) => Math.exp(value - max));
  const sum = exps.reduce((total, value) => total + value, 0);
  return exps.map((value) => value / sum);
}
