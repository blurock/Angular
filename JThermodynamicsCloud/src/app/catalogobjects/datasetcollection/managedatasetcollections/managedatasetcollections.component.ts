import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { CreatenewdatasetcollectionComponent } from '../createnewdatasetcollection/createnewdatasetcollection.component';
import { ModifydatasetcollectionidsComponent } from '../modifydatasetcollectionids/modifydatasetcollectionids.component';
import { VisualizedatasetcollectionidsComponent } from '../visualizedatasetcollectionids/visualizedatasetcollectionids.component';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';

@Component({
	selector: 'app-managedatasetcollections',
	templateUrl: './managedatasetcollections.component.html',
	styleUrls: ['./managedatasetcollections.component.scss']
})
export class ManagedatasetcollectionsComponent implements OnInit {


	waitmessage = 'Initializing';

	catalogobj: any;
	cataloganno: any;
	maintainer: string;

	catalogtype = "dataset:ActivityInformationDatasetCollectionSetCreation";

	@ViewChild('createcollection') createcollection: CreatenewdatasetcollectionComponent;
	@ViewChild('modifycollection') modifycollection: ModifydatasetcollectionidsComponent;
	@ViewChild('visualcollection') visualcollection: VisualizedatasetcollectionidsComponent;

	constructor(
		public annotations: OntologycatalogService,
		manageuser: ManageuserserviceService
	) {
		this.getCatalogAnnoations();
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

	setData(collectionids: any) {
		//this.createcollection.setTransaction(collectionids);
		this.modifycollection.setPrerequisite(collectionids);
		this.visualcollection.setData(collectionids);
	}

	newCollectionV($event) {
		this.setData($event);
	};
	newCollectionM($event) {
		this.setData($event);
	}
	newCollectionC($event) {
		this.setData($event);
	}

	public getCatalogAnnoations(): void {
		this.waitmessage = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.waitmessage = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.cataloganno = catalog[Ontologyconstants.annotations];
				} else {
					this.waitmessage = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.waitmessage); }
		});
	}
}
