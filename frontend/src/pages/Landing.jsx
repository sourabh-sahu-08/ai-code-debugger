import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ChevronRight, Play, Code2, Sparkles, Lightbulb, CheckCircle2, Shield, Zap, Users, Trophy, Github, Twitter, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)] overflow-x-hidden relative selection:bg-primary-base/30">
      
      {/* Background Decorators */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hidden lg:block absolute top-10 left-1/4 w-[400px] h-[400px] bg-primary-base/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="hidden lg:block absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-violet/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 w-full max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left */}
        <div className="flex items-center gap-2 justify-start">
          <Terminal className="w-6 h-6 text-primary-cyan" />
          <span className="font-bold text-lg md:text-xl tracking-tight">KhudSeKrle</span>
        </div>
        
        {/* Center */}
        <div className="hidden md:flex items-center justify-center gap-8 text-sm font-medium text-text-muted">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#learning" className="hover:text-white transition-colors">Learning</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
        </div>
        
        {/* Right */}
        <div className="flex items-center gap-4 justify-end">
          <Link to="/auth/login" className="hidden sm:block text-sm font-medium text-text-muted hover:text-white transition-colors">
            Sign In
          </Link>
          <Link to="/auth/register" className="relative group overflow-hidden rounded-full px-5 py-2 md:py-2.5 bg-surface border border-border hover:border-primary-cyan/50 transition-all">
            <span className="relative text-xs md:text-sm font-medium">Get Started</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-20 lg:pt-20 lg:pb-32 flex flex-col justify-center min-h-[calc(100vh-88px)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
            
            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-2xl mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-base/10 border border-primary-base/20 text-primary-cyan text-xs md:text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary-cyan animate-pulse" />
                KhudSeKrle v2.0
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white mb-6 w-full">
                Stop guessing. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan via-primary-base to-primary-violet">
                  Start debugging.
                </span>
              </h1>
              
              <p className="text-base lg:text-lg text-text-muted leading-relaxed max-w-lg mb-8">
                KhudSeKrle uses AI to analyze your code, explain errors, guide you toward solutions, and help you become a better developer.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
                <Link to="/debugger" className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold hover:scale-[1.02] transition-transform text-sm md:text-base shadow-xl">
                  Start Debugging <ChevronRight className="w-4 h-4" />
                </Link>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-surface/50 border border-border hover:bg-surface transition-colors font-medium text-sm md:text-base">
                  <Play className="w-4 h-4" /> Watch Demo
                </button>
              </div>
              
              {/* Stats Group - Clean Horizontal Flex */}
              <div className="flex items-center justify-center lg:justify-start gap-8 lg:gap-12 w-full border-t border-border/50 pt-8">
                <div className="flex flex-col items-center lg:items-start gap-1">
                  <span className="text-2xl lg:text-3xl font-bold text-white">10k+</span>
                  <span className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wider font-semibold">Bugs Fixed</span>
                </div>
                <div className="w-px h-8 bg-border/50"></div>
                <div className="flex flex-col items-center lg:items-start gap-1">
                  <span className="text-2xl lg:text-3xl font-bold text-white">95%</span>
                  <span className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wider font-semibold">Resolution</span>
                </div>
                <div className="w-px h-8 bg-border/50"></div>
                <div className="flex flex-col items-center lg:items-start gap-1">
                  <span className="text-2xl lg:text-3xl font-bold text-white">24/7</span>
                  <span className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wider font-semibold">AI Mentor</span>
                </div>
              </div>
            </div>

            {/* Right Placeholder - Ready for 3D */}
            <div className="w-full max-w-md lg:max-w-lg mx-auto relative aspect-square flex items-center justify-center border border-border/30 rounded-full bg-surface-soft/30 backdrop-blur-sm">
              <p className="text-text-muted text-sm">[ AI Debug Core Visual Placeholder ]</p>
            </div>

          </div>
        </div>

        {/* 1. How It Works */}
        <section id="features" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-border/50">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Workflow</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-text-muted max-w-2xl mx-auto">From messy code to deep understanding in 4 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Paste Code', desc: 'Upload or paste your broken code and error logs.' },
              { step: '02', title: 'AI Analyzes', desc: 'Our engine detects syntax, logic, and runtime issues.' },
              { step: '03', title: 'Understand Root Cause', desc: 'Get plain English explanations of why it failed.' },
              { step: '04', title: 'Apply & Learn', desc: 'Fix the bug and learn how to prevent it next time.' }
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <Card className="h-full bg-surface-soft border-border/50 hover:border-primary-cyan/50 transition-colors">
                  <CardHeader>
                    <div className="text-primary-violet font-mono text-xl font-bold mb-2">{s.step}</div>
                    <CardTitle>{s.title}</CardTitle>
                    <CardDescription>{s.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2. AI Debugging Demo / Mockup */}
        <section className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Badge variant="secondary" className="mb-4">Real-time Analysis</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">See exactly where things went wrong.</h2>
              <p className="text-text-muted text-lg mb-8">
                Don't just get the fixed code. KhudSeKrle highlights the exact line causing the crash, explains the error stack trace, and gives you a diff of the required changes.
              </p>
              <Button rightIcon={<ChevronRight className="w-4 h-4" />}>Try the Sandbox</Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
              <Card className="w-full shadow-2xl border-border bg-background/50 backdrop-blur-md overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface/50">
                  <div className="w-3 h-3 rounded-full bg-error-base/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-success-base/80" />
                  <span className="ml-2 text-xs text-text-muted font-mono">App.jsx - Uncaught TypeError</span>
                </div>
                <div className="p-6 font-mono text-sm">
                  <div className="flex gap-4 opacity-50 mb-2">
                    <span className="text-text-muted select-none">12</span>
                    <span className="text-text">const user = await fetchUser();</span>
                  </div>
                  <div className="flex gap-4 bg-error-base/10 rounded px-2 -mx-2 py-1 mb-2 border-l-2 border-error-base">
                    <span className="text-error-base select-none">13</span>
                    <span className="text-error-base">console.log(user.profile.name);</span>
                  </div>
                  <div className="mt-4 p-4 rounded-lg bg-surface border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary-cyan" />
                      <span className="font-semibold text-primary-cyan text-xs">AI Root Cause</span>
                    </div>
                    <p className="text-text-muted text-xs leading-relaxed mb-3">
                      Cannot read properties of undefined (reading 'name'). `user.profile` is undefined because the API response does not include a profile object for new users.
                    </p>
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* 3. Learning Mode */}
        <section id="learning" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-border/50">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Progressive Learning</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't cheat yourself. Learn.</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Get hints instead of straight answers to build your debugging muscles.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="w-64 text-center">
                <CardContent className="pt-6">
                  <Lightbulb className="w-8 h-8 mx-auto mb-4 text-yellow-500" />
                  <h4 className="font-semibold mb-2">Hint 1</h4>
                  <p className="text-sm text-text-muted">Where is the variable first defined?</p>
                </CardContent>
              </Card>
            </motion.div>
            <ChevronRight className="hidden md:block w-6 h-6 text-text-muted opacity-50" />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
              <Card className="w-64 text-center">
                <CardContent className="pt-6">
                  <Lightbulb className="w-8 h-8 mx-auto mb-4 text-orange-500" />
                  <h4 className="font-semibold mb-2">Hint 2</h4>
                  <p className="text-sm text-text-muted">Check if it's being mutated before use.</p>
                </CardContent>
              </Card>
            </motion.div>
            <ChevronRight className="hidden md:block w-6 h-6 text-text-muted opacity-50" />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
              <Card className="w-64 text-center border-primary-violet/50 bg-primary-violet/5">
                <CardContent className="pt-6">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-4 text-primary-violet" />
                  <h4 className="font-semibold mb-2">Solution</h4>
                  <p className="text-sm text-text-muted">View the complete fix and explanation.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* 4. AI Code Review */}
        <section className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <Card className="bg-surface">
                <CardContent className="pt-6">
                  <Code2 className="w-6 h-6 mb-3 text-primary-cyan" />
                  <h4 className="font-semibold mb-1">Readability</h4>
                  <p className="text-xs text-text-muted">Is your code clean and understandable?</p>
                </CardContent>
              </Card>
              <Card className="bg-surface">
                <CardContent className="pt-6">
                  <Zap className="w-6 h-6 mb-3 text-yellow-500" />
                  <h4 className="font-semibold mb-1">Performance</h4>
                  <p className="text-xs text-text-muted">Are there bottlenecks or memory leaks?</p>
                </CardContent>
              </Card>
              <Card className="bg-surface">
                <CardContent className="pt-6">
                  <Shield className="w-6 h-6 mb-3 text-error-base" />
                  <h4 className="font-semibold mb-1">Security</h4>
                  <p className="text-xs text-text-muted">Vulnerability & injection checks.</p>
                </CardContent>
              </Card>
              <Card className="bg-surface">
                <CardContent className="pt-6">
                  <CheckCircle2 className="w-6 h-6 mb-3 text-success-base" />
                  <h4 className="font-semibold mb-1">Maintainability</h4>
                  <p className="text-xs text-text-muted">Tech debt and modularity scores.</p>
                </CardContent>
              </Card>
            </motion.div>

            <div className="order-1 lg:order-2">
              <Badge variant="secondary" className="mb-4">Comprehensive Analysis</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Automated Code Review.</h2>
              <p className="text-text-muted text-lg mb-8">
                Beyond just fixing bugs, our AI reviews your entire file for best practices, ensuring your code is production-ready.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Peer Learning & 6. Debug Challenges (Combined Grid) */}
        <section id="community" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="h-full bg-surface/50 border-border/50">
                <CardHeader>
                  <Users className="w-8 h-8 text-primary-violet mb-2" />
                  <CardTitle className="text-2xl">Peer Learning</CardTitle>
                  <CardDescription>Share debugging sessions with friends. Learn from how others solve similar problems.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mt-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center text-xs font-bold">U{i}</div>
                          <div className="text-sm font-medium">User{i} shared a session</div>
                        </div>
                        <Badge variant="outline">React</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
              <Card className="h-full bg-surface/50 border-border/50">
                <CardHeader>
                  <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
                  <CardTitle className="text-2xl">Daily Challenges</CardTitle>
                  <CardDescription>Test your skills with our daily broken code snippets. Fix them to earn XP and climb the leaderboard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-background border border-border mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-bold">Today's Challenge</h5>
                      <Badge variant="secondary" className="text-yellow-500 bg-yellow-500/10">Hard • 500 XP</Badge>
                    </div>
                    <p className="text-sm text-text-muted mb-4">Fix the memory leak in this recursive React component before the stack overflows.</p>
                    <Button variant="secondary" className="w-full">Accept Challenge</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </section>

        {/* 7. Final CTA */}
        <section className="w-full max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-12 rounded-3xl bg-gradient-to-br from-surface to-background border border-border/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-violet/5 mix-blend-screen pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to level up your code?</h2>
            <p className="text-text-muted text-lg mb-8 relative z-10 max-w-xl mx-auto">
              Join thousands of developers who are debugging faster, learning deeper, and writing better code with KhudSeKrle.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link to="/auth/register">
                <Button size="lg" className="w-full sm:w-auto text-base">Get Started for Free</Button>
              </Link>
              <Link to="/debugger">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base">Try Sandbox</Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      {/* 8. Footer */}
      <footer className="relative z-10 w-full border-t border-border/50 bg-background pt-16 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-primary-cyan" />
              <span className="font-bold text-lg">KhudSeKrle</span>
            </div>
            <p className="text-sm text-text-muted max-w-xs">
              The AI companion that helps you debug smarter, not harder.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#community" className="hover:text-white transition-colors">Challenges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#community" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 gap-4">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} KhudSeKrle. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-text-muted hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-text-muted hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-text-muted hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
