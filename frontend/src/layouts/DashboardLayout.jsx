import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Terminal, 
  FolderGit2, 
  History, 
  Users,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '../utils/cn';
import { Avatar } from '../components/ui/Avatar';
import { CommandPalette } from '../components/ui/CommandPalette';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Debugger', path: '/debugger', icon: Terminal },
  { name: 'My Projects', path: '/projects', icon: FolderGit2 },
  { name: 'Debug History', path: '/history', icon: History },
  { name: 'Friends', path: '/friends', icon: Users }
];

const DashboardBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
    <video autoPlay muted loop playsInline preload="auto" className="w-[100vw] h-[100vh] object-cover opacity-40 grayscale contrast-110">
      <source src="/dashboard-bg.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/85 z-10" />
    <div className="absolute inset-0 z-20 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-white rounded-full blur-[120px] opacity-[0.03]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#A1A1A1] rounded-full blur-[120px] opacity-[0.03]" />
    </div>
  </div>
);

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <div className="min-h-screen bg-transparent flex overflow-hidden text-text">
      <DashboardBackground />
      <CommandPalette />
      
      {/* Mobile Drawer Overlay */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-surface/80 backdrop-blur-md z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-text" />
          <span className="font-bold text-lg">KhudSeKrle</span>
        </div>
        <button onClick={toggleMobile} className="p-2 text-text-muted hover:text-text">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside 
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col h-full bg-surface/50 backdrop-blur-2xl border-r border-border relative z-30"
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
                <Terminal className="w-6 h-6 text-text flex-shrink-0" />
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
                  isActive ? "bg-primary-soft text-primary-base" : "text-text-muted hover:text-text hover:bg-surface-hover"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-text" : "text-text-muted group-hover:text-text")} />
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
                  <motion.div layoutId="active-nav" className="absolute left-0 top-0 bottom-0 w-1 bg-primary-base rounded-r-full" />
                )}
              </Link>
            )
          })}

        </div>

        <div className="p-4 border-t border-border/50 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar fallback={user?.name?.charAt(0)?.toUpperCase() || 'U'} className="w-9 h-9 border-border bg-surface-hover text-sm font-bold flex-shrink-0" />
            <AnimatePresence mode="popLayout">
              {!isCollapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col whitespace-nowrap">
                  <span className="text-sm font-bold text-text truncate w-32">{user?.name || 'User'}</span>
                  <span className="text-xs text-text-muted truncate w-32">@{user?.username || 'developer'}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {!isCollapsed && (
            <button onClick={logout} className="p-2 text-text-muted hover:text-error-base transition-colors rounded-md hover:bg-error-base/10">
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
                <Terminal className="w-6 h-6 text-text mr-2" />
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
                        isActive ? "bg-primary-soft text-primary-base font-semibold" : "text-text-muted hover:text-text hover:bg-surface-hover font-medium"
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
                  <Avatar fallback={user?.name?.charAt(0)?.toUpperCase() || 'U'} className="w-10 h-10 border-border bg-surface-hover" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-text">{user?.name || 'User'}</span>
                    <span className="text-xs text-text-muted">@{user?.username || 'developer'}</span>
                  </div>
                </div>
                <div className="flex justify-end items-center text-sm font-medium text-text-muted">
                  <button onClick={logout} className="text-error-base hover:text-error-soft transition-colors flex items-center gap-1">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative pt-16 lg:pt-0 overflow-y-auto bg-transparent z-10">
        {children}
      </main>

    </div>
  );
}
