import { Component, OnInit, ViewChild } from '@angular/core';
import { RunserviceprocessService } from '../../../services/runserviceprocess.service'
import { Ontologyconstants } from '../../../const/ontologyconstants';
import {UseraccountComponent} from '../useraccount/useraccount.component';

@Component({
	selector: 'app-useraccountadministration',
	templateUrl: './useraccountadministration.component.html',
	styleUrls: ['./useraccountadministration.component.scss']
})
export class UseraccountadministrationComponent implements OnInit {

	serviceid = 'service';
	usernameid = 'foaf:account';
	
	setuptitle = 'Choose User Account';

	items: any;
	resultHtml: string;
	person: any;
	account: any;
	
	@ViewChild('useraccount') useraccount: UseraccountComponent;

	constructor(public runservice: RunserviceprocessService) { }

	ngOnInit(): void {
		this.getAccountIDs();
	}

	getAccountIDs(): any {
		const inputdata = {};
		inputdata[this.serviceid] = 'ListOfUserAccountNames';
		this.runservice.run(inputdata).subscribe({
			next: (responsedata: any) => {
				const success = responsedata[Ontologyconstants.successful];
				if (success == 'true') {
					const obj = responsedata[Ontologyconstants.catalogobject][0];
					this.items = obj[this.usernameid];
				} else {
					alert('List of Users not available');
				}
			}
		});
	}

	userChosen(username: string): void {
		const inputdata = {};
		inputdata[this.serviceid] = 'GetUserAccountAndDatabasePerson';
		inputdata[this.usernameid] = username;
		this.runservice.run(inputdata).subscribe({
			next: (responsedata: any) => {
				const success = responsedata[Ontologyconstants.successful];
				this.resultHtml = responsedata[Ontologyconstants.message]
				if (success === 'true') {
					const obj = responsedata[Ontologyconstants.catalogobject][0];
					this.person = obj['vcard:Individual'];
					this.account = obj['prov:SoftwareAgent'];
					alert(JSON.stringify(this.account));
					this.useraccount.setData(this.account);
				} else {
					alert('Retrieval of usr information not successful: see logs');
				}
			}
		});
	}

}
