import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SetofdataobjectlinksComponent } from '../../../catalogbaseobjects/setofdataobjectlinks/setofdataobjectlinks.component';
import { SetofsitereferencesComponent } from '../../../catalogbaseobjects/setofsitereferences/setofsitereferences.component';
import { DatasetreferenceComponent } from '../../../datasetreference/datasetreference.component';
import { KeywordlistprimitiveComponent } from '../../../../primitives/keywordlistprimitive/keywordlistprimitive.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { NavItem } from '../../../../primitives/nav-item';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UserinterfaceconstantsService } from '../../../../const/userinterfaceconstants.service';
import { SpecificationfordatasetComponent } from '../../../specificationfordataset/specificationfordataset.component';
import { FileformatmanagerService } from '../../../../services/fileformatmanager.service';

@Component({
	selector: 'app-datasetrepositoryfile',
	templateUrl: './datasetrepositoryfile.component.html',
	styleUrls: ['./datasetrepositoryfile.component.scss'],
	standalone: true,
	imports: [SetofdataobjectlinksComponent,
		ReactiveFormsModule,
		SetofsitereferencesComponent,
		DatasetreferenceComponent,
		KeywordlistprimitiveComponent,
		MatCardModule,
		MatGridListModule,
		MatFormFieldModule,
		CommonModule,
		MatSelectModule,
		MatInputModule,
		SpecificationfordatasetComponent
	]
})
export class DatasetrepositoryfileComponent implements OnInit {

	infoform: UntypedFormGroup;
	items: NavItem[] = [];
	errorcatalogtypes: string;
	catalogtype: any;
	catalogtypes: any;
	fileformat: string = '';
	message: string;
	allowchange = false;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	formatmenulabel = 'dataset:FileSourceFormat';

	@Input() annoinfo: any;
	@Input() maintainer: string = '';

	@ViewChild('spec') spec!: SpecificationfordatasetComponent;
	@ViewChild('references') references!: DatasetreferenceComponent;
	@ViewChild('objectlinks') objectlinks!: SetofdataobjectlinksComponent;
	@ViewChild('weblinks') weblinks!: SetofsitereferencesComponent;
	@ViewChild('keywords') keywords!: KeywordlistprimitiveComponent;

	constructor(constants: UserinterfaceconstantsService,
		private formBuilder: UntypedFormBuilder,
		private format: FileformatmanagerService
	) {
		this.message = constants.waiting;
		this.errorcatalogtypes = constants.errorcatalogtypes;

		format.getTherGasCatalogTypes().subscribe(result => {
			if (result != null) {
				this.catalogtypes = result;
			} else {
				alert(format.errorcatalogtypes);
			}
		})

		this.infoform = this.formBuilder.group({
			FileSourceFormat: ['', Validators.required],
			DescriptionTitleFileStaging: ['', Validators.required],
			DescriptionAbstractFileStaging: ['', Validators.required],
			DatasetCollectionObjectType: ['', Validators.required],
			CatalogObjectUniqueGenericLabel: ['', Validators.required]
		});
	}
	ngOnInit(): void {
	}

	invalid(): boolean {
		let ans =  this.infoform.invalid;
		return ans;
	}

	public getData(catalog: any): void {
		catalog[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]] = this.infoform.get('CatalogObjectUniqueGenericLabel')?.value ?? '';
		catalog[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.infoform.get('DescriptionTitleFileStaging')?.value ?? '';
		catalog[this.annoinfo['dataset:DescriptionTitleFileStaging'][this.identifier]] = this.infoform.get('DescriptionTitleFileStaging')?.value ?? '';
		catalog[this.annoinfo['dataset:DescriptionAbstractFileStaging'][this.identifier]] = this.infoform.get('DescriptionAbstractFileStaging')?.value ?? '';

		catalog[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.fileformat;
		catalog[this.annoinfo['dataset:DatasetCollectionObjectType'][this.identifier]] = this.infoform.get('DatasetCollectionObjectType')?.value ?? '';

		const descr: Record<string, unknown> = {};
		catalog[this.annoinfo['dataset:DataDescriptionFileStaging'][this.identifier]] = descr;

		const jsonpurpose: Record<string, unknown> = {};
		descr[this.annoinfo['dataset:PurposeConceptFileStaging'][this.identifier]] = jsonpurpose;
		jsonpurpose[this.annoinfo['dataset:PurposeFileStaging'][this.identifier]] = "dataset:PurposeRepositoryDataOrigin";
		jsonpurpose[this.annoinfo['dataset:ConceptFileStaging'][this.identifier]] = 'dataset:ChemConnectConceptChemicalStructure';
		descr[this.annoinfo['dataset:DescriptionAbstractFileStaging'][this.identifier]] = this.infoform.get('DescriptionAbstractFileStaging')?.value ?? '';
		descr[this.annoinfo['dataset:DescriptionTitleFileStaging'][this.identifier]] = this.infoform.get('DescriptionTitleFileStaging')?.value ?? '';
		descr[this.annoinfo['dataset:DescriptionKeywordFileStaging'][this.identifier]] = this.keywords.getKeys();

		const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
		const date = new Date();
		//descr[this.annoinfo['dataset:DateCreated'][this.identifier]] = moment(dateTime, DATE_TIME_FORMAT);
		const today = new DatePipe('en-US').transform(date, DATE_TIME_FORMAT);
		descr[this.annoinfo['dataset:DateCreated'][this.identifier]] = today;
		this.addSetOfReferencesAndLinks(catalog);
		this.spec.getData(catalog);
	}
	public addSetOfReferencesAndLinks(info: any): void {
		this.references.getData(info);
		this.weblinks.getData(info);
		this.objectlinks.getData(info);
	}

	public setData(catalog: any): void {
		if (catalog != null) {
			console.log('DatasetrepositoryfileComponent setData: ' + JSON.stringify(catalog));
			this.infoform.get('CatalogObjectUniqueGenericLabel')?.setValue(catalog[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]]);
			this.infoform.get('DescriptionTitleFileStaging')?.setValue(catalog[this.annoinfo['dataset:DescriptionTitle'][this.identifier]]);
			this.infoform.get('DescriptionTitleFileStaging')?.setValue(catalog[this.annoinfo['dataset:DescriptionTitleFileStaging'][this.identifier]]);
			this.infoform.get('DescriptionAbstractFileStaging')?.setValue(catalog[this.annoinfo['dataset:DescriptionAbstractFileStaging'][this.identifier]]);
			console.log(Object.keys(catalog));
			this.fileformat = catalog[this.annoinfo['dataset:FileSourceFormat'][this.identifier]];
			console.log(this.annoinfo['dataset:FileSourceFormat'][this.identifier] + ' ' + this.fileformat);
			this.setFileFormat(this.fileformat);
			this.infoform.get('DatasetCollectionObjectType')?.setValue(catalog[this.annoinfo['dataset:DatasetCollectionObjectType'][this.identifier]]);
			const specid = this.annoinfo['dataset:SpecificationForDataset'][this.identifier];
			this.spec.setData(catalog[specid]);
			const descr = catalog[this.annoinfo['dataset:DataDescriptionFileStaging'][this.identifier]];
			if (descr != null) {
				this.infoform.get('DescriptionAbstractFileStaging')?.setValue(descr[this.annoinfo['dataset:DescriptionAbstractFileStaging'][this.identifier]]);
				this.infoform.get('DescriptionTitleFileStaging')?.setValue(descr[this.annoinfo['dataset:DescriptionTitleFileStaging'][this.identifier]]);
				
				this.setSetOfReferencesAndLinks(catalog);
				const keys = descr[this.annoinfo['dataset:DescriptionKeywordFileStaging'][this.identifier]];
				if (keys != null) {
					this.keywords.setKeys(keys);
					this.setSetOfReferencesAndLinks(catalog);
				}
			} else {
				console.log("DatasetrepositoryfileComponent descr == null")
			}
		}
	}

	selectionPicked($event: any): void {
		this.catalogtype = $event;
		this.infoform.get('DatasetCollectionObjectType')?.setValue(this.catalogtype.database);
		this.fileformat = this.catalogtype.format;

		const catalog: Record<string,unknown> = {};
		this.spec.getData(catalog);
		const specid = this.annoinfo['dataset:SpecificationForDataset'][this.identifier];
		const datasetspec: any = catalog[specid];
		datasetspec[this.annoinfo['dataset:DatasetObjectType'][this.identifier]] = $event.dataset;
		console.log(JSON.stringify(datasetspec));
		this.spec.setData(datasetspec);

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
		console.log('setFileFormat: ' + format);	
		this.fileformat = format;
		const catalogtype = this.format.getCatalogTypeForFormat(format);
		console.log('setFileFormat: ' + JSON.stringify(catalogtype));
		this.infoform.get('FileSourceFormat')?.setValue(catalogtype);
		this.selectionPicked(catalogtype);
	}



}
