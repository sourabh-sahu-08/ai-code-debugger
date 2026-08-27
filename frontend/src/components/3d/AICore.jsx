import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Icosahedron, Line, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// State-driven color logic
const getCoreColors = (status) => {
  switch (status) {
    case 'error': return { core: '#dc2626', aura: '#ef4444' };
    case 'success': return { core: '#059669', aura: '#10b981' };
    case 'analyzing': return { core: '#2563eb', aura: '#3b82f6' };
    default: return { core: '#06b6d4', aura: '#8b5cf6' }; // idle
  }
};

function Rings({ status }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const speed = status === 'analyzing' ? 1.5 : 0.5;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    groupRef.current.rotation.y += 0.005 * speed;
    groupRef.current.rotation.z += 0.002 * speed;
  });

  return (
    <group ref={groupRef}>
      {/* Outer Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
      {/* Inner Ring (Tilted) */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.8, 0.01, 16, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function AmbientParticles({ count = 50 }) {
  const pointsRef = useRef();
  
  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, ph];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    // Gentle bobbing could be added in a custom shader, keeping it simple here for perf
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial transparent color="#06b6d4" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
    </points>
  );
}

export default function AICore({ status = 'idle' }) {
  const coreRef = useRef();
  const auraRef = useRef();
  const colors = getCoreColors(status);
  
  // Smoothly interpolate colors
  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.material.color.lerp(new THREE.Color(colors.core), 0.05);
      // Gentle floating
      coreRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      coreRef.current.rotation.y += 0.005;
    }
    if (auraRef.current) {
      auraRef.current.material.color.lerp(new THREE.Color(colors.aura), 0.05);
      auraRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group>
      {/* Inner Dense Core */}
      <Icosahedron ref={coreRef} args={[0.8, 1]} receiveShadow castShadow>
        <meshStandardMaterial 
          color={colors.core} 
          roughness={0.2} 
          metalness={0.8}
          wireframe={false} 
        />
      </Icosahedron>

      {/* Outer Glow / Aura */}
      <Sphere ref={auraRef} args={[1.2, 32, 32]}>
        <meshBasicMaterial 
          color={colors.aura} 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Orbiting Rings */}
      <Rings status={status} />

      {/* Lightweight Particles */}
      <AmbientParticles count={80} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} color={colors.core} intensity={2} distance={10} />
    </group>
  );
}
