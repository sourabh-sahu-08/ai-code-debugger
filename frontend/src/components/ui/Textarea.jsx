import React from 'react';
import { cn } from '../../utils/cn';

export const Textarea = React.forwardRef(({
  className,
  error,
  ...props
}, ref) => {
  return (
    <div className="relative w-full">
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text transition-colors placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-violet disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-error-base focus-visible:ring-error-base',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error-base">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
