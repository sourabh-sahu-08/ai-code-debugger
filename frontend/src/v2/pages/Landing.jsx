import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, Code, Cpu, ChevronRight, Play } from 'lucide-react';
import AICoreCanvas from '../components/3d/AICoreCanvas';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)] overflow-x-hidden selection:bg-primary-base/30 relative">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hidden lg:block absolute top-10 left-1/4 w-[400px] h-[400px] bg-primary-base/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="hidden lg:block absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-violet/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="grid-overlay absolute inset-0 opacity-10" />
      </div>

      {/* Navbar - 3 Column Layout */}
      <nav className="relative z-50 w-full max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left */}
        <div className="flex items-center gap-2 justify-start">
          <Terminal className="w-6 h-6 text-primary-cyan" />
          <span className="font-bold text-lg md:text-xl tracking-tight">KhudSeKrle</span>
        </div>
        
        {/* Center */}
        <div className="hidden md:flex items-center justify-center gap-8 text-sm font-medium text-text-muted">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#learning" className="hover:text-white transition-colors">Learning</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
        </div>
        
        {/* Right */}
        <div className="flex items-center gap-4 justify-end">
          <Link to="/auth/login" className="hidden sm:block text-sm font-medium text-text-muted hover:text-white transition-colors">
            Sign In
          </Link>
          <Link to="/auth/register" className="relative group overflow-hidden rounded-full px-5 py-2 md:py-2.5 bg-surface border border-border hover:border-primary-cyan/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-base/20 to-primary-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-xs md:text-sm font-medium">Get Started</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-12 pb-20 lg:pt-20 lg:pb-32 flex flex-col justify-center min-h-[calc(100vh-88px)]">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Content */}
          <motion.div 
            className="flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-2xl mx-auto lg:mx-0"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-base/10 border border-primary-base/20 text-primary-cyan text-xs md:text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-cyan animate-pulse" />
              KhudSeKrle v2.0
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white mb-6 w-full">
              Stop guessing. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan via-primary-base to-primary-violet">
                Start debugging.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-base lg:text-lg text-text-muted leading-relaxed max-w-lg mb-8">
              KhudSeKrle uses AI to analyze your code, explain errors, guide you toward solutions, and help you become a better developer.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
              <Link to="/v2/debugger" className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold hover:scale-[1.02] transition-transform text-sm md:text-base shadow-xl">
                Start Debugging <ChevronRight className="w-4 h-4" />
              </Link>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-surface/50 border border-border hover:bg-surface transition-colors font-medium text-sm md:text-base">
                <Play className="w-4 h-4" /> Watch Demo
              </button>
            </motion.div>
            
            {/* Stats Group - Clean Horizontal Flex */}
            <motion.div variants={fadeIn} className="flex items-center justify-center lg:justify-start gap-8 lg:gap-12 w-full border-t border-border/50 pt-8">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white">10k+</span>
                <span className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wider font-semibold">Bugs Fixed</span>
              </div>
              <div className="w-px h-8 bg-border/50"></div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white">95%</span>
                <span className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wider font-semibold">Resolution</span>
              </div>
              <div className="w-px h-8 bg-border/50"></div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white">24/7</span>
                <span className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wider font-semibold">AI Mentor</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right 3D Visual - Contained properly */}
          <motion.div 
            className="w-full max-w-md lg:max-w-lg mx-auto relative aspect-square flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* The canvas takes up the full wrapper */}
            <AICoreCanvas state="idle" className="absolute inset-0 w-full h-full" />
            
            {/* Floating Status Cards - Positioned relative to this square wrapper, won't escape */}
            <div className="absolute top-[15%] -right-[5%] sm:-right-[10%] lg:-right-[20%] z-20 bg-surface/80 backdrop-blur-xl border border-border px-3 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 animate-float w-max max-w-[200px]" style={{ animationDelay: '0s' }}>
              <div className="w-8 h-8 rounded-full bg-error-base/20 flex items-center justify-center shrink-0">
                <Code className="w-4 h-4 text-error-base" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">TypeError</div>
                <div className="text-xs font-semibold text-white truncate">Cannot read properties</div>
              </div>
            </div>
            
            <div className="absolute bottom-[20%] -left-[5%] sm:-left-[10%] lg:-left-[10%] z-20 bg-surface/80 backdrop-blur-xl border border-border px-3 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 animate-float w-max max-w-[200px]" style={{ animationDelay: '1.5s' }}>
              <div className="w-8 h-8 rounded-full bg-success-base/20 flex items-center justify-center shrink-0">
                <Cpu className="w-4 h-4 text-success-base" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">AI Mentor</div>
                <div className="text-xs font-semibold text-white truncate">Root cause found</div>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
