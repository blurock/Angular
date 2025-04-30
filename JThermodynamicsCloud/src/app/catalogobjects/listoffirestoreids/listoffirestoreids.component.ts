import { Component, OnInit, ViewChild, Input, ViewContainerRef, ComponentRef } from '@angular/core';
import { LoadChildDirective } from '../../directives/load-child.directive';
import { IdentifiersService } from '../../const/identifiers.service';
import {FirestorelistelementComponent} from './firestorelistelement/firestorelistelement.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-listoffirestoreids',
	standalone: true,
	imports: [MatCardModule,
	MatIconModule],
	templateUrl: './listoffirestoreids.component.html',
	styleUrls: ['./listoffirestoreids.component.scss']
})
export class ListoffirestoreidsComponent implements OnInit {

	


	@Input() annoinfo: any;
	@Input() listtitle?: string;
	
	listofids: FirestorelistelementComponent[] = [];
	
	@ViewChild('dynamicChild', { read: ViewContainerRef }) dynamicChild!: ViewContainerRef;

  componentRef!: ComponentRef<FirestorelistelementComponent>; 

	addFirestoreID(firestoreid: any) {
		this.componentRef = this.dynamicChild.createComponent(FirestorelistelementComponent);

		//const componentRef = this.dynamicChild.viewContainerRef.createComponent(FirestorelistelementComponent);
		this.componentRef.instance.anno = this.annoinfo;
		this.componentRef.instance.catalogID = firestoreid;
		this.componentRef.instance.setIndex(this.listofids.length);
		this.componentRef.instance.deleteEvent.subscribe((index) => {
			this.listofids.splice(index,1);
			this.componentRef.destroy();
			this.resetLinkArray();
		})

		this.listofids.push(this.componentRef.instance);
	}

	constructor(
		public identifiers: IdentifiersService
	) { }

	ngOnInit(): void {
	}

	addEmptyObjectLink(): void {
		const firestoreid: Record<string,unknown> = {};
		firestoreid[this.identifiers.DataCatalog] = 'transaction';
		firestoreid[this.identifiers.SimpleCatalogName] = '01e23245-6ea5-4a75-865f-a93a02e70e74';
		const pairaddress: Record<string,unknown> = {};
		firestoreid[this.identifiers.CollectionDocumentIDPairAddress] = pairaddress;
		pairaddress[this.identifiers.CollectionDocumentIDPair] = [];
		this.addFirestoreID(firestoreid);
	}


	resetLinkArray(): void {
		let index = 0;
		for (let linkform of this.listofids) {
			linkform.setIndex(index);
			index++;
			}
	}


	setData(firestoreids: any[]) {
		this.listofids = [];
		for (const firestoreid of firestoreids) {
			this.addFirestoreID(firestoreid);
		}
	}
	getData(firestoreids: any[]) {
		for (const firestoreid of this.listofids) {
      		const fire: Record<string,unknown> = {};
      		firestoreid.getData(fire);
			firestoreids.push(fire[this.identifiers.FirestoreCatalogID]);
		}
	}
}
