import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AICore from './AICore';

export default function AICoreCanvas({ state = 'idle', className = "h-full w-full" }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: false, alpha: true }} // Optimize for performance
        dpr={[1, 2]} // Limit device pixel ratio
      >
        <Suspense fallback={null}>
          <AICore state={state} />
          {/* Allow user to slightly rotate the core, but disable zoom and pan to keep it in frame */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
