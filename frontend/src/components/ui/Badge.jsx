import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({
  className,
  variant = 'default',
  ...props
}) {
  const variants = {
    default: 'border-transparent bg-primary-base text-white',
    secondary: 'border-transparent bg-surface-strong text-text font-medium',
    outline: 'text-text border-border',
    success: 'border-transparent bg-success-soft text-success-base font-bold',
    danger: 'border-transparent bg-error-soft text-error-base font-bold',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-base focus:ring-offset-1',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
