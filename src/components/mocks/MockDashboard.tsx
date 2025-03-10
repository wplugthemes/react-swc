import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SalesCard } from "@/components/ui/sales-card";
import { QuickActionButton } from "@/components/ui/quick-action-button";
import {
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Clock,
  Search,
  Plus,
  Filter,
  ChevronDown,
} from "lucide-react";
import { INVENTORY_ALERTS, RECENT_TRANSACTIONS, SALES_DATA } from "@/lib/data";

export default function MockDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, Demo User!</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Today</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Transaction
              </Button>
            </div>
          </div>

          {/* Sales Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SalesCard
              title="Today's Sales"
              value={SALES_DATA.today}
              trend="+12.5%"
              trendUp={true}
              icon={<TrendingUp className="h-5 w-5 text-indigo-600" />}
            />
            <SalesCard
              title="Yesterday"
              value={SALES_DATA.yesterday}
              trend="-3.2%"
              trendUp={false}
              icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
            />
            <SalesCard
              title="This Week"
              value={SALES_DATA.thisWeek}
              trend="+8.1%"
              trendUp={true}
              icon={<CreditCard className="h-5 w-5 text-green-600" />}
            />
            <SalesCard
              title="This Month"
              value={SALES_DATA.thisMonth}
              trend="+15.3%"
              trendUp={true}
              icon={<ShoppingCart className="h-5 w-5 text-purple-600" />}
            />
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Transactions */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Transactions
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {RECENT_TRANSACTIONS.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                            {transaction.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${transaction.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.items.length}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.date.getHours()}:
                            {transaction.date.getMinutes() < 10 ? "0" : ""}
                            {transaction.date.getMinutes()}{" "}
                            {transaction.date.getHours() >= 12 ? "PM" : "AM"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-gray-100 text-center">
                  <Button
                    variant="link"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    View All Transactions
                  </Button>
                </div>
              </Card>
            </div>

            {/* Inventory Alerts */}
            <div>
              <Card>
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Inventory Alerts
                  </h2>
                </div>
                <div className="p-6 space-y-5">
                  {INVENTORY_ALERTS.map((item) => (
                    <div
                      key={item.sku}
                      className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div
                        className={`p-2 rounded-full ${getStatusColor(item.status)}`}
                      >
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.product}
                        </h3>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-gray-500">
                            SKU: {item.sku}
                          </span>
                          <span
                            className={`text-sm font-medium ${getTextColor(item.status)}`}
                          >
                            {getStatusText(item.status, item.stock)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
                  <Button variant="outline" className="w-full">
                    Manage Inventory
                  </Button>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Quick Actions
                  </h2>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  <QuickActionButton
                    icon={<ShoppingCart className="h-5 w-5" />}
                    label="New Sale"
                  />
                  <QuickActionButton
                    icon={<Package className="h-5 w-5" />}
                    label="Add Product"
                  />
                  <QuickActionButton
                    icon={<Users className="h-5 w-5" />}
                    label="Customers"
                  />
                  <QuickActionButton
                    icon={<BarChart3 className="h-5 w-5" />}
                    label="Reports"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "low":
      return "bg-amber-500";
    case "critical":
      return "bg-orange-500";
    case "out":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

function getTextColor(status) {
  switch (status) {
    case "low":
      return "text-amber-600";
    case "critical":
      return "text-orange-600";
    case "out":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}

function getStatusText(status, stock) {
  switch (status) {
    case "low":
      return `Low stock (${stock})`;
    case "critical":
      return `Critical (${stock})`;
    case "out":
      return "Out of stock";
    default:
      return `${stock} in stock`;
  }
}
