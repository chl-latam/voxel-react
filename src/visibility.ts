import type { PackedBox } from "@procura/voxel-core";

export function visiblePlacementCount(
  box: PackedBox,
  requested?: number,
): number {
  if (requested === undefined) {
    return box.placements.length;
  }
  return Math.max(0, Math.min(Math.trunc(requested), box.placements.length));
}
