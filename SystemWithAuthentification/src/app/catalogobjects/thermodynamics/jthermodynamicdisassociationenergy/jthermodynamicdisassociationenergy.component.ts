import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import {ChemconnectthermodynamicsdatabaseComponent} from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';

@Component({
  selector: 'app-jthermodynamicdisassociationenergy',
  templateUrl: './jthermodynamicdisassociationenergy.component.html',
  styleUrls: ['./jthermodynamicdisassociationenergy.component.scss']
})
export class JthermodynamicdisassociationenergyComponent implements OnInit {
  
  	message: string;
	annoinfo: any;
	catalogobj: any;
	display = false;
	
	@Output() annoReady = new EventEmitter<any>();

	

catalogtype = 'dataset:JThermodynamicsDisassociationEnergyOfStructure';
title = 'H Disassociation Energy';

@ViewChild('base') base: ChemconnectthermodynamicsdatabaseComponent;

  constructor(
    public annotations: OntologycatalogService,
  ) {
    this.getCatalogAnnoations();
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
					this.display = true;
					this.annoReady.emit(this.annoinfo);
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}
 	getData(catalog: any): void {
     this.base.getData(catalog);
   }
 	setData(catalog: any): void {
     this.base.setData(catalog);
   }

}
