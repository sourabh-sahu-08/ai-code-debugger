import React, { useState, useEffect } from 'react';
import { Users, Search, UserPlus, Flame, Shield } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // In a real app, fetch from /api/v1/friends
    // Mocking for now to show UI
    setFriends([
      { _id: '1', name: 'Alice Walker', username: 'alice', level: 45, xp: 12000, streak: 12, isOnline: true },
      { _id: '2', name: 'Bob Smith', username: 'bob_dev', level: 32, xp: 8500, streak: 5, isOnline: false }
    ]);
  }, []);

  return (
    <div className="max-w-6xl mx-auto w-full p-6 lg:p-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-8 h-8 text-text-muted" />
            Friends & Peers
          </h1>
          <p className="text-text-muted mt-1">Connect with developers, share debugging sessions, and learn together.</p>
        </div>
        <Button leftIcon={<UserPlus className="w-4 h-4" />}>
          Add Friend
        </Button>
      </div>

      <div className="max-w-md">
        <Input 
          placeholder="Search friends by name or username..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={Search}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {friends.map(friend => (
          <Card key={friend._id} className="bg-surface/50 border-border/50 hover:border-white\/10 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar fallback={friend.name.charAt(0)} className="w-12 h-12 border border-border" />
                    {friend.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-success-base rounded-full border-2 border-surface" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white leading-tight">{friend.name}</h3>
                    <span className="text-xs text-text-muted">@{friend.username}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-white" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Level</span>
                    <span className="text-sm font-bold text-white">{friend.level}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Streak</span>
                    <span className="text-sm font-bold text-white">{friend.streak} days</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border/50 flex gap-2">
                <Button variant="secondary" size="sm" className="w-full">Profile</Button>
                <Button variant="secondary" size="sm" className="w-full">Message</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
    </div>
  );
}
