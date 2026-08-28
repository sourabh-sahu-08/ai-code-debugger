import React from 'react';
import { cn } from '../../utils/cn';

export const IconButton = React.forwardRef(({
  className,
  variant = 'ghost',
  size = 'md',
  icon: Icon,
  disabled,
  isLoading,
  ...props
}, ref) => {
  const variants = {
    primary: 'bg-primary-violet text-text hover:opacity-90',
    secondary: 'bg-surface border border-border text-text hover:bg-surface-hover',
    ghost: 'bg-transparent text-text-muted hover:text-text hover:bg-surface',
    danger: 'bg-error-base text-text hover:opacity-90',
  };

  const sizes = {
    sm: 'p-1.5 h-8 w-8',
    md: 'p-2 h-10 w-10',
    lg: 'p-3 h-12 w-12',
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-violet disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon ? (
        <Icon className="h-5 w-5" />
      ) : null}
    </button>
  );
});

IconButton.displayName = 'IconButton';
