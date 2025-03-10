import { ShoppingCart, LifeBuoy, FileText, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("bg-background border-t border-border", className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-foreground">
                UltimatePOS
              </h3>
            </div>
            <p className="text-muted-foreground">
              A comprehensive point-of-sale system for modern businesses.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">
              Product
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Features</li>
              <li>Pricing</li>
              <li>Integrations</li>
              <li>Case Studies</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <FileText className="h-4 w-4" />
                  <span>Documentation</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <LifeBuoy className="h-4 w-4" />
                  <span>Support Center</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <Phone className="h-4 w-4" />
                  <span>Contact Sales</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} UltimatePOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
