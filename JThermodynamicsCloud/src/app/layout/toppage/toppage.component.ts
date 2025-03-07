import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UseraccountComponent } from '../../catalogobjects/user/useraccount/useraccount.component';
import { DatabasepersonComponent } from '../../catalogobjects/user/databaseperson/databaseperson.component';
import { SessiondatamanagementService } from '../../services/sessiondatamanagement.service';
import { MatTabsModule } from '@angular/material/tabs';
import { ApplicationcardsComponent } from '../applicationcards/applicationcards.component';
import { MatDividerModule } from '@angular/material/divider';
import { UserinterfaceconstantsService } from '../../const/userinterfaceconstants.service';
import {CatalogobjectheaderComponent} from '../catalogobjectheader/catalogobjectheader.component';

@Component({
	selector: 'app-toppage',
	templateUrl: './toppage.component.html',
	styleUrls: ['./toppage.component.scss'],
	standalone: true,
	imports: [MatTabsModule, 
	ApplicationcardsComponent, 
	UseraccountComponent,
	CatalogobjectheaderComponent,
	DatabasepersonComponent,
	MatDividerModule,  
	CommonModule]
})
export class ToppageComponent implements AfterViewInit {

	@ViewChild('useraccount') useraccount!: UseraccountComponent;
	@ViewChild('databaseperson') person!: DatabasepersonComponent;
	
	

	useraccountdata: any | null = null;
	persondata: any | null = null;
	viewinitialized: boolean = false;
	
	//saveanno: Record<any, unknown> = {};
	personanno: boolean = false;
	accountanno: boolean = false;
	
	displayaccount = "User Account Data";
	accountfilenameroot = "UserAccount";
	displayperson = "User Data";
	personfilenameroot = "UserData";

	refresh: string;
	fetchinfo: string;
	displayinfo: string;
	changeinfo: string;
	saveinfo: string;


	//catalogtype = 'dataset:ActivityCatalogObjectModification';
	//typeclassification = 'dataset:CatalogObjectModificationType';

	persontype: string = 'dataset:DatabasePerson';
	accounttype: string = 'dataset:UserAccount';
	
	originaluseraccount: any;
	originalperson: any;

	message = 'Waiting for Info call';

	constructor(
		private constants: UserinterfaceconstantsService,
		//private menusetup: MenutreeserviceService,
		public session: SessiondatamanagementService,
		private cdRef: ChangeDetectorRef,
		//public dialog: MatDialog,
		//public annotations: OntologycatalogService,
	) {
		this.refresh = this.constants.refresh;
		this.fetchinfo = this.constants.fetchinfo;
		this.displayinfo = this.constants.displayinfo;
		this.changeinfo = this.constants.changeinfo;
		this.saveinfo = this.constants.saveinfo;
		
		this.originaluseraccount = this.session.getUserAccount();
		this.originalperson = this.session.getDatabasePerson();
			}

	ngAfterViewInit(): void {
		this.cdRef.detectChanges();
		this.viewinitialized = true;
		this.setData();
	}

	
	setUserAccountData(catalog: any) {
		this.useraccount.setData(catalog);
	}
	getUserAccountData(catalog: any) {
		this.useraccount.getData(catalog);
	}
	setPersonData(catalog: any) {
		this.person.setData(catalog);
	}
	getPersonData(catalog: any) {
		this.person.getData(catalog);
	}
	
	setData() {
		if (this.viewinitialized && this.personanno && this.accountanno) {
			this.persondata = this.session.getDatabasePerson();
			this.person.setData(this.persondata);
			this.useraccountdata = this.session.getUserAccount();
			this.useraccount.setData(this.useraccountdata);
		}
	}
	setUser(): void {
		this.cdRef.detectChanges();
		this.accountanno = true;
		this.setData();

	}
	setPerson(): void {
		this.cdRef.detectChanges();
		this.personanno = true;
		this.setData();
	}
	


}
