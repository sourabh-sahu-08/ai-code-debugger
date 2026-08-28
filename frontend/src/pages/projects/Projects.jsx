import React, { useState, useEffect } from 'react';
import { FolderGit2, Plus, Clock, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/v1/projects', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full p-6 lg:p-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <FolderGit2 className="w-8 h-8 text-white" />
            My Projects
          </h1>
          <p className="text-text-muted mt-1">Manage your workspaces and collaborative debugging sessions.</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>
          New Project
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="h-48 rounded-xl bg-surface/50 border border-border/50 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card className="bg-surface/30 border-dashed border-border text-center py-16">
          <CardContent>
            <FolderGit2 className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-white mb-2">No projects yet</h3>
            <p className="text-sm text-text-muted mb-6">Create your first project to organize your code and collaborate.</p>
            <Button leftIcon={<Plus className="w-4 h-4" />} variant="secondary">Create Project</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <Card key={project._id} className="bg-surface/50 border-border/50 hover:border-white\/10 transition-colors group cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg group-hover:text-white transition-colors">{project.name}</CardTitle>
                </div>
                <CardDescription className="line-clamp-2 min-h-[40px]">
                  {project.description || 'No description provided.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-text-muted border-t border-border/50 pt-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1 bg-surface-strong px-2 py-1 rounded">
                    <Users className="w-3 h-3" /> {project.members?.length || 1}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
