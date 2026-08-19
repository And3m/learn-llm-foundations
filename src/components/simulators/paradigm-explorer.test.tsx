import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ParadigmExplorer } from "./paradigm-explorer";

describe("ParadigmExplorer", () => {
  it("switches the explanatory flow with accessible tabs", () => {
    render(<ParadigmExplorer />);
    expect(screen.getByText("Targets from text")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: "Supervised" }));
    expect(screen.getByText("Human annotations")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Supervised" })).toHaveAttribute("aria-selected", "true");
  });
});
