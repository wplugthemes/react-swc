import { useState } from "react";
import { PosLayout } from "@/components/layouts/pos-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  Tag,
  Percent,
} from "lucide-react";

// Mock product data
const PRODUCT_CATEGORIES = [
  { id: "all", name: "All Products" },
  { id: "beverages", name: "Beverages" },
  { id: "food", name: "Food" },
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "accessories", name: "Accessories" },
];

const PRODUCTS = [
  {
    id: "p1",
    name: "Coffee - Medium Roast",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&q=80",
    category: "beverages",
  },
  {
    id: "p2",
    name: "Espresso Shot",
    price: 2.49,
    image:
      "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=200&q=80",
    category: "beverages",
  },
  {
    id: "p3",
    name: "Croissant",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&q=80",
    category: "food",
  },
  {
    id: "p4",
    name: "Blueberry Muffin",
    price: 3.49,
    image:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=200&q=80",
    category: "food",
  },
  {
    id: "p5",
    name: "Wireless Earbuds",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&q=80",
    category: "electronics",
  },
  {
    id: "p6",
    name: "Phone Charger",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&q=80",
    category: "electronics",
  },
  {
    id: "p7",
    name: "T-Shirt - Black",
    price: 15.99,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&q=80",
    category: "clothing",
  },
  {
    id: "p8",
    name: "Baseball Cap",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&q=80",
    category: "accessories",
  },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function PosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");

  // Filter products based on category and search query
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Add product to cart
  const addToCart = (product: (typeof PRODUCTS)[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Update item quantity in cart
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Calculate tax (assuming 8%)
  const taxRate = 0.08;
  const tax = subtotal * taxRate;

  // Calculate total
  const total = subtotal + tax;

  return (
    <PosLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="lg:col-span-2">
          <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2">
              {PRODUCT_CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    activeCategory === category.id ? "default" : "outline"
                  }
                  className={`whitespace-nowrap ${activeCategory === category.id ? "bg-indigo-600 hover:bg-indigo-700" : ""}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addToCart(product)}
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-indigo-600 font-bold mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div>
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold">Current Sale</h2>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No items in cart</p>
                  <p className="text-sm mt-2">
                    Click on products to add them to the cart
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1 rounded-full hover:bg-gray-100"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4 text-gray-500" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          className="p-1 rounded-full hover:bg-gray-100"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4 text-gray-500" />
                        </button>
                        <button
                          className="p-1 rounded-full hover:bg-gray-100 ml-1"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Tag className="h-4 w-4" />
                    <span>Discount</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Percent className="h-4 w-4" />
                    <span>Tax</span>
                  </Button>
                </div>

                <Tabs defaultValue="cash" onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="cash">Cash</TabsTrigger>
                    <TabsTrigger value="card">Card</TabsTrigger>
                  </TabsList>
                  <TabsContent value="cash" className="mt-4">
                    <Button
                      className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
                      disabled={cart.length === 0}
                    >
                      <Banknote className="h-5 w-5" />
                      <span>Pay with Cash</span>
                    </Button>
                  </TabsContent>
                  <TabsContent value="card" className="mt-4">
                    <Button
                      className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
                      disabled={cart.length === 0}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Pay with Card</span>
                    </Button>
                  </TabsContent>
                </Tabs>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setCart([])}
                  disabled={cart.length === 0}
                >
                  Cancel Sale
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PosLayout>
  );
}
