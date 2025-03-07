import { HttpClient } from '@angular/common/http'; // If using Angular
import { Injectable } from '@angular/core'; // If using Angular
import { Observable, of, throwError } from 'rxjs'; // If using Angular
import { catchError, map } from 'rxjs/operators'; // If using Angular

@Injectable({
  providedIn: 'root'
})
export class CrossrefserviceService {
  constructor(private http: HttpClient) {} // Inject HttpClient if using Angular

  getArticleByDOI(doi: string): Observable<any> {
    const url = `https://api.crossref.org/works/${encodeURIComponent(doi)}`;

    // Angular example using RxJS:
    return this.http.get(url).pipe(
      map((response: any) => response.message), // Extract the article data
      catchError(this.handleError) // Handle errors
    );


    // Node.js example using fetch:
    // return fetch(url)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then(data => data.message)
    //   .catch(error => {
    //     console.error("Error fetching DOI:", error);
    //     throw error; // Re-throw the error to be handled by the caller
    //   });
  }

  private handleError(error: any) { // Angular error handling
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  formatCitation(article: any, format: string = 'apa'): string {
    // Default to APA format, but add more formats as needed

    if (!article) {
      return "Article not found.";
    }

    let citation = '';

    switch (format) {
      case 'apa':
        citation = this.formatAPA(article);
        break;
      case 'mla':
        citation = this.formatMLA(article);
        break;
      // Add more formats here (e.g., chicago, ieee)
      default:
        citation = this.formatAPA(article); // Default to APA
    }

    return citation;
  }

  private formatAPA(article: any): string {
    const authors = this.formatAuthors(article.author);
    const year = article.issued['date-parts'][0][0]; // Get the year
    const title = article.title[0];
    const journal = article['container-title'][0];
    const volume = article.volume;
    const issue = article.issue;
    const pages = article.page;
    const doi = article.DOI;

    return `${authors} (${year}). ${title}. ${journal}, ${volume}(${issue}), ${pages}. https://doi.org/${doi}`;
  }

  private formatMLA(article: any): string {
    const authors = this.formatAuthors(article.author);
    const title = article.title[0];
    const journal = article['container-title'][0];
    const volume = article.volume;
    const issue = article.issue;
    const pages = article.page;
    const year = article.issued['date-parts'][0][0];
    const doi = article.DOI;

    return `${authors}. "${title}." ${journal}, vol. ${volume}, no. ${issue}, ${year}, pp. ${pages}. DOI: https://doi.org/${doi}`;
  }

  private formatAuthors(authors: any[]): string {
    if (!authors || authors.length === 0) {
      return "Unknown Author";
    }

    const authorNames = authors.map(author => {
      const given = author.given ? author.given + ' ' : '';
      const family = author.family ? author.family : '';
      return given + family;
    });

    if (authorNames.length === 1) {
      return authorNames[0];
    } else if (authorNames.length === 2) {
      return authorNames.join(' & ');
    } else {
      return authorNames.slice(0, -1).join(', ') + ', & ' + authorNames.slice(-1);
    }
  }
}


// Example usage (Angular):
// this.crossrefService.getArticleByDOI('10.1038/nature24272').subscribe(
//   article => {
//     const apaCitation = this.crossrefService.formatCitation(article, 'apa');
//     const mlaCitation = this.crossrefService.formatCitation(article, 'mla');
//     console.log('APA Citation:', apaCitation);
//     console.log('MLA Citation:', mlaCitation);
//   },
//   error => {
//     console.error('Error:', error);
//   }
// );

// Example usage (Node.js):
// const doi = '10.1038/nature24272';
// getArticleByDOI(doi)
//   .then(article => {
//     const apaCitation = formatCitation(article, 'apa');
//     console.log('APA Citation:', apaCitation);
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   