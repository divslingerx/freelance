import { Loader2 } from "lucide-react";

interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps) {
  return (
    <div className={`flex justify-center p-4 ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
