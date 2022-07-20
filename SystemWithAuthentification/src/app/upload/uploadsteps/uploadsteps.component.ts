import { Component, OnInit, AfterViewInit, ViewChild,EventEmitter  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UploadmenuserviceService } from '../../services/uploadmenuservice.service';
import {UploadfileinformationComponent} from '../uploadfileinformation/uploadfileinformation.component';
import {SubmitfileandinformatioonComponent} from '../submitfileandinformatioon/submitfileandinformatioon.component';

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

    uploadinfoform: FormGroup;
	parseinfoform: FormGroup;
	createform: FormGroup;
	references: FormArray;
	uncertaintyInformation: any;
	unitInformation: any;

	uploadInformation: string
	parseResult: string;
	interpretResult: string;
	titles: string[];
	titleInformation: any;

	public filemediatype = "dataset:FileTypeText";
	public filemediasubtype = "";
	public uploadfilesource = "dataset:LocalFileSystem";
	public maintainer = "Administrator";
	public collectionobjecttype = "";

	unitset = ["quantitykind:MolarEnergy", "quantitykind:MolarEntropy", "quantitykind:MolarHeatCapacity", "quantitykind:Frequency"];
	
	@ViewChild('uploadinfo') uploadinfo: UploadfileinformationComponent;
	@ViewChild('stagefile') stagefile: SubmitfileandinformatioonComponent;
	
	repositorystaging = new EventEmitter<any>();
	
	constructor(
		private _formBuilder: FormBuilder,
		private uploadService: UploadmenuserviceService) { 
			
			
		}

	ngOnInit() {

		this.createform = this._formBuilder.group({
		});

		this.references = new FormArray([]);
		this.uploadInformation = '';
/*
        this.repositorystaging.subscribe((data) => {
			});
		*/
		this.uploadService.getTitleChoices().subscribe((data) => {
			this.titleInformation = data;
			this.titles = Object.keys(data);
		}, (error) => {
			console.log("An error accessing getTitleChoices() Service");
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
	
	ngAfterViewInit() {
		this.uploadinfoform = this.uploadinfo.getForm();
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
		//jsontransspec['dataset:datasetname'] = this.uploadinfoform.get('DatasetName').value;
		//jsontransspec['dataset:datasetversion'] = this.uploadinfoform.get('DatasetVersion').value;
		//jsontransspec['dataset:uniquegenericname'] = this.uploadinfoform.get('CatalogObjectUniqueGenericLabel').value;
		//jsontransspec['dataset:catalogobjectmaintainer'] = this.maintainer;
		//jsonact['dataset:filesourceformat'] = this.uploadinfoform.get('FileSourceFormat').value;
		//jsonact['dcterms:title'] = this.uploadinfoform.get('FileSourceTitle').value;
		//jsonact['dataset:filepartitionmethod'] = this.getFormatValue('dataset:partitionMethod');
		//jsonact['dataset:blocklinecount'] = this.getFormatValue('dataset:blocklinecount');
		//jsonact['dataset:collectionobjecttype'] = this.getFormatValue('dcat:catalog');
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
		const activity = {};
		this.uploadinfo.getData(activity);
		alert(JSON.stringify(activity));
	}

}
