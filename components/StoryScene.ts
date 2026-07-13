// Plain (non-React) Three.js module for the scroll-driven story. Loaded only
// via dynamic import() on eligible desktops. Named imports keep it tree-shaken
// (no OrbitControls, no postprocessing). Scroll progress is read every frame
// through getProgress() — never via React state — so scrolling causes zero
// re-renders; the particle formation is scrubbed by the scroll position.
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  Group,
  Color,
} from "three";

const N = 2000; // <= 2500 particles

const BRAND = { light: 0x0e4da4, dark: 0x4d8dff };
const RED = { light: 0xdc2626, dark: 0xf87171 };

export type StorySceneHandle = {
  dispose: () => void;
  setTheme: (isDark: boolean) => void;
};

export type StorySceneOptions = {
  isDark: boolean;
  getProgress: () => number; // 0..1 scroll progress
  onFirstFrame: () => void;
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function genScattered(): Float32Array {
  const out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    // Random shell — feels like threats emerging from everywhere.
    const r = 2.4 + Math.random() * 1.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    out[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    out[i * 3 + 2] = r * Math.cos(phi);
  }
  return out;
}

function genGlobe(): Float32Array {
  const out = new Float32Array(N * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const radius = 1.7;
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    out[i * 3] = Math.cos(theta) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return out;
}

function inShield(x: number, y: number): boolean {
  if (y > 0.95 || y < -0.98) return false;
  if (y >= 0.15) {
    const halfW = 0.72;
    if (y > 0.8) {
      const t = (y - 0.8) / 0.15;
      const w = halfW * Math.sqrt(Math.max(0, 1 - t * t));
      return Math.abs(x) <= w;
    }
    return Math.abs(x) <= halfW;
  }
  const w = 0.72 * ((y + 0.98) / 1.13);
  return Math.abs(x) <= w;
}

function inZ(x: number, y: number): boolean {
  const halfW = 0.78;
  const bar = 0.19;
  if (y <= 0.95 && y >= 0.6 && Math.abs(x) <= halfW) return true; // top bar
  if (y <= -0.6 && y >= -0.95 && Math.abs(x) <= halfW) return true; // bottom bar
  if (y >= -0.62 && y <= 0.62) {
    const xLine = halfW * (y / 0.6); // diagonal: top-right -> bottom-left
    if (Math.abs(x - xLine) <= bar) return true;
  }
  return false;
}

function genFromMask(test: (x: number, y: number) => boolean, scale: number): Float32Array {
  const out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    let x = 0;
    let y = 0;
    let ok = false;
    for (let a = 0; a < 40; a++) {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      if (test(x, y)) {
        ok = true;
        break;
      }
    }
    if (!ok) {
      x = 0;
      y = 0;
    }
    out[i * 3] = x * scale;
    out[i * 3 + 1] = y * scale;
    out[i * 3 + 2] = (Math.random() * 2 - 1) * 0.08;
  }
  return out;
}

export function createStoryScene(
  container: HTMLElement,
  { isDark, getProgress, onFirstFrame }: StorySceneOptions
): StorySceneHandle {
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 5.6;

  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  const group = new Group();
  scene.add(group);

  // 5 formation targets. Particle i morphs through the same index in each.
  const shield = genFromMask(inShield, 1.9);
  const flag = new Float32Array(shield); // "flag & eject" = shield with intruders thrown out
  const intruder = new Uint8Array(N);
  for (let i = 0; i < N; i++) {
    if (i % 11 === 0) {
      intruder[i] = 1;
      const s = 1.7 + Math.random() * 1.1;
      flag[i * 3] = shield[i * 3] * s + (Math.random() - 0.5) * 0.6;
      flag[i * 3 + 1] = shield[i * 3 + 1] * s + (Math.random() - 0.5) * 0.6;
      flag[i * 3 + 2] = shield[i * 3 + 2] + (Math.random() - 0.5) * 0.8;
    }
  }
  const targets = [genScattered(), genGlobe(), shield, flag, genFromMask(inZ, 1.9)];

  const positions = new Float32Array(targets[0]); // start scattered
  const colors = new Float32Array(N * 3);

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));

  const material = new PointsMaterial({
    size: 0.03,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    vertexColors: true,
  });
  group.add(new Points(geometry, material));

  const brandColor = new Color(isDark ? BRAND.dark : BRAND.light);
  const redColor = new Color(isDark ? RED.dark : RED.light);
  const tmp = new Color();

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

  let smoothP = 0;
  let firstFrameSent = false;

  const loop = () => {
    const targetP = clamp01(getProgress());
    smoothP += (targetP - smoothP) * 0.1; // damping
    const p = smoothP;

    const seg = Math.min(3, Math.floor(p / 0.25));
    const t = smooth(clamp01((p - seg * 0.25) / 0.25));
    const A = targets[seg];
    const B = targets[seg + 1];

    // Intruder "flag" redness peaks around the eject step (~0.55–0.75).
    const redAmount = clamp01(1 - Math.abs(p - 0.66) / 0.14);

    const posAttr = geometry.attributes.position as BufferAttribute;
    const colAttr = geometry.attributes.color as BufferAttribute;

    for (let i = 0; i < N; i++) {
      const j = i * 3;
      const dx = lerp(A[j], B[j], t);
      const dy = lerp(A[j + 1], B[j + 1], t);
      const dz = lerp(A[j + 2], B[j + 2], t);
      positions[j] += (dx - positions[j]) * 0.18;
      positions[j + 1] += (dy - positions[j + 1]) * 0.18;
      positions[j + 2] += (dz - positions[j + 2]) * 0.18;

      const red = intruder[i] ? redAmount : 0;
      tmp.copy(brandColor).lerp(redColor, red);
      colors[j] = tmp.r;
      colors[j + 1] = tmp.g;
      colors[j + 2] = tmp.b;
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    // Scroll-scrubbed rotation + subtle camera dolly.
    group.rotation.y = p * Math.PI * 2;
    group.rotation.x = Math.sin(p * Math.PI) * 0.12;
    camera.position.z = lerp(5.6, 5.0, smooth(clamp01(p / 0.25)));

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

  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !document.hidden) start();
      else stop();
    },
    { threshold: 0 }
  );
  intersectionObserver.observe(container);

  const onVisibility = () => {
    if (document.hidden) stop();
    else if (container.getBoundingClientRect().bottom > 0) start();
  };
  document.addEventListener("visibilitychange", onVisibility);

  start();

  return {
    dispose() {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    },
    setTheme(dark: boolean) {
      brandColor.setHex(dark ? BRAND.dark : BRAND.light);
      redColor.setHex(dark ? RED.dark : RED.light);
    },
  };
}
