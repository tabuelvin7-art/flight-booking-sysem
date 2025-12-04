import { Plane } from 'lucide-react';
import Spinner from './Spinner';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative mb-8">
        <Plane className="w-16 h-16 text-blue-600 animate-bounce" />
      </div>
      <Spinner size="lg" />
      <p className="mt-4 text-gray-600 text-lg">{message}</p>
    </div>
  );
}
