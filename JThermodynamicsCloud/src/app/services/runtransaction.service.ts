import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ServiceUtilityRoutines } from 'systemprimitives';
import {Transaction} from 'systemconstants';
import {SessiondatamanagementService} from '../services/sessiondatamanagement.service'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RuntransactionService {
 
	errorMsg: string = 'no error';

  constructor(
	public authService: AuthService,
    private session: SessiondatamanagementService,
    
  ) { }
  
  
  public run(transactiondata: any): Observable<any> {
    const transactionhttp = environment.apiURL + '/' + Transaction;
    return this.standardHttpCall(transactionhttp, transactiondata)
  }
  
  	private standardHttpCall(httpaddr: string, data: any): Observable<any> {
       const uid = this.session.getUID();
      data['uid'] = uid;
		return this.authService.postData(httpaddr,data)
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
