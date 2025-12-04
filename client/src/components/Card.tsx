import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({ children, className = '', hover = false, padding = 'md' }: CardProps) {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  return (
    <div className={`bg-white rounded-3xl shadow-soft ${hover ? 'hover:shadow-soft-lg transition-all duration-300' : ''} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
}
