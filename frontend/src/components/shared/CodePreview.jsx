import Editor from "@monaco-editor/react";
import { EDITOR_THEME_NAME, handleEditorWillMount } from "../../utils/editorTheme";
import { Terminal } from "lucide-react";

export default function CodePreview({ title, code, language, height = "300px" }) {
  // Cursor coordinate spotlights
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="spotlight-card glass flex flex-col rounded-[2rem] border border-white/10 overflow-hidden shadow-xl"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-slate-900/40 px-6 py-3.5">
        <Terminal size={14} className="text-sky-300" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{title}</span>
        <span className="ml-auto rounded bg-white/5 px-2 py-0.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
          {language}
        </span>
      </div>

      <div className="flex-1 p-4 bg-slate-950/20">
        <Editor
          height={height}
          language={language}
          value={code}
          theme={EDITOR_THEME_NAME}
          beforeMount={handleEditorWillMount}
          options={{
            readOnly: true,
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            minimap: { enabled: false },
            wordWrap: "on",
            lineNumbers: "on",
            cursorBlinking: "solid",
            scrollbar: {
              vertical: "hidden",
              horizontal: "hidden"
            },
            domReadOnly: true
          }}
        />
      </div>
    </div>
  );
}
