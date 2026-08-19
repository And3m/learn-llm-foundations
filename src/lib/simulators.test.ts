import { describe, expect, it } from "vitest";
import { maskedTokenCount, normalizedProbabilities, trainablePercent } from "./simulators";

describe("simulator calculations", () => {
  it("bounds trainable model percentages", () => {
    expect(trainablePercent("features")).toBe(1);
    expect(trainablePercent("full")).toBe(100);
    expect(trainablePercent("partial", 4)).toBe(34);
    expect(trainablePercent("partial", 99)).toBe(99);
  });

  it("always selects at least one mask", () => {
    expect(maskedTokenCount(3, 0)).toBe(1);
    expect(maskedTokenCount(20, .15)).toBe(3);
  });

  it("normalizes logits without numerical overflow", () => {
    const result = normalizedProbabilities([1000, 1001, 999]);
    expect(result.reduce((sum, value) => sum + value, 0)).toBeCloseTo(1);
    expect(result[1]).toBeGreaterThan(result[0]);
  });
});
