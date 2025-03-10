import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Define the customer schema
const customerSchema = {
  name: v.string(),
  email: v.optional(v.string()),
  phone: v.optional(v.string()),
  address: v.optional(v.string()),
  loyaltyPoints: v.optional(v.number()),
  lastVisit: v.optional(v.string()),
  totalSpent: v.optional(v.number()),
};

// Get all customers
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("customers")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

// Get a single customer by ID
export const getById = query({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const customer = await ctx.db.get(args.id);
    if (!customer || customer.userId !== identity.subject) {
      throw new Error("Not found or unauthorized");
    }

    return customer;
  },
});

// Create a new customer
export const create = mutation({
  args: customerSchema,
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.insert("customers", {
      ...args,
      userId: identity.subject,
      loyaltyPoints: args.loyaltyPoints || 0,
      totalSpent: args.totalSpent || 0,
    });
  },
});

// Update a customer
export const update = mutation({
  args: { id: v.id("customers"), ...customerSchema },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const { id, ...data } = args;
    const customer = await ctx.db.get(id);
    if (!customer || customer.userId !== identity.subject) {
      throw new Error("Not found or unauthorized");
    }

    return await ctx.db.patch(id, data);
  },
});

// Delete a customer
export const remove = mutation({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const customer = await ctx.db.get(args.id);
    if (!customer || customer.userId !== identity.subject) {
      throw new Error("Not found or unauthorized");
    }

    return await ctx.db.delete(args.id);
  },
});

// Update customer loyalty points
export const updateLoyaltyPoints = mutation({
  args: { id: v.id("customers"), points: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const customer = await ctx.db.get(args.id);
    if (!customer || customer.userId !== identity.subject) {
      throw new Error("Not found or unauthorized");
    }

    const currentPoints = customer.loyaltyPoints || 0;
    return await ctx.db.patch(args.id, {
      loyaltyPoints: currentPoints + args.points,
    });
  },
});

// Search customers
export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const customers = await ctx.db
      .query("customers")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();

    const searchQuery = args.query.toLowerCase();
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery) ||
        (customer.email &&
          customer.email.toLowerCase().includes(searchQuery)) ||
        (customer.phone && customer.phone.includes(searchQuery)),
    );
  },
});
