import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Define the product schema
const productSchema = {
  name: v.string(),
  price: v.number(),
  image: v.string(),
  category: v.string(),
  description: v.optional(v.string()),
  sku: v.optional(v.string()),
  stock: v.optional(v.number()),
  barcode: v.optional(v.string()),
};

// Get all products
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

// Get products by category
export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
  },
});

// Get a single product by ID
export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new product
export const create = mutation({
  args: productSchema,
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.insert("products", args);
  },
});

// Update a product
export const update = mutation({
  args: { id: v.id("products"), ...productSchema },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const { id, ...data } = args;
    return await ctx.db.patch(id, data);
  },
});

// Delete a product
export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.delete(args.id);
  },
});

// Update product stock
export const updateStock = mutation({
  args: { id: v.id("products"), stock: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.patch(args.id, { stock: args.stock });
  },
});
