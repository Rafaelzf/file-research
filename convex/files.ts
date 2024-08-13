import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { fileType } from "./schema";

export const createFile = mutation({
  args: {
    fileName: v.string(),
    type: fileType,
    filedId: v.id("_storage"),
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

    try {
      await ctx.db.insert("files", {
        fileName: args.fileName,
        type: args.type,
        filedId: args.filedId,
        uploader: {
          name: args.uploader.name,
          email: args.uploader.email,
          userId: identity.tokenIdentifier,
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

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError("You must be logged in to create files.");
  }

  return await ctx.storage.generateUploadUrl();
});
