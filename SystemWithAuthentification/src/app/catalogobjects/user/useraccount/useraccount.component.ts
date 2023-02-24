import { Component, OnInit, ViewChild, Output, EventEmitter  } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { DatadatadescriptionComponent } from '../../datadatadescription/datadatadescription.component';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';
import {SimpledatabaseobjectstructureComponent} from '../../simpledatabaseobjectstructure/simpledatabaseobjectstructure.component';
import { __assign } from 'tslib';

@Component({
	selector: 'app-useraccount',
	templateUrl: './useraccount.component.html',
	styleUrls: ['./useraccount.component.scss']
})
export class UseraccountComponent implements OnInit {
	
	@Output() annoReady = new EventEmitter<any>();

	title = "User Account Information";
	message = "Waiting";
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	adminrole = false;
	
descriptionsuffix = 'UserAccount';
	catalogtype = "dataset:UserAccount";
	useraccountrole = 'dataset:UserAccountRole';
	useraccountitems: NavItem[] = [];

	annoinfo: any;
	catalogobj: any;
	objectform: FormGroup;
	maintainer: string;
	userAccountGroup: any;

	@ViewChild('description') description: DatadatadescriptionComponent;
	@ViewChild('firestoreid') firestoreid: FiresytorecatalogidComponent;
	@ViewChild('simpledata') simpledata: SimpledatabaseobjectstructureComponent;


	constructor(
		manageuser: ManageuserserviceService,
		public annotations: OntologycatalogService,
		private formBuilder: FormBuilder,
		private menusetup: MenutreeserviceService
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
	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.annoReady.emit();
				} else {
					this.message = responsedata;
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
	}

	setData(catalog: any): void {
		this.userAccountGroup.get('UID').setValue(catalog[this.annoinfo['dataset:UID'][this.identifier]]);
		this.userAccountGroup.get('AuthorizationType').setValue(catalog[this.annoinfo['dataset:AuthorizationType'][this.identifier]]);
		this.userAccountGroup.get('username').setValue(catalog[this.annoinfo['dataset:username'][this.identifier]]);
		this.userAccountGroup.get('Email').setValue(catalog[this.annoinfo['dataset:Email'][this.identifier]]);
		this.userAccountGroup.get('UserAccountRole').setValue(catalog[this.annoinfo['dataset:UserAccountRole'][this.identifier]]);
		const desc = catalog[this.annoinfo['dataset:DataDescriptionUserAccount'][this.identifier]];
		this.description.setData(desc);
		const firestoreidvalues = catalog[this.annoinfo['dataset:FirestoreCatalogID'][this.identifier]];
		this.firestoreid.setData(firestoreidvalues);
		this.simpledata.setData(catalog);
	}
}
