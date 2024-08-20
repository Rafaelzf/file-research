import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileType = v.union(v.literal("pdf"));

export default defineSchema({
  files: defineTable({
    fileName: v.string(),
    type: fileType,
    filedId: v.id("_storage"),
    uploader: v.object({
      email: v.string(),
      name: v.string(),
      userId: v.string(),
    }),
    shouldDelete: v.optional(v.boolean()),
    categories: v.array(v.string()),
  }).index("by_filedId", ["filedId"]),
  users: defineTable({
    name: v.string(),
    userName: v.string(),
    tokenIdentifier: v.string(),
    image: v.string(),
    email: v.string(),
    role: v.string(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  categories: defineTable({
    _id: v.optional(v.id("categories")),
    name: v.string(),
    description: v.optional(v.string()),
  }).index("by_name", ["name"]),
});
