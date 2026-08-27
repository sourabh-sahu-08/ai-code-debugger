import React from 'react';
import { Medal, Star, Flame, Bug, Terminal, Coffee } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';

export default function Achievements() {
  const achievements = [
    { name: 'First Blood', desc: 'Resolve your first bug', icon: Bug, color: 'text-error-base', bg: 'bg-error-base/10', unlocked: true },
    { name: 'On Fire', desc: 'Maintain a 7-day streak', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10', unlocked: true },
    { name: 'Terminal Velocity', desc: 'Use the Command Palette 50 times', icon: Terminal, color: 'text-primary-cyan', bg: 'bg-primary-cyan/10', unlocked: false },
    { name: 'Night Owl', desc: 'Debug a critical issue after midnight', icon: Coffee, color: 'text-primary-violet', bg: 'bg-primary-violet/10', unlocked: false },
    { name: 'Code Whisperer', desc: 'Help a friend resolve a bug', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/10', unlocked: false },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full p-6 lg:p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <Medal className="w-8 h-8 text-yellow-400" />
          Achievements
        </h1>
        <p className="text-text-muted mt-1">Show off your debugging prowess to your friends.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {achievements.map((a, i) => (
          <Card key={i} className={`bg-surface/50 border-border/50 text-center transition-all ${!a.unlocked ? 'opacity-50 grayscale' : 'hover:scale-105'}`}>
            <CardContent className="p-6">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${a.bg}`}>
                <a.icon className={`w-8 h-8 ${a.color}`} />
              </div>
              <h3 className="font-bold text-white mb-1">{a.name}</h3>
              <p className="text-xs text-text-muted">{a.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
