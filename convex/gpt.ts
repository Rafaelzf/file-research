import fetch from "node-fetch";
import { v } from "convex/values";
import { action } from "./_generated/server";

export const getSuggestions = action({
  args: {
    term: v.any(),
  },
  handler: async (ctx, args) => {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Generate search queries for scientific papers based on the term: ${args.term}`,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    return data.choices[0].text.trim().split("\n");
  },
});
