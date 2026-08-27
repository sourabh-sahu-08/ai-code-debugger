import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { Play, Sparkles, MessageSquare, AlertCircle, Copy, Check, RotateCcw, Download } from 'lucide-react';
import { handleEditorWillMount, EDITOR_THEME_NAME } from '../../../utils/editorTheme';
import { motion, AnimatePresence } from 'framer-motion';

export default function CodeWorkspace({ initialCode = "", initialLanguage = "javascript" }) {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(initialLanguage);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  
  // Modes: 'quick', 'explain', 'learning', 'mentor'
  const [mode, setMode] = useState('quick');

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAiResponse(null);
    
    // Simulate API call for now (Phase 2 UI only)
    setTimeout(() => {
      setAiResponse({
        problemDetected: "TypeError: Cannot read properties of undefined (reading 'map')",
        severity: "high",
        affectedLines: "Line 12-14",
        rootCause: "The 'users' array is undefined because the API call failed but was not caught, causing the map function to crash.",
        suggestedFix: "Add optional chaining (?.) or a fallback empty array before calling map.",
        codeComparison: code.replace("users.map", "users?.map")
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="flex w-full h-full">
      
      {/* Left: Code Editor Pane */}
      <div className="flex-1 flex flex-col border-r border-border bg-background-alt relative">
        {/* Editor Header */}
        <div className="h-12 border-b border-border/50 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-surface border border-border rounded-md px-2 py-1 text-sm text-text outline-none focus:border-primary-cyan"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            <div className="flex items-center gap-2">
              {/* File Tabs Mock */}
              <div className="px-3 py-1 bg-surface-strong text-text rounded-t-md border-t border-x border-border text-xs flex items-center gap-2">
                main.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : 'ts'}
                <button className="hover:text-error-base text-text-muted">&times;</button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-text-muted hover:text-white rounded-md hover:bg-surface-soft transition-colors" title="Format">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-text-muted hover:text-white rounded-md hover:bg-surface-soft transition-colors" title="Download">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 overflow-hidden relative">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(val) => setCode(val || "")}
            beforeMount={handleEditorWillMount}
            theme={EDITOR_THEME_NAME}
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              minimap: { enabled: false },
              wordWrap: "on",
              lineNumbers: "on",
              padding: { top: 16 },
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              smoothScrolling: true,
            }}
          />
        </div>
      </div>

      {/* Right: AI Assistant Pane */}
      <div className="w-[450px] shrink-0 flex flex-col bg-background relative z-10 shadow-2xl">
        {/* AI Header */}
        <div className="h-14 border-b border-border/50 flex items-center justify-between px-5 bg-surface-strong/30 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-violet" />
            <span className="font-semibold tracking-tight text-white">AI Debug Core</span>
          </div>
          <div className="flex items-center gap-1 bg-surface border border-border p-1 rounded-lg">
            {['quick', 'explain', 'mentor'].map(m => (
              <button 
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${mode === m ? 'bg-primary-base/20 text-primary-cyan' : 'text-text-muted hover:text-white hover:bg-surface-soft'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* AI Content Area */}
        <div className="flex-1 overflow-y-auto p-5 no-scrollbar flex flex-col gap-4">
          
          {/* Welcome / Empty State */}
          {!isAnalyzing && !aiResponse && (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
              <Terminal className="w-12 h-12 text-primary-cyan/50 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Ready to Analyze</h3>
              <p className="text-sm text-text-muted max-w-[250px]">Paste your code in the editor and click Analyze to let the AI find bugs and suggest fixes.</p>
            </div>
          )}

          {/* Analyzing State */}
          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-6">
              <div className="w-24 h-24 relative flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-primary-cyan/20 border-t-primary-cyan rounded-full animate-spin"></div>
                <Sparkles className="w-8 h-8 text-primary-cyan animate-pulse" />
              </div>
              <div className="text-primary-cyan font-medium animate-pulse">Running Diagnostic Core...</div>
            </div>
          )}

          {/* Response State */}
          <AnimatePresence>
            {!isAnalyzing && aiResponse && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                {/* Problem Card */}
                <div className="border border-error-base/30 bg-error-base/5 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-error-base"></div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-error-base shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-error-base mb-1">Issue Detected</h4>
                      <p className="text-sm text-text">{aiResponse.problemDetected}</p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-text-muted">
                        <span className="px-2 py-1 bg-black/40 rounded border border-border">Severity: {aiResponse.severity}</span>
                        <span className="px-2 py-1 bg-black/40 rounded border border-border">{aiResponse.affectedLines}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Root Cause Card */}
                <div className="border border-border bg-surface rounded-xl p-4">
                  <h4 className="text-xs eyebrow mb-2 text-primary-cyan">Root Cause</h4>
                  <p className="text-sm text-text-subtle leading-relaxed">{aiResponse.rootCause}</p>
                </div>

                {/* Suggested Fix Card */}
                <div className="border border-border bg-surface rounded-xl p-4">
                  <h4 className="text-xs eyebrow mb-2 text-success-base">Suggested Fix</h4>
                  <p className="text-sm text-text-subtle mb-3">{aiResponse.suggestedFix}</p>
                  
                  {/* Diff / Code Block Mock */}
                  <div className="relative rounded-lg overflow-hidden border border-border">
                    <div className="bg-black/60 px-3 py-1.5 flex items-center justify-between border-b border-border text-xs text-text-muted">
                      <span>fix.{language === 'python' ? 'py' : 'js'}</span>
                      <button className="hover:text-white"><Copy className="w-3.5 h-3.5" /></button>
                    </div>
                    <pre className="p-3 text-xs font-mono text-green-400 bg-black/40 overflow-x-auto">
                      <code>{aiResponse.codeComparison}</code>
                    </pre>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Action Footer */}
        <div className="p-4 border-t border-border/50 bg-background flex flex-col gap-3">
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || code.length === 0}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary-base hover:bg-primary-electric disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
          >
            {isAnalyzing ? (
              <span className="animate-pulse flex items-center gap-2"><Sparkles className="w-4 h-4" /> Analyzing...</span>
            ) : (
              <><Play className="w-4 h-4" /> Analyze Code</>
            )}
          </button>
          
          {/* Chat Input Box */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask a follow-up question..." 
              className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text outline-none focus:border-primary-cyan transition-colors"
            />
            <MessageSquare className="w-4 h-4 text-text-muted absolute left-3 top-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
