import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { SessiondatamanagementService } from '../services/sessiondatamanagement.service';
import { RunserviceprocessService } from '../services/runserviceprocess.service';
import { Router } from '@angular/router';
import { Ontologyconstants } from '../const/ontologyconstants';
import {AuthService} from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class ManageuserserviceService {

	public errormaintainer = 'Error in determining maintainer';

	constructor(private httpClient: HttpClient,
		private runservice: RunserviceprocessService,
		private session: SessiondatamanagementService,
		private router: Router,
		private authservice: AuthService
	) { 
		alert("start ManageuserserviceService");
	}



	determineMaintainer(): Observable<string> {
		var uid = this.session.getUID();
		if (uid == null) {
			alert("Guest Login");
			uid = this.session.getGuestLabel();
			//this.router.navigateByUrl(``);
		}
		return of(uid);
	}

	getListOfUsers(): string[] {
		const inputdata = {};
		inputdata['service'] = 'ListOfUserAccountNames';
		var users = [];
		this.runservice.run(inputdata).subscribe({
			next: (responsedata: any) => {
				const success = responsedata[Ontologyconstants.successful];
				if (success == 'true') {
					const usersarray = responsedata[Ontologyconstants.catalogobject];
					for (var i = 0; i < usersarray.size(); i++) {
						users.push(usersarray[i]);
					}
				} else {
					alert('List of Users not available');
				}
			}
		});
		return users;
	}

}
