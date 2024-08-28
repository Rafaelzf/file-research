interface ExternalIds {
  DBLP?: string;
  MAG?: string;
  CorpusId?: number;
}

interface S2FieldOfStudy {
  category: string;
  source: string;
}

interface Journal {
  pages: string;
}

interface CitationStyles {
  bibtex: string;
}

interface Author {
  authorId: string;
  name: string;
}

interface CitedPaper {
  paperId: string;
  externalIds: ExternalIds;
  corpusId: number;
  publicationVenue: string | null;
  url: string;
  title: string;
  abstract: string;
  venue: string;
  year: number;
  referenceCount: number;
  citationCount: number;
  influentialCitationCount: number;
  isOpenAccess: boolean;
  openAccessPdf: string | null;
  fieldsOfStudy: string[];
  s2FieldsOfStudy: S2FieldOfStudy[];
  publicationTypes: string[];
  publicationDate: string;
  journal: Journal;
  citationStyles: CitationStyles;
  authors: Author[];
}

export interface PaperDetails {
  intents: string[];
  contexts: string[];
  contextsWithIntent: { context: string; intents: string[] }[];
  isInfluential: boolean;
  citedPaper: CitedPaper;
}
