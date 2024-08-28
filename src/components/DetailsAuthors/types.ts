interface ExternalIds {
  DBLP: string[];
  ORCID?: number;
}

interface Paper {
  paperId: string;
  title: string | null;
}

export interface Author {
  authorId: string;
  externalIds: ExternalIds;
  url: string;
  name: string;
  affiliations: string[];
  homepage: string | null;
  paperCount: number;
  citationCount: number;
  hIndex: number;
  papers: Paper[];
}
