import React, { useState } from 'react';
import FileExplorer from './FileExplorer';
import CodeEditor from './CodeEditor';
import AIAssistant from './AIAssistant';

const initialFiles = [
  {
    id: '1',
    name: 'App.jsx',
    language: 'javascript',
    content: `import React, { useState, useEffect } from 'react';\n\nfunction App() {\n  const [data, setData] = useState(null);\n\n  useEffect(() => {\n    fetch('/api/data')\n      .then(res => res.json())\n      .then(setData);\n  }); // Missing dependency array!\n\n  return (\n    <div>{data ? data.name : 'Loading...'}</div>\n  );\n}\n\nexport default App;`
  }
];

export default function DebugWorkspace() {
  const [files, setFiles] = useState(initialFiles);
  const [activeFileId, setActiveFileId] = useState('1');
  const [analysisState, setAnalysisState] = useState('idle'); // 'idle' | 'analyzing' | 'success' | 'error'
  const [analysisData, setAnalysisData] = useState(null);

  const activeFile = files.find(f => f.id === activeFileId);

  const handleEditorChange = (id, newContent) => {
    setFiles(files.map(f => f.id === id ? { ...f, content: newContent } : f));
  };

  const handleAnalyze = (code) => {
    if (!code) return;
    
    setAnalysisState('analyzing');
    
    // Simulate API call for now (Phase 7 will connect the real backend)
    setTimeout(() => {
      setAnalysisData({
        summary: "Infinite Re-render Loop Detected",
        severity: "high",
        affectedLines: [8],
        rootCause: "The useEffect hook is missing a dependency array. Without it, the effect runs after every single render.",
        explanation: "Because the effect calls setData (updating state), it triggers another render, which triggers the effect again, resulting in an infinite loop that will crash the browser.",
        suggestedFix: "  useEffect(() => {\n    fetch('/api/data')\n      .then(res => res.json())\n      .then(setData);\n  }, []); // Added empty dependency array",
      });
      setAnalysisState('success');
    }, 2000);
  };

  return (
    <div className="flex h-full w-full bg-background overflow-hidden relative">
      <FileExplorer 
        files={files} 
        activeFile={activeFileId} 
        onSelectFile={setActiveFileId} 
      />
      
      <div className="flex flex-col flex-1 h-full min-w-0">
        {/* Editor Tabs */}
        <div className="h-12 bg-surface border-b border-border flex items-center px-2 flex-shrink-0">
          {files.map(file => (
            <button
              key={file.id}
              onClick={() => setActiveFileId(file.id)}
              className={`px-4 h-full flex items-center text-sm border-r border-border min-w-[120px] transition-colors ${activeFileId === file.id ? 'bg-background text-primary-cyan border-t-2 border-t-primary-cyan' : 'text-text-muted hover:bg-surface-hover hover:text-white border-t-2 border-t-transparent'}`}
            >
              {file.name}
            </button>
          ))}
        </div>

        {/* Editor Instance */}
        <CodeEditor 
          file={activeFile} 
          onChange={handleEditorChange} 
          onAnalyze={handleAnalyze} 
        />
      </div>

      <AIAssistant 
        analysisState={analysisState} 
        analysisData={analysisData}
        onAnalyze={() => handleAnalyze(activeFile?.content)}
      />
    </div>
  );
}
