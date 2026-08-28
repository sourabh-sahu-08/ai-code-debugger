import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertTriangle, Lightbulb, ChevronRight, CheckCircle2, Bot, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export default function AIAssistant({ analysisState, analysisData, onAnalyze }) {
  
  const StateIcon = {
    idle: Bot,
    analyzing: Sparkles,
    success: CheckCircle2,
    error: AlertTriangle
  }[analysisState] || Bot;

  return (
    <div className="flex flex-col h-full bg-surface-soft border-l border-border w-full md:w-[400px] lg:w-[450px] flex-shrink-0">
      
      <div className="h-12 flex items-center justify-between px-4 border-b border-border bg-surface">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-text" />
          <span className="text-sm font-bold text-text">AI Assistant</span>
        </div>
        {analysisState === 'success' && <Badge variant="outline" className="text-xs">Resolved</Badge>}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Idle State */}
        {analysisState === 'idle' && (
          <div className="flex flex-col items-center text-center mt-12 px-6">
            <div className="w-16 h-16 rounded-full bg-surface-hover border border-border flex items-center justify-center mb-6">
              <Bot className="w-8 h-8 text-text" />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">Ready to debug</h3>
            <p className="text-sm text-text-muted mb-6">
              Paste your broken code and hit analyze. I'll identify the root cause, explain it to you, and suggest a fix.
            </p>
            <Button onClick={onAnalyze} className="w-full" rightIcon={<Sparkles className="w-4 h-4" />}>
              Analyze Code
            </Button>
            <p className="text-xs text-text-muted mt-4">Shortcut: Ctrl/Cmd + Enter</p>
          </div>
        )}

        {/* Analyzing State */}
        {analysisState === 'analyzing' && (
          <div className="flex flex-col items-center text-center mt-20 px-6">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full border-2 border-primary-cyan border-t-transparent flex items-center justify-center mb-6"
            >
              <Sparkles className="w-6 h-6 text-text absolute" />
            </motion.div>
            <h3 className="text-lg font-bold text-text mb-2 animate-pulse">Analyzing logic...</h3>
            <p className="text-sm text-text-muted">Scanning for syntax errors, memory leaks, and anti-patterns.</p>
          </div>
        )}

        {/* Success / Result State */}
        {analysisState === 'success' && analysisData && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pb-6"
            >
              
              {/* Summary */}
              <div className="p-4 rounded-lg bg-surface border border-border">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${analysisData.severity === 'high' ? 'text-error-base' : 'text-warning-base'}`} />
                  <div>
                    <h4 className="font-bold text-text text-sm mb-1">{analysisData.summary}</h4>
                    <p className="text-xs text-text-muted">Lines {analysisData.affectedLines.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Root Cause */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Root Cause
                </h4>
                <div className="p-4 rounded-lg bg-background border border-border text-sm text-text leading-relaxed">
                  {analysisData.rootCause}
                </div>
              </div>

              {/* Learning / Explanation */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Explanation
                </h4>
                <div className="p-4 rounded-lg bg-background border border-border text-sm text-text-muted leading-relaxed">
                  {analysisData.explanation}
                </div>
              </div>

              {/* Fix Actions */}
              <div className="pt-4 border-t border-border/50">
                <Button className="w-full mb-3" rightIcon={<ChevronRight className="w-4 h-4" />}>
                  Preview Suggested Fix
                </Button>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Press <kbd className="bg-surface-strong px-1.5 py-0.5 rounded border border-border text-text">Alt</kbd> + <kbd className="bg-surface-strong px-1.5 py-0.5 rounded border border-border text-text">A</kbd> to apply directly</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        )}

      </div>
    </div>
  );
}
