import React from 'react';
import { Bug, Flame, Target, Trophy, ArrowRight, Activity, Code2, Zap, Terminal } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto w-full p-6 lg:p-10 space-y-8">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-white">Good evening, Developer 👋</h1>
          <p className="text-text-muted">Ready to squash some bugs and level up?</p>
        </div>
        <Link to="/debugger">
          <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
            Start Debugging Session
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-surface/30 border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-text-muted">Bugs Fixed</span>
              <Bug className="w-5 h-5 text-primary-cyan" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">1,248</div>
            <p className="text-xs text-success-base flex items-center gap-1">
              <Activity className="w-3 h-3" /> +12 this week
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-surface/30 border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-text-muted">Debug Streak</span>
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">14 Days</div>
            <p className="text-xs text-text-muted">Keep it up to hit level 43!</p>
          </CardContent>
        </Card>

        <Card className="bg-surface/30 border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-text-muted">Resolution Rate</span>
              <Target className="w-5 h-5 text-success-base" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">94%</div>
            <p className="text-xs text-success-base">Top 10% of users</p>
          </CardContent>
        </Card>

        <Card className="bg-surface/30 border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-text-muted">Total XP</span>
              <Zap className="w-5 h-5 text-primary-violet" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">42,500</div>
            <div className="w-full bg-surface-strong h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary-violet h-full w-[70%]" />
            </div>
            <p className="text-xs text-text-muted mt-2">1,500 XP to next level</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Sessions & AI Insights */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* AI Insights Card */}
          <Card className="bg-gradient-to-br from-primary-base/10 to-surface border-primary-base/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" /> AI Insight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90">
                "You frequently encounter asynchronous JavaScript errors inside `useEffect` hooks. I recommend reviewing React's documentation on data fetching and cleanup functions to avoid memory leaks and stale closures."
              </p>
              <Button variant="ghost" size="sm" className="mt-4 text-primary-cyan px-0">
                View recommended learning module &rarr;
              </Button>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Sessions</CardTitle>
                <CardDescription>Your latest debugging activity</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { lang: 'React', error: 'TypeError: Cannot read properties of undefined', status: 'Resolved', time: '2 hours ago', icon: Code2 },
                  { lang: 'Python', error: 'IndentationError: unexpected indent', status: 'Resolved', time: 'Yesterday', icon: Terminal },
                  { lang: 'Node.js', error: 'UnhandledPromiseRejectionWarning', status: 'Open', time: '2 days ago', icon: Bug }
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-surface/50 border border-border hover:border-primary-cyan/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-md bg-surface-strong flex items-center justify-center">
                        <session.icon className="w-5 h-5 text-text-muted" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-white">{session.lang}</span>
                          <Badge variant={session.status === 'Resolved' ? 'success' : 'secondary'} size="sm" className="text-[10px]">
                            {session.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-text-muted truncate max-w-[200px] sm:max-w-xs">{session.error}</p>
                      </div>
                    </div>
                    <span className="text-xs text-text-muted hidden sm:block">{session.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Daily Challenge */}
        <div className="space-y-8">
          <Card className="border-border/50 bg-surface/50 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[40px]" />
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <CardTitle className="text-lg text-white">Daily Challenge</CardTitle>
              </div>
              <CardDescription>Test your skills and earn XP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="p-4 rounded-lg bg-surface border border-border">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-yellow-500 bg-yellow-500/10 border-none">Hard</Badge>
                  <span className="text-xs font-bold text-primary-cyan">+500 XP</span>
                </div>
                <h4 className="font-bold text-white mb-2 text-sm">Memory Leak in React</h4>
                <p className="text-xs text-text-muted mb-4 leading-relaxed">
                  Fix the memory leak caused by an unmounted component still receiving socket events.
                </p>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Activity className="w-4 h-4" /> Estimated time: 15 mins
                </div>
              </div>
              <Button className="w-full">Accept Challenge</Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
