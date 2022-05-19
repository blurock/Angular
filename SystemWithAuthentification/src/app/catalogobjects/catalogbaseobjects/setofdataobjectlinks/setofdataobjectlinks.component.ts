import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { LoadchildDirective } from '../loadchild.directive';
import { RdftripleComponent } from '../rdftriple/rdftriple.component'
import { DataobjectlinkComponent } from '../dataobjectlink/dataobjectlink.component';
import { Directive, ViewContainerRef,ComponentRef , ChangeDetectorRef} from '@angular/core';
import { IdentifiersService } from '../../../const/identifiers.service';

@Component({
	selector: 'app-setofdataobjectlinks',
	templateUrl: './setofdataobjectlinks.component.html',
	styleUrls: ['./setofdataobjectlinks.component.scss']
})
export class SetofdataobjectlinksComponent implements OnInit {

@ViewChild(LoadchildDirective, { static: true })
  dynamicChild!: LoadchildDirective;
public orderedViewContainer: ViewContainerRef;

	linkarray = [];

	@Input() anno: any;
	
	constructor(
		private cdRef:ChangeDetectorRef,
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
		const componentRef = this.dynamicChild.viewContainerRef.createComponent(DataobjectlinkComponent);
		componentRef.instance.anno = this.anno;
		this.cdRef.detectChanges();
		componentRef.instance.setData(link);
		componentRef.instance.deleteEvent.subscribe((index) => {
			this.linkarray.splice(index,1);
			componentRef.destroy();
			this.resetLinkArray();
		})
		componentRef.instance.setIndex(this.linkarray.length);
		this.linkarray.push(componentRef.instance);
	}
	
	resetLinkArray(): void {
		let index = 0;
		for (let linkform of this.linkarray) {
			linkform.setIndex(index);
			index++;
			}
	}

	public setData(links: any[]): void {
		for (let link of links) {
			this.addObjectLink(link);
		}
	}
	public getData(catalog: any): void {
		const links = [];
		catalog[this.identifiers.DataObjectLink] = links
		for (let linkform of this.linkarray) {
			const link = {};
			linkform.getData(link);
			links.push(link);
		}
	}
}
