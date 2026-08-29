import React, { useState, useEffect } from 'react';
import { Activity, Target, Bug, FolderGit2, Code2, Terminal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { projectService } from '../services/projectService';
import { historyService } from '../services/historyService';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalAnalyses: 0,
    bugsFixed: 0,
    resolutionRate: 0,
  });
  const [recentSessions, setRecentSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsRes, historyRes] = await Promise.all([
          projectService.getProjects(),
          historyService.getHistory()
        ]);
        
        const projects = projectsRes.data || [];
        const history = historyRes.data || [];
        
        const resolved = history.filter(h => h.status === 'Resolved').length;
        const total = history.length;
        
        setStats({
          totalProjects: projects.length,
          totalAnalyses: total,
          bugsFixed: resolved,
          resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0
        });

        setRecentSessions(history.slice(0, 5));
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full p-6 lg:p-10 space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Welcome back, {user?.name?.split(' ')[0] || 'Developer'}!
        </h1>
        <p className="text-text-muted mt-1">Here is a summary of your debugging activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hoverEffect>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-text-muted">Total Projects</span>
              <FolderGit2 className="w-5 h-5 text-primary-base" />
            </div>
            <div className="text-3xl font-bold text-text mb-1">{loading ? '-' : stats.totalProjects}</div>
          </CardContent>
        </Card>
        
        <Card hoverEffect>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-text-muted">Total Analyses</span>
              <Activity className="w-5 h-5 text-accent" />
            </div>
            <div className="text-3xl font-bold text-text mb-1">{loading ? '-' : stats.totalAnalyses}</div>
          </CardContent>
        </Card>

        <Card hoverEffect>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-text-muted">Bugs Fixed</span>
              <Bug className="w-5 h-5 text-success-base" />
            </div>
            <div className="text-3xl font-bold text-text mb-1">{loading ? '-' : stats.bugsFixed}</div>
          </CardContent>
        </Card>

        <Card hoverEffect>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-text-muted">Resolution Rate</span>
              <Target className="w-5 h-5 text-primary-base" />
            </div>
            <div className="text-3xl font-bold text-text mb-1">{loading ? '-' : `${stats.resolutionRate}%`}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Sessions */}
        <div className="lg:col-span-2 space-y-8">
          <Card hoverEffect className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Sessions</CardTitle>
                <CardDescription>Your latest debugging activity</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>View All</Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                 <div className="space-y-4">
                   {[1,2,3].map(i => <div key={i} className="h-16 bg-surface-strong/50 rounded-lg animate-pulse" />)}
                 </div>
              ) : recentSessions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-text-muted mb-4">No recent debugging sessions.</p>
                  <Button variant="outline" onClick={() => navigate('/debugger')}>Start Debugging</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div 
                      key={session._id} 
                      onClick={() => navigate(`/debugger?session=${session._id}`)}
                      className="flex items-center justify-between p-4 rounded-lg bg-surface border border-border hover:border-primary-base/30 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-md bg-surface-strong flex items-center justify-center">
                          <Code2 className="w-5 h-5 text-text-muted" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm text-text">{session.language}</span>
                            <Badge variant={session.status === 'Resolved' ? 'success' : 'outline'} size="sm" className="text-[10px]">
                              {session.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-text-muted truncate max-w-[250px] sm:max-w-xs">{session.aiResponse?.summary || 'Code Analysis'}</p>
                        </div>
                      </div>
                      <span className="text-xs text-text-muted hidden sm:block">
                        {new Date(session.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Quick Actions */}
        <div className="space-y-8">
          <Card className="border-border bg-surface">
            <CardHeader>
              <CardTitle className="text-lg text-text">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="secondary" onClick={() => navigate('/debugger')}>
                <Terminal className="w-4 h-4 mr-2" /> New Debug Session
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/projects')}>
                <FolderGit2 className="w-4 h-4 mr-2" /> Manage Projects
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
