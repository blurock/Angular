import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { RequiredtransactioninformationComponent } from '../../transaction/requiredtransactioninformation/requiredtransactioninformation.component';
import { RunserviceprocessService } from '../../../services/runserviceprocess.service';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
	selector: 'app-liistelementrequiredinformation',
	imports: [CommonModule,
		MatCardModule,
		MatIconModule,
		MatGridListModule, 
		RequiredtransactioninformationComponent
	],
	templateUrl: './liistelementrequiredinformation.component.html',
	styleUrl: './liistelementrequiredinformation.component.scss'
})
export class LiistelementrequiredinformationComponent implements AfterViewInit {



	@Input() anno: any;
	@Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();

	index: number = 0;
	title: string;
	catalogobject = {};
	catalogjson: string = '';
	objectcontent = 'Object Content';
	objdisplay = false;
	rdfsidentifier = Ontologyconstants.dctermsidentifier;

	required!: any;
	serviceid = 'service';

	@ViewChild('requiredinfoobject') requiredinfoobject!: RequiredtransactioninformationComponent;

	constructor(
		private runservice: RunserviceprocessService,
		public interfaceconstants: UserinterfaceconstantsService,
		public constants: UserinterfaceconstantsService
	) {
		this.title = 'Firestore Object';
	}

	ngAfterViewInit(): void {
		if (this.required) {
			this.setData(this.required);
		}
	}

	setData(info: any): void {
		this.required = info;
		if (this.requiredinfoobject) {
			this.requiredinfoobject.setData(info);
		}
	}

	getData(catalog: any): void {
		this.requiredinfoobject.getData(catalog);
	}

	public setIndex(index: number): void {
		this.index = index;
		this.title = this.constants.firestoreinfoobject + this.index;
	}

	getCatalogObject() {
		/*
		this.objdisplay = true;
		const json:Record<string,unknown> = {};
		json[this.serviceid] = 'ReadCatalogObjectWithFirestoreAddress';
		const firestoreid = this.required[this.anno[Ontologyconstants.RequiredTransactionIDAndType][this.rdfsidentifier]];
		this.requiredinfo.getData(firestoreid);
		this.runservice.run(json).subscribe({
			next: (responsedata: any) => {
				const success = responsedata[Ontologyconstants.successful];
				if (success == 'true') {
					this.catalogobject = responsedata[Ontologyconstants.catalogobject];
					alert("getCatalogObject() " + JSON.stringify(this.catalogobject));
					if (responsedata != null) {
						//this.catalogview.setData(this.catalogobject);
					} else {
						alert('Result null');
					}
				} else {
					this.runservice.checkReturn(responsedata);
					alert(this.interfaceconstants.retrievalunsuccessful);
				}
			}
		});
*/
	}

}
