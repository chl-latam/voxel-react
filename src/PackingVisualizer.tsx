import { createPackingGroup, type PackedBox } from "@fithub/voxel-core";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactElement,
} from "react";
import {
  AmbientLight,
  Box3,
  Color,
  DirectionalLight,
  type Material,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { disposeObject } from "./dispose.js";
import { visiblePlacementCount } from "./visibility.js";

export interface PackingVisualizerProps {
  box: PackedBox;
  showContainer?: boolean;
  selectedItemId?: string;
  visiblePlacementCount?: number;
  backgroundColor?: string;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  onError?: (error: Error) => void;
}

export function PackingVisualizer({
  box,
  showContainer = true,
  selectedItemId,
  visiblePlacementCount: requestedVisibleCount,
  backgroundColor = "#f7f8fa",
  className,
  style,
  ariaLabel = "Visualización tridimensional del empaquetado",
  onError,
}: PackingVisualizerProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      return undefined;
    }

    let renderer: WebGLRenderer | undefined;
    let controls: OrbitControls | undefined;
    let frame = 0;
    let group: ReturnType<typeof createPackingGroup> | undefined;
    let observer: ResizeObserver | undefined;

    try {
      renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new Scene();
      scene.background = new Color(backgroundColor);
      scene.add(new AmbientLight(0xffffff, 1.5));
      const keyLight = new DirectionalLight(0xffffff, 2.5);
      keyLight.position.set(1, 2, 1);
      scene.add(keyLight);
      const camera = new PerspectiveCamera(38, 1, 0.1, 100_000);

      const visibleCount = visiblePlacementCount(box, requestedVisibleCount);
      const visibleBox: PackedBox = {
        ...box,
        placements: box.placements.slice(0, visibleCount),
      };
      group = createPackingGroup(visibleBox, { showContainer });
      applySelection(group, selectedItemId);
      scene.add(group);

      const bounds = new Box3().setFromObject(group);
      const center = bounds.getCenter(new Vector3());
      const size = bounds.getSize(new Vector3());
      const span = Math.max(size.x, size.y, size.z, 1);
      camera.position.set(
        center.x + span * 1.35,
        center.y + span,
        center.z + span * 1.35,
      );
      camera.lookAt(center);

      controls = new OrbitControls(camera, canvas);
      controls.target.copy(center);
      controls.enableDamping = true;

      const resize = (): void => {
        const width = Math.max(canvas.clientWidth, 1);
        const height = Math.max(canvas.clientHeight, 1);
        renderer?.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      resize();
      observer = new ResizeObserver(resize);
      observer.observe(canvas);

      const render = (): void => {
        controls?.update();
        renderer?.render(scene, camera);
        frame = window.requestAnimationFrame(render);
      };
      render();
    } catch (cause) {
      const error =
        cause instanceof Error
          ? cause
          : new Error("Unable to initialize Voxel renderer");
      onError?.(error);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      controls?.dispose();
      if (group !== undefined) {
        disposeObject(group);
      }
      renderer?.dispose();
    };
  }, [
    box,
    showContainer,
    selectedItemId,
    requestedVisibleCount,
    backgroundColor,
    onError,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      data-testid="voxel-packing-canvas"
      role="img"
      aria-label={ariaLabel}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
}

function applySelection(
  root: ReturnType<typeof createPackingGroup>,
  selectedItemId?: string,
): void {
  if (selectedItemId === undefined) {
    return;
  }
  root.traverse((object) => {
    if (object.userData.role !== "item") {
      return;
    }
    const item = object as typeof object & { material: Material | Material[] };
    const selected = object.userData.itemId === selectedItemId;
    const materials = Array.isArray(item.material)
      ? item.material
      : [item.material];
    for (const material of materials) {
      material.transparent = !selected;
      material.opacity = selected ? 1 : 0.2;
    }
  });
}
