import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AdaptationExplorer } from "./adaptation-explorer";

describe("AdaptationExplorer", () => {
  it("reveals the partial fine-tuning control and updates the model state", () => {
    render(<AdaptationExplorer />);
    const slider = screen.getByRole("slider", { name: "Unfrozen layers" });
    fireEvent.change(slider, { target: { value: "8" } });
    expect(screen.getByText("8 / 12")).toBeInTheDocument();
  });

  it("can switch to a fully trainable model", () => {
    render(<AdaptationExplorer />);
    fireEvent.click(screen.getByRole("button", { name: /Full fine-tuning/ }));
    expect(screen.getByLabelText("100% of parameters trainable")).toBeInTheDocument();
  });
});
