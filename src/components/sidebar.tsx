import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Tag,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: "/dashboard",
  },
  {
    title: "Point of Sale",
    icon: <ShoppingCart className="h-5 w-5" />,
    path: "/pos",
  },
  {
    title: "Products",
    icon: <Package className="h-5 w-5" />,
    path: "/products",
  },
  {
    title: "Customers",
    icon: <Users className="h-5 w-5" />,
    path: "/customers",
  },
  {
    title: "Transactions",
    icon: <CreditCard className="h-5 w-5" />,
    path: "/transactions",
  },
  {
    title: "Discounts",
    icon: <Tag className="h-5 w-5" />,
    path: "/discounts",
  },
  {
    title: "Reports",
    icon: <BarChart3 className="h-5 w-5" />,
    path: "/reports",
  },
  {
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    path: "/settings",
  },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 pt-16 transition-transform duration-300",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <div className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-indigo-600 mr-2" />
            <span className="font-semibold text-gray-900">UltimatePOS</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 lg:hidden"
          >
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 py-4 px-3 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center p-2 rounded-lg group hover:bg-gray-100",
                    location.pathname === item.path
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700",
                  )}
                >
                  <div
                    className={cn(
                      "mr-3",
                      location.pathname === item.path
                        ? "text-indigo-600"
                        : "text-gray-500 group-hover:text-gray-900",
                    )}
                  >
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <UserButton afterSignOutUrl="/" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Store Manager</p>
              </div>
            </div>
          </div>
          <button className="flex items-center justify-center w-full p-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
            <LogOut className="h-4 w-4 mr-2" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
