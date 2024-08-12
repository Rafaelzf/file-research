import { ConvexError, v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const createUser = internalMutation({
  args: {
    name: v.string(),
    userName: v.string(),
    tokenIdentifier: v.string(),
    image: v.string(),
    email: v.string(),
    role: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("users", {
      name: args.name,
      userName: args.userName,
      email: args.email,
      role: args.role,
      tokenIdentifier: args.tokenIdentifier,
      image: args.image,
    });
  },
});

export const updateUser = internalMutation({
  args: {
    name: v.string(),
    userName: v.string(),
    tokenIdentifier: v.string(),
    image: v.string(),
    email: v.string(),
    role: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .first();

    if (!user) {
      throw new ConvexError("no user with this token found");
    }

    await ctx.db.patch(user._id, {
      name: args.name,
      userName: args.userName,
      image: args.image,
      email: args.email,
      role: args.role,
    });
  },
});
