import React from 'react';
import { cn } from '../../utils/cn';

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background p-8 text-center animate-in fade-in-50',
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface mb-4">
          <Icon className="h-6 w-6 text-text-muted" />
        </div>
      )}
      <h3 className="mt-4 text-lg font-semibold text-text">{title}</h3>
      {description && (
        <p className="mb-4 mt-2 text-sm text-text-muted max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
