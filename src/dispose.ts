import type { BufferGeometry, Material, Object3D } from "three";

type DisposableObject = Object3D & {
  geometry?: BufferGeometry;
  material?: Material | Material[];
};

export function disposeObject(root: Object3D): void {
  root.traverse((object) => {
    const disposable = object as DisposableObject;
    disposable.geometry?.dispose();
    if (disposable.material === undefined) {
      return;
    }
    const materials = Array.isArray(disposable.material)
      ? disposable.material
      : [disposable.material];
    for (const material of materials) {
      material.dispose();
    }
  });
}
