import { Component, OnInit, ViewChild, Input,ViewContainerRef, AfterViewInit, EventEmitter, Output  } from '@angular/core';
import { LoadChildDirective } from '../../../directives/load-child.directive';
import { DataobjectlinkComponent } from '../dataobjectlink/dataobjectlink.component';
import { IdentifiersService } from '../../../const/identifiers.service';
import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 

@Component({
	selector: 'app-setofdataobjectlinks',
	templateUrl: './setofdataobjectlinks.component.html',
	styleUrls: ['./setofdataobjectlinks.component.scss'],
	standalone: true,
	imports: [MatCardModule,MatIconModule,LoadChildDirective]
})
export class SetofdataobjectlinksComponent implements OnInit {

	@ViewChild(LoadChildDirective, { static: false } )
	dynamicChild!: LoadChildDirective;
	//public orderedViewContainer: ViewContainerRef;

	linkarray: DataobjectlinkComponent[] = [];
	message = 'Initializing';

	@Input() anno: any;
	@Output() showObject = new EventEmitter<any>();

	constructor(
		//private cdRef: ChangeDetectorRef,
		public identifiers: IdentifiersService,
		private viewContainerRef: ViewContainerRef ) { }

	ngOnInit(): void {
	}
	
	ngAfterViewInit() {
    this.dynamicChild.viewContainerRef = this.viewContainerRef; 
  }


	addEmptyObjectLink(): void {
		const link: Record<string,unknown> = {};
		link[this.identifiers.DatabaseObjectType] = '';
		link[this.identifiers.DataTypeConcept] = '';
		const firestoreid: Record<string,unknown> = {};
		link[this.identifiers.FirestoreCatalogID] = firestoreid;
		firestoreid[this.identifiers.DataCatalog] = '';
		firestoreid[this.identifiers.SimpleCatalogName] = '';
		const pairaddress: Record<string,unknown> = {};
		firestoreid[this.identifiers.CollectionDocumentIDPairAddress] = pairaddress;
		pairaddress[this.identifiers.CollectionDocumentIDPair] = [];
		this.addObjectLink(link);
	}

	public addObjectLink(link: any): void {
		const componentRef = this.dynamicChild.viewContainerRef.createComponent(DataobjectlinkComponent);
		componentRef.instance.anno = this.anno;
		componentRef.instance.catalog = link;
		componentRef.instance.allowchange = true;
		
		componentRef.instance.deleteEvent.subscribe((index) => {
			this.linkarray.splice(index,1);
			componentRef.destroy();
			this.resetLinkArray();
		})
		componentRef.instance.firestoreAddress.subscribe((firestoreid: any) => {
			this.showObject.emit(firestoreid);
		})
			

		componentRef.instance.setIndex(this.linkarray.length);
		this.linkarray.push(componentRef.instance);
		componentRef.instance.setData(link);
		
		
	}
	
	deleteEvent(index: number) {
			this.linkarray.splice(index,1);
			this.resetLinkArray();		
	}
	
	resetLinkArray(): void {
		let index = 0;
		for (let linkform of this.linkarray) {
			linkform.setIndex(index);
			index++;
			}
	}

	public setData(links: any[]): void {
		this.linkarray = [];
		for (let link of links) {
			this.addObjectLink(link);
		}
	}
	public getData(catalog: any): void {
		if (catalog != null) {
			const links: any[] = [];
			catalog[this.identifiers.DataObjectLink] = links;
			for (let linkform of this.linkarray) {
				const link = {};
				linkform.getData(link);
				links.push(link);
			}
		}
	}
}
