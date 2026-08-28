import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export function LoadingState({
  title = 'Loading...',
  description,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-border bg-background p-8 text-center animate-in fade-in-50 min-h-[200px]',
        className
      )}
      {...props}
    >
      <Loader2 className="h-8 w-8 animate-spin text-text-muted mb-4" />
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-text-muted max-w-sm">
          {description}
        </p>
      )}
    </div>
  );
}
