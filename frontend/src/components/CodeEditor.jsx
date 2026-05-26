import Editor from "@monaco-editor/react";
import { EDITOR_THEME_NAME, handleEditorWillMount } from "../utils/editorTheme";

export default function CodeEditor({ value, onChange, language = "javascript", height = "100%" }) {
  return (
    <Editor
      height={height}
      language={language}
      value={value}
      onChange={(val) => onChange(val || "")}
      beforeMount={handleEditorWillMount}
      theme={EDITOR_THEME_NAME}
      options={{
        fontSize: 13,
        fontFamily: "'JetBrains Mono', monospace",
        minimap: { enabled: false },
        wordWrap: "on",
        lineNumbers: "on",
        scrollbar: {
          vertical: "hidden",
          horizontal: "hidden"
        },
        cursorBlinking: "smooth",
        cursorSmoothCaretAnimation: "on",
        smoothScrolling: true,
        padding: { top: 12 }
      }}
    />
  );
}
