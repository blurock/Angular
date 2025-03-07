import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { LoadchildDirective } from '../loadchild.directive';
import { RdftripleComponent } from '../rdftriple/rdftriple.component'
import { ObjectsitereferenceComponent } from '../objectsitereference/objectsitereference.component';
import { Directive, ViewContainerRef, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { IdentifiersService } from '../../../const/identifiers.service';
import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 

@Component({
	selector: 'app-setofsitereferences',
	templateUrl: './setofsitereferences.component.html',
	styleUrls: ['./setofsitereferences.component.scss'],
	standalone: true,
	imports: [MatCardModule,MatIconModule,LoadchildDirective]
})
export class SetofsitereferencesComponent implements OnInit,AfterViewInit  {

	@ViewChild(LoadchildDirective, { static: false }) dynamicChild!: LoadchildDirective;
	linkarray: ObjectsitereferenceComponent[] = [];

	@Input() anno: any;
	constructor(
		private cdRef: ChangeDetectorRef,
    public identifiers: IdentifiersService,
    private viewContainerRef: ViewContainerRef 
    ) { }

 ngAfterViewInit() {
    this.dynamicChild.viewContainerRef = this.viewContainerRef; 
  }
	ngOnInit(): void {
	}

	addEmptyObjectLink() {
		const link: Record<string,unknown> = {};
		link[this.identifiers.HTTPAddress] = '';
		link[this.identifiers.HttpAddressInformationType] = '';
		console.log("SetofsitereferencesComponent" + JSON.stringify(link));
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
			this.cdRef.detectChanges();
	}


	public setData(links: any[]): void {
		for (let link of links) {
			this.addObjectLink(link);
		}
	}
	public getData(catalog: any): void {
		if(catalog != null) {
		const links: Record<string,unknown>[] = [];
		catalog[this.identifiers.ObjectSiteReference] = links;
		for (let linkform of this.linkarray) {
			const link: Record<string,unknown> = {};
			linkform.getData(link);
			links.push(link);
		}
		} else {
			alert('SetofsitereferencesComponent: catalog null');
		}
	}

}
