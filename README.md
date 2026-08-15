# Voxel React

`@fithub/voxel-react` provides React components for rendering the Three.js
objects produced by `@fithub/voxel-core`.

It owns browser and React concerns such as the canvas, renderer lifecycle,
camera, orbital controls, resize handling, selection, and step-by-step
visibility. It does not call the Voxel API and does not know about Atlas,
stores, catalogs, or temporary boxes.

## Usage

```tsx
import { PackingVisualizer } from "@fithub/voxel-react";

<PackingVisualizer
  box={packingResult.boxes[0]}
  showContainer
  selectedItemId="SKU-123"
  visiblePlacementCount={5}
/>;
```

The component fills its parent. Give its container an explicit height.

## Development

```bash
npm install
npm run check
```
