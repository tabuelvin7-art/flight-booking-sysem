import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

export default function Avatar({ src, alt, size = 'md', fallback }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || 'Avatar'}
        className={`${sizes[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-blue-100 flex items-center justify-center`}>
      {fallback ? (
        <span className="font-semibold text-blue-600">{fallback}</span>
      ) : (
        <User className="w-1/2 h-1/2 text-blue-600" />
      )}
    </div>
  );
}
