import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({
  className,
  variant = 'default',
  ...props
}) {
  const variants = {
    default: 'border-transparent bg-white text-black',
    secondary: 'border-transparent bg-surface-hover text-text',
    outline: 'text-text',
    success: 'border-transparent bg-success-base/20 text-success-base',
    danger: 'border-transparent bg-error-base/20 text-error-base',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
