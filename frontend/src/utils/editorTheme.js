export const EDITOR_THEME_NAME = "premium-dark";

export const editorThemeConfig = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "", foreground: "e2e8f0" },
    { token: "comment", foreground: "64748b", fontStyle: "italic" },
    { token: "keyword", foreground: "38bdf8", fontStyle: "bold" },
    { token: "string", foreground: "34d399" },
    { token: "number", foreground: "f59e0b" },
    { token: "regexp", foreground: "fb7185" },
    { token: "type", foreground: "a78bfa" }
  ],
  colors: {
    "editor.background": "#00000000",
    "editor.lineHighlightBackground": "#ffffff04",
    "editorCursor.foreground": "#38bdf8",
    "editor.selectionBackground": "#38bdf822",
    "editor.inactiveSelectionBackground": "#38bdf811",
    "editorLineNumber.foreground": "#475569",
    "editorLineNumber.activeForeground": "#38bdf8"
  }
};

export const handleEditorWillMount = (monaco) => {
  monaco.editor.defineTheme(EDITOR_THEME_NAME, editorThemeConfig);
};
