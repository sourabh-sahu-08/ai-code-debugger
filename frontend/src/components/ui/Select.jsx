import React from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

export const Select = React.forwardRef(({
  className,
  options = [],
  error,
  ...props
}, ref) => {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          'flex h-10 w-full appearance-none rounded-md border border-border bg-background px-3 py-2 pr-10 text-sm text-text transition-colors placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-violet disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-error-base focus-visible:ring-error-base',
          className
        )}
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
        <ChevronDown className="h-4 w-4" />
      </div>
      {error && (
        <p className="mt-1 text-sm text-error-base">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
