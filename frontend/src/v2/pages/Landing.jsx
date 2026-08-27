import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, Code, Users, Cpu, ChevronRight, Play } from 'lucide-react';
import AICoreCanvas from '../components/3d/AICoreCanvas';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)] overflow-hidden selection:bg-primary-base/30">
      
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-base/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary-violet/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="grid-overlay absolute inset-0 opacity-20" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-primary-cyan" />
          <span className="font-bold text-xl tracking-tight">KhudSeKrle</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#learning" className="hover:text-white transition-colors">Learning</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/auth/login" className="text-sm font-medium text-text-muted hover:text-white transition-colors">
            Sign In
          </Link>
          <Link to="/auth/register" className="relative group overflow-hidden rounded-full px-5 py-2.5 bg-surface-strong border border-border hover:border-primary-cyan/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-base/20 to-primary-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-sm font-medium">Get Started</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 pt-20 pb-32 max-w-7xl mx-auto min-h-[85vh]">
        
        {/* Left Content */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col items-start gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-base/10 border border-primary-base/20 text-primary-cyan text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary-cyan animate-pulse" />
            KhudSeKrle v2.0
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
            Stop guessing. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan via-primary-base to-primary-violet">
              Start debugging.
            </span>
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-lg text-text-muted max-w-lg leading-relaxed">
            KhudSeKrle uses AI to analyze your code, explain errors, guide you toward solutions, and help you become a better developer through collaborative peer learning.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex items-center gap-4 pt-4">
            <Link to="/dashboard" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
              Start Debugging <ChevronRight className="w-4 h-4" />
            </Link>
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface/50 border border-border backdrop-blur-md hover:bg-surface transition-colors font-medium">
              <Play className="w-4 h-4" /> Watch Demo
            </button>
          </motion.div>
          
          {/* Micro Stats */}
          <motion.div variants={fadeIn} className="flex items-center gap-8 pt-12 border-t border-border/50 mt-4 w-full">
            <div>
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">Bugs Fixed</div>
            </div>
            <div>
              <div className="text-2xl font-bold">95%</div>
              <div className="text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">Resolution Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">AI Mentor</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right 3D AI Core */}
        <motion.div 
          className="w-full md:w-1/2 h-[500px] md:h-[700px] relative mt-16 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Suspense handles the loading of the WebGL context gracefully */}
          <AICoreCanvas state="idle" />
          
          {/* Floating UI Elements over 3D */}
          <div className="absolute top-1/4 right-0 glass px-4 py-3 rounded-2xl flex items-center gap-3 animate-float" style={{ animationDelay: '0s' }}>
            <div className="w-8 h-8 rounded-full bg-error-base/20 flex items-center justify-center">
              <Code className="w-4 h-4 text-error-base" />
            </div>
            <div>
              <div className="text-xs text-text-muted">TypeError detected</div>
              <div className="text-sm font-semibold">Cannot read properties...</div>
            </div>
          </div>
          
          <div className="absolute bottom-1/4 left-0 glass px-4 py-3 rounded-2xl flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-8 h-8 rounded-full bg-success-base/20 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-success-base" />
            </div>
            <div>
              <div className="text-xs text-text-muted">AI Mentor</div>
              <div className="text-sm font-semibold">Root cause identified</div>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
