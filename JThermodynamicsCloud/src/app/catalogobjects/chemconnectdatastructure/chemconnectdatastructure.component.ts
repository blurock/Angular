import { Component, ViewChild, Input } from '@angular/core';
import { SetofcontactinfodataComponent } from '../catalogbaseobjects/setofcontactinfodata/setofcontactinfodata.component';
import { SetofdataobjectlinksComponent } from '../catalogbaseobjects/setofdataobjectlinks/setofdataobjectlinks.component';
import { SetofsitereferencesComponent } from '../catalogbaseobjects/setofsitereferences/setofsitereferences.component';
import { DatasetreferenceComponent } from '../datasetreference/datasetreference.component';
import { SimpledatabaseobjectstructureComponent } from '../simpledatabaseobjectstructure/simpledatabaseobjectstructure.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CatalogrecordbaseComponent } from '../../primitives/catalogrecordbase/catalogrecordbase.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-chemconnectdatastructure',
	standalone: true,
	imports: [MatProgressSpinnerModule, CommonModule,
		SetofsitereferencesComponent,
		SetofdataobjectlinksComponent,
		SimpledatabaseobjectstructureComponent,
		DatasetreferenceComponent,
		SetofcontactinfodataComponent],
	templateUrl: './chemconnectdatastructure.component.html',
	styleUrl: './chemconnectdatastructure.component.scss'
})
export class ChemconnectdatastructureComponent extends CatalogrecordbaseComponent {
	

	@ViewChild('references', { static: false }) references!: DatasetreferenceComponent;
	@ViewChild('objectlinks', { static: false }) objectlinks!: SetofdataobjectlinksComponent;
	@ViewChild('weblinks', { static: false }) weblinks!: SetofsitereferencesComponent;
	@ViewChild('contactinfo', { static: false }) contactinfo!: SetofcontactinfodataComponent;
	@ViewChild('simpledata', { static: false }) simpledata!: SimpledatabaseobjectstructureComponent;

	constructor() {
		super();
	}

	ngOnInit(): void {
	}


	override setData(catalog: any): void {
		super.setData(catalog);
		this.simpledata.setData(catalog);
		const refs = catalog[this.annoinfo['dataset:DataSetReference'][this.identifier]];
		this.references.setData(refs);
		const olinks = catalog[this.annoinfo['dataset:DataObjectLink'][this.identifier]];
		this.objectlinks.setData(olinks);
		const wlinks = catalog[this.annoinfo['dataset:ObjectSiteReference'][this.identifier]];
		this.objectlinks.setData(wlinks);
		const contactinfo = catalog[this.annoinfo['dataset:ContactInfoData'][this.identifier]];
		this.contactinfo.setData(contactinfo);
	}

	override getData(catalog: any): void {
		this.simpledata.getData(catalog);
		const refs = this.references.getData(catalog);
		catalog[this.annoinfo['dataset:DataSetReference'][this.identifier]] = refs;
		const olinks = this.objectlinks.getData(catalog);
		catalog[this.annoinfo['dataset:DataObjectLink'][this.identifier]] = olinks;
		const wlinks = this.weblinks.getData(catalog);
		catalog[this.annoinfo['dataset:ObjectSiteReference'][this.identifier]] = wlinks;
		const contactinfo = this.contactinfo.getData(catalog);
		catalog[this.annoinfo['dataset:ContactInfoData'][this.identifier]] = contactinfo;
	}
}
