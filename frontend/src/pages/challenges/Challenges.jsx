import React from 'react';
import { Trophy, Clock, Zap, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function Challenges() {
  return (
    <div className="max-w-5xl mx-auto w-full p-6 lg:p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          Daily Challenges
        </h1>
        <p className="text-text-muted mt-1">Solve curated debugging scenarios to earn massive XP and climb the leaderboard.</p>
      </div>

      <div className="grid gap-6">
        {[
          { title: 'The Silent Catch', diff: 'Medium', xp: 300, time: '10 mins', status: 'completed' },
          { title: 'Zombie WebSockets', diff: 'Hard', xp: 500, time: '20 mins', status: 'open' },
          { title: 'Race Condition Royale', diff: 'Expert', xp: 1000, time: '45 mins', status: 'locked' }
        ].map((c, i) => (
          <Card key={i} className={`bg-surface/50 border-border/50 ${c.status === 'locked' ? 'opacity-50' : ''}`}>
            <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant={c.diff === 'Hard' ? 'danger' : c.diff === 'Medium' ? 'warning' : 'secondary'}>
                    {c.diff}
                  </Badge>
                  <span className="text-sm font-bold text-primary-cyan flex items-center gap-1">
                    <Zap className="w-4 h-4" /> {c.xp} XP
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {c.time}</span>
                </div>
              </div>
              
              <div className="w-full sm:w-auto flex-shrink-0">
                {c.status === 'completed' ? (
                  <Button variant="ghost" disabled className="w-full text-success-base">
                    <CheckCircle2 className="w-5 h-5 mr-2" /> Completed
                  </Button>
                ) : c.status === 'locked' ? (
                  <Button variant="secondary" disabled className="w-full">Locked</Button>
                ) : (
                  <Button className="w-full">Accept Challenge</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
