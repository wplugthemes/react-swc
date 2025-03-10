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
import { ProductCard } from "@/components/ui/product-card";
import { CartItem } from "@/components/ui/cart-item";
import { PRODUCT_CATEGORIES, PRODUCTS } from "@/lib/data";
import { CartItem as CartItemType } from "@/lib/types";

export default function MockPosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<CartItemType[]>([]);
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
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                onClick={() => addToCart(product)}
              />
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
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      image={item.image}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
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
