import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),

  products: defineTable({
    name: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.string(),
    description: v.optional(v.string()),
    sku: v.optional(v.string()),
    stock: v.optional(v.number()),
    barcode: v.optional(v.string()),
  }).index("by_category", ["category"]),

  transactions: defineTable({
    userId: v.string(),
    customer: v.optional(v.string()),
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
        category: v.string(),
      }),
    ),
    subtotal: v.number(),
    tax: v.number(),
    total: v.number(),
    paymentMethod: v.string(),
    date: v.string(),
    status: v.string(),
  }).index("by_user", ["userId"]),

  customers: defineTable({
    userId: v.string(),
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    loyaltyPoints: v.optional(v.number()),
    lastVisit: v.optional(v.string()),
    totalSpent: v.optional(v.number()),
  }).index("by_user", ["userId"]),
});
