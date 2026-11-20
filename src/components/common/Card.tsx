import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowHover?: boolean;
  glass?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  glowHover = true,
  glass = true,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'rounded-xl border transition-all duration-300',
        glass ? 'glass-panel' : 'bg-surface border-surface-border',
        glowHover && 'glass-panel-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
