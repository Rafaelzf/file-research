import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileType = v.union(v.literal("pdf"));

export default defineSchema({
  users: defineTable({
    name: v.string(),
    userName: v.string(),
    tokenIdentifier: v.string(),
    image: v.string(),
    email: v.string(),
    role: v.string(),
    favorites: v.optional(v.array(v.string())),
    seeLater: v.optional(v.array(v.string())),
    library: v.optional(
      v.array(v.object({ name: v.string(), papers: v.array(v.string()) }))
    ),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
