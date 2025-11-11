import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author, CitationData } from '../layout/references/citationdisplay/citation-data.model';
import { Observable } from 'rxjs';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrossrefService {
	private userAgent = 'AngularCitationApp/1.0 (mailto:youremail@example.com)';

	  constructor(private http: HttpClient) {}

	  getCitationData(doi: string, style: string): Observable<CitationData> {
		if(doi.startsWith('ISBN')) {
			doi = '10.1021/ci0341518';
		}
	    const doiUrl = `/doi-proxy/${doi}`;
        console.log("getCitationData: " + doiUrl);
	    const ref$ = this.http.get(doiUrl, {
	      responseType: 'text',
	      headers: {
	        'Accept': `text/bibliography; style=${style}`
	      }
	    });

	    const metadata$ = this.http.get<any>(doiUrl, {
	      headers: {
	        'Accept': 'application/vnd.citationstyles.csl+json'
			 }
	    });

	    return forkJoin({
	      formattedReference: ref$,
	      metadata: metadata$
	    }).pipe(
	      map(results => {
	        const { formattedReference, metadata } = results;

	        const title = Array.isArray(metadata.title) ? metadata.title[0] : metadata.title || 'N/A';
	        const extractedDoi = metadata.DOI || doi; // Use DOI from metadata if available, otherwise fallback

	        // ⭐ REVISED: Map author objects to an array of Author objects with name and affiliation
	        const authorsArray: Author[] = (metadata.author || [])
	          .map((a: any) => {
	            const given = a.given || '';
	            const family = a.family || '';
	            const name = `${given} ${family}`.trim();

	            // Affiliation can be an array or a string; try to get the first one if an array.
	            const affiliation = a.affiliation && a.affiliation.length > 0
	              ? (typeof a.affiliation[0] === 'string' ? a.affiliation[0] : a.affiliation[0].name || '')
	              : undefined;

	            return { name, affiliation };
	          })
	          .filter((author: Author) => author.name.length > 0); // Filter out authors with no name

	        return {
	          formattedReference,
	          title: title,
	          reference: extractedDoi,
	          authors: authorsArray
	        } as CitationData;
	      })
	    );
	  }
}
