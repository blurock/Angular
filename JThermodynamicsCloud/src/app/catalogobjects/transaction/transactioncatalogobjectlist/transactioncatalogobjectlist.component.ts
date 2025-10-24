import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-transactioncatalogobjectlist',
  imports: [MatCardModule,
	MatGridListModule,
	MatFormFieldModule,
	ReactiveFormsModule,
	MatIconModule,
	MatTooltipModule
  ],
  templateUrl: './transactioncatalogobjectlist.component.html',
  styleUrl: './transactioncatalogobjectlist.component.scss'
})
export class TransactioncatalogobjectlistComponent {
	
	
	initializing: string = '';
	rdfslabel: string = Ontologyconstants.rdfslabel;
	rdfscomment: string = Ontologyconstants.rdfscomment;
	identifier: string = Ontologyconstants.dctermsidentifier;
	
	tooltip: string = '';
	
	shortdescription: string = '';
	catalogid: string = '';
	databasetype: string = '';
	firestoreid: any = {};
	transactionid: string = '';
	properties: any;
	
	displayobjectinoutputtab = '';
	
	@Output() firestoreAddress = new EventEmitter<any>();

		constructor(
		userconstants: UserinterfaceconstantsService
	) {
		this.initializing = userconstants.initializing;
		this.displayobjectinoutputtab = userconstants.displayobjectinoutputtab;

	}
	
	setData(properties: any): void {
		this.properties = properties;
		this.shortdescription = properties[Ontologyconstants.ShortDescription];
		this.catalogid = properties[Ontologyconstants.CatalogObjectID];
		this.databasetype = properties[Ontologyconstants.DatabaseObjectType];
		this.firestoreid = properties[Ontologyconstants.FirestoreCatalogID];
		this.transactionid = properties[Ontologyconstants.TransactionID];
		
		this.tooltip = "Catalog ID=" + this.catalogid + "  Type= " + this.databasetype;
	}
	
	showcatalog() {
		this.firestoreAddress.emit(this.firestoreid);
	}
}
