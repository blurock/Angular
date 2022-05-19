import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { CatalogInfo, CatalogAnnotation, ClassificationHiearchy } from '../const/routes.const';
import { ServiceUtilityRoutines } from './serviceutilityroutines';


@Injectable({
	providedIn: 'root'
})
export class OntologycatalogService {
	errorMsg: string;
	headers: HttpHeaders;

	constructor(private readonly snackBar: MatSnackBar,
		private httpClient: HttpClient) {
	}


	public getAnnotationsFromID(id: string): Observable<any> {
		const annotationshttp = environment.apiURL + '/' + CatalogAnnotation + '?catalogname=' + id;
		return this.standardHttpCall(annotationshttp);
	}

	public getNewCatalogObject(id: string): Observable<any> {
		//http://localhost:8080/hello
		const cataloginfoshttp = environment.apiURL + '/' + CatalogInfo + '?catalogname=' + id;
		//const cataloginfoshttp = 'http://localhost:8080/hello';
		//const cataloginfoshttp = 'https://api.github.com/';
		return this.standardHttpCall(cataloginfoshttp);
	}
	public getClassificationHierarchy(id: string): Observable<any> {
		const classificationhttp = environment.apiURL + '/' + ClassificationHiearchy + '?catalogname=' + id;
		return this.standardHttpCall(classificationhttp);
	}

	private standardHttpCall(httpaddr: string): Observable<any> {
const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  		return this.httpClient.get(httpaddr,{ 'headers': headers })
			.pipe(
				catchError(error => {
					if (error.error instanceof ErrorEvent) {
						this.errorMsg = `Error: ${error.error.message}`;
					} else {
						this.errorMsg = ServiceUtilityRoutines.getServerErrorMessage(error);
					}
					return of(this.errorMsg);
				}));

	}


}
