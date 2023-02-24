import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceUtilityRoutines } from './serviceutilityroutines';
import {Transaction} from '../const/routes.const';
import {SessiondatamanagementService} from '../services/sessiondatamanagement.service'
@Injectable({
  providedIn: 'root'
})
export class RuntransactionService {
 
	errorMsg: string;
	headers: HttpHeaders;

  constructor(
    private session: SessiondatamanagementService,
    private httpClient: HttpClient
  ) { }
  
  
  public run(transactiondata: any): Observable<any> {
    const transactionhttp = environment.apiURL + '/' + Transaction;
    return this.standardHttpCall(transactionhttp, transactiondata)
  }
  
  	private standardHttpCall(httpaddr: string, data: any): Observable<any> {
      alert("Run Transaction");
      const uid = this.session.getUID();
      data['uid'] = uid;
      alert("UID: " + uid);
		const token = this.session.getToken();
		alert("Token: " + token);
		const headerdata = ServiceUtilityRoutines.setupHeader(token);
		alert("Header data: " + headerdata);
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
