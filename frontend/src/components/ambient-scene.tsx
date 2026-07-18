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
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      mount.dataset.webgl = "false";
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xe7edf7, 0x171b20, 2.2));
    const key = new THREE.DirectionalLight(0xffe8d8, 4.2);
    key.position.set(-3, 5, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0x7892b4, 22, 24);
    rim.position.set(5, -2, 5);
    scene.add(rim);

    const materials = [
      new THREE.MeshPhysicalMaterial({
        color: 0xc06c52,
        roughness: 0.34,
        metalness: 0.18,
        clearcoat: 0.7,
        clearcoatRoughness: 0.25,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x7892b4,
        roughness: 0.22,
        metalness: 0.52,
        clearcoat: 0.5,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x8da287,
        roughness: 0.52,
        metalness: 0.06,
        flatShading: true,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xd0bd95,
        roughness: 0.28,
        metalness: 0.24,
        transparent: true,
        opacity: 0.84,
      }),
    ];

    const meshes = [
      new THREE.Mesh(new THREE.TorusKnotGeometry(0.42, 0.12, 96, 12, 2, 3), materials[0]),
      new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 24), materials[1]),
      new THREE.Mesh(new THREE.IcosahedronGeometry(0.54, 1), materials[2]),
      new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.68, 0.68, 3, 3, 3), materials[3]),
    ];

    const floaters: FloatingObject[] = meshes.map((mesh, index) => ({
      mesh,
      anchor: new THREE.Vector3(),
      phase: [0.2, 1.7, 3.4, 5.1][index],
      speed: [0.00016, 0.00011, 0.00013, 0.00009][index],
      radiusX: [0.34, 0.46, 0.32, 0.42][index],
      radiusY: [0.28, 0.22, 0.4, 0.26][index],
    }));
    meshes.forEach((mesh) => scene.add(mesh));

    const wireShell = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.73, 1)),
      new THREE.LineBasicMaterial({ color: 0xbac7d8, transparent: true, opacity: 0.28 }),
    );
    scene.add(wireShell);

    let scrollTarget = window.scrollY;
    let smoothScroll = scrollTarget;
    const onScroll = () => { scrollTarget = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const placeObjects = () => {
      const mobile = mount.clientWidth < 720;
      const wide = mount.clientWidth / Math.max(mount.clientHeight, 1);
      const horizontal = Math.min(4.7, 3.05 * wide);
      const anchors = mobile
        ? [[1.5, 2.5, -0.7], [-1.45, -2.4, 0.1], [1.55, -0.65, -1.1], [-1.4, 1.15, -1.5]]
        : [[horizontal * 0.9, 2.35, -0.7], [-horizontal * 0.78, -1.75, 0], [horizontal * 0.76, -2.55, -1.2], [-horizontal * 0.68, 2.55, -1.6]];
      floaters.forEach((floater, index) => {
        floater.anchor.set(anchors[index][0], anchors[index][1], anchors[index][2]);
        floater.mesh.visible = !mobile || index < 3;
      });
      wireShell.visible = !mobile;
      wireShell.position.set(horizontal * 0.76, -2.55, -1.22);
    };

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      placeObjects();
      renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const animate = (time: number) => {
      smoothScroll += (scrollTarget - smoothScroll) * 0.035;
      const scrollDrift = smoothScroll * 0.00022;
      floaters.forEach((floater, index) => {
        const angle = time * floater.speed + floater.phase + scrollDrift * (index % 2 ? -1 : 1);
        floater.mesh.position.x = floater.anchor.x + Math.cos(angle) * floater.radiusX;
        floater.mesh.position.y = floater.anchor.y + Math.sin(angle * 1.35) * floater.radiusY;
        floater.mesh.rotation.x = angle * (0.72 + index * 0.13);
        floater.mesh.rotation.y = angle * (1.08 - index * 0.09);
      });
      wireShell.rotation.x = time * 0.00006;
      wireShell.rotation.y = time * -0.00009;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };

    if (reducedMotion) renderer.render(scene, camera);
    else frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
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
