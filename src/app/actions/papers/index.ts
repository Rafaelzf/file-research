import { FIELDS_DETAILS_PAPER, FIELDS_SEARCH_PAPERS } from "./constants";

export async function getPapers(query: string, page: string) {
  const newPage = page ? Number(page) : 1;
  const newQuery = decodeURIComponent(query);
  const fields = [...FIELDS_SEARCH_PAPERS].join(",");

  const semanticscholarURL = new URL(
    "https://api.semanticscholar.org/graph/v1/paper/search"
  );

  semanticscholarURL.searchParams.append("query", newQuery);
  semanticscholarURL.searchParams.append("limit", "6");
  semanticscholarURL.searchParams.append("fields", fields);
  semanticscholarURL.searchParams.append("offset", `${(newPage - 1) * 6}`);

  try {
    const response = await fetch(semanticscholarURL.toString(), {
      method: "GET",
    });

    if (response.ok) {
      return response.json();
    } else {
      console.error("Failed to fetch data:", response);
      throw new Error("Failed to fetch papers");
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw new Error("Failed to fetch papers");
  }
}

export async function getDetailsPaper(paperId: string) {
  try {
    const response = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/${paperId}?fields=${FIELDS_DETAILS_PAPER}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      console.error("1 Failed to fetch data:", response.status);
      throw new Error("Failed to fetch papers");
    }
  } catch (error: any) {
    throw new Error("Failed to fetch papers");
  }
}
