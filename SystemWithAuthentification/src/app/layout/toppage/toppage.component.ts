import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {UseraccountComponent} from '../../catalogobjects/user/useraccount/useraccount.component';
import {DatabasepersonComponent} from '../../catalogobjects/user/databaseperson/databaseperson.component';
import {SessiondatamanagementService} from '../../services/sessiondatamanagement.service';


@Component({
	selector: 'app-toppage',
	templateUrl: './toppage.component.html',
	styleUrls: ['./toppage.component.scss']
})
export class ToppageComponent {

	@ViewChild('useraccount') useraccount: UseraccountComponent;
	@ViewChild('databaseperson') person: DatabasepersonComponent;

	constructor(
		public session: SessiondatamanagementService,
		public authService: AuthService
) {
		
	}
	
	setUser(): void {
		const useraccountdata = this.session.getUserAccount();
		alert("ToppageComponent: " + JSON.stringify(useraccountdata));
		this.useraccount.setData(useraccountdata);
		
	}
	setPerson(): void {
		const persondata = this.session.getDatabasePerson();
		this.person.setData(persondata);
		
	}
}
