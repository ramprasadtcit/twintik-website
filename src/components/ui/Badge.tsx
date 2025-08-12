import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'plan';
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'info',
  children,
  size = 'md',
  className
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    plan: 'bg-purple-100 text-purple-800'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge; 