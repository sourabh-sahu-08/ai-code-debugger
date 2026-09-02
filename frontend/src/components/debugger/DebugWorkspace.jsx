import React, { useState } from 'react';
import FileExplorer from './FileExplorer';
import CodeEditor from './CodeEditor';
import AIAssistant from './AIAssistant';
import { analyzeService } from '../../services/analyzeService';
import { useToast } from '../../contexts/ToastContext';

const initialFiles = [
  {
    id: '1',
    name: 'App.jsx',
    language: 'javascript',
    content: `import React, { useState, useEffect } from 'react';\n\nfunction App() {\n  const [data, setData] = useState(null);\n\n  useEffect(() => {\n    fetch('/api/data')\n      .then(res => res.json())\n      .then(setData);\n  }); // Missing dependency array!\n\n  return (\n    <div>{data ? data.name : 'Loading...'}</div>\n  );\n}\n\nexport default App;`
  }
];

export default function DebugWorkspace() {
  const { showToast } = useToast();
  const [files, setFiles] = useState(initialFiles);
  const [activeFileId, setActiveFileId] = useState('1');
  const [analysisState, setAnalysisState] = useState('idle'); // 'idle' | 'analyzing' | 'success' | 'error'
  const [analysisData, setAnalysisData] = useState(null);

  const activeFile = files.find(f => f.id === activeFileId);

  const handleEditorChange = (id, newContent) => {
    setFiles(files.map(f => f.id === id ? { ...f, content: newContent } : f));
  };

  const handleAnalyze = async (code) => {
    if (!code.trim()) {
      showToast('Please provide some code to analyze', 'warning');
      return;
    }
    
    setAnalysisState('analyzing');
    
    try {
      const data = await analyzeService.analyzeCode(code, activeFile?.language || 'javascript', 'quick-fix');
      setAnalysisData(data.data);
      setAnalysisState('success');
      showToast('Analysis complete', 'success');
    } catch (error) {
      console.error(error);
      setAnalysisState('error');
      showToast(error.message || 'Analysis failed', 'error');
    }
  };

  // Dynamic glow color based on analysis state
  const getGlowColor = () => {
    switch (analysisState) {
      case 'analyzing': return 'shadow-[0_0_30px_-5px_rgba(37,99,235,0.2)] border-primary-base/20';
      case 'error': return 'shadow-[0_0_30px_-5px_rgba(239,68,68,0.2)] border-error-base/20';
      case 'success': return 'shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)] border-success-base/20';
      default: return 'shadow-sm border-border';
    }
  };

  return (
    <div className="flex h-[calc(100vh-88px)] w-full bg-background overflow-hidden relative p-4 gap-4">
      
      {/* File Explorer (Left Panel) - Glass styling */}
      <div className="h-full z-10 hidden md:block rounded-xl overflow-hidden glass-card shadow-lg flex-shrink-0">
        <FileExplorer 
          files={files} 
          activeFile={activeFileId} 
          onSelectFile={setActiveFileId} 
        />
      </div>
      
      {/* Editor Center Stage */}
      <div className={`flex flex-col flex-1 h-full min-w-0 z-10 rounded-xl overflow-hidden bg-surface/50 backdrop-blur-2xl border transition-all duration-700 ${getGlowColor()}`}>
        
        {/* Editor Toolbar / Frame Header */}
        <div className="h-12 bg-surface-strong/50 border-b border-border flex items-center px-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 px-3 mr-4">
            <div className="w-3 h-3 rounded-full bg-error-base/80" />
            <div className="w-3 h-3 rounded-full bg-warning-base/80" />
            <div className="w-3 h-3 rounded-full bg-success-base/80" />
          </div>
          {files.map(file => (
            <button
              key={file.id}
              onClick={() => setActiveFileId(file.id)}
              className={`px-5 h-[80%] rounded-md flex items-center text-sm min-w-[120px] transition-all duration-300 font-medium ${activeFileId === file.id ? 'bg-surface/60 shadow-sm text-text border border-border' : 'text-text-muted hover:bg-surface-hover hover:text-text border border-transparent'}`}
            >
              {file.name}
            </button>
          ))}
        </div>

        {/* Monaco Instance */}
        <div className="flex-1 bg-transparent relative z-0">
          <CodeEditor 
            file={activeFile} 
            onChange={handleEditorChange} 
            onAnalyze={handleAnalyze} 
          />
        </div>
      </div>

      {/* AI Assistant (Right Panel) */}
      <div className="h-full z-10 hidden lg:block rounded-xl overflow-hidden bg-surface/50 backdrop-blur-2xl border border-border shadow-lg flex-shrink-0 relative">
        <AIAssistant 
          analysisState={analysisState} 
          analysisData={analysisData}
          onAnalyze={() => handleAnalyze(activeFile?.content)}
        />
      </div>
    </div>
  );
}
