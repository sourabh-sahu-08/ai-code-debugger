import React, { useRef, useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';

const khudsekrleTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { background: '050505' },
    { token: 'comment', foreground: '737373', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'F5F5F5', fontStyle: 'bold' },
    { token: 'identifier', foreground: 'D4D4D4' },
    { token: 'string', foreground: 'A1A1A1' },
    { token: 'number', foreground: 'A1A1A1' },
    { token: 'type', foreground: 'FFFFFF' },
    { token: 'class', foreground: 'FFFFFF' }
  ],
  colors: {
    'editor.background': '#0a0a0a',
    'editor.foreground': '#D4D4D4',
    'editorLineNumber.foreground': '#404040',
    'editorLineNumber.activeForeground': '#A1A1A1',
    'editor.lineHighlightBackground': '#171717',
    'editor.selectionBackground': '#ffffff20',
    'editorCursor.foreground': '#FFFFFF',
    'editorIndentGuide.background': '#171717',
    'editorIndentGuide.activeBackground': '#404040',
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
      <Loader2 className="w-8 h-8 text-white animate-spin mb-4" />
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
