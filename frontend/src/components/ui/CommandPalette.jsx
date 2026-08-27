import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Terminal, LayoutDashboard, FolderGit2, History, Users, Trophy, Settings } from 'lucide-react';
import { Input } from './Input';

const commands = [
  { id: 'dashboard', name: 'Go to Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'debugger', name: 'Start Debugging Session', icon: Terminal, path: '/debugger' },
  { id: 'projects', name: 'My Projects', icon: FolderGit2, path: '/projects' },
  { id: 'history', name: 'Debug History', icon: History, path: '/history' },
  { id: 'friends', name: 'Friends & Community', icon: Users, path: '/friends' },
  { id: 'challenges', name: 'Daily Challenges', icon: Trophy, path: '/challenges' },
  { id: 'settings', name: 'Preferences', icon: Settings, path: '/settings' },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }
      if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        navigate(filteredCommands[selectedIndex].path);
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, navigate]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] sm:pt-[25vh]">
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm" 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-surface border border-border/50 rounded-xl shadow-2xl overflow-hidden z-10"
        >
          <div className="flex items-center px-4 border-b border-border/50">
            <Search className="w-5 h-5 text-text-muted mr-3" />
            <input
              autoFocus
              className="w-full bg-transparent h-14 text-white focus:outline-none placeholder:text-text-muted font-medium"
              placeholder="Type a command or search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex items-center gap-1">
              <kbd className="bg-surface-strong px-2 py-1 rounded border border-border text-[10px] font-bold text-text-muted">ESC</kbd>
            </div>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <p className="p-4 text-center text-sm text-text-muted">No results found.</p>
            ) : (
              filteredCommands.map((cmd, index) => {
                const Icon = cmd.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={cmd.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isSelected ? 'bg-primary-cyan/10 text-primary-cyan' : 'text-text-muted hover:bg-surface-hover hover:text-white'
                    }`}
                    onClick={() => {
                      navigate(cmd.path);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{cmd.name}</span>
                    {isSelected && (
                      <span className="ml-auto text-xs opacity-50">Press Enter</span>
                    )}
                  </button>
                )
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
