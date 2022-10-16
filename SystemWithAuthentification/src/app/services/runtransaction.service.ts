import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceUtilityRoutines } from './serviceutilityroutines';
import {Transaction} from '../const/routes.const';

@Injectable({
  providedIn: 'root'
})
export class RuntransactionService {
	errorMsg: string;
	headers: HttpHeaders;

  constructor(
    private httpClient: HttpClient
  ) { }
  
  
  public run(transactiondata: any): Observable<any> {
    //const transactionhttp = environment.apiURL + '/' + Transaction;
    const transactionhttp = environment.apiURL + '/' + Transaction;
    return this.standardHttpCall(transactionhttp, transactiondata)
  }
  
  	private standardHttpCall(httpaddr: string, data: any): Observable<any> {
		const headerdata = ServiceUtilityRoutines.setupHeader();
  		return this.httpClient.post(httpaddr,data, { 'headers': headerdata })
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
