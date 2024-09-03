"use server";
import {
  FIELDS_DETAILS_PAPER,
  FIELDS_DETAILS_REFERENCES,
  FIELDS_SEARCH_PAPERS,
  FIELDS_DETAILS_AUTHORS,
} from "./constants";

export async function getPapers(query: string, page: string) {
  const newPage = page ? Number(page) : 1;
  const newQuery = decodeURIComponent(query);
  const fields = [...FIELDS_SEARCH_PAPERS].join(",");

  const semanticscholarURL = new URL(
    `https://api.semanticscholar.org/graph/v1/paper/search`
  );

  semanticscholarURL.searchParams.append("query", newQuery);
  semanticscholarURL.searchParams.append("limit", "6");
  semanticscholarURL.searchParams.append("fields", fields);
  semanticscholarURL.searchParams.append("offset", `${(newPage - 1) * 6}`);

  try {
    const response = await fetch(semanticscholarURL.toString(), {
      method: "GET",
      headers: { "x-api-key": "zeRLQ1ESsB2Pqx17ApzwN8MKXJklPcObaLSWPtP6" },
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

export async function getMultiplePapers(
  paperIds: string[] = [],
  page?: string
) {
  const newPage = page ? Number(page) : 1;
  const fields = [...FIELDS_SEARCH_PAPERS].join(",");

  const semanticscholarURL = new URL(
    `https://api.semanticscholar.org/graph/v1/paper/batch`
  );

  semanticscholarURL.searchParams.append("limit", "6");
  semanticscholarURL.searchParams.append("fields", fields);
  semanticscholarURL.searchParams.append("offset", `${(newPage - 1) * 6}`);

  if (paperIds.length < 1) {
    return [];
  }

  try {
    const response = await fetch(semanticscholarURL.toString(), {
      method: "POST",
      headers: { "x-api-key": "zeRLQ1ESsB2Pqx17ApzwN8MKXJklPcObaLSWPtP6" },
      body: JSON.stringify({
        ids: paperIds,
      }),
    });

    if (response.ok) {
      return response.json();
    } else {
      console.error("Failed to fetch data1:", response);
      throw new Error("Failed to fetch papers");
    }
  } catch (error) {
    console.error("Failed to fetch data2:", error);
    throw new Error("Failed to fetch papers");
  }
}

export async function getDetailsPaper(paperId: string) {
  try {
    const response = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/${paperId}?fields=${FIELDS_DETAILS_PAPER}`,
      {
        method: "GET",
        headers: { "x-api-key": "zeRLQ1ESsB2Pqx17ApzwN8MKXJklPcObaLSWPtP6" },
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

export async function getDetailsReferences(paperId: string, page?: string) {
  const newPage = page ? Number(page) : 1;
  const newPaperId = decodeURIComponent(paperId);
  const offset = (newPage - 1) * 6;
  const limit = 6;

  const apiUrl = `https://api.semanticscholar.org/graph/v1/paper/${newPaperId}/references?fields=${FIELDS_DETAILS_REFERENCES}&limit=${limit}&offset=${offset}&page=${newPage}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "x-api-key": "zeRLQ1ESsB2Pqx17ApzwN8MKXJklPcObaLSWPtP6" },
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

export async function getDetailsCitations(paperId: string, page?: string) {
  const newPage = page ? Number(page) : 1;
  const newPaperId = decodeURIComponent(paperId);
  const offset = (newPage - 1) * 6;
  const limit = 6;

  const apiUrl = `https://api.semanticscholar.org/graph/v1/paper/${newPaperId}/citations?fields=${FIELDS_DETAILS_REFERENCES}&limit=${limit}&offset=${offset}&page=${newPage}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "x-api-key": "zeRLQ1ESsB2Pqx17ApzwN8MKXJklPcObaLSWPtP6" },
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

export async function getDetailsAuthors(paperId: string, page?: string) {
  const newPage = page ? Number(page) : 1;
  const newPaperId = decodeURIComponent(paperId);
  const offset = (newPage - 1) * 6;
  const limit = 6;

  const apiUrl = `https://api.semanticscholar.org/graph/v1/paper/${newPaperId}/authors?fields=${FIELDS_DETAILS_AUTHORS}&limit=${limit}&offset=${offset}&page=${newPage}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "x-api-key": "zeRLQ1ESsB2Pqx17ApzwN8MKXJklPcObaLSWPtP6" },
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
