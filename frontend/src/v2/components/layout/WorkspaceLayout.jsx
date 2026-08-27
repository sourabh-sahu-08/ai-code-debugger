import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Terminal, LayoutDashboard, Code, FolderGit2, 
  History, BookOpen, Target, Users, Globe, 
  Trophy, User, Settings, ChevronLeft, ChevronRight 
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/v2/dashboard' },
  { icon: Code, label: 'AI Debugger', path: '/v2/debugger' },
  { icon: FolderGit2, label: 'My Projects', path: '/v2/projects' },
  { icon: History, label: 'Debug History', path: '/v2/history' },
  { icon: BookOpen, label: 'Learn', path: '/v2/learn' },
  { icon: Target, label: 'Challenges', path: '/v2/challenges' },
  { icon: Users, label: 'Friends', path: '/v2/friends' },
  { icon: Globe, label: 'Community', path: '/v2/community' },
  { icon: Trophy, label: 'Achievements', path: '/v2/achievements' },
];

const bottomNavItems = [
  { icon: User, label: 'Profile', path: '/v2/profile' },
  { icon: Settings, label: 'Settings', path: '/v2/settings' },
];

export default function WorkspaceLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const NavLink = ({ item }) => {
    const isActive = location.pathname.startsWith(item.path);
    return (
      <Link 
        to={item.path}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
          isActive 
            ? 'bg-primary-base/10 text-primary-cyan font-medium' 
            : 'text-text-muted hover:bg-surface-soft hover:text-white'
        }`}
        title={isCollapsed ? item.label : ''}
      >
        <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary-cyan' : 'text-text-subtle group-hover:text-white transition-colors'}`} />
        {!isCollapsed && (
          <span className="truncate">{item.label}</span>
        )}
      </Link>
    );
  };

  return (
    <div className="flex h-screen w-full bg-[var(--background)] text-[var(--text)] overflow-hidden">
      
      {/* Sidebar */}
      <motion.aside 
        initial={{ width: 260 }}
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex flex-col border-r border-border bg-surface/50 backdrop-blur-xl shrink-0"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
          {!isCollapsed && (
            <div className="flex items-center gap-2 text-primary-cyan">
              <Terminal className="w-6 h-6" />
              <span className="font-bold tracking-tight">KhudSeKrle</span>
            </div>
          )}
          {isCollapsed && (
            <Terminal className="w-6 h-6 text-primary-cyan mx-auto" />
          )}
          
          {/* Toggle Button */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-5 bg-surface border border-border rounded-full p-1 text-text-muted hover:text-white z-10"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 no-scrollbar">
          {navItems.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </div>

        <div className="p-3 border-t border-border/50 flex flex-col gap-1">
          {bottomNavItems.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </div>
      </motion.aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-[var(--background-alt)]">
        {children}
      </main>
    </div>
  );
}
