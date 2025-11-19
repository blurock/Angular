
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges } from '@angular/core';
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { UserinterfaceconstantsService } from '../../const/userinterfaceconstants.service';
import { BaseCatalogInterface } from '../basecatalog.interface';

@Component({
  selector: 'app-catalogbase',
  standalone: true,
  imports: [],
  templateUrl: './catalogbase.component.html',
  styleUrl: './catalogbase.component.scss'
})
export class CatalogbaseComponent  implements BaseCatalogInterface, OnChanges {
	
	rdfslabel: string = Ontologyconstants.rdfslabel;
	rdfscomment: string = Ontologyconstants.rdfscomment;
	identifier: string = Ontologyconstants.dctermsidentifier;
	
	catalogtype: string = 'dataset:SimpleCatalogObject';
	catalog: any;
	annoinfo: any = null;	
	showData: boolean = true;
	message: string = '';
	catalogdataset = false;
	
	@Output() annoReady = new EventEmitter<any>();
	@Output() transactionReady = new EventEmitter<any>();
	@Output() showCatalogObject = new EventEmitter<any>();
	
	
	constructor(
		private constants: UserinterfaceconstantsService,
		private annotations: OntologycatalogService,
		private cdRef: ChangeDetectorRef) {
		}
	
	
	setData(catalog: any): void {
		this.catalog = catalog;
		this.transactionReady.emit(this.catalog[Ontologyconstants.TransactionID]);
		this.cdRef.detectChanges();
	}
	getData(catalog: any): void {
	
	}
	
	ngOnChanges(): void {
		if (this.catalog != null) {
			this.setData(this.catalog);
		}
		this.cdRef.detectChanges();
	}

	toggleShowData() {
    	this.showData = !this.showData;
  }
  
  showCatalogFromFirestore(firestoreid: any) {
	this.showCatalogObject.emit(firestoreid);
  }
  
	
  messageToJSON(responsedata: any):  any {
    const data: string = responsedata.message;
    const jsonobj = JSON.parse(data);

    return jsonobj;
  }
  
  	annotationsFound(response: any): void {
		if(this.catalog) {
			this.setData(this.catalog);
		}
		this.annoReady.emit(this.annoinfo);
		this.cdRef.detectChanges();
	}
  
  	public getCatalogAnnoations(): void {
		this.message = this.constants.waiting;
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				if (responsedata) {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.annotationsFound(response);
					if(this.catalog) {
						this.setData(this.catalog);
					}
				} else {
					this.message = responsedata;
				}
				}
			},
			error: (info: any) => { alert(this.constants.getannotationsfnotsuccessful + this.message); }
		});
	}


}
