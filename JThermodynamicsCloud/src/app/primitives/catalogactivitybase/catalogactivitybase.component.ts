import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { UserinterfaceconstantsService } from '../../const/userinterfaceconstants.service';
import { BaseActivityInterface } from '../basecatalog.interface';
@Component({
	selector: 'app-catalogactivitybase',
	standalone: true,
	imports: [],
	templateUrl: './catalogactivitybase.component.html',
	styleUrl: './catalogactivitybase.component.scss'
})
export class CatalogactivitybaseComponent implements BaseActivityInterface {

	rdfslabel: string = Ontologyconstants.rdfslabel;
	rdfscomment: string = Ontologyconstants.rdfscomment;
	identifier: string = Ontologyconstants.dctermsidentifier;

	catalogtype: string = 'dataset:SimpleCatalogObject';
	catalog: Record<string, any> = {};
	prerequisite: any;
	annoinfo: any = null;
	showData: boolean = true;
	message: string = '';

	@Output() annoReady = new EventEmitter<void>();

	constructor(
		private constants: UserinterfaceconstantsService,
		private annotations: OntologycatalogService,
		private cdRef: ChangeDetectorRef) {
	}

	activitySet(): boolean {
		return Object.keys(this.catalog).length > 0 || this.prerequisite;
	}

	setPrerequisiteData(pre: any): void {
		this.prerequisite = pre;
	}

	setData(c: any): void {
		var activity = c;
		if (c[Ontologyconstants.ActivityInfo]) {
			activity = c[Ontologyconstants.ActivityInfo];
		}
		this.catalog = activity;
	}
	getData(catalog: any): void {

	}

	toggleShowData() {
		this.showData = !this.showData;
	}

	messageToJSON(responsedata: any): any {
		const data: string = responsedata.message;
		const jsonobj = JSON.parse(data);

		return jsonobj;
	}

	annotationsFound(response: any): void {
		this.annoReady.emit();
		this.cdRef.detectChanges();
	}

	public getCatalogAnnoations(): void {
		this.message = this.constants.waiting;
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				if (responsedata) {
					const response = responsedata;
					this.message = response[Ontologyconstants.message];
					if (response[Ontologyconstants.successful]) {
						const catalog = response[Ontologyconstants.catalogobject];
						this.annoinfo = catalog[Ontologyconstants.annotations];
						this.annotationsFound(response);
					} else {
						this.message = responsedata;
					}
				}
			},
			error: (info: any) => { alert(this.constants.getannotationsfnotsuccessful + this.message); }
		});
	}

}
