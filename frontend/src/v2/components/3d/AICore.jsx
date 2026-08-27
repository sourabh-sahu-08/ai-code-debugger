import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function AICore({ state = 'idle' }) {
  const coreRef = useRef();
  const particlesRef = useRef();
  const ringRef = useRef();

  // State configurations mapping
  const config = useMemo(() => {
    switch (state) {
      case 'analyzing':
        return {
          coreColor: '#3b82f6', // electric
          emissive: '#06b6d4', // cyan
          particleColor: '#8b5cf6', // violet
          speed: 2,
          particleSpeed: 0.05,
          scale: 1.1,
          ringVisible: true
        };
      case 'error':
        return {
          coreColor: '#ef4444', // soft red
          emissive: '#f87171',
          particleColor: '#f59e0b', // orange
          speed: 3,
          particleSpeed: 0.1,
          scale: 0.9,
          ringVisible: false
        };
      case 'debugging':
        return {
          coreColor: '#8b5cf6', // violet
          emissive: '#3b82f6', // electric
          particleColor: '#06b6d4', // cyan
          speed: 2.5,
          particleSpeed: 0.08,
          scale: 1.05,
          ringVisible: true
        };
      case 'success':
        return {
          coreColor: '#10b981', // emerald
          emissive: '#06b6d4', // cyan
          particleColor: '#10b981',
          speed: 1,
          particleSpeed: 0.02,
          scale: 1.2,
          ringVisible: false
        };
      case 'idle':
      default:
        return {
          coreColor: '#06b6d4', // cyan
          emissive: '#3b82f6',
          particleColor: '#8b5cf6',
          speed: 0.5,
          particleSpeed: 0.01,
          scale: 1,
          ringVisible: false
        };
    }
  }, [state]);

  // Generate particles only once
  const particles = useMemo(() => {
    const count = 100; // Keep it lightweight
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  useFrame((stateObj) => {
    const time = stateObj.clock.getElapsedTime();
    
    // Core floating & rotating
    if (coreRef.current) {
      coreRef.current.rotation.y = time * config.speed * 0.2;
      coreRef.current.rotation.x = time * config.speed * 0.1;
      coreRef.current.position.y = Math.sin(time * config.speed) * 0.1;
      
      // Lerp scale for smooth transition
      coreRef.current.scale.lerp(
        new THREE.Vector3(config.scale, config.scale, config.scale),
        0.05
      );
    }

    // Particles rotating
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * config.particleSpeed;
      particlesRef.current.rotation.x = time * config.particleSpeed * 0.5;
    }

    // Ring animation
    if (ringRef.current && config.ringVisible) {
      ringRef.current.rotation.z = time * config.speed * 0.5;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time) * 0.1;
    }
  });

  return (
    <group>
      {/* Central AI Core */}
      <Sphere ref={coreRef} args={[1, 32, 32]}>
        <meshStandardMaterial
          color={config.coreColor}
          emissive={config.emissive}
          emissiveIntensity={0.5}
          wireframe={state === 'error'}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Orbiting Data Ring (Visible during processing/analyzing) */}
      {config.ringVisible && (
        <mesh ref={ringRef}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshBasicMaterial color={config.particleColor} transparent opacity={0.5} />
        </mesh>
      )}

      {/* Lightweight Particle Field */}
      <Points ref={particlesRef} positions={particles}>
        <PointMaterial
          transparent
          color={config.particleColor}
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Lights to create the glowing feel */}
      <pointLight position={[0, 0, 0]} color={config.emissive} intensity={1} distance={5} />
      <ambientLight intensity={0.2} />
    </group>
  );
}
