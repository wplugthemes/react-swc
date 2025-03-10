import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default {
  providers: [
    {
      domain: "https://devoted-squid-31.clerk.accounts.dev/",
      applicationID: "convex",
    },
  ],
};
