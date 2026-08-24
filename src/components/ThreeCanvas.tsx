import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, RefreshCw, Eye, Move3d } from "lucide-react";

interface ThreeCanvasProps {
  interactiveMode?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ interactiveMode = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    meshGroup: THREE.Group;
    particles: THREE.Points;
    material: THREE.MeshPhysicalMaterial;
    wireMaterial: THREE.MeshBasicMaterial;
    lights: THREE.PointLight[];
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.05);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // 3. Renderer Setup with high-quality antialiasing and alpha
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Lights: Luxury warm champagne + cool ambient
    const ambientLight = new THREE.AmbientLight(0xf5eedc, 0.8);
    scene.add(ambientLight);

    const goldLight1 = new THREE.PointLight(0xd4af37, 3.5, 20);
    goldLight1.position.set(4, 3, 4);
    scene.add(goldLight1);

    const champagneLight2 = new THREE.PointLight(0xc5a880, 2.8, 20);
    champagneLight2.position.set(-4, -3, 3);
    scene.add(champagneLight2);

    const rimLight = new THREE.PointLight(0xffffff, 2.0, 15);
    rimLight.position.set(0, 5, -2);
    scene.add(rimLight);

    // 5. Mesh Group (Sculptural Beauty Prism)
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);

    // Central Icosahedron Prism (Faceted luxury crystal)
    const geometry = new THREE.IcosahedronGeometry(1.4, 0);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x141419,
      emissive: 0x1f1a14,
      roughness: 0.12,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      flatShading: true,
    });
    const mainMesh = new THREE.Mesh(geometry, material);
    meshGroup.add(mainMesh);

    // Wireframe Outer Cage for luxury architectural feel
    const wireGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xc5a880,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMaterial);
    meshGroup.add(wireMesh);

    // Orbital Luxury Torus Ring (Gold halo)
    const torusGeo = new THREE.TorusGeometry(2.1, 0.025, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x47391b,
    });
    const torusMesh1 = new THREE.Mesh(torusGeo, torusMat);
    torusMesh1.rotation.x = Math.PI / 3;
    meshGroup.add(torusMesh1);

    const torusMesh2 = new THREE.Mesh(torusGeo, torusMat);
    torusMesh2.rotation.x = -Math.PI / 4;
    torusMesh2.rotation.y = Math.PI / 6;
    meshGroup.add(torusMesh2);

    // 6. Floating Golden Stardust Particles
    const particleCount = 240;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xe2ceb0,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Store references
    sceneRef.current = {
      renderer,
      scene,
      camera,
      meshGroup,
      particles,
      material,
      wireMaterial,
      lights: [goldLight1, champagneLight2, rimLight],
    };

    // 7. Mouse and Scroll Tracking for organic parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Group rotation
      const speedMult = rotationSpeed;
      meshGroup.rotation.y = elapsedTime * 0.35 * speedMult + mouseX * 0.5;
      meshGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.2 + mouseY * 0.4;
      meshGroup.rotation.z = Math.cos(elapsedTime * 0.2) * 0.15;

      torusMesh1.rotation.z = elapsedTime * 0.25 * speedMult;
      torusMesh2.rotation.z = -elapsedTime * 0.3 * speedMult;

      // Dynamic light movement
      goldLight1.position.x = Math.sin(elapsedTime * 0.7) * 4 + mouseX * 2;
      goldLight1.position.y = Math.cos(elapsedTime * 0.5) * 3 + mouseY * 2;
      champagneLight2.position.x = -Math.sin(elapsedTime * 0.6) * 4;

      // Particle subtle drifting
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling via ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });

    resizeObserver.observe(container);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      wireGeo.dispose();
      wireMaterial.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [rotationSpeed]);

  const toggleWireframe = () => {
    if (sceneRef.current) {
      const next = !wireframeMode;
      setWireframeMode(next);
      sceneRef.current.material.wireframe = next;
    }
  };

  const cycleSpeed = () => {
    setRotationSpeed((prev) => (prev >= 2 ? 0.5 : prev + 0.5));
  };

  return (
    <div
      className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e0e13]/80 to-[#08080a]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas mount */}
      <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Luxury Background Glow */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating HUD Badges & Interactive Controls */}
      {interactiveMode && (
        <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 pointer-events-auto z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121217]/90 backdrop-blur-md border border-[#c5a880]/30 text-xs tracking-wider text-[#e2ceb0]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span className="font-semibold uppercase tracking-widest text-[11px]">The Prism of Intelligence</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleWireframe}
              className={`p-2 rounded-lg text-xs font-medium border transition-all ${
                wireframeMode
                  ? "bg-[#d4af37]/20 border-[#d4af37] text-[#f4efe6]"
                  : "bg-[#121217]/80 border-white/10 text-neutral-400 hover:text-white"
              }`}
              title="Toggle wireframe topology"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={cycleSpeed}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#121217]/80 border border-white/10 text-neutral-300 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-all flex items-center gap-1.5"
              title="Adjust rotation velocity"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{rotationSpeed}x Speed</span>
            </button>
          </div>
        </div>
      )}

      {/* Subtle guide hint */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-neutral-400/80 font-medium">
        <Move3d className="w-3.5 h-3.5 text-[#c5a880]" />
        <span>Spatial 3D Engine • Real-Time Shader</span>
      </div>
    </div>
  );
};
