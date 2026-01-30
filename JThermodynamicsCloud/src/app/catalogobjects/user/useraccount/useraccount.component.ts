import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from 'systemconstants';
import { UntypedFormBuilder, Validators, FormsModule } from '@angular/forms';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { DatadatadescriptionComponent } from '../../datadatadescription/datadatadescription.component';
import { NavItem } from 'systemprimitives';
import { SimpledatabaseobjectstructureComponent } from '../../simpledatabaseobjectstructure/simpledatabaseobjectstructure.component';
import { __assign } from 'tslib';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemComponent } from 'systemprimitives';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MenutreeserviceService } from 'systemprimitives';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
	selector: 'app-useraccount',
	templateUrl: './useraccount.component.html',
	styleUrls: ['./useraccount.component.scss'],
	standalone: true,
	imports: [MatCardModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		FormsModule,
		MatGridListModule,
		MatMenuModule,
		MatInputModule,
		MenuItemComponent,
		CommonModule,
		MatProgressSpinnerModule,
		DatadatadescriptionComponent,
		SimpledatabaseobjectstructureComponent]
})
export class UseraccountComponent implements OnInit, AfterViewInit {


	title = "User Account Information";
	message = "Waiting";
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	adminrole = false;
	useraccountclassification = 'dataset:UserAccountRole';
	descriptionsuffix = 'UserAccount';
	catalogtype = "dataset:UserAccount";
	useraccountrole = 'dataset:UserAccountRole';
	useraccountitems: NavItem[] = [];
	public viewinitialized: boolean = false;
	useraccount: any | null = null;
	annoinfo: any;
	catalogobj: any;
	//objectform: UntypedFormGroup;
	maintainer: string = '';
	userAccountGroup: any;
	showuseraccount: boolean = false;
	
	@Output() setDataChange = new EventEmitter<any>();
	@Output() annoReady = new EventEmitter<any>();

	@ViewChild('description') description!: DatadatadescriptionComponent;
	//@ViewChild('firestoreid') firestoreid!: FiresytorecatalogidComponent;
	@ViewChild('simpledata') simpledata!: SimpledatabaseobjectstructureComponent;

	setUserAccountRole($event: String) {
		if (this.adminrole) {
			this.userAccountGroup.get('UserAccountRole').setValue($event);
		}

	}
	constructor(
		private menusetup: MenutreeserviceService,
		manageuser: ManageuserserviceService,
		private cdRef: ChangeDetectorRef,
		public annotations: OntologycatalogService,
		private formBuilder: UntypedFormBuilder
	) {
		this.getCatalogAnnoations();

		this.userAccountGroup = this.formBuilder.group({
			UID: ['', Validators.required],
			AuthorizationType: ['', Validators.required],
			username: ['', Validators.required],
			Email: ['', Validators.email],
			UserAccountRole: ['', Validators.required],
		});
		this.userAccountGroup.get('UserAccountRole').setValue('dataset:StandardUser');
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});

	}



	ngOnInit(): void {

	}
	ngAfterViewInit(): void {
		this.viewinitialized = true;

		if (this.useraccount) {
			this.setData(this.useraccount);
		}

	}

	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				if (responsedata) {
					const response = responsedata;
					this.message = response[Ontologyconstants.message];
					if (response[Ontologyconstants.successful]) {
						const catalog = response[Ontologyconstants.catalogobject];
						this.catalogobj = catalog[Ontologyconstants.outputobject];
						this.annoinfo = catalog[Ontologyconstants.annotations];
						this.useraccountitems = this.menusetup.findChoices(this.annoinfo, this.useraccountclassification);
						this.annoReady.emit();
						this.cdRef.detectChanges();
						if (this.useraccount) {
							this.setData(this.useraccount);
						}
					} else {
						this.message = responsedata;
					}
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}
	getData(catalog: any): void {
		catalog[this.annoinfo['dataset:UID'][this.identifier]] = this.userAccountGroup.get('UID').value;
		catalog[this.annoinfo['dataset:AuthorizationType'][this.identifier]] = this.userAccountGroup.get('AuthorizationType').value;
		catalog[this.annoinfo['dataset:username'][this.identifier]] = this.userAccountGroup.get('username').value;
		catalog[this.annoinfo['dataset:Email'][this.identifier]] = this.userAccountGroup.get('Email').value;
		catalog[this.annoinfo['dataset:UserAccountRole'][this.identifier]] = this.userAccountGroup.get('UserAccountRole').value;
		this.description.getData(catalog);
		this.simpledata.getData(catalog);
		//this.firestoreid.getData(catalog);

	}

	setData(catalog: any): void {
		this.useraccount = catalog;
		if(this.setDataChange) {
			this.setDataChange.emit(catalog);
		}
		
		if (this.viewinitialized && this.annoinfo != null) {
			this.userAccountGroup.get('UID').setValue(catalog[this.annoinfo['dataset:UID'][this.identifier]]);
			this.userAccountGroup.get('AuthorizationType').setValue(catalog[this.annoinfo['dataset:AuthorizationType'][this.identifier]]);
			this.userAccountGroup.get('username').setValue(catalog[this.annoinfo['dataset:username'][this.identifier]]);
			this.userAccountGroup.get('Email').setValue(catalog[this.annoinfo['dataset:Email'][this.identifier]]);
			this.userAccountGroup.get('UserAccountRole').setValue(catalog[this.annoinfo['dataset:UserAccountRole'][this.identifier]]);
			const desc = catalog[this.annoinfo['dataset:DataDescriptionUserAccount'][this.identifier]];
			this.description.setData(desc);
			const firestoreidvalues = catalog[this.annoinfo['dataset:FirestoreCatalogID'][this.identifier]];
			//this.firestoreid.setData(firestoreidvalues);
			this.simpledata.setData(catalog);


		}
	}
}
