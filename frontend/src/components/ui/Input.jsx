import React from 'react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(({
  className,
  type = 'text',
  error,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...props
}, ref) => {
  return (
    <div className="relative w-full">
      {LeftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted flex items-center justify-center pointer-events-none">
          <LeftIcon className="h-4 w-4" />
        </div>
      )}
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-violet disabled:cursor-not-allowed disabled:opacity-50',
          LeftIcon && 'pl-9',
          RightIcon && 'pr-9',
          error && 'border-error-base focus-visible:ring-error-base',
          className
        )}
        ref={ref}
        {...props}
      />
      {RightIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted flex items-center justify-center pointer-events-none">
          <RightIcon className="h-4 w-4" />
        </div>
      )}
      {error && (
        <p className="mt-1 text-sm text-error-base">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
