import type { PackedBox } from "@fithub/voxel-core";
import { describe, expect, it } from "vitest";

import { visiblePlacementCount } from "../src/index.js";

const box = {
  placements: [{}, {}, {}],
} as unknown as PackedBox;

describe("step-by-step visibility", () => {
  it("shows all placements when no limit is requested", () => {
    expect(visiblePlacementCount(box)).toBe(3);
  });

  it("clamps the requested placement count", () => {
    expect(visiblePlacementCount(box, -1)).toBe(0);
    expect(visiblePlacementCount(box, 2.9)).toBe(2);
    expect(visiblePlacementCount(box, 99)).toBe(3);
  });
});
