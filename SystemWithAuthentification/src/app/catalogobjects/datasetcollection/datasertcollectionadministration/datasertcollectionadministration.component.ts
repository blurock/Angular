import { Component, OnInit, ViewChild } from '@angular/core';
import { RunserviceprocessService } from '../../../services/runserviceprocess.service'
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { ThermodynamicsdatasetcollectionidssetComponent } from '../../datasetcollection/thermodynamicsdatasetcollectionidsset/thermodynamicsdatasetcollectionidsset.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RuntransactiondialogComponent } from '../../../dialog/runtransactiondialog/runtransactiondialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NavItem } from '../../../primitives/nav-item';
import {IdentifiersService} from '../../../const/identifiers.service';


@Component({
	selector: 'app-datasertcollectionadministration',
	templateUrl: './datasertcollectionadministration.component.html',
	styleUrls: ['./datasertcollectionadministration.component.scss']
})
export class DatasertcollectionadministrationComponent implements OnInit {

	setuptitle = 'Add Collection Dataset to Master Dataset';
	selected: string;
	items: NavItem[];
	resultHtml: string;
	userid: string;
	useritems: any;
	objectform: FormGroup;
	sourcedataset = 'Choose Source';
	submit = 'Create System Dataset';
	failedsubmission = 'Failed Transaction: no result given';

	systemcollections: any;
	datasetcollections: any;
	collection: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;





	maintainer: string;
	catalogtype = 'dataset:ThermodynamicsDatasetCollectionIDsSet';
	cataloganno: any;
	activitytype = 'dataset:ActivityInformationCreateSystemCollection';
	activityanno: any;

	@ViewChild('thermocollectionset') thermocollectionset: ThermodynamicsdatasetcollectionidssetComponent;

	constructor(
		private formBuilder: FormBuilder,
		private annotations: OntologycatalogService,
		private runservice: RunserviceprocessService,
		private manageuser: ManageuserserviceService,
		public dialog: MatDialog,
		private identifiers: IdentifiersService
	) {
		this.objectform = this.formBuilder.group({
			DatasetCollectionsSetLabel: ['', Validators.required],
			CatalogDataObjectMaintainer: ['', Validators.required],
			SystemDatasetCollectionsSetLabel: ['', Validators.required],
			DescriptionTitle: ['System Dataset Collection', Validators.required],
			DatasetVersion: ['1.0', Validators.required]
		});
		this.getCatalogAnnoations(this.activitytype);
		this.getCatalogAnnoations(this.catalogtype);

		this.manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
				this.objectform.get('CatalogDataObjectMaintainer').setValue(this.maintainer);
			} else {
				this.runservice.checkReturn(result);
				alert(this.manageuser.errormaintainer);
			}
		});

	}

	ngOnInit(): void {
		
	}
	

	setCollection($event) {
		this.collection = $event;
		const type = $event['dcat:dataset'];
		this.selected = $event[this.identifiers.DatasetCollectionsLabel];
		
		if(type == 'dataset:ThermodynamicsSystemCollectionIDsSet') {
			this.selected = $event[this.identifiers.CatalogObjectKey];
			this.objectform.get('CatalogDataObjectMaintainer').setValue('systemthermodynamics');
		} else {
			this.objectform.get('CatalogDataObjectMaintainer').setValue(this.maintainer);
		}
		this.objectform.get('DatasetCollectionsSetLabel').setValue(this.selected);
		this.thermocollectionset.setData(this.collection);
	}

	userChosen(user: string): void {
		this.userid = user;
	}
	
	public getCatalogAnnoations(type: string): void {
		this.annotations.getNewCatalogObject(type).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.resultHtml = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					const anno = catalog[Ontologyconstants.annotations];
					if (type === this.catalogtype) {
						this.cataloganno = anno;
					} else {
						this.activityanno = anno;
					}


				}
			},
			error: (info: any) => { alert('Get Annotations failed: see logs'); }
		});
	}

	getListOfUsers(): void {
		const inputdata = {};
		inputdata[Ontologyconstants.service] = 'ListOfUserAccountNames';
		this.runservice.run(inputdata).subscribe({
			next: (responsedata: any) => {
				const success = responsedata[Ontologyconstants.successful];
				if (success === 'true') {
					const objarr = responsedata[Ontologyconstants.catalogobject];
					const obj = objarr[0];
					this.useritems = obj[Ontologyconstants.username];
				}
			}
		});
	}

	getActivity(activity: any): void {
		activity[this.activityanno['dataset:DatasetCollectionsSetLabel'][this.identifier]] = this.objectform.get('DatasetCollectionsSetLabel').value;
		activity[this.activityanno['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.objectform.get('CatalogDataObjectMaintainer').value;
		activity[this.activityanno['dataset:SystemDatasetCollectionsSetLabel'][this.identifier]] = this.objectform.get('SystemDatasetCollectionsSetLabel').value;
		activity[this.activityanno['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		activity[this.activityanno['dataset:DatasetVersion'][this.identifier]] = this.objectform.get('DatasetVersion').value;

	}
	submitSystem(): void {
		const transaction = {};
		transaction[Ontologyconstants.TransactionEventType] = 'dataset:DatasetCollectionSetCreateSystemCollection';
		const activity = {};
		this.getActivity(activity);
		transaction[Ontologyconstants.ActivityInfo] = activity;
		const dialogRef = this.dialog.open(RuntransactiondialogComponent, {
			data: transaction
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success === 'true') {
					alert('Transaction successful');
				} else {
				}
			} else {
				this.resultHtml = this.failedsubmission;
			}
		});

	}

}
