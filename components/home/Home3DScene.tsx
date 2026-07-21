"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const isPhone = size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;
  const position: [number, number, number] = isPhone
    ? [0, -0.3, -2]
    : isTablet
      ? [1.35, -1.2, -0.35]
      : [3.1, 0.35, 0];
  const sceneScale = isPhone ? 0.85 : isTablet ? 0.78 : 1;

  useFrame((state, delta) => {
    if (!group.current || !ring.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.32,
      0.035,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.18,
      0.035,
    );
    ring.current.rotation.z += delta * 0.14;
  });

  return (
    <group ref={group} position={position} scale={sceneScale}>
      <Float speed={1.7} rotationIntensity={0.35} floatIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[1.42, 2]} />
          <meshPhysicalMaterial
            color="#07162d"
            emissive="#1558c9"
            emissiveIntensity={0.55}
            metalness={0.72}
            roughness={0.18}
            clearcoat={1}
            wireframe
          />
        </mesh>
        <mesh ref={ring} rotation={[1.12, 0.2, 0]}>
          <torusGeometry args={[2.05, 0.025, 12, 160]} />
          <meshBasicMaterial color="#61dafb" transparent opacity={0.72} />
        </mesh>
        <mesh rotation={[0.25, 0.5, 1.1]}>
          <torusGeometry args={[1.73, 0.012, 8, 140]} />
          <meshBasicMaterial color="#9b7bff" transparent opacity={0.56} />
        </mesh>
        <Html transform position={[0, 0, 0.25]} distanceFactor={3.1} center>
          <div className="whitespace-nowrap text-[11px] font-medium tracking-[.12em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            JAKSLAB
          </div>
        </Html>
        {[
          ["Research", [-2.12, 0.72, 0.45]],
          ["Build", [1.95, 1.02, 0.25]],
          ["Deliver", [0.55, -1.9, 0.55]],
        ].map(([label, position]) => (
          <Html
            key={label as string}
            transform
            position={position as [number, number, number]}
            distanceFactor={3.2}
            center
          >
            <span className="whitespace-nowrap text-[10px] tracking-[.12em] text-slate-400 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              {label as string}
            </span>
          </Html>
        ))}
      </Float>
      <pointLight color="#3b82f6" intensity={26} distance={8} />
    </group>
  );
}

export default function Home3DScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-55 sm:opacity-100" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 48 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[-4, 5, 4]} intensity={2.5} color="#b9d9ff" />
        <Sparkles count={85} scale={[13, 8, 5]} size={1.5} speed={0.22} color="#7dd3fc" opacity={0.48} />
        <Core />
      </Canvas>
    </div>
  );
}
