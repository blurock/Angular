import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { LoadChildDirective } from '../../directives/load-child.directive';
import { Directive, ViewContainerRef, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { FiresytorecatalogidComponent } from '../firesytorecatalogid/firesytorecatalogid.component';
import { IdentifiersService } from '../../const/identifiers.service';
import {FirestorelistelementComponent} from './firestorelistelement/firestorelistelement.component';

@Component({
	selector: 'app-listoffirestoreids',
	templateUrl: './listoffirestoreids.component.html',
	styleUrls: ['./listoffirestoreids.component.scss']
})
export class ListoffirestoreidsComponent implements OnInit {

	listofids = [];


	@Input() annoinfo: any;
	@Input() listtitle: string;

	@ViewChild(LoadChildDirective, { static: true })
	dynamicChild!: LoadChildDirective;
	public orderedViewContainer: ViewContainerRef;



	constructor(
		public identifiers: IdentifiersService
	) { }

	ngOnInit(): void {
	}

	addEmptyObjectLink(): void {
		const firestoreid = {};
		firestoreid[this.identifiers.DataCatalog] = '';
		firestoreid[this.identifiers.SimpleCatalogName] = '';
		const pairaddress = {};
		firestoreid[this.identifiers.CollectionDocumentIDPairAddress] = pairaddress;
		pairaddress[this.identifiers.CollectionDocumentIDPair] = [];
		this.addFirestoreID(firestoreid);
	}


	addFirestoreID(firestoreid: any) {
		const componentRef = this.dynamicChild.viewContainerRef.createComponent(FirestorelistelementComponent);
		componentRef.instance.anno = this.annoinfo;
		componentRef.instance.catalogID = firestoreid;
		componentRef.instance.setIndex(this.listofids.length);
		componentRef.instance.deleteEvent.subscribe((index) => {
			this.listofids.splice(index,1);
			componentRef.destroy();
			this.resetLinkArray();
		})

		this.listofids.push(componentRef.instance);
		componentRef.instance.setData(firestoreid);
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
      		const fire = {};
      		firestoreid.getData(fire);
			firestoreids.push(fire);
		}
	}
}
