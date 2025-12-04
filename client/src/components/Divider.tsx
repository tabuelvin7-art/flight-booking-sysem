interface DividerProps {
  text?: string;
  className?: string;
}

export default function Divider({ text, className = '' }: DividerProps) {
  if (text) {
    return (
      <div className={`flex items-center gap-4 my-6 ${className}`}>
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-500 font-medium">{text}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
    );
  }

  return <div className={`h-px bg-gray-200 my-6 ${className}`} />;
}
