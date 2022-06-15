import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceUtilityRoutines } from './serviceutilityroutines';
import { Service } from '../const/routes.const';

@Injectable({
	providedIn: 'root'
})
export class RunserviceprocessService {
	errorMsg: string;
	headers: HttpHeaders;

	constructor(
		private httpClient: HttpClient
	) { }


	public run(servicedata: any): Observable<any> {
		const servicehttp = environment.apiURL + '/' + Service;
		return this.standardHttpCall(servicehttp, servicedata)
	}

	private standardHttpCall(httpaddr: string, data: any): Observable<any> {
		const headerdata = ServiceUtilityRoutines.setupHeader();
		return this.httpClient.post(httpaddr, data, { headers: headerdata })
			.pipe(
				catchError(error => {
					if (error.error instanceof ErrorEvent) {
						this.errorMsg = `Error: ${error.error.message}`;
					} else {
						this.errorMsg = ServiceUtilityRoutines.getServerErrorMessage(error);
					}
					return of({'dataset:servicesuccessful': 'false', 'dataset:serviceresponsemessage': this.errorMsg, 'dataset:simpcatobj': null});
				}));

	}
}
