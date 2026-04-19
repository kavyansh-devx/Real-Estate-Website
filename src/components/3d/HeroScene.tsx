import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#d4af37"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
}

function GlassSphere() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh position={[-2, 1, -2]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          opacity={1}
          metalness={0.1}
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#d4af37" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
        <AbstractShape />
        <GlassSphere />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
