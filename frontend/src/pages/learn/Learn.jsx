import React from 'react';
import { GraduationCap, BookOpen, Play, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function Learn() {
  return (
    <div className="max-w-6xl mx-auto w-full p-6 lg:p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-text" />
          Learning Paths
        </h1>
        <p className="text-text-muted mt-1">Master debugging techniques with AI-curated modules based on your history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Asynchronous JavaScript', desc: 'Master Promises, async/await, and event loops.', progress: 40, locked: false },
          { title: 'React Hooks Deep Dive', desc: 'Understand useEffect dependencies and memory leaks.', progress: 0, locked: false },
          { title: 'Advanced Python OOP', desc: 'Debug complex inheritance and memory issues.', progress: 0, locked: true },
        ].map((module, i) => (
          <Card key={i} className={`bg-surface/50 border-border/50 ${module.locked ? 'opacity-70' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-base/10 flex items-center justify-center">
                  {module.locked ? <Lock className="w-5 h-5 text-text-muted" /> : <BookOpen className="w-5 h-5 text-text" />}
                </div>
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{module.title}</h3>
              <p className="text-sm text-text-muted mb-6">{module.desc}</p>
              
              {!module.locked && (
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-text-muted">Progress</span>
                    <span className="text-text">{module.progress}%</span>
                  </div>
                  <div className="w-full bg-surface-strong h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary-cyan h-full" style={{ width: `${module.progress}%` }} />
                  </div>
                </div>
              )}
              
              <Button 
                variant={module.locked ? "secondary" : "primary"} 
                className="w-full" 
                disabled={module.locked}
                leftIcon={!module.locked && <Play className="w-4 h-4" />}
              >
                {module.locked ? 'Unlock at Level 10' : (module.progress > 0 ? 'Continue' : 'Start')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
