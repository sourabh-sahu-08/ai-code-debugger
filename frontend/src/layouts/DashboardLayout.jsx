import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Terminal, 
  FolderGit2, 
  History, 
  GraduationCap, 
  Trophy, 
  Users, 
  MessageSquare, 
  Medal, 
  User, 
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '../utils/cn';
import { Avatar } from '../components/ui/Avatar';
import { CommandPalette } from '../components/ui/CommandPalette';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Debugger', path: '/debugger', icon: Terminal },
  { name: 'My Projects', path: '/projects', icon: FolderGit2 },
  { name: 'Debug History', path: '/history', icon: History },
  { name: 'Learn', path: '/learn', icon: GraduationCap },
  { name: 'Challenges', path: '/challenges', icon: Trophy },
  { name: 'Friends', path: '/friends', icon: Users },
  { name: 'Community', path: '/community', icon: MessageSquare },
  { name: 'Achievements', path: '/achievements', icon: Medal },
];

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      <CommandPalette />
      
      {/* Mobile Drawer Overlay */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-background z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-white" />
          <span className="font-bold text-lg">KhudSeKrle</span>
        </div>
        <button onClick={toggleMobile} className="p-2 text-text-muted hover:text-white">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside 
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col h-full bg-surface border-r border-border relative z-30"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/50 flex-shrink-0">
          <AnimatePresence mode="popLayout">
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 overflow-hidden"
              >
                <Terminal className="w-6 h-6 text-white flex-shrink-0" />
                <span className="font-bold text-xl tracking-tight whitespace-nowrap">KhudSeKrle</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={toggleSidebar} 
            className="p-1.5 rounded-md hover:bg-surface-hover text-text-muted transition-colors flex-shrink-0 mx-auto"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar py-6 flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative overflow-hidden",
                  isActive ? "bg-primary-base/10 text-white" : "text-text-muted hover:text-white hover:bg-surface-hover"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "text-text-muted group-hover:text-white")} />
                <AnimatePresence mode="popLayout">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div layoutId="active-nav" className="absolute left-0 top-0 bottom-0 w-1 bg-primary-cyan rounded-r-full" />
                )}
              </Link>
            )
          })}

          <div className="mt-8 pt-4 border-t border-border/50 px-2 space-y-1">
            <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:text-white hover:bg-surface-hover transition-colors">
              <User className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Profile</span>}
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:text-white hover:bg-surface-hover transition-colors">
              <Settings className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Settings</span>}
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-border/50 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar fallback="SD" className="w-9 h-9 border-border bg-surface-hover text-sm font-bold flex-shrink-0" />
            <AnimatePresence mode="popLayout">
              {!isCollapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col whitespace-nowrap">
                  <span className="text-sm font-bold text-white">Senior Dev</span>
                  <span className="text-xs text-text-muted">Level 42</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {!isCollapsed && (
            <button className="p-2 text-text-muted hover:text-error-base transition-colors rounded-md hover:bg-error-base/10">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.aside>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobile}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-surface border-r border-border z-50 flex flex-col"
            >
              <div className="h-16 flex items-center px-6 border-b border-border/50">
                <Terminal className="w-6 h-6 text-white mr-2" />
                <span className="font-bold text-xl tracking-tight">KhudSeKrle</span>
              </div>
              
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        isActive ? "bg-primary-base/10 text-white font-semibold" : "text-text-muted hover:text-white hover:bg-surface-hover font-medium"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  )
                })}
              </div>

              <div className="p-6 border-t border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <Avatar fallback="SD" className="w-10 h-10 border-border bg-surface-hover" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">Senior Dev</span>
                    <span className="text-xs text-text-muted">Level 42</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-text-muted">
                  <Link to="/settings" onClick={() => setMobileOpen(false)} className="hover:text-white transition-colors">Settings</Link>
                  <button className="text-error-base hover:text-error-soft transition-colors flex items-center gap-1">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative pt-16 lg:pt-0 overflow-y-auto bg-background">
        {children}
      </main>

    </div>
  );
}
