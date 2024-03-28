import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SetofdataobjectlinksComponent } from '../../../catalogbaseobjects/setofdataobjectlinks/setofdataobjectlinks.component';
import { SetofsitereferencesComponent } from '../../../catalogbaseobjects/setofsitereferences/setofsitereferences.component';
import { DatasetreferenceComponent } from '../../../datasetreference/datasetreference.component';
import { KeywordlistprimitiveComponent } from '../../../../primitives/keywordlistprimitive/keywordlistprimitive.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import { DatasettransactionspecificationforcollectionComponent } from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { NavItem } from '../../../../primitives/nav-item';


@Component({
	selector: 'app-datasetrepositoryfile',
	templateUrl: './datasetrepositoryfile.component.html',
	styleUrls: ['./datasetrepositoryfile.component.scss']
})
export class DatasetrepositoryfileComponent implements OnInit {

	infoform: UntypedFormGroup;
	items: NavItem[];

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
		private formBuilder: UntypedFormBuilder,
		private menusetup: MenutreeserviceService
	) {
		this.infoform = this.formBuilder.group({
			FileSourceFormat: ['', Validators.required],
			DescriptionTitleFileStaging: ['', Validators.required],
			DescriptionAbstractFileStaging: ['', Validators.required]
		});
	}
	ngOnInit(): void {
		this.items = this.menusetup.findChoices(this.annoinfo, this.formatmenulabel);

	}

	invalid(): boolean {
		let ans = true;
		if (this.transspec != null) {
			ans = this.transspec.invalid() || this.infoform.invalid;
		}
		return ans;
	}

	public getData(catalog: any): void {
		catalog[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.infoform.get('DescriptionTitleFileStaging').value;
		catalog[this.annoinfo['dataset:DescriptionTitleFileStaging'][this.identifier]] = this.infoform.get('DescriptionTitleFileStaging').value;
		catalog[this.annoinfo['dataset:DescriptionAbstractFileStaging'][this.identifier]] = this.infoform.get('DescriptionAbstractFileStaging').value;
		catalog[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.infoform.get('FileSourceFormat').value;

		const descr = {};
		catalog[this.annoinfo['dataset:DataDescriptionFileStaging'][this.identifier]] = descr;

		const jsonpurpose = {};
		descr[this.annoinfo['dataset:PurposeConceptFileStaging'][this.identifier]] = jsonpurpose;
		jsonpurpose[this.annoinfo['dataset:PurposeFileStaging'][this.identifier]] = "dataset:PurposeRepositoryDataOrigin";
		jsonpurpose[this.annoinfo['dataset:ConceptFileStaging'][this.identifier]] = 'dataset:ChemConnectConceptChemicalStructure';
		descr[this.annoinfo['dataset:DescriptionAbstractFileStaging'][this.identifier]] = this.infoform.get('DescriptionAbstractFileStaging').value;
		descr[this.annoinfo['dataset:DescriptionTitleFileStaging'][this.identifier]] = this.infoform.get('DescriptionTitleFileStaging').value;
		descr[this.annoinfo['dataset:DescriptionKeywordFileStaging'][this.identifier]] = this.keywords.getKeys();

		let dateTime = new Date();
		const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
		const date = new Date();
		//descr[this.annoinfo['dataset:DateCreated'][this.identifier]] = moment(dateTime, DATE_TIME_FORMAT);
		descr[this.annoinfo['dataset:DateCreated'][this.identifier]] = new DatePipe('en-US').transform(date, DATE_TIME_FORMAT);
		this.transspec.getData(catalog);
		this.addSetOfReferencesAndLinks(catalog);
	}
	public addSetOfReferencesAndLinks(info: any): void {
		this.references.getData(info);
		this.weblinks.getData(info);
		this.objectlinks.getData(info);
	}

	public setData(catalog: any): void {
		if (catalog != null) {
			this.infoform.get('DescriptionTitleFileStaging').setValue(catalog[this.annoinfo['dataset:DescriptionTitle'][this.identifier]]);
			this.infoform.get('DescriptionTitleFileStaging').setValue(catalog[this.annoinfo['dataset:DescriptionTitleFileStaging'][this.identifier]]);
			this.infoform.get('DescriptionAbstractFileStaging').setValue(catalog[this.annoinfo['dataset:DescriptionAbstractFileStaging'][this.identifier]]);
			this.infoform.get('FileSourceFormat').setValue(catalog[this.annoinfo['dataset:FileSourceFormat'][this.identifier]]);

			const descr = catalog[this.annoinfo['dataset:DataDescriptionFileStaging'][this.identifier]];
			if (descr != null) {
				this.infoform.get('DescriptionAbstractFileStaging').setValue(descr[this.annoinfo['dataset:DescriptionAbstractFileStaging'][this.identifier]]);
				this.infoform.get('DescriptionTitleFileStaging').setValue(descr[this.annoinfo['dataset:DescriptionTitleFileStaging'][this.identifier]]);
				const keys = descr[this.annoinfo['dataset:DescriptionKeywordFileStaging'][this.identifier]];
				if (keys != null) {
					this.keywords.setKeys(keys);
                    const specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];
					this.transspec.setData(catalog[specid]);
					this.setSetOfReferencesAndLinks(catalog);
				}
			}
		}
		}


	public setSetOfReferencesAndLinks(activity: any): void {
		const refs = activity['dcterms:BibliographicResource'];
		if (refs != null) {
			this.references.setData(refs);
		}
		const web = activity['foaf:page'];
		if (web != null) {
			this.weblinks.setData(web);
		}
		const obj = activity['skos:mappingRelation'];
		if (obj != null) {
			this.objectlinks.setData(obj);
		}
	}

	setFileFormat(format: string): void {
		this.infoform.get('FileSourceFormat').setValue(format);
	}



}
