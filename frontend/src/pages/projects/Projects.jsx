import React, { useState, useEffect } from 'react';
import { FolderGit2, Plus, Clock, Users, ArrowRight, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { projectService } from '../../services/projectService';
import { useToast } from '../../contexts/ToastContext';
import ProjectModal from '../../components/projects/ProjectModal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getProjects();
      setProjects(data.data);
    } catch (error) {
      showToast('Failed to load projects: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    try {
      setDeleteLoading(true);
      await projectService.deleteProject(projectToDelete._id);
      setProjects(prev => prev.filter(p => p._id !== projectToDelete._id));
      showToast('Project deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete project: ' + error.message, 'error');
    } finally {
      setDeleteLoading(false);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full p-6 lg:p-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text flex items-center gap-2">
            <FolderGit2 className="w-8 h-8 text-primary-base" />
            My Projects
          </h1>
          <p className="text-text-muted mt-1">Manage your workspaces and collaborative debugging sessions.</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
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
            <h3 className="text-lg font-bold text-text mb-2">No projects yet</h3>
            <p className="text-sm text-text-muted mb-6">Create your first project to organize your code and collaborate.</p>
            <Button leftIcon={<Plus className="w-4 h-4" />} variant="secondary" onClick={() => setIsModalOpen(true)}>
              Create Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <Card key={project._id} className="bg-surface border-border hover:border-primary-base/30 hover:shadow-md transition-all group flex flex-col h-full">
              <CardHeader className="pb-3 flex-1 cursor-pointer" onClick={() => navigate(`/debugger?project=${project._id}`)}>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg group-hover:text-primary-base transition-colors line-clamp-1">{project.name}</CardTitle>
                </div>
                <CardDescription className="line-clamp-2 min-h-[40px]">
                  {project.description || 'No description provided.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center justify-between text-xs text-text-muted border-t border-border pt-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-surface-strong px-2 py-1 rounded">
                      <Users className="w-3 h-3" /> {project.members?.length || 1}
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setProjectToDelete(project); }}
                      className="p-1 text-text-muted hover:text-error-base hover:bg-error-soft rounded transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />

      <ConfirmDialog
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Project?"
        description={`Are you sure you want to delete "${projectToDelete?.name}"? This action cannot be undone and will delete all associated debugging history.`}
        confirmText="Delete"
        loading={deleteLoading}
      />
    </div>
  );
}
