"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type FloatingObject = {
  mesh: THREE.Mesh;
  anchor: THREE.Vector3;
  phase: number;
  speed: number;
  radiusX: number;
  radiusY: number;
  radiusZ: number;
  scale: number;
};

export function AmbientScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.z = 11;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !window.matchMedia("(max-width: 719px)").matches,
        powerPreference: "high-performance",
      });
    } catch {
      mount.dataset.webgl = "false";
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.28;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xf5f8ff, 0x111725, 3.4));
    const key = new THREE.DirectionalLight(0xffddcf, 6.2);
    key.position.set(-3, 5, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0x5f9cff, 42, 28);
    rim.position.set(5, -2, 5);
    scene.add(rim);

    const accent = new THREE.PointLight(0xff6b7f, 27, 22);
    accent.position.set(-5, 0, 3);
    scene.add(accent);

    const materials = [
      new THREE.MeshPhysicalMaterial({
        color: 0xff765f,
        emissive: 0x5a1108,
        emissiveIntensity: 0.72,
        roughness: 0.2,
        metalness: 0.14,
        clearcoat: 0.92,
        clearcoatRoughness: 0.16,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x5b9dff,
        emissive: 0x092d6b,
        emissiveIntensity: 0.82,
        roughness: 0.12,
        metalness: 0.62,
        clearcoat: 0.72,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xbaf06f,
        emissive: 0x274a0b,
        emissiveIntensity: 0.68,
        roughness: 0.34,
        metalness: 0.06,
        flatShading: true,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xffcf5a,
        emissive: 0x5a3004,
        emissiveIntensity: 0.7,
        roughness: 0.16,
        metalness: 0.32,
        clearcoat: 0.7,
        transparent: true,
        opacity: 0.94,
      }),
    ];

    const meshes = [
      new THREE.Mesh(new THREE.TorusKnotGeometry(0.48, 0.14, 96, 12, 2, 3), materials[0]),
      new THREE.Mesh(new THREE.SphereGeometry(0.56, 28, 20), materials[1]),
      new THREE.Mesh(new THREE.IcosahedronGeometry(0.61, 1), materials[2]),
      new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.76, 0.76), materials[3]),
    ];

    const floaters: FloatingObject[] = meshes.map((mesh, index) => ({
      mesh,
      anchor: new THREE.Vector3(),
      phase: [0.2, 1.7, 3.4, 5.1][index],
      speed: [0.00024, 0.00017, 0.0002, 0.00015][index],
      radiusX: [0.8, 0.92, 0.72, 0.86][index],
      radiusY: [0.5, 0.44, 0.68, 0.48][index],
      radiusZ: [0.48, 0.62, 0.44, 0.58][index],
      scale: [0.98, 0.94, 1, 0.96][index],
    }));
    meshes.forEach((mesh, index) => {
      mesh.scale.setScalar(floaters[index].scale);
      scene.add(mesh);
    });

    const wireShell = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.73, 1)),
      new THREE.LineBasicMaterial({ color: 0x8ee7ff, transparent: true, opacity: 0.66 }),
    );
    scene.add(wireShell);

    let scrollTarget = window.scrollY;
    let smoothScroll = scrollTarget;
    const onScroll = () => { scrollTarget = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const placeObjects = () => {
      const mobile = mount.clientWidth < 720;
      const wide = mount.clientWidth / Math.max(mount.clientHeight, 1);
      const horizontal = Math.min(4.25, 2.65 * wide);
      const anchors = mobile
        ? [[1.05, 2.35, -0.65], [-1.1, -2.05, 0.05], [1.1, -0.55, -1.05], [-1.05, 1.1, -1.45]]
        : [[horizontal * 0.72, 2.05, -0.45], [-horizontal * 0.68, -1.45, 0.18], [horizontal * 0.62, -2.05, -0.92], [-horizontal * 0.57, 2.15, -1.25]];
      floaters.forEach((floater, index) => {
        floater.anchor.set(anchors[index][0], anchors[index][1], anchors[index][2]);
        floater.mesh.visible = !mobile || index < 3;
      });
      wireShell.visible = !mobile;
      wireShell.position.set(horizontal * 0.62, -2.05, -0.94);
    };

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      const pixelRatioCap = width < 720 ? 1.2 : 1.5;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
      renderer.setSize(width, height, false);
      placeObjects();
      renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();
    const readyFrame = window.requestAnimationFrame(() => {
      mount.dataset.ready = "true";
    });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const animate = (time: number) => {
      smoothScroll += (scrollTarget - smoothScroll) * 0.035;
      const scrollDrift = smoothScroll * 0.00022;
      floaters.forEach((floater, index) => {
        const angle = time * floater.speed + floater.phase + scrollDrift * (index % 2 ? -1 : 1);
        floater.mesh.position.x = floater.anchor.x + Math.cos(angle) * floater.radiusX;
        floater.mesh.position.y = floater.anchor.y + Math.sin(angle * 1.35) * floater.radiusY;
        floater.mesh.position.z = floater.anchor.z + Math.sin(angle * 0.82 + floater.phase) * floater.radiusZ;
        floater.mesh.rotation.x = angle * (1.05 + index * 0.14);
        floater.mesh.rotation.y = angle * (1.42 - index * 0.1);
        floater.mesh.rotation.z = angle * (0.34 + index * 0.08);
      });
      wireShell.rotation.x = time * 0.0001;
      wireShell.rotation.y = time * -0.00015;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };
    const startAnimation = () => {
      if (!reducedMotion && !document.hidden && frame === 0) {
        frame = window.requestAnimationFrame(animate);
      }
    };
    const onVisibilityChange = () => {
      if (document.hidden) stopAnimation();
      else startAnimation();
    };

    if (reducedMotion) renderer.render(scene, camera);
    else {
      document.addEventListener("visibilitychange", onVisibilityChange);
      startAnimation();
    }

    return () => {
      stopAnimation();
      window.cancelAnimationFrame(readyFrame);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.LineSegments)) return;
        object.geometry.dispose();
        const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
        objectMaterials.forEach((material) => material.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="ambient-scene" ref={mountRef} aria-hidden="true" />;
}
