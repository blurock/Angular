import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { SessiondatamanagementService } from '../services/sessiondatamanagement.service';
import { RunserviceprocessService } from '../services/runserviceprocess.service';
import { Ontologyconstants } from '../const/ontologyconstants';

@Injectable({
	providedIn: 'root'
})
export class ManageuserserviceService {

	public errormaintainer = 'Error in determining maintainer';

	constructor(
		private runservice: RunserviceprocessService,
		private session: SessiondatamanagementService
	) { 
	}



	determineMaintainer(): Observable<string> {
		var uid = this.session.getUID();
		if (uid == null) {
			uid = this.session.getGuestLabel();
			//this.router.navigateByUrl(``);
		}
		return of(uid);
	}

	getListOfUsers(): string[] {
		var inputdata = { service: 'ListOfUserAccountNames'};
		var users: any[] = [];
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
