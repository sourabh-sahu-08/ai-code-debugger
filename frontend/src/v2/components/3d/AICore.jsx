import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Points, PointMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

export default function AICore({ state = 'idle' }) {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const outerShellRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const particlesRef = useRef();

  // State configurations mapping
  const config = useMemo(() => {
    switch (state) {
      case 'analyzing': return { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#06b6d4', speed: 2 };
      case 'error': return { primary: '#ef4444', secondary: '#f59e0b', accent: '#f87171', speed: 3 };
      case 'debugging': return { primary: '#8b5cf6', secondary: '#06b6d4', accent: '#3b82f6', speed: 2.5 };
      case 'success': return { primary: '#10b981', secondary: '#06b6d4', accent: '#34d399', speed: 1 };
      case 'idle':
      default: return { primary: '#06b6d4', secondary: '#3b82f6', accent: '#8b5cf6', speed: 0.8 };
    }
  }, [state]);

  // Generate particles
  const particles = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 1.2 + Math.random() * 0.8; // Particles orbit outside the core
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const s = config.speed;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * s * 0.5) * 0.1;
    }
    
    if (innerCoreRef.current) innerCoreRef.current.rotation.y = time * s * 0.2;
    if (outerShellRef.current) {
      outerShellRef.current.rotation.x = time * s * 0.1;
      outerShellRef.current.rotation.y = time * s * 0.15;
    }
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * s * 0.3 + 1;
      ring1Ref.current.rotation.y = time * s * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * s * -0.2 + 2;
      ring2Ref.current.rotation.y = time * s * 0.4;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = time * s * 0.4;
      ring3Ref.current.rotation.y = time * s * -0.3;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * s * 0.05;
      particlesRef.current.rotation.z = time * s * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic Lighting for 3D Depth */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color={config.secondary} />
      <pointLight position={[0, 0, 0]} color={config.primary} intensity={2} distance={10} />

      {/* Inner Glowing Core */}
      <Sphere ref={innerCoreRef} args={[0.6, 32, 32]}>
        <meshStandardMaterial
          color={config.primary}
          emissive={config.primary}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </Sphere>

      {/* Outer Glass Shell */}
      <Sphere ref={outerShellRef} args={[1, 32, 32]}>
        <meshPhysicalMaterial
          color={config.secondary}
          transparent
          opacity={0.2}
          roughness={0.1}
          metalness={0.8}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1}
        />
      </Sphere>

      {/* Orbital Data Rings */}
      <Torus ref={ring1Ref} args={[1.3, 0.01, 16, 100]}>
        <meshBasicMaterial color={config.primary} transparent opacity={0.6} />
      </Torus>
      <Torus ref={ring2Ref} args={[1.5, 0.015, 16, 100]}>
        <meshBasicMaterial color={config.accent} transparent opacity={0.4} />
      </Torus>
      <Torus ref={ring3Ref} args={[1.7, 0.008, 16, 100]}>
        <meshBasicMaterial color={config.secondary} transparent opacity={0.5} />
      </Torus>

      {/* Particle Energy Field */}
      <Points ref={particlesRef} positions={particles}>
        <PointMaterial
          transparent
          color={config.accent}
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
