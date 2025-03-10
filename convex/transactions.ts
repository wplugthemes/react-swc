import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Define the cart item schema
const cartItemSchema = v.object({
  id: v.string(),
  name: v.string(),
  price: v.number(),
  quantity: v.number(),
  image: v.string(),
  category: v.string(),
});

// Define the transaction schema
const transactionSchema = {
  customer: v.optional(v.string()),
  items: v.array(cartItemSchema),
  subtotal: v.number(),
  tax: v.number(),
  total: v.number(),
  paymentMethod: v.string(),
  status: v.string(),
};

// Get all transactions
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.query("transactions").order("desc").collect();
  },
});

// Get a single transaction by ID
export const getById = query({
  args: { id: v.id("transactions") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.get(args.id);
  },
});

// Create a new transaction
export const create = mutation({
  args: transactionSchema,
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    // Create the transaction
    const transactionId = await ctx.db.insert("transactions", {
      ...args,
      userId: identity.subject,
      date: new Date().toISOString(),
    });

    // Update product stock for each item in the transaction
    for (const item of args.items) {
      const product = await ctx.db
        .query("products")
        .filter((q) => q.eq(q.field("id"), item.id))
        .first();

      if (product && product.stock !== undefined) {
        const newStock = Math.max(0, product.stock - item.quantity);
        await ctx.db.patch(product._id, { stock: newStock });
      }
    }

    return transactionId;
  },
});

// Update a transaction status
export const updateStatus = mutation({
  args: { id: v.id("transactions"), status: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.patch(args.id, { status: args.status });
  },
});

// Get recent transactions
export const getRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const limit = args.limit || 10;
    return await ctx.db.query("transactions").order("desc").take(limit);
  },
});
