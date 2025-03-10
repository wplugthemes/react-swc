import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import type { ClerkWebhookEvent } from "@clerk/clerk-sdk-node";

export const processClerkWebhook = action({
  args: { payload: v.any(), headers: v.any() },
  handler: async (ctx, args) => {
    const { payload } = args;
    const event = payload.type as ClerkWebhookEvent;

    if (event === "user.created" || event === "user.updated") {
      const { id, email_addresses, image_url, first_name, last_name } =
        payload.data;
      const primaryEmail = email_addresses?.[0]?.email_address;
      const name = [first_name, last_name].filter(Boolean).join(" ");

      await ctx.runMutation(internal.syncUser, {
        tokenIdentifier: id,
        email: primaryEmail,
        name,
        image: image_url,
      });
    }

    return { success: true };
  },
});

export const internal = {
  syncUser: internalMutation({
    args: {
      tokenIdentifier: v.string(),
      email: v.optional(v.string()),
      name: v.optional(v.string()),
      image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const { tokenIdentifier, email, name, image } = args;

      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
        .unique();

      if (existingUser) {
        await ctx.db.patch(existingUser._id, {
          name,
          email,
          image,
        });
        return existingUser._id;
      }

      return await ctx.db.insert("users", {
        tokenIdentifier,
        name,
        email,
        image,
      });
    },
  }),
};
