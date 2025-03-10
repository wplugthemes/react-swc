import { Product, Category, InventoryAlert, Transaction } from "./types";

export const PRODUCT_CATEGORIES: Category[] = [
  { id: "all", name: "All Products" },
  { id: "beverages", name: "Beverages" },
  { id: "food", name: "Food" },
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "accessories", name: "Accessories" },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Coffee - Medium Roast",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&q=80",
    category: "beverages",
    description: "Smooth medium roast coffee with notes of chocolate and nuts",
    sku: "COF-001",
    stock: 45,
    barcode: "123456789",
  },
  {
    id: "p2",
    name: "Espresso Shot",
    price: 2.49,
    image:
      "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=200&q=80",
    category: "beverages",
    description: "Strong and rich espresso shot",
    sku: "ESP-001",
    stock: 100,
    barcode: "123456790",
  },
  {
    id: "p3",
    name: "Croissant",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&q=80",
    category: "food",
    description: "Buttery and flaky croissant, freshly baked",
    sku: "CRO-001",
    stock: 15,
    barcode: "123456791",
  },
  {
    id: "p4",
    name: "Blueberry Muffin",
    price: 3.49,
    image:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=200&q=80",
    category: "food",
    description: "Moist muffin filled with fresh blueberries",
    sku: "MUF-001",
    stock: 12,
    barcode: "123456792",
  },
  {
    id: "p5",
    name: "Wireless Earbuds",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&q=80",
    category: "electronics",
    description: "High-quality wireless earbuds with noise cancellation",
    sku: "EAR-001",
    stock: 8,
    barcode: "123456793",
  },
  {
    id: "p6",
    name: "Phone Charger",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&q=80",
    category: "electronics",
    description: "Fast-charging USB-C phone charger",
    sku: "CHG-001",
    stock: 25,
    barcode: "123456794",
  },
  {
    id: "p7",
    name: "T-Shirt - Black",
    price: 15.99,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&q=80",
    category: "clothing",
    description: "Classic black t-shirt, 100% cotton",
    sku: "TSH-001",
    stock: 30,
    barcode: "123456795",
  },
  {
    id: "p8",
    name: "Baseball Cap",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&q=80",
    category: "accessories",
    description: "Adjustable baseball cap with embroidered logo",
    sku: "CAP-001",
    stock: 20,
    barcode: "123456796",
  },
  {
    id: "p9",
    name: "Iced Tea",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1556679343-c1c1c9308e4e?w=200&q=80",
    category: "beverages",
    description: "Refreshing iced tea with lemon",
    sku: "TEA-001",
    stock: 40,
    barcode: "123456797",
  },
  {
    id: "p10",
    name: "Chocolate Chip Cookie",
    price: 1.99,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&q=80",
    category: "food",
    description: "Freshly baked chocolate chip cookie",
    sku: "COO-001",
    stock: 25,
    barcode: "123456798",
  },
  {
    id: "p11",
    name: "Bluetooth Speaker",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=200&q=80",
    category: "electronics",
    description: "Portable Bluetooth speaker with 10-hour battery life",
    sku: "SPK-001",
    stock: 15,
    barcode: "123456799",
  },
  {
    id: "p12",
    name: "Sunglasses",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&q=80",
    category: "accessories",
    description: "Stylish sunglasses with UV protection",
    sku: "SUN-001",
    stock: 18,
    barcode: "123456800",
  },
];

export const INVENTORY_ALERTS: InventoryAlert[] = [
  {
    product: "Organic Coffee Beans",
    sku: "COF-001",
    stock: 5,
    reorderPoint: 10,
    status: "low",
  },
  {
    product: "Ceramic Mug - Blue",
    sku: "MUG-003",
    stock: 2,
    reorderPoint: 15,
    status: "critical",
  },
  {
    product: "Wireless Earbuds",
    sku: "EAR-002",
    stock: 0,
    reorderPoint: 5,
    status: "out",
  },
];

export const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: "TX-1234",
    customer: "John Smith",
    items: [
      { ...PRODUCTS[0], quantity: 2 },
      { ...PRODUCTS[2], quantity: 1 },
    ],
    subtotal: 10.97,
    tax: 0.88,
    total: 11.85,
    paymentMethod: "card",
    date: new Date(2023, 5, 15, 10, 23),
    status: "completed",
  },
  {
    id: "TX-1233",
    customer: "Sarah Johnson",
    items: [
      { ...PRODUCTS[1], quantity: 1 },
      { ...PRODUCTS[3], quantity: 2 },
    ],
    subtotal: 9.47,
    tax: 0.76,
    total: 10.23,
    paymentMethod: "cash",
    date: new Date(2023, 5, 15, 9, 45),
    status: "completed",
  },
  {
    id: "TX-1232",
    customer: "Michael Brown",
    items: [
      { ...PRODUCTS[0], quantity: 1 },
      { ...PRODUCTS[1], quantity: 1 },
      { ...PRODUCTS[2], quantity: 1 },
      { ...PRODUCTS[3], quantity: 1 },
      { ...PRODUCTS[9], quantity: 1 },
    ],
    subtotal: 14.95,
    tax: 1.2,
    total: 16.15,
    paymentMethod: "card",
    date: new Date(2023, 5, 14, 15, 30),
    status: "completed",
  },
  {
    id: "TX-1231",
    customer: "Emily Davis",
    items: [{ ...PRODUCTS[11], quantity: 1 }],
    subtotal: 24.99,
    tax: 2.0,
    total: 26.99,
    paymentMethod: "card",
    date: new Date(2023, 5, 14, 12, 15),
    status: "completed",
  },
];

export const SALES_DATA = {
  today: "$1,245.89",
  yesterday: "$1,102.45",
  thisWeek: "$8,347.92",
  thisMonth: "$32,456.78",
};
