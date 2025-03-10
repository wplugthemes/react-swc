import { ReactNode, useState } from "react";
import { Sidebar } from "../sidebar";
import { Navbar } from "../navbar";
import { Footer } from "../footer";

interface PosLayoutProps {
  children: ReactNode;
}

export function PosLayout({ children }: PosLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}
        >
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
      <Footer
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}
      />
    </div>
  );
}
