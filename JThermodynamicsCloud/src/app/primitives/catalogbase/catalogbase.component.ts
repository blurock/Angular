
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
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
export class CatalogbaseComponent  implements BaseCatalogInterface {
	
	rdfslabel: string = Ontologyconstants.rdfslabel;
	rdfscomment: string = Ontologyconstants.rdfscomment;
	identifier: string = Ontologyconstants.dctermsidentifier;
	
	catalogtype: string = 'dataset:SimpleCatalogObject';
	catalog: any;
	annoinfo: any = null;	
	showData: boolean = true;
	message: string = '';
	
	@Output() annoReady = new EventEmitter<void>();
	
	constructor(
		private constants: UserinterfaceconstantsService,
		private annotations: OntologycatalogService,
		private cdRef: ChangeDetectorRef) {
		}
	
	
	setData(catalog: any): void {
		
	}
	getData(catalog: any): void {
	
	}

	toggleShowData() {
    	this.showData = !this.showData;
  }
	
  messageToJSON(responsedata: any):  any {
    const data: string = responsedata.message;
    const jsonobj = JSON.parse(data);

    return jsonobj;
  }
  
  	annotationsFound(response: any): void {
		this.annoReady.emit();
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
				} else {
					this.message = responsedata;
				}
				}
			},
			error: (info: any) => { alert(this.constants.getannotationsfnotsuccessful + this.message); }
		});
	}


}
