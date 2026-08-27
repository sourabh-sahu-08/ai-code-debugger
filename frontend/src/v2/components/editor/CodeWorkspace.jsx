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
    <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
      
      {/* Left: Code Editor Pane */}
      <div className="flex-1 flex flex-col min-h-[50vh] md:min-h-0 border-b md:border-b-0 md:border-r border-border bg-background-alt relative z-0">
        {/* Editor Header */}
        <div className="h-12 border-b border-border/50 flex items-center justify-between px-3 md:px-4 shrink-0">
          <div className="flex items-center gap-3">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-surface border border-border rounded-md px-2 py-1 text-xs md:text-sm text-text outline-none focus:border-primary-cyan transition-colors"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            <div className="flex items-center gap-2">
              {/* File Tabs Mock */}
              <div className="px-3 py-1 bg-surface-strong text-text rounded-t-md border-t border-x border-border text-xs flex items-center gap-2 mt-2">
                main.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : 'ts'}
                <button className="hover:text-error-base text-text-muted transition-colors">&times;</button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <button className="p-1.5 text-text-muted hover:text-white rounded-md hover:bg-surface-soft transition-colors" title="Format">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-text-muted hover:text-white rounded-md hover:bg-surface-soft transition-colors" title="Download">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 relative overflow-hidden">
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
              scrollBeyondLastLine: false
            }}
          />
        </div>
      </div>

      {/* Right: AI Assistant Pane */}
      <div className="w-full md:w-[400px] lg:w-[450px] shrink-0 flex flex-col bg-background relative z-10 md:shadow-2xl h-[50vh] md:h-full border-t md:border-t-0 border-border">
        {/* AI Header */}
        <div className="h-14 border-b border-border/50 flex items-center justify-between px-4 md:px-5 bg-surface-strong/30 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary-violet" />
            <span className="font-semibold tracking-tight text-white text-sm md:text-base">AI Debug Core</span>
          </div>
          <div className="flex items-center bg-surface border border-border p-0.5 md:p-1 rounded-lg">
            {['quick', 'explain', 'mentor'].map(m => (
              <button 
                key={m}
                onClick={() => setMode(m)}
                className={`px-2 md:px-3 py-1 rounded-md text-[10px] md:text-xs font-medium capitalize transition-all ${mode === m ? 'bg-primary-base/20 text-primary-cyan' : 'text-text-muted hover:text-white hover:bg-surface-soft'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* AI Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 no-scrollbar flex flex-col gap-4">
          
          {/* Welcome / Empty State */}
          {!isAnalyzing && !aiResponse && (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-70 px-4">
              <Terminal className="w-10 h-10 md:w-12 md:h-12 text-primary-cyan/50 mb-4" />
              <h3 className="text-base md:text-lg font-medium text-white mb-2">Ready to Analyze</h3>
              <p className="text-xs md:text-sm text-text-muted max-w-[250px] leading-relaxed">Paste your code in the editor and click Analyze to let the AI find bugs and suggest fixes.</p>
            </div>
          )}

          {/* Analyzing State */}
          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 relative flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-primary-cyan/20 border-t-primary-cyan rounded-full animate-spin"></div>
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary-cyan animate-pulse" />
              </div>
              <div className="text-sm md:text-base text-primary-cyan font-medium animate-pulse">Running Diagnostic Core...</div>
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
                    <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-error-base shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs md:text-sm font-semibold text-error-base mb-1">Issue Detected</h4>
                      <p className="text-xs md:text-sm text-text leading-relaxed">{aiResponse.problemDetected}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-3 text-[10px] md:text-xs text-text-muted">
                        <span className="px-2 py-1 bg-black/40 rounded border border-border flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-error-base"></span>
                          Severity: {aiResponse.severity}
                        </span>
                        <span className="px-2 py-1 bg-black/40 rounded border border-border">{aiResponse.affectedLines}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Root Cause Card */}
                <div className="border border-border bg-surface rounded-xl p-4">
                  <h4 className="text-[10px] md:text-xs eyebrow mb-2 text-primary-cyan">Root Cause</h4>
                  <p className="text-xs md:text-sm text-text-subtle leading-relaxed">{aiResponse.rootCause}</p>
                </div>

                {/* Suggested Fix Card */}
                <div className="border border-border bg-surface rounded-xl p-4">
                  <h4 className="text-[10px] md:text-xs eyebrow mb-2 text-success-base">Suggested Fix</h4>
                  <p className="text-xs md:text-sm text-text-subtle mb-3 leading-relaxed">{aiResponse.suggestedFix}</p>
                  
                  {/* Diff / Code Block Mock */}
                  <div className="relative rounded-lg overflow-hidden border border-border bg-black/40">
                    <div className="bg-black/60 px-3 py-2 flex items-center justify-between border-b border-border text-[10px] md:text-xs text-text-muted">
                      <span>fix.{language === 'python' ? 'py' : 'js'}</span>
                      <button className="hover:text-white transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                    </div>
                    <pre className="p-3 text-[10px] md:text-xs font-mono text-green-400 overflow-x-auto whitespace-pre-wrap word-break">
                      <code>{aiResponse.codeComparison}</code>
                    </pre>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Action Footer */}
        <div className="p-3 md:p-4 border-t border-border/50 bg-background flex flex-col gap-3 shrink-0">
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || code.length === 0}
            className="w-full flex items-center justify-center gap-2 py-2.5 md:py-3 bg-primary-base hover:bg-primary-electric disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm md:text-base font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
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
              className="w-full bg-surface border border-border rounded-lg pl-9 pr-4 py-2 md:py-2.5 text-xs md:text-sm text-text outline-none focus:border-primary-cyan transition-colors"
            />
            <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4 text-text-muted absolute left-3 top-2.5 md:top-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
