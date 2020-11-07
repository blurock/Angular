import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, from, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OntologycatalogService {
  errorMsg: string;
  headers: HttpHeaders;

  constructor(private readonly snackBar: MatSnackBar,
              private httpClient: HttpClient) {
    }


  public getAnnotationsFromID(id: string) {
    const params = new HttpParams().set('catalogname', id);

    const annotationshttp = '/api/catalogannotation';

    return this.httpClient.get(annotationshttp, {params})
                    .pipe(
                    catchError(error => {
                        if (error.error instanceof ErrorEvent) {
                            this.errorMsg = `Error: ${error.error.message}`;
                        } else {
                            this.errorMsg = this.getServerErrorMessage(error);
                        }
                        return of(this.errorMsg);
                    }));

  }

  public getNewCatalogObject(id: string) {
    const params = new HttpParams().set('catalogname', id);
    const annotationshttp = '/api/cataloginfo';
    return this.httpClient.get(annotationshttp, {params})
                    .pipe(
                    catchError(error => {
                        if (error.error instanceof ErrorEvent) {
                            this.errorMsg = `Error: ${error.error.message}`;
                        } else {
                            this.errorMsg = this.getServerErrorMessage(error);
                        }
                        return of(this.errorMsg);
                    }));
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.message}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 500: {
                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }

        }
    }
}
