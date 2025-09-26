import { Component, OnInit,ViewChild} from '@angular/core';
import { UntypedFormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { NavItem } from '../../../primitives/nav-item';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { MatDialog } from '@angular/material/dialog';
import { RuntransactiondialogComponent } from '../../../dialog/runtransactiondialog/runtransactiondialog.component';
import {SessiondatamanagementService} from '../../../services/sessiondatamanagement.service';
import { Router } from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper'
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import {MenuItemComponent} from '../../../primitives/menu-item/menu-item.component';
import { CommonModule} from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {IdentifiersService} from '../../../const/identifiers.service';

@Component({
	selector: 'app-setupuserinformation',
	templateUrl: './setupuserinformation.component.html',
	styleUrls: ['./setupuserinformation.component.scss'],
	standalone: true,
	imports: [MenuItemComponent,MatStepperModule,
	MatFormFieldModule,ReactiveFormsModule,
	MatGridListModule,MatMenuModule,MatMenuTrigger,FormsModule,MatInputModule,
	CommonModule ]
})
export class SetupuserinformationComponent implements OnInit {

	islinear = true;
	tocreate = true;
	signinFormGroup: FormGroup;
	userAccountGroup: FormGroup;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	failedresponse = 'Failed to generate the user account, look at logs for error';
	gototopbutton = 'Creation successful!!!    Press to start using JThermodynamics';
	failedsubmission = 'Failure in transaction';
	submitbutton = 'Create User Account';
	catalogtype = 'dataset:ActivityInitializeNewAccount';
	message: string = 'no message';
	annoinfo: any = null;
	useraccountrole = 'dataset:UserAccountRole';
	useraccountitems: NavItem[] = [];
	userclassification = 'dataset:UserClassification';
	userclassificationitems: NavItem[] = [];
	usertitle = 'dataset:UserTitle';
	usertitleitems: NavItem[] = [];
	resultHtml: string = '<div>no result yet</div>';

	notadminrole = true;
	suffix = 'Person';

	constructor(
		public session: SessiondatamanagementService,
		public dialog: MatDialog,
		private formBuilder: UntypedFormBuilder,
		public annotations: OntologycatalogService,
		private menusetup: MenutreeserviceService,
		public router: Router
	) {
		this.getCatalogAnnoations();

		this.userAccountGroup = this.formBuilder.group({
			AuthorizationType: ['',Validators.required],
			UID: ['', Validators.required],
			username: ['', Validators.required],
			Email: ['', Validators.email],
			UserAccountRole: ['', Validators.required],
		});
		this.userAccountGroup.get('UserAccountRole')?.setValue('dataset:StandardUser');

		this.signinFormGroup = this.formBuilder.group({
			familyName: ['', Validators.required],
			givenName: ['', Validators.required],
			UserTitle: ['', Validators.required],
			UserClassification: ['', Validators.required],
			DescriptionAbstractPerson: ['', Validators.required]
		});
		this.signinFormGroup.get('UserClassification')?.setValue('dataset:ConceptResearcher');
		
	}
	@ViewChild('useraccountmenu') useraccountmenu! : MenuItemComponent;
	
	ngOnInit(): void {
		this.setupUserParameters();
	}
    setupUserParameters() {
		
	const loginaccount = this.session.getLoginAccountInfo();
		let displayName = 'user';
		let providerid = '';
		let email = 'user@gmail.com';
		let uid = 'xxxxx';
		let role = 'dataset:StandardUser';
		if (loginaccount != null) {
   		if (loginaccount[Ontologyconstants.AuthorizationType] != null) {
				providerid = loginaccount[Ontologyconstants.AuthorizationType];
}
			if (loginaccount[Ontologyconstants.email] != null) {
				email = loginaccount[Ontologyconstants.email];
				
				const index = email.indexOf('@');
				displayName = email.substring(0, index);
			}
			if (loginaccount[Ontologyconstants.username] != null) {
				
				displayName = loginaccount[Ontologyconstants.username];
			}
			if (loginaccount[Ontologyconstants.UID] != null) {
				uid = loginaccount[Ontologyconstants.UID];
			} else {
				alert('not authorized');
			}
            if(loginaccount[Ontologyconstants.UserAccountRole] != null) {
				role = loginaccount[Ontologyconstants.UserAccountRole];
			}
		} else {
			location.reload();
		}
		this.userAccountGroup.get('UID')?.setValue(uid);
		this.userAccountGroup.get('username')?.setValue(displayName);
		this.userAccountGroup.get('Email')?.setValue(email);
		this.userAccountGroup.get('AuthorizationType')?.setValue(providerid);
		this.userAccountGroup.get('UserAccountRole')?.setValue(role);

	}
	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.useraccountitems = this.menusetup.findChoices(this.annoinfo, this.useraccountrole);
					this.userclassificationitems = this.menusetup.findChoices(this.annoinfo, this.userclassification);
					this.usertitleitems = this.menusetup.findChoices(this.annoinfo, this.usertitle);
					//this.setupUserParameters();
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}



	setUserClassification($event: String): void {
		this.signinFormGroup.get('UserClassification')?.setValue($event);
	}

	setUserTitle($event: String): void {
		this.signinFormGroup.get('UserTitle')?.setValue($event);
	}
	setUserAccountRole($event: String): void {
		this.userAccountGroup.get('AccountRole')?.setValue($event);
	}

	getData(activity: any): void {
		activity[this.annoinfo['dataset:AuthorizationType'][this.identifier]] = this.userAccountGroup.get('AuthorizationType')?.value;
		activity[this.annoinfo['dataset:UID'][this.identifier]] = this.userAccountGroup.get('UID')?.value;
		activity[this.annoinfo['dataset:username'][this.identifier]] = this.userAccountGroup.get('username')?.value;
		activity[this.annoinfo['dataset:Email'][this.identifier]] = this.userAccountGroup.get('Email')?.value;
		activity[this.annoinfo['dataset:UserAccountRole'][this.identifier]] = this.userAccountGroup.get('UserAccountRole')?.value;
		const persondescription: Record<string, unknown> = {};
		const nameofperson: Record<string, unknown> = {};
		persondescription[this.annoinfo['dataset:PersonalDescription'][this.identifier]] = nameofperson;
		activity[this.annoinfo['dataset:PersonalDescription'][this.identifier]] = persondescription;
		nameofperson[this.annoinfo['dataset:familyName'][this.identifier]] = this.signinFormGroup.get('familyName')?.value;
		nameofperson[this.annoinfo['dataset:givenName'][this.identifier]] = this.signinFormGroup.get('givenName')?.value;
		nameofperson[this.annoinfo['dataset:UserTitle'][this.identifier]] = this.signinFormGroup.get('UserTitle')?.value;
		persondescription[this.annoinfo['dataset:UserClassification'][this.identifier]] = this.signinFormGroup.get('UserClassification')?.value;
		const description: Record<string, unknown> = {};

		activity[this.annoinfo['dataset:DataDescriptionPerson'][this.identifier]] = description;
		description[this.annoinfo['dataset:DescriptionAbstractPerson'][this.identifier]] =
			this.signinFormGroup.get('DescriptionAbstractPerson')?.value;
		const persontitle = this.signinFormGroup.get('familyName')?.value + ', ' + this.signinFormGroup.get('givenName')?.value + '  (' +
			this.signinFormGroup.get('UserClassification')?.value + ')';
		description[this.annoinfo['dataset:DescriptionTitlePerson'][this.identifier]] = persontitle;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = "Creation of UserAcccount and DatabasePerson for "
			+ this.userAccountGroup.get('username')?.value;

		const concept: Record<string, unknown> = {};
		description[this.annoinfo['dataset:PurposeConceptPerson'][this.identifier]] = concept;
		concept[this.annoinfo['dataset:ConceptPerson'][this.identifier]] = this.userAccountGroup.get('UserAccountRole')?.value;
		concept[this.annoinfo['dataset:PurposePerson'][this.identifier]] = this.signinFormGroup.get('UserClassification')?.value;
		description[this.annoinfo['dataset:DescriptionKeywordPerson'][this.identifier]] = '';
	}

	setData(activity: any): void {

	}
	
	

	createTransaction(transaction: any): void {
		const activity = {};
		transaction['prov:activity'] = 'dataset:InitializerUserAccount';
		transaction['dataset:activityinfo'] = activity;
		this.getData(activity);
	}
	
	gotoTopWindow(): void {
		this.router.navigateByUrl('/toppage');
	}

	createUserAccount() {
		const transaction = {};
		this.createTransaction(transaction);
		const dialogRef = this.dialog.open(RuntransactiondialogComponent, {
			data: transaction
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success === 'true') {
				    const arr = result[Ontologyconstants.catalogobject];
				    const setofobjects = arr[0];
					this.session.setLoginStatus('dataset:LoginRegistration');
					const person = this.findobject(arr, Ontologyconstants.DatabasePerson);
					//const person = setofobjects[Ontologyconstants.DatabasePerson];
					this.session.setDatabasePerson(person);
					const useraccount = this.findobject(arr, Ontologyconstants.UserAccount);
					//const useraccount = setofobjects[Ontologyconstants.UserAccount];
					this.session.setUserAccount(useraccount);
					this.tocreate = false;
				} else {
					alert(this.failedresponse);
				}
			} else {
				this.resultHtml = this.failedsubmission;
			}
		});
	}
	
	findobject(arr: any, id: string) {
		var person = null;
		for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
			console.log('findobject:' +  obj[this.identifier] + ', ' + id);
            if (obj[this.identifier] === id) {
                person = obj;
                break;
            }
        }
		return person;
	}

}
