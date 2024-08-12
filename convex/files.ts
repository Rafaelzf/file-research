import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const createFile = mutation({
  args: {
    fileName: v.string(),
    uploader: v.object({
      name: v.string(),
      email: v.string(),
    }),
    categories: v.array(v.string()),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Você precisa estar logado para fazer isso.");
    }

    console.log(identity.tokenIdentifier);

    return;

    try {
      await ctx.db.insert("files", {
        fileName: args.fileName,
        uploader: {
          name: args.uploader.name,
          email: args.uploader.email,
        },
        categories: args.categories,
      });
    } catch (error) {
      console.error(error);
      throw new ConvexError(
        "Algo deu errado ao inserir o arquivo na tabela file"
      );
    }
  },
});
