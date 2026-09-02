import React from 'react';
import { FileCode2, FileJson, FileText, Plus, FolderOpen, MoreVertical, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

const getFileIcon = (filename) => {
  if (filename.endsWith('.js') || filename.endsWith('.jsx') || filename.endsWith('.ts')) return <FileCode2 className="w-3.5 h-3.5 text-[#F5F5F5]" />;
  if (filename.endsWith('.json')) return <FileJson className="w-3.5 h-3.5 text-[#F5F5F5]" />;
  return <FileText className="w-3.5 h-3.5 text-[#A1A1A1]" />;
};

export default function FileExplorer({ files, activeFile, onSelectFile }) {
  return (
    <div className="flex flex-col h-full w-[220px] flex-shrink-0 hidden md:flex">
      
      <div className="h-[40px] flex items-center justify-between px-3 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1] flex items-center gap-1.5">
          <FolderOpen className="w-3 h-3" /> WORKSPACE <span className="opacity-50 text-[9px] bg-white/10 px-1 rounded ml-1">{files.length}</span>
        </span>
        <div className="flex items-center gap-0.5">
          <button className="p-1 hover:bg-white/10 rounded text-[#A1A1A1] hover:text-white transition-colors" title="New File">
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded text-[#A1A1A1] hover:text-white transition-colors" title="More">
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-1.5 space-y-0.5">
        <div className="flex items-center gap-1 px-1.5 mb-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
           <ChevronDown className="w-3 h-3" />
           <span className="text-[11px] font-semibold text-[#A1A1A1]">src</span>
        </div>

        {files.map((file) => (
          <div 
            key={file.id}
            onClick={() => onSelectFile(file.id)}
            className={`flex items-center justify-between pl-5 pr-2 py-1 rounded text-[13px] cursor-pointer group transition-colors ${activeFile === file.id ? 'bg-[rgba(255,255,255,0.06)] text-white font-medium relative before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-[14px] before:bg-white before:rounded-r' : 'text-[#A1A1A1] hover:bg-[rgba(255,255,255,0.04)] hover:text-white'}`}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              {getFileIcon(file.name)}
              <span className="truncate">{file.name}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
