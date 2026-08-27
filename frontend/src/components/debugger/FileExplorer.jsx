import React from 'react';
import { FileCode2, FileJson, FileText, Plus, Upload, MoreVertical, FolderOpen } from 'lucide-react';
import { Button } from '../ui/Button';

const getFileIcon = (filename) => {
  if (filename.endsWith('.js') || filename.endsWith('.jsx') || filename.endsWith('.ts')) return <FileCode2 className="w-4 h-4 text-yellow-500" />;
  if (filename.endsWith('.json')) return <FileJson className="w-4 h-4 text-green-500" />;
  return <FileText className="w-4 h-4 text-text-muted" />;
};

export default function FileExplorer({ files, activeFile, onSelectFile }) {
  return (
    <div className="flex flex-col h-full bg-surface-soft border-r border-border w-64 flex-shrink-0 hidden md:flex">
      
      <div className="h-12 flex items-center justify-between px-4 border-b border-border">
        <span className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
          <FolderOpen className="w-4 h-4" /> Workspace
        </span>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-surface-hover rounded text-text-muted hover:text-white transition-colors" title="New File">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-surface-hover rounded text-text-muted hover:text-white transition-colors" title="Upload File">
            <Upload className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {files.map((file) => (
          <div 
            key={file.id}
            onClick={() => onSelectFile(file.id)}
            className={`flex items-center justify-between px-2 py-1.5 rounded text-sm cursor-pointer group transition-colors ${activeFile === file.id ? 'bg-primary-base/20 text-primary-cyan font-medium' : 'text-text-muted hover:bg-surface hover:text-white'}`}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              {getFileIcon(file.name)}
              <span className="truncate">{file.name}</span>
            </div>
            {activeFile === file.id && (
              <button className="p-0.5 text-text-muted hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}

        {files.length === 0 && (
          <div className="text-center p-4 pt-8">
            <FileCode2 className="w-8 h-8 text-border mx-auto mb-2" />
            <p className="text-xs text-text-muted">No files in workspace</p>
            <Button variant="outline" size="sm" className="mt-4 w-full text-xs">Create File</Button>
          </div>
        )}
      </div>

    </div>
  );
}
