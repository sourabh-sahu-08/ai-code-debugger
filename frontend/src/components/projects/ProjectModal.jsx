import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { projectService } from '../../services/projectService';
import { useToast } from '../../contexts/ToastContext';

export default function ProjectModal({ isOpen, onClose, onProjectCreated }) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    setLoading(true);
    try {
      const data = await projectService.createProject(formData);
      showToast('Project created successfully', 'success');
      onProjectCreated(data.data);
      onClose();
      setFormData({ name: '', description: '' });
    } catch (error) {
      showToast(error.message || 'Failed to create project', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-surface border border-border shadow-xl rounded-xl p-6 z-10"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-text transition-colors rounded-lg hover:bg-surface-hover"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-bold text-text mb-2">Create New Project</h2>
          <p className="text-sm text-text-muted mb-6">Organize your workspaces and collaborate with others.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-text-muted">Project Name</label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Authentication Service"
                autoFocus
                disabled={loading}
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="description" className="text-sm font-medium text-text-muted">Description (Optional)</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of what this project is about..."
                className="w-full flex min-h-[100px] rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-base resize-none transition-colors disabled:opacity-50"
                disabled={loading}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
              <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={!formData.name.trim() || loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Create Project
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
