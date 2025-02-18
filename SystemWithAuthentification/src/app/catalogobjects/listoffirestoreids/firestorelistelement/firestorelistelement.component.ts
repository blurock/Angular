import { Component, OnInit, Input, Output, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { RunserviceprocessService } from '../../../services/runserviceprocess.service';
import { LoadChildDirective } from '../../../directives/load-child.directive';
import { GeneralcatalogobjectvisualizationComponent } from '../../generalcatalogobjectvisualization/generalcatalogobjectvisualization.component';

@Component({
	selector: 'app-firestorelistelement',
	templateUrl: './firestorelistelement.component.html',
	styleUrls: ['./firestorelistelement.component.scss']
})
export class FirestorelistelementComponent implements OnInit {


	@Input() anno: any;
	@Input() catalogID: any;
	@Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();

	index: number;
	title: string;
	catalogobject = {};
	catalogjson: string;
	objectcontent = 'Object Content';
	objdisplay = false;

	serviceid = 'service';

	@ViewChild('firestoreid') firestoreid: FiresytorecatalogidComponent;
	@ViewChild('catalogview') catalogview: GeneralcatalogobjectvisualizationComponent;

	constructor(
		private runservice: RunserviceprocessService
	) {
		this.title = 'Firestore Object';
	}

	ngOnInit(): void {
	}


	setData(catalogID: any): void {
		this.firestoreid.setData(catalogID);
	}
	
	getData(catalog: any): void {
		this.firestoreid.getData(catalog);
		}

	public setIndex(index: number): void {
		this.index = index;
		this.title = 'Object: ' + this.index;
	}

	deleteLink(): void {
		this.deleteEvent.emit(this.index);
	}

	getCatalogObject() {
		this.objdisplay = true;
		const json = {};
		json[this.serviceid] = 'ReadCatalogObjectWithFirestoreAddress';
		this.firestoreid.getData(json);
		this.runservice.run(json).subscribe({
			next: (responsedata: any) => {
				const success = responsedata['dataset:servicesuccessful'];
				if (success == 'true') {
					this.catalogobject = responsedata['dataset:simpcatobj'];
					alert("getCatalogObject() " + JSON.stringify(this.catalogobject));
					if (responsedata != null) {
						this.catalogview.setData(this.catalogobject);
					} else {
						alert('Result null');
					}
				} else {
					this.runservice.checkReturn(responsedata);
					alert('Read Object not successful');
				}
			}
		});

	}

}
