import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  files: defineTable({
    categories: v.array(v.string()),
    fileName: v.string(),
    uploader: v.object({
      email: v.string(),
      name: v.string(),
    }),
  }),
  users: defineTable({
    name: v.string(),
    userName: v.string(),
    tokenIdentifier: v.string(),
    image: v.string(),
    email: v.string(),
    role: v.string(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
