import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { LoadChildDirective } from '../../../directives/load-child.directive';
import { RdftripleComponent } from '../rdftriple/rdftriple.component'
import { DataobjectlinkComponent } from '../dataobjectlink/dataobjectlink.component';
import { Directive, ViewContainerRef, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { IdentifiersService } from '../../../const/identifiers.service';

@Component({
	selector: 'app-setofdataobjectlinks',
	templateUrl: './setofdataobjectlinks.component.html',
	styleUrls: ['./setofdataobjectlinks.component.scss']
})
export class SetofdataobjectlinksComponent implements OnInit {

	@ViewChild(LoadChildDirective, { static: true } )
	dynamicChild!: LoadChildDirective;
	public orderedViewContainer: ViewContainerRef;

	linkarray = [];
	message = 'Initializing';

	@Input() anno: any;

	constructor(
		//private cdRef: ChangeDetectorRef,
		public identifiers: IdentifiersService) { }

	ngOnInit(): void {
	}

	addEmptyObjectLink(): void {
		const link = {};
		link[this.identifiers.DatabaseObjectType] = '';
		link[this.identifiers.DataTypeConcept] = '';
		const firestoreid = {};
		link[this.identifiers.FirestoreCatalogID] = firestoreid;
		firestoreid[this.identifiers.DataCatalog] = '';
		firestoreid[this.identifiers.SimpleCatalogName] = '';
		const pairaddress = {};
		firestoreid[this.identifiers.CollectionDocumentIDPairAddress] = pairaddress;
		pairaddress[this.identifiers.CollectionDocumentIDPair] = [];
		this.addObjectLink(link);
	}

	public addObjectLink(link: any): void {
		/*
		this.linkarray.push(link);
		*/
	
		const componentRef = this.dynamicChild.viewContainerRef.createComponent(DataobjectlinkComponent);
		componentRef.instance.anno = this.anno;
		componentRef.instance.catalog = link;
		/*
		componentRef.instance.deleteEvent.subscribe((index) => {
			this.linkarray.splice(index,1);
			componentRef.destroy();
			this.resetLinkArray();
		})
		*/
		componentRef.instance.setIndex(this.linkarray.length);
		this.linkarray.push(componentRef.instance);
		
		componentRef.instance.setData(link);
		
		
	}
	
	deleteEvent(index: number) {
			this.linkarray.splice(index,1);
			this.resetLinkArray();		
	}
	
	resetLinkArray(): void {
		/*
		let index = 0;
		for (let linkform of this.linkarray) {
			linkform.setIndex(index);
			index++;
			}
			*/
	}

	public setData(links: any[]): void {
		for (let link of links) {
			this.addObjectLink(link);
		}
	}
	public getData(catalog: any): void {
		if (catalog != null) {
			const links = [];
			catalog[this.identifiers.DataObjectLink] = links;
			/*
			for (let linkform of this.linkarray) {
				const link = {};
				linkform.getData(link);
				links.push(link);
			}
			*/
		}
	}
}
