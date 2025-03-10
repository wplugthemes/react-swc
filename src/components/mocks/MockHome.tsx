import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  CreditCard,
  LayoutDashboard,
  Tag,
  TrendingUp,
} from "lucide-react";

const FEATURES = [
  {
    icon: <LayoutDashboard className="h-8 w-8 text-indigo-600" />,
    title: "Intuitive Dashboard",
    description:
      "Real-time sales analytics, inventory alerts, and transaction monitoring in one view",
  },
  {
    icon: <Package className="h-8 w-8 text-indigo-600" />,
    title: "Inventory Management",
    description:
      "Track stock levels, set reorder points, and manage product variants with ease",
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-indigo-600" />,
    title: "Seamless Checkout",
    description:
      "Fast transaction processing with support for multiple payment methods and discounts",
  },
  {
    icon: <Users className="h-8 w-8 text-indigo-600" />,
    title: "Customer Management",
    description:
      "Build customer relationships with profiles, purchase history, and loyalty programs",
  },
] as const;

const BENEFITS = [
  {
    icon: <TrendingUp className="h-6 w-6 text-green-600" />,
    title: "Increase Sales",
    description:
      "Streamline checkout process and offer personalized promotions",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
    title: "Data-Driven Decisions",
    description:
      "Comprehensive reporting and analytics to optimize your business",
  },
  {
    icon: <Tag className="h-6 w-6 text-yellow-600" />,
    title: "Flexible Pricing",
    description: "Support for discounts, promotions, and custom pricing rules",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-purple-600" />,
    title: "Multiple Payment Options",
    description: "Accept cash, cards, mobile payments, and split payments",
  },
] as const;

export default function MockHome() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-indigo-50 to-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Modern POS System for Growing Businesses
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  A comprehensive point-of-sale solution that helps you manage
                  sales, inventory, and customers all in one place.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Get Started
                  </Button>
                  <Button variant="outline" size="lg">
                    Watch Demo
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80"
                    alt="POS System Dashboard"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything You Need to Run Your Business
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our POS system combines powerful features with an intuitive
                interface to help you manage every aspect of your business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Grow Your Business with Our POS
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how our POS system can help you increase efficiency,
                boost sales, and improve customer satisfaction.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex flex-col p-6 bg-white rounded-xl shadow-sm"
                >
                  <div className="mb-4 p-2 rounded-full bg-gray-50 w-fit">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-indigo-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Join thousands of businesses that use our POS system to streamline
              operations and boost growth.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-indigo-700"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
