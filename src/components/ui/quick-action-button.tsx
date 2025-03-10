import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface QuickActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export function QuickActionButton({
  icon,
  label,
  onClick,
}: QuickActionButtonProps) {
  return (
    <Button
      variant="outline"
      className="h-auto py-4 flex flex-col items-center justify-center gap-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}
