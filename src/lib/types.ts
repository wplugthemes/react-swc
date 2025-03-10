export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  sku?: string;
  stock?: number;
  barcode?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  customer?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  date: Date;
  status: "completed" | "pending" | "cancelled";
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  loyaltyPoints?: number;
  lastVisit?: Date;
  totalSpent?: number;
}

export interface InventoryAlert {
  product: string;
  sku: string;
  stock: number;
  reorderPoint: number;
  status: "low" | "critical" | "out" | "normal";
}
