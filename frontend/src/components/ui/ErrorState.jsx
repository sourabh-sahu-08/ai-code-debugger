import React from 'react';
import { cn } from '../../utils/cn';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from './Button';

export function ErrorState({
  title = 'Something went wrong',
  description = 'An error occurred while loading this content.',
  onRetry,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-error-base/20 bg-error-base/5 p-8 text-center animate-in fade-in-50 min-h-[200px]',
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-error-base/20 mb-4">
        <AlertTriangle className="h-6 w-6 text-error-base" />
      </div>
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      <p className="mb-4 mt-2 text-sm text-text-muted max-w-sm">
        {description}
      </p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} leftIcon={<RefreshCcw className="h-4 w-4" />}>
          Try Again
        </Button>
      )}
    </div>
  );
}
