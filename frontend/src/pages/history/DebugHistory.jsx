import React, { useState, useEffect } from 'react';
import { History, FileCode2, Clock, CheckCircle2, AlertTriangle, Bug } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function DebugHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/v1/history', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setHistory(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  return (
    <div className="max-w-5xl mx-auto w-full p-6 lg:p-10 space-y-8">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text flex items-center gap-2">
          <History className="w-8 h-8 text-text" />
          Debug History
        </h1>
        <p className="text-text-muted mt-1">Review your past debugging sessions and AI analyses.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-24 rounded-lg bg-surface/50 border border-border/50 animate-pulse" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <Card className="bg-surface/30 border-dashed border-border text-center py-16">
          <CardContent>
            <Bug className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-text mb-2">No debug history</h3>
            <p className="text-sm text-text-muted">You haven't run any AI analysis yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {history.map(session => (
            <Card key={session._id} className="bg-surface/50 border-border/50 hover:border-border transition-colors">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-strong border border-border flex flex-shrink-0 items-center justify-center mt-1">
                    <FileCode2 className="w-5 h-5 text-text-muted" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">{session.language}</Badge>
                      {session.project && (
                        <span className="text-xs font-medium text-text-muted">
                          Project: {session.project.name}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-text text-base mb-1">
                      {session.aiResponse?.summary || 'Code Analysis'}
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> 
                        {new Date(session.createdAt).toLocaleDateString()}
                      </span>
                      {session.status === 'Resolved' ? (
                        <span className="flex items-center gap-1 text-success-base">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-warning-base">
                          <AlertTriangle className="w-3.5 h-3.5" /> Open Issue
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                  View Session
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
