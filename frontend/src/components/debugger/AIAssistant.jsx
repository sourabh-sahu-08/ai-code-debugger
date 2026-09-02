import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertTriangle, Lightbulb, ChevronRight, CheckCircle2, Bot, Info, CornerDownLeft } from 'lucide-react';

export default function AIAssistant({ analysisState, analysisData, onAnalyze, onApplyFix }) {
  const [prompt, setPrompt] = useState('');
  
  return (
    <div className="flex flex-col h-full w-full flex-shrink-0">
      
      <div className="h-[40px] flex items-center justify-between px-4 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F5F5F5]" />
          <span className="text-[12px] font-bold text-[#F5F5F5]">AI Assistant</span>
        </div>
        {analysisState === 'success' && <span className="text-[10px] text-[#10B981] border border-[#10B981]/30 bg-[#10B981]/10 px-2 py-0.5 rounded-full">Resolved</span>}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 flex flex-col">
        
        {/* Idle State */}
        {analysisState === 'idle' && (
          <div className="flex flex-col flex-1 text-left">
            <Sparkles className="w-6 h-6 text-[#F5F5F5] mb-4" />
            <h3 className="text-[15px] font-bold text-[#F5F5F5] mb-2">Ready to debug</h3>
            <p className="text-[13px] text-[#A1A1A1] mb-6 leading-relaxed">
              Paste your code or click Analyze. I'll identify errors, explain the problem, and suggest fixes.
            </p>
            
            <div className="h-[1px] w-full bg-[rgba(255,255,255,0.08)] mb-6" />
            
            <h4 className="text-[11px] uppercase tracking-widest font-semibold text-[#A1A1A1] mb-4">Capabilities</h4>
            <ul className="space-y-3">
              {['Error Detection', 'Code Explanation', 'Smart Fixes', 'Optimization'].map((cap, i) => (
                <li key={i} className="flex items-center gap-2 text-[13px] text-[#F5F5F5]">
                  <CheckCircle2 className="w-4 h-4 text-[#A1A1A1]" /> {cap}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Analyzing State */}
        {analysisState === 'analyzing' && (
          <div className="flex flex-col flex-1 text-left">
            <div className="flex items-center gap-2 mb-4 text-[#F5F5F5]">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <h3 className="text-[13px] font-bold uppercase tracking-widest">AI ANALYZING</h3>
            </div>
            
            <h4 className="text-[15px] text-[#F5F5F5] font-medium mb-6">Understanding your code</h4>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[13px] text-[#F5F5F5]">
                <div className="w-2 h-2 rounded-full bg-[#10B981]" /> Reading structure
              </li>
              <li className="flex items-center gap-3 text-[13px] text-[#F5F5F5]">
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" /> Detecting potential issues
              </li>
              <li className="flex items-center gap-3 text-[13px] text-[#A1A1A1]">
                <div className="w-2 h-2 rounded-full border border-[#A1A1A1]" /> Generating explanation
              </li>
              <li className="flex items-center gap-3 text-[13px] text-[#A1A1A1]">
                <div className="w-2 h-2 rounded-full border border-[#A1A1A1]" /> Preparing fix
              </li>
            </ul>
          </div>
        )}

        {/* Success / Result State */}
        {analysisState === 'success' && analysisData && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pb-6 flex flex-col flex-1"
            >
              <h3 className="text-[13px] font-bold uppercase tracking-widest text-[#F5F5F5] mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI Analysis
              </h3>
              
              {/* Summary */}
              <div>
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${analysisData.severity === 'high' ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`} />
                  <h4 className="font-semibold text-[#F5F5F5] text-[14px]">{analysisData.summary}</h4>
                </div>
                <p className="text-[13px] text-[#A1A1A1] pl-6 leading-relaxed">
                  {analysisData.rootCause}
                </p>
              </div>

              <div className="h-[1px] w-full bg-[rgba(255,255,255,0.08)]" />

              {/* Learning / Explanation */}
              <div>
                <h4 className="text-[12px] font-semibold text-[#A1A1A1] mb-2">Why this happens</h4>
                <p className="text-[13px] text-[#F5F5F5] leading-relaxed">
                  {analysisData.explanation}
                </p>
              </div>

              <div className="h-[1px] w-full bg-[rgba(255,255,255,0.08)]" />

              {/* Fix Actions */}
              <div>
                <h4 className="text-[12px] font-semibold text-[#A1A1A1] mb-3">Suggested Fix</h4>
                
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-md p-3 mb-3">
                   <p className="text-[12px] font-mono text-[#F5F5F5] opacity-50 text-center">Preview available</p>
                </div>

                <div className="flex gap-2">
                  <button onClick={onApplyFix} className="flex-1 bg-white text-black text-[13px] font-medium py-2 rounded-md hover:bg-[#E5E5E5] transition-colors">
                    Apply Fix
                  </button>
                  <button onClick={() => navigator.clipboard.writeText(analysisData?.suggestedFix || '')} className="px-4 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#F5F5F5] text-[13px] font-medium py-2 rounded-md hover:bg-[rgba(255,255,255,0.08)] transition-colors">
                    Copy
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        )}

      </div>
      
      {/* Input box pinned to bottom */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.01)] mt-auto">
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask AI about your code..."
            className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[13px] text-[#F5F5F5] rounded-md pl-3 pr-24 py-2.5 focus:outline-none focus:border-[rgba(255,255,255,0.16)] placeholder-[#A1A1A1] transition-colors"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAnalyze(prompt);
                setPrompt('');
              }
            }}
          />
          <div className="absolute right-2 flex items-center gap-1.5 opacity-60">
            <span className="text-[10px] font-medium text-[#A1A1A1]">⌘ Enter</span>
            <button onClick={() => { onAnalyze(prompt); setPrompt(''); }} className="p-1 bg-white/10 rounded hover:bg-white/20 text-[#F5F5F5] transition-colors">
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
