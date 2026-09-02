import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, Sparkles, BrainCircuit, Code2, 
  ArrowRight, ShieldAlert, Cpu, Activity, CheckCircle2,
  Zap, RefreshCw, MessageSquare
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Landing.css';

const InteractiveBackground = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  const scrollRef = useRef({
    lastY: 0,
    lastTime: performance.now(),
    velocity: 0,
    targetRate: 0.2,
    currentRate: 0.2
  });
  
  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0
  });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    scrollRef.current.lastY = window.scrollY;
    
    const handleScroll = () => {
      if (isMobile) return;
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = now - scrollRef.current.lastTime;
      
      if (dt > 0) {
        const dy = Math.abs(currentY - scrollRef.current.lastY);
        const vel = dy / dt; 
        scrollRef.current.velocity = vel;
      }
      
      scrollRef.current.lastY = currentY;
      scrollRef.current.lastTime = now;
    };

    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let rAF;
    
    const loop = () => {
      if (!isMobile && videoRef.current) {
        const s = scrollRef.current;
        const m = mouseRef.current;
        
        s.velocity *= 0.92; // Decay
        
        let target = 0.2 + s.velocity * 0.8;
        if (target > 2.0) target = 2.0;
        if (target < 0.2) target = 0.2;
        
        s.targetRate = target;
        s.currentRate += (s.targetRate - s.currentRate) * 0.1;
        
        if (Math.abs(videoRef.current.playbackRate - s.currentRate) > 0.05) {
          try {
            videoRef.current.playbackRate = s.currentRate;
          } catch(e) {}
        }
        
        m.currentX += (m.targetX - m.currentX) * 0.05;
        m.currentY += (m.targetY - m.currentY) * 0.05;
        
        if (containerRef.current) {
          const shiftX = m.currentX * -15;
          const shiftY = m.currentY * -15;
          containerRef.current.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0) scale(1.05)`;
        }
      } else if (isMobile && videoRef.current) {
        if (videoRef.current.playbackRate !== 0.5) {
          try { videoRef.current.playbackRate = 0.5; } catch(e) {}
        }
      }
      rAF = requestAnimationFrame(loop);
    };

    rAF = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rAF);
    };
  }, []);

  return (
    <div className="landing-video-wrapper">
      <div ref={containerRef} className="w-full h-full will-change-transform" style={{ transform: 'scale(1.05)' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="landing-video"
        >
          <source src="/bg-optimized.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="video-overlay" />
      <div className="ambient-glow-layer">
        <div className="landing-blob blob-1"></div>
        <div className="landing-blob blob-2"></div>
        <div className="landing-blob blob-3"></div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-5xl rounded-full px-6 py-3 flex items-center justify-between ${scrolled ? 'glass-pill bg-[#050505]/60' : 'bg-transparent'}`}
    >
      <div className="flex items-center gap-2">
        <Terminal className="w-5 h-5 text-white" />
        <span className="font-bold text-lg tracking-tight text-white">KhudSeKrle</span>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] ml-1"
        />
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A1A1AA]">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#demo" className="hover:text-white transition-colors">How It Works</a>
        <a href="#" className="hover:text-white transition-colors">About</a>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/auth/login" className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors hidden sm:block">
          Sign In
        </Link>
        <Link to="/auth/register" className="glass-button-primary px-5 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2">
          Get Started
        </Link>
      </div>
    </motion.nav>
  );
};

const HeroCodeWindow = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      className="relative z-10 w-full max-w-3xl mx-auto mt-16 lg:mt-24"
    >
      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-8 -right-8 lg:-right-16 z-20 glass-panel px-4 py-3 rounded-2xl flex items-center gap-3"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-[#7C3AED]/20 flex items-center justify-center">
            <Activity className="w-4 h-4 text-[#7C3AED]" />
          </div>
          <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
        </div>
        <div>
          <p className="text-xs font-bold text-white">AI ANALYZING</p>
          <p className="text-[10px] text-[#A1A1AA]">Processing AST...</p>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-6 -left-8 lg:-left-12 z-20 glass-panel px-4 py-3 rounded-2xl flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full bg-[#EF4444]/20 flex items-center justify-center">
          <ShieldAlert className="w-4 h-4 text-[#EF4444]" />
        </div>
        <div>
          <p className="text-xs font-bold text-white">1 Issue Detected</p>
          <p className="text-[10px] text-[#A1A1AA]">ReferenceError line 4</p>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-16 z-0 flex-col gap-2 opacity-30 text-[#A1A1AA] font-mono text-xl"
      >
        <span>{'{ }'}</span>
        <span>{'</>'}</span>
      </motion.div>

      {/* Main Window */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(124,58,237,0.05)] to-[rgba(37,99,235,0.05)] pointer-events-none" />
        
        {/* Header */}
        <div className="h-12 bg-black/40 border-b border-[rgba(255,255,255,0.05)] flex items-center px-4 justify-between backdrop-blur-md relative z-10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
            <div className="w-3 h-3 rounded-full bg-[#22C55E]/80" />
          </div>
          <div className="flex-1 flex justify-center items-center gap-2 text-xs text-[#A1A1AA] font-medium font-mono">
            <Code2 className="w-3.5 h-3.5" />
            buggy-code.js
          </div>
          <div className="w-12" /> {/* Spacer for balance */}
        </div>

        {/* Code Content */}
        <div className="p-6 font-mono text-sm leading-relaxed text-[#A1A1AA] relative z-10 bg-[#0A0A0F]/60">
          <div className="flex"><span className="w-8 opacity-30 select-none">1</span><span><span className="text-[#7C3AED]">function</span> <span className="text-[#2563EB]">calculateTotal</span>(items) {'{'}</span></div>
          <div className="flex"><span className="w-8 opacity-30 select-none">2</span><span>&nbsp;&nbsp;<span className="text-[#7C3AED]">let</span> total;</span></div>
          <div className="flex"><span className="w-8 opacity-30 select-none">3</span><span></span></div>
          
          <motion.div 
            initial={{ backgroundColor: 'rgba(239, 68, 68, 0)' }}
            animate={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
            transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="flex relative my-1 rounded border-l-2 border-[#EF4444] -mx-2 px-2 py-1"
          >
            <span className="w-8 text-[#EF4444]/50 select-none">4</span>
            <span className="text-white">&nbsp;&nbsp;items.<span className="text-[#2563EB]">forEach</span>(item =&gt; {'{'}</span>
          </motion.div>
          <motion.div 
            initial={{ backgroundColor: 'rgba(239, 68, 68, 0)' }}
            animate={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
            transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="flex relative rounded border-l-2 border-[#EF4444] -mx-2 px-2 py-1"
          >
            <span className="w-8 text-[#EF4444]/50 select-none">5</span>
            <span className="text-[#EF4444]">&nbsp;&nbsp;&nbsp;&nbsp;total += item.price;</span>
          </motion.div>
          
          <div className="flex"><span className="w-8 opacity-30 select-none">6</span><span>&nbsp;&nbsp;{'}'});</span></div>
          <div className="flex"><span className="w-8 opacity-30 select-none">7</span><span></span></div>
          <div className="flex"><span className="w-8 opacity-30 select-none">8</span><span>&nbsp;&nbsp;<span className="text-[#7C3AED]">return</span> total;</span></div>
          <div className="flex"><span className="w-8 opacity-30 select-none">9</span><span>{'}'}</span></div>

          {/* AI Overlay Suggestion */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
            className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.05)]"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">AI Analysis</span>
            </div>
            <p className="text-sm text-[#A1A1AA] mb-4 bg-black/30 p-3 rounded-lg border border-[rgba(255,255,255,0.02)]">
              Variable <code className="text-[#EF4444]">total</code> is undefined before accumulation, resulting in <code className="text-white">NaN</code>. Initialize it to <code className="text-[#22C55E]">0</code>.
            </p>
            <div className="flex items-center justify-between bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] p-3 rounded-lg">
              <code className="text-[#22C55E] text-sm"><span className="text-white/50 mr-2">2</span>let total = 0;</code>
              <button className="text-xs bg-[#22C55E]/20 text-[#22C55E] px-3 py-1.5 rounded hover:bg-[#22C55E]/30 transition-colors flex items-center gap-1 font-sans font-medium">
                <CheckCircle2 className="w-3 h-3" /> Apply Fix
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesGrid = () => {
  return (
    <section id="features" className="w-full max-w-7xl mx-auto px-6 py-32 relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
          Intelligent tools for <br className="hidden sm:block"/>
          <span className="text-gradient-accent">modern developers.</span>
        </h2>
        <p className="text-[#A1A1AA] max-w-2xl mx-auto text-lg">
          A powerful suite of AI debugging capabilities designed to seamlessly integrate into your workflow without slowing you down.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        
        {/* Bento Item 1 - Large */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-3xl p-8 md:col-span-2 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/0 to-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">AI Code Analysis</h3>
            <p className="text-[#A1A1AA] max-w-md text-base leading-relaxed">
              Deep semantic understanding of your entire codebase. Instantly identify edge cases, logic errors, and hidden bugs before they hit production.
            </p>
          </div>
        </motion.div>

        {/* Bento Item 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel rounded-3xl p-8 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/0 to-[#2563EB]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Smart Debugging</h3>
            <p className="text-[#A1A1AA] text-sm">
              Find errors faster with context-aware, highly accurate intelligent suggestions.
            </p>
          </div>
        </motion.div>

        {/* Bento Item 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-panel rounded-3xl p-8 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Instant Explanations</h3>
            <p className="text-[#A1A1AA] text-sm">
              Don't just fix it—understand why it broke with plain English reasoning.
            </p>
          </div>
        </motion.div>

        {/* Bento Item 4 - Large */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-panel rounded-3xl p-8 md:col-span-2 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#7C3AED]/20 transition-colors duration-500" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Code Optimization</h3>
            <p className="text-[#A1A1AA] max-w-md text-base leading-relaxed">
              Refactor messy code automatically. Improve algorithmic performance, clean up technical debt, and ensure adherence to best practices.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const InteractiveDemo = () => {
  return (
    <section id="demo" className="w-full max-w-5xl mx-auto px-6 py-24 relative z-10">
      <div className="glass-panel rounded-[2.5rem] p-1 border border-white/10 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/10 to-transparent opacity-50" />
        <div className="bg-[#050505]/80 backdrop-blur-3xl rounded-[2.25rem] p-8 md:p-16 text-center relative z-10">
          <Badge text="HOW IT WORKS" />
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-12 text-white">From error to optimized in seconds.</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
            
            <div className="flex-1 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mb-4">
                <Code2 className="w-7 h-7 text-[#A1A1AA]" />
              </div>
              <h4 className="font-semibold text-white mb-2">1. Paste Code</h4>
              <p className="text-sm text-[#A1A1AA]">Input your buggy or unoptimized logic.</p>
            </div>

            <div className="hidden md:block w-24 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent relative">
              <motion.div 
                animate={{ x: [0, 96] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-[#7C3AED] shadow-[0_0_10px_#7C3AED]"
              />
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl glass-panel border-[#7C3AED]/30 flex items-center justify-center mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#7C3AED]/10 animate-pulse" />
                <BrainCircuit className="w-7 h-7 text-[#7C3AED] relative z-10" />
              </div>
              <h4 className="font-semibold text-white mb-2">2. AI Processing</h4>
              <p className="text-sm text-[#A1A1AA]">Neural engines analyze syntax & semantics.</p>
            </div>

            <div className="hidden md:block w-24 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent relative">
               <motion.div 
                animate={{ x: [0, 96] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-[#2563EB] shadow-[0_0_10px_#2563EB]"
              />
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl glass-panel border-[#2563EB]/30 flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 bg-[#2563EB]/10 rounded-2xl" />
                <CheckCircle2 className="w-7 h-7 text-[#2563EB] relative z-10" />
              </div>
              <h4 className="font-semibold text-white mb-2">3. Fixed Result</h4>
              <p className="text-sm text-[#A1A1AA]">Get clean, working code with explanations.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const Badge = ({ text }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 glass-panel shadow-sm mx-auto"
  >
    <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
    <span className="text-[11px] font-semibold tracking-widest text-[#A1A1AA]">{text}</span>
  </motion.div>
);

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="dark-landing">
      <InteractiveBackground />
      <Navbar />

      <main className="flex-1 flex flex-col relative z-10 pt-32 pb-16">
        
        {/* Hero Section */}
        <section className="relative w-full max-w-[1920px] mx-auto px-6 lg:px-12 pt-12 pb-24 flex flex-col items-center justify-center min-h-[90vh]">
          
          <motion.div style={{ y, opacity }} className="text-center flex flex-col items-center w-full max-w-4xl mx-auto z-20">
            <Badge text="AI POWERED CODE INTELLIGENCE" />
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mt-8 mb-6 leading-[1.05]"
            >
              <span className="text-white block">Debug smarter.</span>
              <span className="text-white block">Build faster.</span>
              <span className="text-gradient block mt-1 pb-2">Code without limits.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-[#A1A1AA] mb-10 max-w-2xl leading-relaxed font-light"
            >
              KhudSeKrle uses intelligent AI to analyze, understand, and help you fix your code — turning frustrating debugging sessions into effortless problem solving.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link to="/auth/register" className="w-full sm:w-auto">
                <button className="glass-button-primary w-full sm:w-auto text-base px-8 py-3.5 rounded-full flex items-center justify-center text-white font-medium group">
                  Start Debugging
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href="#features" className="w-full sm:w-auto">
                <button className="glass-button-secondary w-full sm:w-auto text-base px-8 py-3.5 rounded-full flex items-center justify-center text-white font-medium">
                  Explore Features
                </button>
              </a>
            </motion.div>
          </motion.div>

          <HeroCodeWindow />

        </section>

        <FeaturesGrid />
        
        <InteractiveDemo />

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-[#050505] pt-12 pb-8 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 opacity-50">
            <Terminal className="w-5 h-5 text-white" />
            <span className="font-bold text-lg text-white tracking-tight">KhudSeKrle</span>
          </div>
          <p className="text-sm text-[#A1A1AA]/70">
            &copy; {new Date().getFullYear()} KhudSeKrle. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
