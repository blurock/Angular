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
export class FirestorelistelementComponent implements OnInit, AfterViewInit {


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

	ngAfterViewInit(): void {
		if (this.catalogID != null) {
			this.setData(this.catalogID);
		}
	}

	setData(catalogID: any): void {
		this.firestoreid.setData(catalogID);
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
					if (this.catalogobject != null) {
						this.catalogview.setData(this.catalogobject);
					} else {
						alert('Result null');
					}
				} else {
					alert('Read Object not successful');
				}
			}
		});

	}

}
