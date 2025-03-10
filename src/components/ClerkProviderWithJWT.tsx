import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode, useEffect } from "react";

interface ClerkProviderWithJWTProps {
  children: ReactNode;
  publishableKey: string;
  convex: ConvexReactClient;
}

export function ClerkProviderWithJWT({
  children,
  publishableKey,
  convex,
}: ClerkProviderWithJWTProps) {
  // Create a JWT template for Convex if it doesn't exist
  useEffect(() => {
    if (typeof window !== "undefined" && !window.Clerk?.buildJWT) {
      console.warn(
        "Clerk not initialized yet, JWT template may not be available",
      );
    }
  }, []);

  return (
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
