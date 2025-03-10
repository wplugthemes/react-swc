import { ReactNode } from "react";

// This is a mock wrapper for storyboards to avoid auth issues
export function MockAuthWrapper({ children }: { children: ReactNode }) {
  // Simply render children without any auth or Convex provider
  // This allows storyboards to render without auth requirements
  return <>{children}</>;
}
