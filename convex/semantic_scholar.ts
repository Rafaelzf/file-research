import fetch from "node-fetch";
import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";

export const getRelevantPapers = action({
  args: {
    searchTerm: v.any(),
    page: v.optional(v.number()),
  },
  handler: async (_, args) => {
    const url = new URL(
      "https://api.semanticscholar.org/graph/v1/paper/search"
    );
    const query = encodeURIComponent(args.searchTerm);
    const fields = [
      "paperId",
      "corpusId",
      "url",
      "title",
      "venue",
      "publicationVenue",
      "year",
      "authors",
      "externalIds",
      "abstract",
      "referenceCount",
      "citationCount",
      "influentialCitationCount",
      "isOpenAccess",
      "openAccessPdf",
      "fieldsOfStudy",
      "s2FieldsOfStudy",
      "publicationTypes",
      "publicationDate",
      "journal",
      "citationStyles",
      "tldr",
    ].join(",");

    url.searchParams.append("query", query);
    url.searchParams.append("limit", "6");
    url.searchParams.append("fields", fields);
    const page = args.page || 1;
    url.searchParams.append("offset", `${(page - 1) * 6}`);
    try {
      const response = await fetch(url.toString(), {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        return data; // retorna a lista de papers
      } else {
        console.error("Failed to fetch data:", response);
        throw new ConvexError({
          message: response.statusText,
        });
      }
    } catch (error: unknown) {
      throw new ConvexError({
        message: "Erro ao buscar os papers",
      });
    }
  },
});

export const autocomplete = action({
  args: {
    query: v.string(),
  },
  handler: async (_, args) => {
    const url = `https://api.semanticscholar.org/graph/v1/paper/autocomplete?query=${encodeURIComponent(args.query)}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const matches = data.matches;

      return matches;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  },
});
