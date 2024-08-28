interface ExternalIds {
  ArXiv?: string;
  DBLP?: string;
  DOI?: string;
  CorpusId?: number;
}

interface PublicationVenue {
  id: string;
  name: string;
  type: string;
  alternate_names: string[];
  issn: string;
  url: string;
  alternate_urls: string[];
}

interface S2FieldOfStudy {
  category: string;
  source: string;
}

interface Journal {
  volume: string;
  pages: string;
  name: string;
}

interface CitationStyles {
  bibtex: string;
}

interface Author {
  authorId: string;
  name: string;
}

interface CitingPaper {
  paperId: string;
  externalIds: ExternalIds;
  corpusId: number;
  publicationVenue: PublicationVenue;
  url: string;
  title: string;
  abstract: string | null;
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

export interface PaperContext {
  contexts: string[];
  isInfluential: boolean;
  intents: string[];
  contextsWithIntent: { context: string; intents: string[] }[];
  citingPaper: CitingPaper;
}
