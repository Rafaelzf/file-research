import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { fileType } from "./schema";

export const createFile = mutation({
  args: {
    fileName: v.string(),
    type: fileType,
    filedId: v.id("_storage"),
    shouldDelete: v.optional(v.boolean()),
    uploader: v.object({
      name: v.string(),
      email: v.string(),
    }),
    categories: v.array(v.string()),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError({
        message: "Você precisa estar logado para fazer isso.",
      });
    }

    try {
      await ctx.db.insert("files", {
        fileName: args.fileName,
        type: args.type,
        filedId: args.filedId,
        shouldDelete: false,
        uploader: {
          name: args.uploader.name,
          email: args.uploader.email,
          userId: identity.tokenIdentifier,
        },
        categories: args.categories,
      });
    } catch (error) {
      console.error(error);
      throw new ConvexError({
        message: "Algo deu errado ao inserir o arquivo na tabela file",
      });
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

export const listAllFiles = query({
  handler: async (ctx) => {
    // You can use .paginate() as well
    return await ctx.db.query("files").collect();
  },
});

export const listAllStorageFiles = query({
  handler: async (ctx) => {
    // You can use .paginate() as well
    try {
      return await ctx.db.system.query("_storage").collect();
    } catch (error) {
      console.error(error);
      throw new ConvexError({
        message: "Algo deu errado ao tentar obter o arquivos arquivos",
      });
    }
  },
});

export const deleteStorageFileById = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.delete(args.storageId);
  },
});

export const deleteFile = mutation({
  args: { fileId: v.id("files") },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError({
        message: "Você precisa estar logado para fazer isso.",
      });
    }

    await ctx.db.patch(args.fileId, {
      shouldDelete: true,
    });
  },
});
