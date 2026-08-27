import React, { useRef, useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';

const khudsekrleTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { background: '121214' },
    { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
    { token: 'keyword', foreground: '8b5cf6' },
    { token: 'identifier', foreground: 'f8fafc' },
    { token: 'string', foreground: '10b981' },
    { token: 'number', foreground: 'f59e0b' },
    { token: 'type', foreground: '06b6d4' },
    { token: 'class', foreground: '06b6d4' }
  ],
  colors: {
    'editor.background': '#121214',
    'editor.foreground': '#f8fafc',
    'editorLineNumber.foreground': '#27272a',
    'editorLineNumber.activeForeground': '#64748b',
    'editor.lineHighlightBackground': '#18181b',
    'editor.selectionBackground': '#2563eb40',
    'editorCursor.foreground': '#06b6d4',
    'editorIndentGuide.background': '#1e1e24',
    'editorIndentGuide.activeBackground': '#27272a',
    'editorError.foreground': '#ef4444',
    'editorWarning.foreground': '#f59e0b'
  }
};

export default function CodeEditor({ file, onChange, onAnalyze }) {
  const monaco = useMonaco();
  const editorRef = useRef(null);

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('khudsekrle', khudsekrleTheme);
      monaco.editor.setTheme('khudsekrle');
    }
  }, [monaco]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Add custom keyboard shortcut for AI Analysis (Ctrl/Cmd + Enter)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onAnalyze(editor.getValue());
    });
  };

  const LoadingFallback = () => (
    <div className="flex flex-col items-center justify-center h-full bg-surface">
      <Loader2 className="w-8 h-8 text-primary-cyan animate-spin mb-4" />
      <p className="text-sm text-text-muted">Loading Code Engine...</p>
    </div>
  );

  if (!file) return (
    <div className="flex-1 h-full bg-surface flex items-center justify-center text-text-muted">
      Select or create a file to start debugging.
    </div>
  );

  return (
    <div className="flex-1 h-full relative">
      <Editor
        height="100%"
        path={file.name}
        language={file.language}
        value={file.content}
        theme="khudsekrle"
        loading={<LoadingFallback />}
        onMount={handleEditorDidMount}
        onChange={(value) => onChange(file.id, value)}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          fontLigatures: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          roundedSelection: false,
          formatOnPaste: true,
        }}
      />
    </div>
  );
}
