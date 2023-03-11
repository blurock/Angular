import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceUtilityRoutines } from './serviceutilityroutines';
import { Service } from '../const/routes.const';
import {SessiondatamanagementService} from '../services/sessiondatamanagement.service';

@Injectable({
	providedIn: 'root'
})
export class RunserviceprocessService {
	errorMsg: string;
	headers: HttpHeaders;

	constructor(
		private session: SessiondatamanagementService,
		private httpClient: HttpClient
	) { }


	public run(servicedata: any): Observable<any> {
		const servicehttp = environment.apiURL + '/' + Service;
		return this.standardHttpCall(servicehttp, servicedata)
	}

	private standardHttpCall(httpaddr: string, data: any): Observable<any> {
       const uid = this.session.getUID();
      data['uid'] = uid;
		const token = this.session.getToken();
		const headerdata = ServiceUtilityRoutines.setupHeader(token);
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
