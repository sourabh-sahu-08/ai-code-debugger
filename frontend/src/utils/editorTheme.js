export const EDITOR_THEME_NAME = 'premium-dark';

export const defineEditorTheme = (monaco) => {
  monaco.editor.defineTheme(EDITOR_THEME_NAME, {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
      { token: 'keyword', foreground: '38bdf8', fontStyle: 'bold' },
      { token: 'string', foreground: '34d399' },
      { token: 'number', foreground: 'f59e0b' },
      { token: 'type', foreground: 'c084fc' },
      { token: 'class', foreground: 'c084fc' },
      { token: 'function', foreground: '38bdf8' },
    ],
    colors: {
      'editor.background': '#00000000', // transparent
      'editor.lineHighlightBackground': '#ffffff04',
      'editorCursor.foreground': '#38bdf8',
      'editor.selectionBackground': '#38bdf825',
      'editorLineNumber.foreground': '#475569',
      'editorLineNumber.activeForeground': '#38bdf8',
      'editor.inactiveSelectionBackground': '#38bdf810',
      'editorGutter.background': '#00000000',
    }
  });
};
