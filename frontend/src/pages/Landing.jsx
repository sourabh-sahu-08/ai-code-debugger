import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, Sparkles, BrainCircuit, Users, ShieldAlert, 
  Code2, GitBranch, MessageSquare, ArrowRight, CheckCircle2, Zap, Trophy, Globe 
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import HeroVisual from '../components/visuals/HeroVisual';

// Fades up staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Landing() {
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-background">
      
      {/* Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 h-16 border-b border-border/50 bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-6 lg:px-12"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-text" />
          <span className="font-bold text-xl tracking-tight text-text">KhudSeKrle</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          <a href="#features" className="hover:text-text transition-colors">Features</a>
          <a href="#community" className="hover:text-text transition-colors">Community</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/auth/login" className="text-sm font-medium text-text-muted hover:text-text transition-colors hidden sm:block">
            Log In
          </Link>
          <Link to="/auth/register">
            <Button size="sm" className=" border border-white">Get Started</Button>
          </Link>
        </div>
      </motion.nav>

      <main className="flex-1 flex flex-col mt-16 relative z-10">
        {/* Hero Section */}
        <section className="relative w-full max-w-[1920px] mx-auto min-h-[calc(100vh-64px)] flex items-center justify-center px-6 lg:px-12 py-12 lg:py-0 overflow-hidden">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
            
            {/* Left Content */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-2xl mx-auto lg:mx-0 order-2 lg:order-1"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-text" />
                <span className="text-sm font-medium text-text">KhudSeKrle v2.0 is live</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                <span className="text-text block">Stop guessing.</span>
                <span className="text-primary-base block">Start debugging.</span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-lg sm:text-xl text-text-muted mb-8 max-w-xl leading-relaxed">
                The ultimate AI-powered developer environment. Analyze errors, find root causes, and learn from every bug in a collaborative workspace.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link to="/auth/register" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-base  group">
                    Start Debugging
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/debugger" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base border border-border/50 bg-transparent hover:bg-surface-soft text-text">
                    <Code2 className="w-4 h-4 mr-2" />
                    Try Sandbox
                  </Button>
                </Link>
              </motion.div>

              {/* Stats - Horizontal Container */}
              <motion.div variants={itemVariants} className="mt-16 w-full max-w-3xl glass-card rounded-xl border border-border/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-border/50">
                <div className="flex flex-col items-center sm:items-start w-full sm:px-4 pt-4 sm:pt-0 first:pt-0">
                  <span className="text-2xl lg:text-3xl font-bold text-text tracking-tight">10K+</span>
                  <span className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">Bugs Fixed</span>
                </div>
                <div className="flex flex-col items-center sm:items-start w-full sm:px-4 pt-4 sm:pt-0">
                  <span className="text-2xl lg:text-3xl font-bold text-text tracking-tight">95%</span>
                  <span className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">Resolution</span>
                </div>
                <div className="flex flex-col items-center sm:items-start w-full sm:px-4 pt-4 sm:pt-0">
                  <span className="text-2xl lg:text-3xl font-bold text-text tracking-tight">24/7</span>
                  <span className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">AI Mentor</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Hero Visual Container */}
            <div className="w-full h-full min-h-[400px] lg:min-h-[600px] relative flex items-center justify-center order-1 lg:order-2">
              <HeroVisual />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-border/50">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Debug Smarter, Not Harder</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Everything you need to write better code, analyze errors, and learn.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <BrainCircuit className="w-8 h-8 text-text mb-2" />
                <CardTitle>AI Analysis</CardTitle>
                <CardDescription>Instant root cause identification and fixes for your broken code.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="glass-card">
              <CardHeader>
                <Users className="w-8 h-8 text-text mb-2" />
                <CardTitle>Collaborative</CardTitle>
                <CardDescription>Share your workspace instantly. Debug together in real-time.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="glass-card">
              <CardHeader>
                <ShieldAlert className="w-8 h-8 text-text mb-2" />
                <CardTitle>Best Practices</CardTitle>
                <CardDescription>Not just bug fixes, but holistic code review and refactoring suggestions.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-border/50 bg-background pt-16 pb-8 mt-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-text" />
              <span className="font-bold text-lg text-text">KhudSeKrle</span>
            </div>
            <p className="text-sm text-text-muted">
              &copy; {new Date().getFullYear()} KhudSeKrle. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
