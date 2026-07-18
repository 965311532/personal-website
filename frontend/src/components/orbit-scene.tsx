"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type OrbitSceneProps = {
  activeIndex?: number;
  variant?: "hero" | "projects";
};

const palette = [0x9ee8ff, 0xff6b5e, 0xd7ff58, 0xb69cff];

export function OrbitScene({ activeIndex = 0, variant = "hero" }: OrbitSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(activeIndex);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.35, variant === "hero" ? 10.2 : 11.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      mount.dataset.webgl = "false";
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.prepend(renderer.domElement);

    const world = new THREE.Group();
    world.rotation.set(-0.28, -0.2, 0.06);
    scene.add(world);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1b1d, 2.7));
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.8);
    keyLight.position.set(5, 4, 7);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xff6b5e, 28, 18);
    rimLight.position.set(-4, -3, 5);
    scene.add(rimLight);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x17181a,
      emissive: 0x101214,
      emissiveIntensity: 0.5,
      metalness: 0.45,
      roughness: 0.28,
      wireframe: variant === "projects",
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.72, 3), coreMaterial);
    world.add(core);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.05, 0.018, 10, 160),
      new THREE.MeshBasicMaterial({ color: 0xf6f2e9, transparent: true, opacity: 0.48 }),
    );
    halo.rotation.x = 1.08;
    halo.rotation.y = 0.25;
    world.add(halo);

    const radii = variant === "hero" ? [1.62, 2.32, 3.08, 3.8] : [1.72, 2.5, 3.3, 4.1];
    const speeds = [0.00015, -0.0001, 0.00007, -0.000052];
    const tilts = [0.46, -0.28, 0.72, -0.56];
    const baseAngles = [0.3, 2.7, 4.1, 5.4];
    const pivots: THREE.Group[] = [];
    const bodies: THREE.Mesh[] = [];
    const bodyMaterials: THREE.MeshStandardMaterial[] = [];
    const orbitMaterials: THREE.MeshBasicMaterial[] = [];

    radii.forEach((radius, index) => {
      const orbitPivot = new THREE.Group();
      orbitPivot.rotation.x = tilts[index];
      orbitPivot.rotation.z = baseAngles[index];
      world.add(orbitPivot);

      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xf6f2e9,
        transparent: true,
        opacity: index === activeRef.current ? 0.5 : 0.2,
      });
      const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(radius, index === activeRef.current ? 0.016 : 0.009, 8, 220),
        orbitMaterial,
      );
      orbitPivot.add(orbit);

      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: palette[index],
        emissive: palette[index],
        emissiveIntensity: 0.11,
        metalness: index % 2 === 0 ? 0.28 : 0.1,
        roughness: index % 2 === 0 ? 0.24 : 0.5,
        flatShading: index === 1 || index === 3,
      });
      const geometry = index % 2 === 0
        ? new THREE.SphereGeometry(index === 0 ? 0.3 : 0.23, 32, 24)
        : new THREE.IcosahedronGeometry(index === 1 ? 0.33 : 0.27, 2);
      const body = new THREE.Mesh(geometry, bodyMaterial);
      body.position.x = radius;
      orbitPivot.add(body);

      const bodyHalo = new THREE.Mesh(
        new THREE.TorusGeometry(index === 0 ? 0.48 : 0.4, 0.012, 8, 80),
        new THREE.MeshBasicMaterial({ color: palette[index], transparent: true, opacity: 0.52 }),
      );
      bodyHalo.position.copy(body.position);
      bodyHalo.rotation.x = 0.9 + index * 0.2;
      orbitPivot.add(bodyHalo);

      pivots.push(orbitPivot);
      bodies.push(body);
      bodyMaterials.push(bodyMaterial);
      orbitMaterials.push(orbitMaterial);
    });

    const starGeometry = new THREE.BufferGeometry();
    const starCount = variant === "hero" ? 86 : 54;
    const starPositions = new Float32Array(starCount * 3);
    for (let index = 0; index < starCount; index += 1) {
      const angle = index * 2.39996;
      const radius = 2.2 + ((index * 37) % 100) / 16;
      starPositions[index * 3] = Math.cos(angle) * radius;
      starPositions[index * 3 + 1] = Math.sin(angle) * radius;
      starPositions[index * 3 + 2] = ((index * 17) % 18) / 4 - 2.2;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: 0xf6f2e9, size: 0.025, transparent: true, opacity: 0.34 }),
    );
    world.add(stars);

    const pointer = new THREE.Vector2();
    const onPointerMove = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.46;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.34;
    };
    mount.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let frame = 0;
    const animate = (time: number) => {
      const active = activeRef.current;
      core.rotation.x = time * 0.00015;
      core.rotation.y = time * 0.00022;
      halo.rotation.z = time * -0.00012;

      pivots.forEach((pivot, index) => {
        pivot.rotation.z = baseAngles[index] + time * speeds[index];
        const targetScale = index === active ? 1.7 : 1;
        bodies[index].scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.055);
        bodyMaterials[index].emissiveIntensity +=
          ((index === active ? 0.45 : 0.1) - bodyMaterials[index].emissiveIntensity) * 0.06;
        orbitMaterials[index].opacity +=
          ((index === active ? 0.62 : 0.18) - orbitMaterials[index].opacity) * 0.05;
      });

      world.rotation.y += (pointer.x - world.rotation.y) * 0.025;
      world.rotation.x += (-0.28 - pointer.y - world.rotation.x) * 0.025;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };

    if (reducedMotion.matches) {
      renderer.render(scene, camera);
    } else {
      frame = window.requestAnimationFrame(animate);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.Points)) return;
        object.geometry?.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [variant]);

  return (
    <div className={`orbit-scene orbit-scene-${variant}`} ref={mountRef}>
      <div className="orbit-fallback" aria-hidden="true">
        <i /><i /><i /><i />
      </div>
    </div>
  );
}
