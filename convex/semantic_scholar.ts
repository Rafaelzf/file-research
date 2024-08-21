import fetch from "node-fetch";
import { v } from "convex/values";
import { action } from "./_generated/server";

export const getPapers = action({
  args: {
    searchTerm: v.any(),
  },
  handler: async (ctx, args) => {
    const response = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(args.searchTerm)}&fields=title,authors,year,abstract,url`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.data; // retorna a lista de papers
    }
  },
});
