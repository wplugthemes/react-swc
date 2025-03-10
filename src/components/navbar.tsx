import { SignInButton, UserButton, useUser, useAuth } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { Link, useLocation } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { ShoppingCart, Menu, X, Search, Bell } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const userData = useQuery(api.users.getCurrentUser);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Resources", href: "#resources" },
    { name: "Contact", href: "#contact" },
  ];

  // Check if we're on a POS system page
  const isPosPage =
    location.pathname.includes("/pos") ||
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/products") ||
    location.pathname.includes("/customers");

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {isPosPage && (
              <button
                onClick={onMenuClick}
                className="mr-4 p-1 rounded-md hover:bg-accent"
              >
                <Menu className="h-6 w-6 text-muted-foreground" />
              </button>
            )}
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold text-foreground">
                UltimatePOS
              </span>
            </Link>
          </div>

          {isPosPage ? (
            // POS System Navigation
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search..."
                />
              </div>
              <button className="p-2 text-muted-foreground rounded-full hover:bg-accent">
                <Bell className="h-5 w-5" />
              </button>
              <ThemeToggle />
              <div className="border-l border-border h-6 mx-2" />
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            // Marketing Site Navigation
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Auth Buttons */}
              {isLoaded ? (
                <div className="hidden md:flex items-center space-x-4">
                  <ThemeToggle />
                  {isSignedIn ? (
                    <div className="flex items-center space-x-4">
                      {userData && (
                        <span className="text-foreground">{userData.name}</span>
                      )}
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  ) : (
                    <>
                      <SignInButton mode="modal">
                        <Button variant="outline" className="mr-2">
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignInButton mode="modal">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          Get Started
                        </Button>
                      </SignInButton>
                    </>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  <div className="h-6 w-24 bg-muted rounded animate-pulse"></div>
                  <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
                </div>
              )}

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <ThemeToggle />
                <button
                  type="button"
                  className="ml-2 text-muted-foreground hover:text-foreground focus:outline-none"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && !isPosPage && (
        <div className="md:hidden bg-background border-b border-border py-4">
          <div className="container mx-auto px-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-muted-foreground hover:text-foreground font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              {isSignedIn ? (
                <div className="flex items-center justify-between">
                  {userData && (
                    <span className="text-foreground">{userData.name}</span>
                  )}
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                      Get Started
                    </Button>
                  </SignInButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
