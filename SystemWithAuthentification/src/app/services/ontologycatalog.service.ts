import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import {CatalogInfo, CatalogAnnotation, ClassificationHiearchy} from '../const/routes.const';
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


  public getAnnotationsFromID(id: string) {
    const annotationshttp = environment.apiURL + CatalogAnnotation + id;
    return this.standardHttpCall(annotationshttp);
  }

  public getNewCatalogObject(id: string) {
    const cataloginfoshttp = environment.apiURL + CatalogInfo + id;
    return this.standardHttpCall(cataloginfoshttp);
   }
public getClassificationHierarchy(id: string) {
    const classificationhttp = environment.apiURL + ClassificationHiearchy + id;
    return this.standardHttpCall(classificationhttp);
  }

  private standardHttpCall(httpaddr: string): Observable<any> {
    return this.httpClient.get(httpaddr)
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
