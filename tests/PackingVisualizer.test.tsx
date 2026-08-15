import type { PackedBox } from "@procura/voxel-core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PackingVisualizer } from "../src/index.js";

vi.mock("three", async (importOriginal) => {
  const original = await importOriginal<typeof import("three")>();
  return {
    ...original,
    WebGLRenderer: class {
      setPixelRatio(): void {}
      setSize(): void {}
      render(): void {}
      dispose(): void {}
    },
  };
});

vi.mock("three/addons/controls/OrbitControls.js", () => ({
  OrbitControls: class {
    target = { copy: vi.fn() };
    enableDamping = false;
    update(): void {}
    dispose(): void {}
  },
}));

class ResizeObserverMock {
  observe(): void {}
  disconnect(): void {}
}

vi.stubGlobal("ResizeObserver", ResizeObserverMock);
vi.stubGlobal(
  "requestAnimationFrame",
  vi.fn(() => 1),
);
vi.stubGlobal("cancelAnimationFrame", vi.fn());

const box: PackedBox = {
  box_id: "small",
  box_label: "Caja pequeña",
  inner_dimensions: { x: 10, y: 10, z: 10 },
  max_weight: 10,
  instance: 1,
  placements: [],
  used_weight: 0,
  used_volume: 0,
  volume_utilization: 0,
};

describe("PackingVisualizer", () => {
  it("renders an accessible canvas and initializes without mutating the box", () => {
    const original = structuredClone(box);
    render(<PackingVisualizer box={box} />);

    expect(screen.getByTestId("voxel-packing-canvas")).toBeInstanceOf(
      HTMLCanvasElement,
    );
    expect(
      screen.getByRole("img", {
        name: "Visualización tridimensional del empaquetado",
      }),
    ).toBeInstanceOf(HTMLCanvasElement);
    expect(box).toEqual(original);
  });
});
