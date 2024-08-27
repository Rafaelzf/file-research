type ExternalIds = {
  ArXiv?: string;
  DBLP?: string;
  PubMedCentral?: string;
  DOI?: string;
  MAG?: string;
  [key: string]: string | undefined;
};

type OpenAccessPdf = {
  url: string;
  status: "GOLD" | "GREEN" | "HYBRID" | "UNKNOWN";
};

type S2FieldOfStudy = {
  category: string;
  source: string;
};

type PublicationVenue = {
  id: string;
  name: string;
  type: string;
  alternate_names: string[];
  url: string;
};

type Journal = {
  name: string;
  pages: string;
  volume: string;
};

type CitationStyle = {
  bibtex: string;
  [key: string]: string | undefined;
};

type Author = {
  authorId: string;
  externalIds?: ExternalIds;
  url: string;
  name: string;
  affiliations?: string[];
  homepage?: string;
  paperCount?: number;
  citationCount?: number;
  hIndex?: number;
};

type Citation = {
  paperId: string;
  corpusId: number;
  externalIds: ExternalIds;
  url: string;
  title: string;
  abstract: string;
  venue: string;
  publicationVenue: PublicationVenue;
  year: number;
  referenceCount: number;
  citationCount: number;
  influentialCitationCount: number;
  isOpenAccess: boolean;
  openAccessPdf?: OpenAccessPdf;
  fieldsOfStudy: string[];
  s2FieldsOfStudy: S2FieldOfStudy[];
  publicationTypes: string[];
  publicationDate: string;
  journal?: Journal;
  citationStyles: CitationStyle;
  authors: Author[];
};

type Reference = Citation;

type Embedding = {
  model: string;
  vector: number[];
};

type Tldr = {
  model: string;
  text: string;
};

export interface DetailPaper {
  paperId: string;
  corpusId: number;
  externalIds: ExternalIds;
  url: string;
  title: string;
  abstract: string;
  venue: string;
  publicationVenue: PublicationVenue;
  year: number;
  referenceCount: number;
  citationCount: number;
  influentialCitationCount: number;
  isOpenAccess: boolean;
  openAccessPdf?: OpenAccessPdf;
  fieldsOfStudy: string[];
  s2FieldsOfStudy: S2FieldOfStudy[];
  publicationTypes: string[];
  publicationDate: string;
  journal?: Journal;
  citationStyles: CitationStyle;
  authors: Author[];
  citations: Citation[];
  references: Reference[];
  embedding?: Embedding;
  tldr?: Tldr;
}
