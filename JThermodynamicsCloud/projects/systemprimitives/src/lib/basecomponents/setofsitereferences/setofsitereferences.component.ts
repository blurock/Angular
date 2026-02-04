import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 
import { LoadChildDirective } from '../../directives/load-child.directive';
import { ObjectsitereferenceComponent } from '../objectsitereference/objectsitereference.component';
import { IdentifiersService } from 'systemconstants';

@Component({
	selector: 'app-setofsitereferences',
	templateUrl: './setofsitereferences.component.html',
	styleUrls: ['./setofsitereferences.component.scss'],
	standalone: true,
	imports: [MatCardModule,MatIconModule,LoadChildDirective]
})
export class SetofsitereferencesComponent implements OnInit,AfterViewInit  {

	@ViewChild(LoadChildDirective, { static: false }) dynamicChild!: LoadChildDirective;
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
		this.linkarray = [];
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
