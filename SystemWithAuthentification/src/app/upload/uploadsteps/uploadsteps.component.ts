import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UploadmenuserviceService } from '../../services/uploadmenuservice.service';
import * as moment from 'moment';

@Component({
	selector: 'app-uploadsteps',
	templateUrl: './uploadsteps.component.html',
	styleUrls: ['./uploadsteps.component.scss'],
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { showError: true },
		},
	],
})
export class UploadstepsComponent implements OnInit {

	uploadForm: FormGroup;
	uploadinfoform: FormGroup;
	senduploadfile: FormGroup;
	parseinfoform: FormGroup;
	createform: FormGroup;
	references: FormArray;
	formatInformation: any;
	formatList: string[];
	uncertaintyInformation: any;
	unitInformation: any;

	uploadInformation: string
	parseResult: string;
	interpretResult: string;

	public filemediatype = "text/*";
	public filemediasubtype = "";
	public uploadfilesource = "dataset:LocalFileSystem";
	public maintainer = "Administrator";
	public collectionobjecttype = "";

	unitset = ["quantitykind:MolarEnergy", "quantitykind:MolarEntropy", "quantitykind:MolarHeatCapacity", "quantitykind:Frequency"];

	constructor(private _formBuilder: FormBuilder,
		private uploadService: UploadmenuserviceService) { }

	ngOnInit() {
		this.uploadForm = this._formBuilder.group({
			avatar: [null, Validators.required],
			FileSourceIdentifier: ['No file selected']
		});
		this.uploadinfoform = this._formBuilder.group({
			FileSourceFormat: ['', Validators.required],
			FileSourceTitle: ['', Validators.required, Validators.minLength(15)],
			FileSourceAbstract: ['', Validators.required, Validators.minLength(15)],
			DatasetName: ['', Validators.required],
			DatasetVersion: ['', Validators.required],
			CatalogObjectUniqueGenericLabel: ['', Validators.required],
		});
		this.parseinfoform = this._formBuilder.group({
			BlockLineCount: ['1']
		});

		this.createform = this._formBuilder.group({
		});

		this.references = new FormArray([]);
		this.uploadInformation = '';
		alert("Call Service");

		this.uploadService.getFormatClassification().subscribe((data) => {
			this.formatInformation = data;
			this.formatList = Object.keys(data);
			for (const element of Object.entries(data)) {
				const key = element[0];
			}
		}, (error) => {
			console.log("An error accessing getFormatClassification Service");
		})

		this.uploadService.getUnitSet(this.unitset).subscribe((data) => {
			this.unitInformation = data;
		}, (error) => {
			console.log("An error accessing getUnitSet Service");
		})
		this.uploadService.getUncertaintyChoices().subscribe((data) => {
			this.uncertaintyInformation = data;
		}, (error) => {
			console.log("An error accessing getUnitSet Service");
		})

	}


	getFormatValue(property: string): string {
		let value = "";
		const format = this.uploadinfoform.get('FileSourceFormat').value
		if (format != null) {
			const formatinfo = this.formatInformation[format];
			if (formatinfo != null) {
				const propvalue = formatinfo[property];
				if (propvalue != null) {
					value = propvalue as string;
				}
			}
		}
		return value;
	}

	submitUpload(message: string) {
		this.uploadInformation = JSON.stringify(this.createUploadJsonObject(),null,2);
	}
	submitParseEvent(message: string) {
		this.parseResult = JSON.stringify(this.createParseJsonObject(),null,2);
	}

	submitInterpretEvent(message: any) {
		this.interpretResult = JSON.stringify(message,null,2);
	}
	
	createParseJsonObject(): any {
		const json = {};
		json['prov:activity'] = 'dataset:PartiionSetWithinRepositoryFile';
		const jsonact = {};
		json['dataset:activityinfo'] = jsonact;
		const jsontransspec = {};
		jsonact['dataset:datasettransactionspecification'] = jsontransspec;
		jsontransspec['dataset:datasetname'] = this.uploadinfoform.get('DatasetName').value;
		jsontransspec['dataset:datasetversion'] = this.uploadinfoform.get('DatasetVersion').value;
		jsontransspec['dataset:uniquegenericname'] = this.uploadinfoform.get('CatalogObjectUniqueGenericLabel').value;
		jsontransspec['dataset:catalogobjectmaintainer'] = this.maintainer;
		jsonact['dataset:filesourceformat'] = this.uploadinfoform.get('FileSourceFormat').value;
		jsonact['dcterms:title'] = this.uploadinfoform.get('FileSourceTitle').value;
		jsonact['dataset:filepartitionmethod'] = this.getFormatValue('dataset:partitionMethod');
		jsonact['dataset:blocklinecount'] = this.getFormatValue('dataset:partitionMethod');
		jsonact['dataset:collectionobjecttype'] = this.getFormatValue('dcat:catalog');
		return json;
	}

	
	
	createUploadJsonObject(): any {
		const jsontop = {};
		jsontop['prov:activity'] = "dataset:InitialReadInOfRepositoryFile";
		const json = {};
		jsontop['dataset:activityinfo'] = json;
		json['dataset:filesourceformat'] = this.uploadinfoform.get('FileSourceFormat').value;
		json['dcterms:title'] = this.uploadinfoform.get('FileSourceTitle').value;
		json['dataset:fileidentifier'] = this.uploadForm.get('FileSourceIdentifier').value;
		json['dataset:filemediatype'] = this.filemediatype;
		json['dataset:filesourcesubtype'] = this.filemediasubtype;
		json['dataset:uploadsrc'] = this.uploadfilesource;

        const jsonstaging = {};
        json['descr-filestaging'] = jsonstaging;
        const jsonkeywords = [];
        jsonstaging['dataset:keyword-filestaging'] = jsonkeywords;
        const jsonpurpose = {};
        jsonstaging['dataset:purpose-filestaging'] = jsonpurpose;
        jsonpurpose['dataset:purposekey-filestaging'] ="dataset:PurposeFileStaging";
        jsonpurpose['dataset:dataconcept-staging'] = 'dataset:ConceptFileStaging';
        
        jsonstaging['dataset:title-staging'] = this.uploadinfoform.get('FileSourceTitle').value;
        jsonstaging['dataset:abstract-staging'] = "";
        let dateTime = new Date();
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm'; 
        jsonstaging['dcterms:created'] = moment(dateTime, DATE_TIME_FORMAT);
		const jsontransspec = {};
		json['dataset:datasettransactionspecification'] = jsontransspec;
		jsontransspec['dataset:datasetname'] = this.uploadinfoform.get('DatasetName').value;
		jsontransspec['dataset:datasetversion'] = this.uploadinfoform.get('DatasetVersion').value;
		jsontransspec['dataset:uniquegenericname'] = this.uploadinfoform.get('CatalogObjectUniqueGenericLabel').value;
		jsontransspec['dataset:catalogobjectmaintainer'] = this.maintainer;

		json['dcterms:BibliographicResource'] = this.createReferencesJsonObject();

		return json;
	}


	createReferencesJsonObject(): any {
		const json = [];
		for (let i = 0; i < this.references.length; i++) {
			const jsonref = {};
			json.push(jsonref);
			let ref = this.references.at(i) as FormGroup;
			jsonref['dataset:referencetitle'] = ref.get('ReferenceTitle').value;
			jsonref['dataset:referencestring'] = ref.get('ReferenceString').value;
			jsonref['datacite:PrimaryResourceIdentifier'] = ref.get('DOI').value;

			let authors = ref.get('authors') as FormArray;
			jsonref['dc:creator'] = this.createAuthorSetJson(authors);
		}
		return json;
	}

	createAuthorSetJson(authors: FormArray): any {
		let jsonauthors = [];
		for (let j = 0; j < authors.length; j++) {
			let author = authors.at(j) as FormGroup;
			jsonauthors.push(this.createAuthorJsonObject(author));
		}
		return jsonauthors;
	}

	createAuthorJsonObject(author: FormGroup): any {
		let json = {};
		json['dataset:authorfamilyname'] = author.get("AuthorFamilyName").value;
		json['dataset:authorgivenname'] = author.get("AuthorGivenName").value;
		json['dataset:authortitle'] = author.get("AuthorNameTitle").value;
		return json;
	}



	displayJsonObject(): void {
		alert(this.createUploadJsonObject());
	}
	
	addReference(reference: FormGroup): void {
	}

}
