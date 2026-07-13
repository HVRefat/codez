// Plain (non-React) Three.js module. It is only ever pulled in via a dynamic
// import() from Hero3DMount, so Three.js stays out of the main bundle and
// loads during idle time. Named imports let the bundler tree-shake unused
// Three modules (no OrbitControls, no postprocessing, no extra geometries).
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  Points,
  Group,
  Color,
} from "three";

const PARTICLE_COUNT = 2400; // <= 2500
const MAX_TILT = (6 * Math.PI) / 180;

const PALETTE = {
  light: 0x0e4da4,
  dark: 0x4d8dff,
};

export type HeroSceneHandle = {
  dispose: () => void;
  setTheme: (isDark: boolean) => void;
};

export type HeroSceneOptions = {
  isDark: boolean;
  onFirstFrame: () => void;
};

function fibonacciSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

export function createHeroScene(
  container: HTMLElement,
  { isDark, onFirstFrame }: HeroSceneOptions
): HeroSceneHandle {
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 5.2;

  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  const group = new Group();
  scene.add(group);

  const geometry = new BufferGeometry();
  geometry.setAttribute(
    "position",
    new Float32BufferAttribute(fibonacciSphere(PARTICLE_COUNT, 1.7), 3)
  );
  const material = new PointsMaterial({
    color: new Color(isDark ? PALETTE.dark : PALETTE.light),
    size: 0.028,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });
  group.add(new Points(geometry, material));

  const setSize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  };
  setSize();

  const resizeObserver = new ResizeObserver(setSize);
  resizeObserver.observe(container);

  let targetTiltX = 0;
  let targetTiltY = 0;
  const onPointerMove = (e: PointerEvent) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    targetTiltY = nx * MAX_TILT;
    targetTiltX = ny * MAX_TILT;
  };
  window.addEventListener("pointermove", onPointerMove);

  let firstFrameSent = false;
  const loop = () => {
    group.rotation.y += 0.0022;
    group.rotation.x += (targetTiltX - group.rotation.x) * 0.04;
    group.rotation.z += (-targetTiltY * 0.3 - group.rotation.z) * 0.04;
    renderer.render(scene, camera);
    if (!firstFrameSent) {
      firstFrameSent = true;
      onFirstFrame();
    }
  };

  let running = false;
  const start = () => {
    if (running) return;
    running = true;
    renderer.setAnimationLoop(loop);
  };
  const stop = () => {
    running = false;
    renderer.setAnimationLoop(null);
  };

  // Pause when scrolled out of view or the tab is hidden.
  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !document.hidden) start();
      else stop();
    },
    { threshold: 0.05 }
  );
  intersectionObserver.observe(container);

  const onVisibility = () => {
    if (document.hidden) {
      stop();
    } else if (container.getBoundingClientRect().top < window.innerHeight) {
      start();
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  start();

  return {
    dispose() {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    },
    setTheme(dark: boolean) {
      material.color.setHex(dark ? PALETTE.dark : PALETTE.light);
    },
  };
}
