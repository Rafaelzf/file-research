import { ConvexError, v } from "convex/values";
import {
  MutationCtx,
  QueryCtx,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";

export async function getUser(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string
) {
  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", tokenIdentifier)
    )
    .first();

  if (!user) {
    throw new ConvexError("expected user to be defined");
  }

  return user;
}

export const createUser = internalMutation({
  args: {
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
  },
  async handler(ctx, args) {
    await ctx.db.insert("users", {
      name: args.name,
      userName: args.userName,
      email: args.email,
      role: args.role,
      tokenIdentifier: args.tokenIdentifier,
      image: args.image,
      favorites: args.favorites || [],
      seeLater: args.seeLater || [],
      library: args.library || [],
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
    favorites: v.optional(v.array(v.string())),
    seeLater: v.optional(v.array(v.string())),
    library: v.optional(
      v.array(v.object({ name: v.string(), papers: v.array(v.string()) }))
    ),
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
      favorites: args.favorites || [],
      seeLater: args.seeLater || [],
      library: args.library || [],
    });
  },
});

export const getInfoUser = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .first();

    if (!user) {
      return null;
    }

    return user;
  },
});

export const updateDataUser = mutation({
  args: {
    tokenIdentifier: v.string(),
    favorites: v.optional(v.string()),
    seeLater: v.optional(v.string()),
    library: v.optional(
      v.array(v.object({ name: v.string(), papers: v.array(v.string()) }))
    ),
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
    let newFavorites = user.favorites ? user.favorites : [];
    let newSeeLater = user.seeLater ? user.seeLater : [];

    if (args.favorites) {
      newFavorites.push(args.favorites);
    }

    if (args.seeLater) {
      newSeeLater.push(args.seeLater);
    }

    await ctx.db.patch(user._id, {
      favorites: newFavorites,
      seeLater: newSeeLater,
      library: args.library || user.library || [],
    });
  },
});

export const unfavoritePaper = mutation({
  args: {
    tokenIdentifier: v.string(),
    paperId: v.string(),
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
    const newFavorites = user.favorites?.filter((f) => f !== args.paperId);

    await ctx.db.patch(user._id, {
      favorites: newFavorites,
    });
  },
});

export const undoSeelater = mutation({
  args: {
    tokenIdentifier: v.string(),
    paperId: v.string(),
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
    const newSeeLater = user.seeLater?.filter((f) => f !== args.paperId);

    await ctx.db.patch(user._id, {
      seeLater: newSeeLater,
    });
  },
});

export const deleteItemlibrary = mutation({
  args: {
    tokenIdentifier: v.string(),
    libraryName: v.string(),
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
    const newLibrary = user.library?.filter((f) => f.name !== args.libraryName);

    await ctx.db.patch(user._id, {
      library: newLibrary,
    });
  },
});
