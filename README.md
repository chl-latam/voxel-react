# Voxel React

`@procura/voxel-react` provides React components for rendering the Three.js
objects produced by `@procura/voxel-core`.

It owns browser and React concerns such as the canvas, renderer lifecycle,
camera, orbital controls, resize handling, selection, and step-by-step
visibility. It does not call the Voxel API and does not know about Atlas,
stores, catalogs, or temporary boxes.

## Installation

Install tagged releases directly from GitHub together with their peer
dependencies:

```bash
npm install \
  github:chl-latam/voxel-core#v0.2.0 \
  github:chl-latam/voxel-react#v0.2.0 \
  react react-dom three
```

Or declare both package names explicitly:

```json
{
  "dependencies": {
    "@procura/voxel-core": "github:chl-latam/voxel-core#v0.2.0",
    "@procura/voxel-react": "github:chl-latam/voxel-react#v0.2.0"
  }
}
```

## Usage

```tsx
import { PackingVisualizer } from "@procura/voxel-react";

<PackingVisualizer
  box={packingResult.boxes[0]}
  showContainer
  selectedItemId="SKU-123"
  visiblePlacementCount={5}
  itemOpacity={0.86}
  showItemEdges
  itemEdgeColor="#1f2937"
  itemEdgeOpacity={0.55}
/>;
```

The component fills its parent. Give its container an explicit height.
Translucent item faces and per-placement edge outlines are enabled by default,
making repeated and stacked units easier to distinguish. All four appearance
props are optional.

## Development

```bash
npm install
npm run check
```

## License

MIT © CHL Group
