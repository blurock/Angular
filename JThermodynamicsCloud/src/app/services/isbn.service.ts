import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Author, CitationData } from '../layout/references/citationdisplay/citation-data.model';

@Injectable({
  providedIn: 'root'
})
export class IsbnService {

	// Open Library API endpoint for fetching book data by ISBN
	//private openLibraryApi = 'https://openlibrary.org/api/books';
	private openLibraryApi = '/isbn-proxy';
	  
	  constructor(private http: HttpClient) {}

	  /**
	   * Fetches book data for a given ISBN from the Open Library API.
	   * @param isbn The International Standard Book Number string.
	   */
	  getCitationData(reference: string): Observable<CitationData> {
	    const bibkey = `${reference}`;
	    const apiUrl = `${this.openLibraryApi}?bibkeys=${bibkey}&jscmd=data&format=json`;

	    return this.http.get<any>(apiUrl).pipe(
	      map(results => {
	        const bookData = results[bibkey];

	        if (!bookData) {
	          throw new Error('ISBN not found or data missing.');
	        }

	        const title = bookData.title || 'N/A';
	        const authorsArray: Author[] = (bookData.authors || [])
	          .map((a: any) => ({ name: a.name, affiliation: undefined })) // Open Library doesn't provide affiliations
	          .filter((author: Author) => author.name.length > 0);

	        // --- SIMULATE REFERENCE STRING (Simple APA-style approximation) ---
	        const authorNames = authorsArray.map(a => a.name).join(', ');
	        const publishDate = bookData.publish_date || 'n.d.';
	        const publisher = (bookData.publishers && bookData.publishers[0].name) || 'Unknown Publisher';

	        const formattedReference = `${authorNames}. (${publishDate}). ${title}. ${publisher}.`;
	        // ------------------------------------------------------------------
			const data: CitationData =	{
				          formattedReference,
				          title,
				          reference,
				          authors: authorsArray
				        }
	        return  data;
	      })
	    );
	  }
}
