import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
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
  
  const socketRef = useRef(null);
  const roomId = 'shared-workspace-123'; // Mock room ID for demo

  useEffect(() => {
    // Connect to Socket.io server
    socketRef.current = io('http://localhost:5000');
    
    socketRef.current.on('connect', () => {
      socketRef.current.emit('join_room', roomId);
    });

    socketRef.current.on('receive_code_change', (data) => {
      setFiles(prev => prev.map(f => f.id === data.fileId ? { ...f, content: data.content } : f));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const activeFile = files.find(f => f.id === activeFileId);

  const handleEditorChange = (id, newContent) => {
    setFiles(files.map(f => f.id === id ? { ...f, content: newContent } : f));
    
    // Broadcast change
    socketRef.current.emit('code_change', {
      roomId,
      fileId: id,
      content: newContent
    });
  };

  const handleAnalyze = async (code) => {
    if (!code) return;
    
    setAnalysisState('analyzing');
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/v1/analyze', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          code, 
          language: activeFile?.language || 'javascript',
          mode: 'quick-fix'
        }),
      });
      
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Analysis failed');
      
      setAnalysisData(data.data);
      setAnalysisState('success');
    } catch (error) {
      console.error(error);
      setAnalysisState('error');
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
    <div className="flex h-[calc(100vh-88px)] w-full bg-transparent overflow-hidden relative p-4 gap-4">
      {/* Background Decorators */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      {/* File Explorer (Left Panel) - Glass styling */}
      <div className="h-full z-10 hidden md:block rounded-xl overflow-hidden glass-card shadow-2xl flex-shrink-0">
        <FileExplorer 
          files={files} 
          activeFile={activeFileId} 
          onSelectFile={setActiveFileId} 
        />
      </div>
      
      {/* Editor Center Stage (Flat Monaco wrapped in 3D frame) */}
      <div className={`flex flex-col flex-1 h-full min-w-0 z-10 rounded-xl overflow-hidden glass-card border transition-all duration-700 ${getGlowColor()}`}>
        
        {/* Editor Toolbar / Frame Header */}
        <div className="h-12 bg-surface-strong/80 backdrop-blur-md border-b border-border/50 flex items-center px-2 flex-shrink-0 shadow-inner">
          <div className="flex items-center gap-1.5 px-3 mr-4">
            <div className="w-3 h-3 rounded-full bg-error-base/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-success-base/80 shadow-sm" />
          </div>
          {files.map(file => (
            <button
              key={file.id}
              onClick={() => setActiveFileId(file.id)}
              className={`px-5 h-[80%] rounded-md flex items-center text-sm min-w-[120px] transition-all duration-300 font-medium ${activeFileId === file.id ? 'bg-background shadow-md text-text border border-white/20' : 'text-text-muted hover:bg-surface-hover hover:text-text border border-transparent'}`}
            >
              {file.name}
            </button>
          ))}
        </div>

        {/* Flat Monaco Instance */}
        <div className="flex-1 bg-background relative z-0">
          <CodeEditor 
            file={activeFile} 
            onChange={handleEditorChange} 
            onAnalyze={handleAnalyze} 
          />
        </div>
      </div>

      {/* AI Assistant (Right Panel) - Glass styling */}
      <div className="h-full z-10 hidden lg:block rounded-xl overflow-hidden glass-card shadow-2xl flex-shrink-0 relative">
        <AIAssistant 
          analysisState={analysisState} 
          analysisData={analysisData}
          onAnalyze={() => handleAnalyze(activeFile?.content)}
        />
      </div>
    </div>
  );
}
