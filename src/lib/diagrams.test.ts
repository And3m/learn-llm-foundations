import type { Mermaid } from "mermaid";
import { beforeAll, describe, expect, it } from "vitest";
import { mermaidCharts } from "./lesson-sources";

const charts = mermaidCharts();

describe("Mermaid diagrams", () => {
  let mermaid: Mermaid;

  beforeAll(async () => {
    mermaid = (await import("mermaid")).default;
    mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
  }, 60_000);

  it("finds diagrams in the lessons", () => {
    expect(charts.length).toBeGreaterThan(0);
  });

  it.each(charts)("$name parses", async ({ chart }) => {
    await expect(mermaid.parse(chart)).resolves.toBeTruthy();
  });
});
