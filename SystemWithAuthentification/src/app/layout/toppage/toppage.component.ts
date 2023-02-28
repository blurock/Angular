import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {UseraccountComponent} from '../../catalogobjects/user/useraccount/useraccount.component';
import {DatabasepersonComponent} from '../../catalogobjects/user/databaseperson/databaseperson.component';
import {SessiondatamanagementService} from '../../services/sessiondatamanagement.service';
import { Router} from '@angular/router';

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
		public authService: AuthService,
		private router:Router
) {
	}
	
	setUser(): void {
		const useraccountdata = this.session.getUserAccount();
		this.useraccount.setData(useraccountdata);
	}
	setPerson(): void {
		const persondata = this.session.getDatabasePerson();
		this.person.setData(persondata);
		
	}
}
