import { Input, Output, EventEmitter, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { UploadinterfaceconstantsService } from '../uploadinterfaceconstants.service';
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { IdentifiersService } from '../../const/identifiers.service';
import { SetofdataobjectlinksComponent } from '../../catalogobjects/catalogbaseobjects/setofdataobjectlinks/setofdataobjectlinks.component';
import { SetofsitereferencesComponent } from '../../catalogobjects/catalogbaseobjects/setofsitereferences/setofsitereferences.component';
import { DatasetreferenceComponent } from '../../catalogobjects/datasetreference/datasetreference.component';
import { UploadmenuserviceService } from '../../services/uploadmenuservice.service';
import { VisualizefileComponent } from '../../dialog/visualizefile/visualizefile.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchcatalogobjectComponent } from '../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { KeywordlistprimitiveComponent } from '../../primitives/keywordlistprimitive/keywordlistprimitive.component';
import { HttpUrlEncodingCodec } from '@angular/common/http';

@Component({
	selector: 'app-uploadfileinformation',
	templateUrl: './uploadfileinformation.component.html',
	styleUrls: ['./uploadfileinformation.component.scss']
})
export class UploadfileinformationComponent implements OnInit {

	@ViewChild('references') references: DatasetreferenceComponent;
	@ViewChild('objectlinks') objectlinks: SetofdataobjectlinksComponent;
	@ViewChild('weblinks') weblinks: SetofsitereferencesComponent;
	@ViewChild('keywords') keywords: KeywordlistprimitiveComponent;


	public filemediatype = 'dataset:FileTypeText';
	public filemediasubtype = '';
	public uploadfilesource = 'dataset:StringSource';
	public maintainer = 'Administrator';
    public tranafirestoreid: any;
    
    
    
	resultHtml = "";
	formatInformation: any;
	uploadinfoform: FormGroup;
	filesourcetypechoices: string[];
	dataimage = null;

	transactionDisplay = false;
	catalogobj: any;
	annoinfo: any;
	display = false;
	
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	
	message = 'Initializing';
	uploadfnotsuccessful = 'Upload of local file not successful';
	readinfailed = 'File read in failed or canceled';
	loadfromfile = 'Load staging Information for transaction from File';
	getannotationsfnotsuccessful = 'Unsuccessful loading of object annotations';
	getannofilefnotsuccessful = 'Unsuccessful loading of file format annotation'

	constructor(
		public annotations: OntologycatalogService,
		private uploadService: UploadmenuserviceService,
		private _formBuilder: FormBuilder,
		public dialog: MatDialog
	) {
		this.uploadinfoform = this._formBuilder.group({
			FileSourceIdentifier: ['No file selected'],
			FileSourceFormat: ['', Validators.required],
			FileSourceTitle: ['', Validators.required],
			FileSourceAbstract: ['', Validators.required],
			DatasetName: ['', Validators.required],
			DatasetVersion: ['', Validators.required],
			CatalogObjectUniqueGenericLabel: ['', Validators.required],
		});

		const catalogtype = 'dataset:ActivityRepositoryInitialReadLocalFile';
		this.annotations.getNewCatalogObject(catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.display = true;
				} else {
					alert(this.getannotationsfnotsuccessful);
				}
			},
			error: (info: any) => { alert(this.getannotationsfnotsuccessful + '\n' + info); }
		});
		this.uploadService.getFormatClassification().subscribe((data) => {
			this.formatInformation = data;
			this.filesourcetypechoices = Object.keys(data);
			for (const element of Object.entries(data)) {
				const key = element[0];
			}
		}, (error) => {
			alert(this.getannofilefnotsuccessful);
		})



	}

	ngOnInit(): void {
	}

	public getForm(): FormGroup {
		return this.uploadinfoform;
	}
	
	public getAnnotations(): any {
		return this.annoinfo;
	}
	
		fetchInformation() {
		const dialogRef = this.dialog.open(FetchcatalogobjectComponent, {
		data: { annoinfo: this.annoinfo, maintainer: this.maintainer, fromdatabase: false },
			});

		dialogRef.afterClosed().subscribe(result => {
			if(result != null) {
				this.setData(result);
				} else {
					alert(this.readinfailed);
				}
		});


	}


	public getData(activity: any) {
		activity['prov:activity'] = "dataset:InitialReadInOfRepositoryFile";
		const json = {};
		activity['dataset:activityinfo'] = json;
		json['dataset:filesourceformat'] = this.uploadinfoform.get('FileSourceFormat').value;
		json['dcterms:title'] = this.uploadinfoform.get('FileSourceTitle').value;

		json['dataset:fileidentifier'] = encodeURI(this.dataimage);
		json['dataset:filemediatype'] = this.filemediatype;
		json['dataset:filesourcesubtype'] = this.filemediasubtype;
		json['dataset:uploadsrc'] = this.uploadfilesource;

		const jsonstaging = {};
		json['descr-filestaging'] = jsonstaging;
		jsonstaging['dataset:keyword-filestaging'] = this.keywords.getKeys();
		const jsonpurpose = {};
		jsonstaging['dataset:purpose-filestaging'] = jsonpurpose;
		jsonpurpose['dataset:purposekey-filestaging'] = "dataset:PurposeFileStaging";
		jsonpurpose['dataset:dataconcept-staging'] = 'dataset:ConceptFileStaging';

		jsonstaging['dataset:title-staging'] = this.uploadinfoform.get('FileSourceTitle').value;
		jsonstaging['dataset:abstract-staging'] = this.uploadinfoform.get('FileSourceAbstract').value;
		let dateTime = new Date();
		const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
		jsonstaging['dcterms:created'] = moment(dateTime, DATE_TIME_FORMAT);
		const jsontransspec = {};
		json['dataset:datasettransactionspecification'] = jsontransspec;
		jsontransspec['dataset:datasetname'] = this.uploadinfoform.get('DatasetName').value;
		jsontransspec['dataset:datasetversion'] = this.uploadinfoform.get('DatasetVersion').value;
		jsontransspec['dataset:uniquegenericname'] = this.uploadinfoform.get('CatalogObjectUniqueGenericLabel').value;
		jsontransspec['dataset:catalogobjectmaintainer'] = this.maintainer;

		this.addSetOfReferencesAndLinks(json);
	}

	public setData(activity: any) {
		if (activity != null) {
			const json = activity['dataset:activityinfo'];
			if (json != null) {
				this.uploadinfoform.get('FileSourceFormat').setValue(json['dataset:filesourceformat']);
				this.uploadinfoform.get('FileSourceTitle').setValue(json['dcterms:title']);
				const jsontransspec = json['dataset:datasettransactionspecification'];
				if (jsontransspec != null) {
					this.uploadinfoform.get('DatasetName').setValue(jsontransspec['dataset:datasetname']);
					this.uploadinfoform.get('DatasetVersion').setValue(jsontransspec['dataset:datasetversion']);
					this.uploadinfoform.get('CatalogObjectUniqueGenericLabel').setValue(jsontransspec['dataset:uniquegenericname']);
				} else {
				}
				const jsonstaging = json['descr-filestaging'];
				if (jsonstaging != null) {
					const keys = jsonstaging['dataset:keyword-filestaging'];
					this.keywords.setKeys(keys);
					this.uploadinfoform.get('FileSourceTitle').setValue(jsonstaging['dataset:title-staging']);
					this.uploadinfoform.get('FileSourceAbstract').setValue(jsonstaging['dataset:abstract-staging']);
				}
				this.setSetOfReferencesAndLinks(json);
			}
		}
	}

	public addSetOfReferencesAndLinks(info: any): void {
		this.references.getData(info);
		this.weblinks.getData(info);
		this.objectlinks.getData(info);
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
	

	uploadFileEvt(imgFile: any) {
		if (imgFile.target.files && imgFile.target.files[0]) {
			const file = (event.target as HTMLInputElement).files[0];
			this.uploadinfoform.patchValue({
				avatar: file,
				FileSourceIdentifier: file.name
			});
			let reader = new FileReader();
			reader.onload = (e: any) => {
				this.dataimage = e.target.result;
			};
			reader.readAsText(imgFile.target.files[0]);

		} else {
             alert(this.uploadfnotsuccessful);
		}
	}

	displayFile(): void {
		const myDialogRef = this.dialog.open(VisualizefileComponent, {
			data: { filename: this.uploadinfoform.get('FileSourceIdentifier').value, dataimage: this.dataimage },
		});


	}

}
