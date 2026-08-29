import React from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { cn } from '../../utils/cn';

export function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false
}) {
  if (!isOpen) return null;

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
          className="relative w-full max-w-md bg-surface border border-border shadow-xl rounded-xl p-6 z-10"
        >
          <div className="flex gap-4">
            <div className={cn(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
              variant === 'danger' ? 'bg-error-soft text-error-base' : 'bg-warning-soft text-warning-base'
            )}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            
            <div className="flex-1 pt-1 text-left">
              <h3 className="text-lg font-bold text-text mb-2">{title}</h3>
              <p className="text-sm text-text-muted">{description}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
              {cancelText}
            </Button>
            <Button 
              type="button" 
              onClick={onConfirm}
              className={variant === 'danger' ? 'bg-error-base hover:bg-error-base/90 text-white' : ''}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {confirmText}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
