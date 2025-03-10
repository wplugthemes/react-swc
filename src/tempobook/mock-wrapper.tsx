import { ReactNode } from "react";

export function MockAuthWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default MockAuthWrapper;
