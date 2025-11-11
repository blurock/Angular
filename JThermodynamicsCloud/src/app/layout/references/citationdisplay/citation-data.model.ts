export interface Author {
  name: string;
  affiliation?: string; // Affiliation is optional
}

export interface CitationData {
  formattedReference: string;
  title: string;
  reference: string; // Add DOI to the model for display
  authors: Author[]; // Now an array of Author objects
}
