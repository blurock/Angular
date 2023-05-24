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
	selector: 'app-copysystemdatasetcollections',
	templateUrl: './copysystemdatasetcollections.component.html',
	styleUrls: ['./copysystemdatasetcollections.component.scss']
})
export class CopysystemdatasetcollectionsComponent implements OnInit {

	setuptitle = 'Copy Collection from System Collection';
	failedsubmission = 'FAIled submission';

	systemcollections: any;
	datasetcollections: any;
	collection: any;
	items: NavItem[];
	objectform: FormGroup;
	selected: string;
	sourcedataset: string;
	submitlabel = 'Create System Collection';

	resultHtml: string;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	maintainer ="Guest";
	catalogtype = 'dataset:ThermodynamicsDatasetCollectionIDsSet';
	cataloganno: any;
	activitytype = 'dataset:ActivityInformationCopyCollection';
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
			CatalogDataObjectMaintainer: ['', Validators.required],
			DestinationCollectionMaintainer: ['', Validators.required],
			SourceCollectionMaintainer: ['', Validators.required],
			DatasetCollectionSetDestinationLabel: ['', Validators.required],
			DatasetCollectionSetSourceLabel: ['', Validators.required],
			DescriptionTitle: ['', Validators.required],
			DatasetVersion: ['', Validators.required],
			DatasetName: ['', Validators.required]
		});

		this.getCatalogAnnoations(this.activitytype);
		this.getCatalogAnnoations(this.catalogtype);

		this.manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(this.manageuser.errormaintainer);
			}
		});
			this.objectform.get('CatalogDataObjectMaintainer').setValue('systemthermodynamics');
		        this.objectform.get('DestinationCollectionMaintainer').setValue('systemthermodynamics');

	}
	
	invalid() {
		return this.objectform.invalid;
	}

	ngOnInit(): void {
	}
	
	setCollection($event): void {
		const type = $event['dcat:dataset'];
		var collectionname = $event[this.identifiers.DatasetCollectionsLabel];
		if(type == 'dataset:ThermodynamicsSystemCollectionIDsSet') {
			//collectionname = $event[this.identifiers.CatalogObjectKey];
			this.objectform.get('SourceCollectionMaintainer').setValue('systemthermodynamics');
		} else {
			this.objectform.get('SourceCollectionMaintainer').setValue(this.maintainer);
		}
		this.objectform.get('DatasetCollectionSetSourceLabel').setValue(collectionname);
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
	
	getActivity(activity: any): void {
		activity[this.activityanno['dataset:CatalogDataObjectMaintainer'][this.identifier]] =
			this.objectform.get('CatalogDataObjectMaintainer').value;
		activity[this.activityanno['dataset:DatasetCollectionSetSourceLabel'][this.identifier]] =
			this.objectform.get('DatasetCollectionSetSourceLabel').value;
		activity[this.activityanno['dataset:SourceCollectionMaintainer'][this.identifier]] =
			this.objectform.get('SourceCollectionMaintainer').value;
			
		activity[this.activityanno['dataset:DatasetCollectionSetDestinationLabel'][this.identifier]] =
			this.objectform.get('DatasetCollectionSetDestinationLabel').value;
		activity[this.activityanno['dataset:DestinationCollectionMaintainer'][this.identifier]] =
			this.objectform.get('DestinationCollectionMaintainer').value;
		
		activity[this.activityanno['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		activity[this.activityanno['dataset:DatasetVersion'][this.identifier]] = this.objectform.get('DatasetVersion').value;
		activity[this.activityanno['dataset:DatasetName'][this.identifier]] = this.objectform.get('DatasetName').value;
		
	}

	submitSystem(): void {
		const transaction = {};
		transaction[Ontologyconstants.TransactionEventType] = 'dataset:DatasetCollectionSetCopyCollection';
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
					this.runservice.checkReturn(result);
				}
			} else {
				this.resultHtml = this.failedsubmission;
			}
		});
	}

}
