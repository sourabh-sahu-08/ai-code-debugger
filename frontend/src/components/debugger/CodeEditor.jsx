import React, { useRef, useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';

const khudsekrleTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { background: 'FFFFFF' },
    { token: 'comment', foreground: '64748B', fontStyle: 'italic' },
    { token: 'keyword', foreground: '2563EB', fontStyle: 'bold' },
    { token: 'identifier', foreground: '1E293B' },
    { token: 'string', foreground: '10B981' },
    { token: 'number', foreground: 'F59E0B' },
    { token: 'type', foreground: '0EA5E9' },
    { token: 'class', foreground: '0EA5E9' }
  ],
  colors: {
    'editor.background': '#FFFFFF',
    'editor.foreground': '#1E293B',
    'editorLineNumber.foreground': '#94A3B8',
    'editorLineNumber.activeForeground': '#2563EB',
    'editor.lineHighlightBackground': '#F1F5F9',
    'editor.selectionBackground': '#BFDBFE',
    'editorCursor.foreground': '#2563EB',
    'editorIndentGuide.background': '#F1F5F9',
    'editorIndentGuide.activeBackground': '#E2E8F0',
    'editorError.foreground': '#EF4444',
    'editorWarning.foreground': '#F59E0B'
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
      <Loader2 className="w-8 h-8 text-text animate-spin mb-4" />
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
