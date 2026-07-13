"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 2400;
const MAX_TILT = (6 * Math.PI) / 180;

const COLORS = {
  light: { particles: 0x0e4da4, wire: 0x14b8a6 },
  dark: { particles: 0x4d8dff, wire: 0x2dd4bf },
};

function fibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    positions[i * 3] = x * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = z * radius;
  }

  return positions;
}

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  const materialsRef = useRef<{
    points: THREE.PointsMaterial;
    wire: THREE.LineBasicMaterial;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const isDark = document.documentElement.classList.contains("dark");
    const palette = isDark ? COLORS.dark : COLORS.light;

    const positions = fibonacciSphere(PARTICLE_COUNT, 1.7);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMaterial = new THREE.PointsMaterial({
      color: palette.particles,
      size: 0.028,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, pointsMaterial);
    group.add(points);

    const icoGeometry = new THREE.IcosahedronGeometry(2.05, 1);
    const wireGeometry = new THREE.WireframeGeometry(icoGeometry);
    const wireMaterial = new THREE.LineBasicMaterial({
      color: palette.wire,
      transparent: true,
      opacity: 0.22,
    });
    const wireframe = new THREE.LineSegments(wireGeometry, wireMaterial);
    group.add(wireframe);

    materialsRef.current = { points: pointsMaterial, wire: wireMaterial };

    const setSize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };
    setSize();

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);

    let targetTiltX = 0;
    let targetTiltY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetTiltY = nx * MAX_TILT;
      targetTiltX = ny * MAX_TILT;
    };
    window.addEventListener("pointermove", handlePointerMove);

    let running = true;
    let frameId = 0;

    const animate = () => {
      if (!running) return;
      group.rotation.y += 0.0022;
      group.rotation.x += (targetTiltX - group.rotation.x) * 0.04;
      group.rotation.z += (-targetTiltY * 0.3 - group.rotation.z) * 0.04;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (running) return;
      running = true;
      frameId = requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      if (document.hidden) stop();
      else intersectionObserver.takeRecords();
      if (!document.hidden && container.getBoundingClientRect().top < window.innerHeight) {
        start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);

      geometry.dispose();
      pointsMaterial.dispose();
      icoGeometry.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const materials = materialsRef.current;
    if (!materials) return;
    const palette = resolvedTheme === "dark" ? COLORS.dark : COLORS.light;
    materials.points.color.setHex(palette.particles);
    materials.wire.color.setHex(palette.wire);
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="aspect-square w-full max-w-md"
      aria-hidden="true"
    />
  );
}
