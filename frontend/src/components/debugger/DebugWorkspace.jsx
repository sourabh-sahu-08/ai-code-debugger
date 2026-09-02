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

  const handleAnalyze = async (code, prompt = '') => {
    if (!code || !code.trim()) {
      showToast('Please provide some code to analyze', 'warning');
      return;
    }
    
    setAnalysisState('analyzing');
    
    try {
      const data = await analyzeService.analyzeCode(code, activeFile?.language || 'javascript', 'quick-fix', prompt);
      setAnalysisData(data.data);
      setAnalysisState('success');
      showToast('Analysis complete', 'success');
    } catch (error) {
      console.error(error);
      setAnalysisState('error');
      showToast(error.message || 'Analysis failed', 'error');
    }
  };

  const handleApplyFix = () => {
    if (analysisData?.suggestedFix && activeFile) {
      handleEditorChange(activeFile.id, analysisData.suggestedFix);
      showToast('Fix applied successfully!', 'success');
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
    <div className="flex flex-1 h-[calc(100vh-64px)] lg:h-full w-full bg-transparent overflow-hidden relative">
      
      {/* File Explorer (Left Panel) */}
      <div className="h-full z-10 hidden md:block bg-transparent backdrop-blur-[16px] border-r border-[rgba(255,255,255,0.05)] flex-shrink-0">
        <FileExplorer 
          files={files} 
          activeFile={activeFileId} 
          onSelectFile={setActiveFileId} 
        />
      </div>
      
      {/* Editor Center Stage */}
      <div className={`flex flex-col flex-1 h-full min-w-0 z-10 bg-transparent backdrop-blur-[10px] transition-all duration-700`}>
        
        {/* Editor Toolbar / Frame Header */}
        <div className="h-[40px] bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)] flex items-center px-3 flex-shrink-0">
          <div className="flex items-center gap-2 mr-6">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
          </div>
          <div className="flex items-center h-full gap-1">
            {files.map(file => (
              <button
                key={file.id}
                onClick={() => setActiveFileId(file.id)}
                className={`px-4 h-full flex flex-col justify-center items-center text-[12px] min-w-[120px] transition-all duration-300 ${activeFileId === file.id ? 'text-[#F5F5F5] bg-[rgba(255,255,255,0.06)] border-t-2 border-[#F5F5F5]' : 'text-[#A1A1A1] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#F5F5F5] border-t-2 border-transparent'}`}
              >
                <span>{file.name}</span>
                <span className="text-[9px] opacity-50 font-mono mt-0.5 hidden">src/{file.name}</span>
              </button>
            ))}
          </div>
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
      <div className="h-full w-[360px] z-10 hidden lg:block bg-transparent backdrop-blur-[12px] border-l border-[rgba(255,255,255,0.05)] flex-shrink-0 relative flex flex-col">
        <AIAssistant 
          analysisState={analysisState} 
          analysisData={analysisData}
          onAnalyze={(prompt) => handleAnalyze(activeFile?.content, prompt)}
          onApplyFix={handleApplyFix}
        />
      </div>
    </div>
  );
}
