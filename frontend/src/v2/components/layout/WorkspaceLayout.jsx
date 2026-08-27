import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Terminal, LayoutDashboard, Code, FolderGit2, 
  History, BookOpen, Target, Users, Globe, 
  Trophy, User, Settings, ChevronLeft, ChevronRight, Menu, X 
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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
        <span className={`truncate transition-opacity duration-200 ${isCollapsed ? 'md:opacity-0 md:w-0 md:overflow-hidden' : 'opacity-100 w-auto'}`}>
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[var(--background)] text-[var(--text)] overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between h-14 px-4 border-b border-border bg-surface shrink-0 z-40">
        <div className="flex items-center gap-2 text-primary-cyan">
          <Terminal className="w-5 h-5" />
          <span className="font-bold tracking-tight text-lg">KhudSeKrle</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-text-muted hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isCollapsed ? 80 : 260,
          x: 0 
        }}
        className={`fixed md:relative inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-surface/95 md:bg-surface/50 backdrop-blur-xl shrink-0 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="h-14 md:h-16 flex items-center justify-between px-4 border-b border-border/50 shrink-0">
          <div className={`flex items-center gap-2 text-primary-cyan transition-opacity ${isCollapsed ? 'md:hidden' : 'flex'}`}>
            <Terminal className="w-6 h-6 shrink-0" />
            <span className="font-bold tracking-tight truncate">KhudSeKrle</span>
          </div>
          
          {/* Centered icon when collapsed on desktop */}
          <div className={`hidden md:flex justify-center w-full ${isCollapsed ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <Terminal className="w-6 h-6 text-primary-cyan" />
          </div>
          
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-2 text-text-muted hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Desktop Toggle Button */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex absolute -right-3 top-5 bg-surface border border-border rounded-full p-1 text-text-muted hover:text-white z-10 hover:border-primary-cyan/50 transition-colors shadow-sm"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 no-scrollbar">
          {navItems.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </div>

        <div className="p-3 border-t border-border/50 flex flex-col gap-1 shrink-0">
          {bottomNavItems.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </div>
      </motion.aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-56px)] md:h-screen min-w-0 bg-[var(--background-alt)] relative z-0">
        {children}
      </main>
    </div>
  );
}
