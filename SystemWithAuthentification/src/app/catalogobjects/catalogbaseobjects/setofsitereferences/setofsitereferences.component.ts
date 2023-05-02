import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { LoadchildDirective } from '../loadchild.directive';
import { RdftripleComponent } from '../rdftriple/rdftriple.component'
import { ObjectsitereferenceComponent } from '../objectsitereference/objectsitereference.component';
import { Directive, ViewContainerRef, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { IdentifiersService } from '../../../const/identifiers.service';

@Component({
	selector: 'app-setofsitereferences',
	templateUrl: './setofsitereferences.component.html',
	styleUrls: ['./setofsitereferences.component.scss']
})
export class SetofsitereferencesComponent implements OnInit {

	@ViewChild(LoadchildDirective, { static: true })
	dynamicChild!: LoadchildDirective;
	public orderedViewContainer: ViewContainerRef;

	//public componentRefs: ComponentRef<ObjectsitereferenceComponent>[] = []
	linkarray = [];

	@Input() anno: any;
	constructor(
		private cdRef: ChangeDetectorRef,
		public identifiers: IdentifiersService) { }


	ngOnInit(): void {
	}

	addEmptyObjectLink() {
		const link = {};
		link[this.identifiers.HTTPAddress] = '';
		link[this.identifiers.HttpAddressInformationType] = '';
		this.addObjectLink(link);
	}
	public addObjectLink(link: any): void {
		const componentRef = this.dynamicChild.viewContainerRef.createComponent(ObjectsitereferenceComponent);
		componentRef.instance.anno = this.anno;
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
		if(catalog != null) {
		const links = [];
		catalog[this.identifiers.ObjectSiteReference] = links;
		for (let linkform of this.linkarray) {
			const link = {};
			linkform.getData(link);
			links.push(link);
		}
		} else {
			alert('SetofsitereferencesComponent: catalog null');
		}
	}

}
