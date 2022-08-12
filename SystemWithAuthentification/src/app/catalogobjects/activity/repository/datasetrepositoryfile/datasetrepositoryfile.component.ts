import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SetofdataobjectlinksComponent } from '../../../catalogbaseobjects/setofdataobjectlinks/setofdataobjectlinks.component';
import { SetofsitereferencesComponent } from '../../../catalogbaseobjects/setofsitereferences/setofsitereferences.component';
import { DatasetreferenceComponent } from '../../../datasetreference/datasetreference.component';
import { KeywordlistprimitiveComponent } from '../../../../primitives/keywordlistprimitive/keywordlistprimitive.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import {DatasettransactionspecificationforcollectionComponent} from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';


@Component({
	selector: 'app-datasetrepositoryfile',
	templateUrl: './datasetrepositoryfile.component.html',
	styleUrls: ['./datasetrepositoryfile.component.scss']
})
export class DatasetrepositoryfileComponent implements OnInit {

	infoform: FormGroup;
	items: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	formatmenulabel = 'dataset:FileSourceFormat';

	@Input() annoinfo: any;
	@Input() maintainer: string;

	@ViewChild('references') references: DatasetreferenceComponent;
	@ViewChild('objectlinks') objectlinks: SetofdataobjectlinksComponent;
	@ViewChild('weblinks') weblinks: SetofsitereferencesComponent;
	@ViewChild('keywords') keywords: KeywordlistprimitiveComponent;
	@ViewChild('transspec') transspec: DatasettransactionspecificationforcollectionComponent;


	constructor(
		private _formBuilder: FormBuilder,
		private menusetup: MenutreeserviceService
	) {
		this.infoform = this._formBuilder.group({
			FileSourceFormat: ['', Validators.required],
			FileSourceTitle: ['', Validators.required],
			FileSourceAbstract: ['', Validators.required],
			DatasetName: ['', Validators.required],
			DatasetVersion: ['', Validators.required],
			CatalogObjectUniqueGenericLabel: ['', Validators.required],
		});
	}
	ngOnInit(): void {
		this.items = this.menusetup.findChoices(this.annoinfo, this.formatmenulabel);

	}


	public getData(catalog: any): void {
		catalog['dataset:keyword-filestaging'] = this.keywords.getKeys();
		const jsonpurpose = {};
		catalog['dataset:purpose-filestaging'] = jsonpurpose;
		jsonpurpose['dataset:purposekey-filestaging'] = "dataset:PurposeFileStaging";
		jsonpurpose['dataset:dataconcept-staging'] = 'dataset:ConceptFileStaging';

		catalog['dataset:title-staging'] = this.infoform.get('FileSourceTitle').value;
		catalog['dataset:abstract-staging'] = this.infoform.get('FileSourceAbstract').value;
		catalog['dataset:keyword-filestaging'] = this.keywords.getKeys();

		let dateTime = new Date();
		const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
		catalog['dcterms:created'] = moment(dateTime, DATE_TIME_FORMAT);

		const jsontransspec = {};
		catalog['dataset:datasettransactionspecification'] = jsontransspec;
		jsontransspec['dataset:datasetname'] = this.infoform.get('DatasetName').value;
		jsontransspec['dataset:datasetversion'] = this.infoform.get('DatasetVersion').value;
		jsontransspec['dataset:uniquegenericname'] = this.infoform.get('CatalogObjectUniqueGenericLabel').value;
		jsontransspec['dataset:catalogobjectmaintainer'] = this.maintainer;

		this.addSetOfReferencesAndLinks(catalog);
		this.transspec.getData(catalog);
	}
	public addSetOfReferencesAndLinks(info: any): void {
		this.references.getData(info);
		this.weblinks.getData(info);
		this.objectlinks.getData(info);
	}

	public setData(json: any): void {
		if (json != null) {
			this.infoform.get('FileSourceFormat').setValue(json['dataset:filesourceformat']);
			this.infoform.get('FileSourceTitle').setValue(json['dcterms:title']);
			const jsontransspec = json['dataset:datasettransactionspecification'];
			if (jsontransspec != null) {
				this.infoform.get('DatasetName').setValue(jsontransspec['dataset:datasetname']);
				this.infoform.get('DatasetVersion').setValue(jsontransspec['dataset:datasetversion']);
				this.infoform.get('CatalogObjectUniqueGenericLabel').setValue(jsontransspec['dataset:uniquegenericname']);
			} else {
			}
			const jsonstaging = json['descr-filestaging'];
			if (jsonstaging != null) {
				const keys = jsonstaging['dataset:keyword-filestaging'];
				this.keywords.setKeys(keys);
				this.infoform.get('FileSourceTitle').setValue(jsonstaging['dataset:title-staging']);
				this.infoform.get('FileSourceAbstract').setValue(jsonstaging['dataset:abstract-staging']);
			}
			this.setSetOfReferencesAndLinks(json);
		}
	}


	public setSetOfReferencesAndLinks(activity: any): void {
		const refs = activity['dcterms:BibliographicResource'];
		if (refs != null) {
			this.references.setData(refs);
		}
		const web = activity.get('foaf:page');
		if (web != null) {
			this.weblinks.setData(web);
		}
		const obj = activity.get('skos:mappingRelation');
		if (obj != null) {
			this.objectlinks.setData(obj);
		}
	}



}
