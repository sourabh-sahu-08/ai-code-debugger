import Editor from "@monaco-editor/react";
import { EDITOR_THEME_NAME, defineEditorTheme } from "../utils/editorTheme";

export default function CodeEditor({ value, onChange, language }) {
  const handleEditorWillMount = (monaco) => {
    defineEditorTheme(monaco);
  };

  return (
    <div className="h-full w-full relative">
      <Editor
        height="100%"
        language={language}
        theme={EDITOR_THEME_NAME}
        value={value}
        onChange={onChange}
        beforeMount={handleEditorWillMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 20 },
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          cursorSmoothCaretAnimation: "on",
          cursorBlinking: "smooth",
          lineNumbers: "on",
          renderLineHighlight: "all",
          scrollbar: {
            vertical: "visible",
            horizontal: "visible",
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
}
