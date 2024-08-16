import { ConvexError, v } from "convex/values";

import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";

export const listAllCategorie = query({
  handler: async (ctx) => {
    const categories = await ctx.db.query("categories").collect();
    return categories;
  },
});

async function hasCategories(ctx: QueryCtx | MutationCtx, name: string) {
  const categorieNamed = await ctx.db
    .query("categories")
    .filter((q) => q.eq(q.field("name"), name))
    .collect();

  return categorieNamed;
}

export const listThisCategorie = query({
  args: {
    name: v.string(),
  },

  handler: async (ctx, args) => {
    const categorieNamed = await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("name"), args.name))
      .collect();

    return categorieNamed;
  },
});

export const createCategorie = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError({
        message: "Você precisa estar logado para fazer isso.",
      });
    }

    const categorieNamed = await hasCategories(ctx, args.name);

    if (categorieNamed.length > 0) {
      throw new ConvexError({
        message: "Categoria já existente, crie uma nova.",
      });
    }

    try {
      await ctx.db.insert("categories", {
        name: args.name,
        description: args.description,
      });
    } catch (error) {
      console.error(error);
      throw new ConvexError(
        "Algo deu errado ao inserir a categoria na tabela categories"
      );
    }
  },
});
