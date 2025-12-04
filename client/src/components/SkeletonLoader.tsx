interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export default function Skeleton({ className = '', variant = 'rectangular' }: SkeletonProps) {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  return (
    <div className={`animate-pulse bg-gray-200 ${variants[variant]} ${className}`} />
  );
}

export function FlightCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton variant="circular" className="w-12 h-12" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="flex items-center gap-8">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <div className="text-right space-y-3">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
