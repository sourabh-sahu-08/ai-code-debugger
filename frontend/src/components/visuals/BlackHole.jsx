import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BlackHole() {
  const { scrollY } = useScroll();
  
  // Parallax effects tied to scroll
  const yParallax = useTransform(scrollY, [0, 1000], [0, 150]);
  const scaleParallax = useTransform(scrollY, [0, 1000], [1, 0.8]);
  const opacityParallax = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <motion.div 
      className="relative w-full h-full flex items-center justify-center pointer-events-none"
      style={{ y: yParallax, scale: scaleParallax, opacity: opacityParallax }}
    >
      {/* Container to handle the overall sizing of the effect */}
      <div className="relative w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] flex items-center justify-center">
        
        {/* Layer 1: Stars & Background Glow */}
        <div className="absolute inset-[-50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)] rounded-full blur-2xl" />
        
        {/* Layer 2: Event Horizon Glow (Outer Ring) */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[60%] h-[60%] rounded-full opacity-60 mix-blend-screen"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 70%, transparent 100%)',
            filter: 'blur(8px)',
          }}
        />

        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute w-[50%] h-[50%] rounded-full opacity-40 mix-blend-screen"
          style={{
            background: 'conic-gradient(from 180deg, transparent 0%, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 80%, transparent 100%)',
            filter: 'blur(12px)',
          }}
        />

        {/* Layer 3: Orbital Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 800 800">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: 'center' }}
          >
            <ellipse cx="400" cy="400" rx="280" ry="80" fill="none" stroke="url(#orbitGrad1)" strokeWidth="1" transform="rotate(30 400 400)" />
            <ellipse cx="400" cy="400" rx="340" ry="60" fill="none" stroke="url(#orbitGrad2)" strokeWidth="0.5" transform="rotate(-45 400 400)" />
          </motion.g>
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: 'center' }}
          >
            <ellipse cx="400" cy="400" rx="300" ry="120" fill="none" stroke="url(#orbitGrad1)" strokeWidth="0.8" transform="rotate(75 400 400)" />
          </motion.g>

          <defs>
            <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Layer 4: The Void (Inner dark center) */}
        <div className="absolute w-[35%] h-[35%] rounded-full bg-black shadow-[inset_0_0_40px_rgba(255,255,255,0.05),0_0_80px_rgba(255,255,255,0.1)] z-10 flex items-center justify-center">
          <div className="absolute inset-[-10px] rounded-full border border-white/5 opacity-50" />
          <div className="absolute inset-[-1px] rounded-full bg-black shadow-[inset_0_0_20px_rgba(0,0,0,1)]" />
        </div>

      </div>
    </motion.div>
  );
}
