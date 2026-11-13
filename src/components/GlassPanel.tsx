import { CSSProperties, ReactNode } from 'react';

export function GlassPanel({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`glass-panel ${className}`} style={style}>
      {children}
    </div>
  );
}