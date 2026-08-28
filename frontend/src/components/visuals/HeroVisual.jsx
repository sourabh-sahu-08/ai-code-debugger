import React from 'react';
import { motion } from 'framer-motion';
import { FileCode2, Bot, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function HeroVisual() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center pointer-events-none">
      
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-primary-base/5 rounded-full blur-[100px]" />
      
      {/* Main Code Editor Window Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-[90%] max-w-[500px] glass-card rounded-xl border border-border shadow-2xl overflow-hidden bg-surface"
      >
        {/* Fake Window Header */}
        <div className="h-10 bg-surface-soft border-b border-border flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-error-base/80" />
            <div className="w-3 h-3 rounded-full bg-warning-base/80" />
            <div className="w-3 h-3 rounded-full bg-success-base/80" />
          </div>
          <div className="flex-1 flex justify-center text-xs text-text-muted font-medium">
            <FileCode2 className="w-3 h-3 mr-1" />
            <span>App.jsx</span>
          </div>
        </div>
        
        {/* Fake Code Content */}
        <div className="p-6 font-mono text-sm leading-relaxed text-text">
          <div className="flex">
            <span className="w-6 text-text-muted select-none">1</span>
            <span><span className="text-primary-base">import</span> React, {'{'} useState {'}'} <span className="text-primary-base">from</span> <span className="text-success-base">'react'</span>;</span>
          </div>
          <div className="flex mt-2">
            <span className="w-6 text-text-muted select-none">2</span>
            <span><span className="text-primary-base">function</span> App() {'{'}</span>
          </div>
          <div className="flex relative">
            <span className="w-6 text-text-muted select-none">3</span>
            <span>&nbsp;&nbsp;<span className="text-primary-base">const</span> [data, setData] = useState(<span className="text-primary-base">null</span>);</span>
          </div>
          <motion.div 
            initial={{ backgroundColor: 'rgba(239, 68, 68, 0)' }}
            animate={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex relative my-1 rounded border-l-2 border-error-base -mx-2 px-2 py-1"
          >
            <span className="w-6 text-text-muted select-none">4</span>
            <span className="line-through text-text-muted">&nbsp;&nbsp;console.log(undefinedVariable);</span>
          </motion.div>
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex relative my-1 rounded border-l-2 border-success-base -mx-2 px-2 py-1 bg-success-base/10 text-success-base"
          >
            <span className="w-6 text-success-base/50 select-none">+</span>
            <span>&nbsp;&nbsp;console.log(data);</span>
          </motion.div>
          <div className="flex">
            <span className="w-6 text-text-muted select-none">5</span>
            <span>&nbsp;&nbsp;<span className="text-primary-base">return</span> {'<'}div{'>'}Hello World{'</'}div{'>'};</span>
          </div>
          <div className="flex">
            <span className="w-6 text-text-muted select-none">6</span>
            <span>{'}'}</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[0%] z-20 glass-card px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-border bg-surface"
      >
        <div className="w-8 h-8 rounded-full bg-error-soft flex items-center justify-center text-error-base">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-text">ReferenceError</p>
          <p className="text-[10px] text-text-muted">undefinedVariable is not defined</p>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] left-[-5%] z-20 glass-card px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-border bg-surface"
      >
        <div className="w-8 h-8 rounded-full bg-success-soft flex items-center justify-center text-success-base">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-text">AI Fix Applied</p>
          <p className="text-[10px] text-text-muted">Replaced with valid variable</p>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[50%] right-[-10%] z-0 glass-card px-3 py-2 rounded-full shadow-lg flex items-center gap-2 border border-border bg-surface"
      >
        <Bot className="w-4 h-4 text-primary-base" />
        <span className="text-xs font-semibold text-text">Analyzing</span>
      </motion.div>

    </div>
  );
}
