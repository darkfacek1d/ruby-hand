import { CSSProperties, ReactNode } from 'react';

export function GoldText({
  children,
  style,
  className = '',
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <span className={`gold-text ${className}`} style={style}>
      {children}
    </span>
  );
}