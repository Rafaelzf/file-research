export interface Paper {
  paperId: string;
  corpusId: number;
  externalIds: {
    ArXiv?: string;
    DBLP?: string;
    PubMedCentral?: string;
    [key: string]: string | undefined;
  };
  url: string;
  title: string;
  abstract: string;
  venue: string;
  publicationVenue: {
    id: string;
    name: string;
    type: string;
    alternate_names: string[];
    url: string;
  };
  year: number;
  referenceCount: number;
  citationCount: number;
  influentialCitationCount: number;
  isOpenAccess: boolean;
  openAccessPdf?: {
    url: string;
    status: string;
  };
  fieldsOfStudy: string[];
  s2FieldsOfStudy: {
    category: string;
    source: string;
  }[];
  publicationTypes: string[];
  publicationDate: string;
  journal?: {
    name: string;
    pages: string;
    volume: string;
  };
  citationStyles: {
    bibtex: string;
    [key: string]: string; // Para outros estilos de citação que possam ser adicionados
  };
  authors: {
    authorId: string;
    name: string;
  }[];
}

export interface SearchResponse {
  total: number;
  token: string;
  data: Paper[];
}
