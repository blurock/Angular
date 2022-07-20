import { Input, Output, Component, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UploadinterfaceconstantsService } from '../uploadinterfaceconstants.service'
import { Ontologyconstants } from '../../const/ontologyconstants';
import { UploadfileinformationComponent } from '../uploadfileinformation/uploadfileinformation.component';
import { UploadmenuserviceService } from '../../services/uploadmenuservice.service';
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import { SubmitfileandinformatioonComponent } from '../submitfileandinformatioon/submitfileandinformatioon.component';
import { DatasetrepositoryfilestagingComponent } from '../../catalogobjects/repository/datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import { DatasetreferenceComponent } from '../../catalogobjects/datasetreference/datasetreference.component';
import {GcsblobfileinformationstagingComponent} from '../../catalogobjects/repository/gcsblobfileinformationstaging/gcsblobfileinformationstaging.component';
import { FiresytorecatalogidComponent } from '../../catalogobjects/firesytorecatalogid/firesytorecatalogid.component';
import { SavecatalogdataobjectdialogComponent } from '../../dialog/savecatalogdataobjectdialog/savecatalogdataobjectdialog.component';
import { VisualizefileComponent } from '../../dialog/visualizefile/visualizefile.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IdentifiersService } from '../../const/identifiers.service';


@Component({
	selector: 'app-parseuploadedfile',
	templateUrl: './parseuploadedfile.component.html',
	styleUrls: ['./parseuploadedfile.component.scss']
})
export class ParseuploadedfileComponent implements AfterViewInit {

	@Input() uploadinfoform: FormGroup;
	@Input() stagefile: SubmitfileandinformatioonComponent;
	@Input() repositorystagingO: EventEmitter<any>;
	
	parseinfoform: FormGroup;
	formatInformation: any;
	filesourcetypechoices: string[];
	repositorystaging: any;
	public maintainer = 'Administrator';
	catalogobj: any;
	annoinfo: any;
	topdisplay = false;
	tranafirestoreid: any;

	repcatalogobj: any;
	repannoinfo: any;
	repdisplay = false;


	display = false;
	message = 'Initializing';
	rdfslabel = Ontologyconstants.rdfslabel;
	identifier = 'dcterms:identifier';
	rdfscomment = Ontologyconstants.rdfscomment;
	nostaginginfo = 'No staging information';
	stagingprerequiitesubtitle ="Staging Prerequisite Transacton"
	parsedescbutton = 'Parse Uploaded File with the information above';
	parsebutton = 'Parse';
	displaydescbutton = 'Display Transaction Input';
	displaybutton = 'Display';
	loadfromdatabase ='Load Parse Information from database';
	load ='load';

	titleid: string;
	gcsstagingblobid: string;
	formatid: string;
	methodid: string;

	@ViewChild('gcs') gcs: GcsblobfileinformationstagingComponent;
	@ViewChild('prereqfirestoreid') prereqfirestoreid: FiresytorecatalogidComponent;


	constructor(
		public annotations: OntologycatalogService,
		private _formBuilder: FormBuilder,
		public labels: UploadinterfaceconstantsService,
		private uploadService: UploadmenuserviceService,
		public identifiers: IdentifiersService,
		public dialog: MatDialog) {
		this.repositorystaging = null;


		this.parseinfoform = this._formBuilder.group({
			BlockLineCount: ['1'],
			DescriptionTitle: ['', Validators.required],
			FileSourceFormat: ['', Validators.required],
			FilePartitionMethod: ['', Validators.required],
			DatasetCollectionObjectType: ['', Validators.required]
		});
		
		this.uploadService.getFormatClassification().subscribe((data) => {
			this.formatInformation = data;
			this.filesourcetypechoices = Object.keys(data);
			for (const element of Object.entries(data)) {
				const key = element[0];
			}
		}, (error) => {
			alert("error in getting file choices");
		})
	}

	ngAfterViewInit(): void {
		this.repositorystagingO.subscribe({
			next: (catalog: any) => {
				this.setFileStaging(catalog);
			}
		});
		
		
		const catalogtype = 'dataset:ActivityRepositoryPartitionToCatalog';

		this.annotations.getNewCatalogObject(catalogtype).subscribe({
			next: (responsedata: any) => {
				this.message = 'got response';
				this.message = responsedata;
				const response = responsedata;
				this.message = 'response JSON';
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.topdisplay = true;
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});

		const repcatalogtype = 'dataset:DatasetRepositoryFileStaging';
		this.annotations.getNewCatalogObject(repcatalogtype).subscribe({
			next: (responsedata: any) => {
				this.message = 'got response';
				this.message = responsedata;
				const response = responsedata;
				this.message = 'response JSON';
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.repcatalogobj = catalog[Ontologyconstants.outputobject];
					this.repannoinfo = catalog[Ontologyconstants.annotations];
					this.setRepIDs();
					this.repdisplay = true;
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});

		this.uploadService.getFormatClassification().subscribe((data) => {
			this.formatInformation = data;
			this.filesourcetypechoices = Object.keys(data);
		}, (error) => {
			console.log("An error accessing getFormatClassification Service");
		})
	}

	setIDs(): void {
		this.titleid = this.annoinfo['dataset:DescriptionTitle'][this.identifier];
		this.methodid = this.annoinfo['dataset:FilePartitionMethod'][this.identifier];
		this.formatid = this.annoinfo['dataset:FileSourceFormat'][this.identifier];
	}
	setRepIDs(): void {
		this.gcsstagingblobid = this.repannoinfo['dataset:GCSBlobFileInformationStaging'][this.identifier];
	}

	public setFileStaging(staging: any): void {
		if (staging != null) {
			this.setIDs();
			this.setRepIDs();
			this.parseinfoform.get('DescriptionTitle').setValue(staging[this.titleid]);
			const fmt = staging[this.gcsstagingblobid][this.formatid];
			this.parseinfoform.get('FileSourceFormat').setValue(fmt);
			const pmeth = this.formatInformation[fmt]['dataset:partitionMethod'];
			this.parseinfoform.get('FilePartitionMethod').setValue(pmeth);
			const objtype = this.formatInformation[fmt]['dataset:partitionMethod'];
			this.parseinfoform.get('DatasetCollectionObjectType').setValue(objtype);
			
			this.display = true;
			this.repositorystaging = staging;
			const gcsdata = staging[this.gcsstagingblobid];
			if(gcsdata != null ) {
				this.gcs.setData(gcsdata);
			} else {
				alert("Cloud Storage Information is not defined")
			}
			this.tranafirestoreid = staging['dataset:firestorecatalog'];
			if(this.tranafirestoreid != null){
				this.prereqfirestoreid.setData(this.tranafirestoreid);
			} else {
				alert("Staging transaction ID is not defined");
			}
		} else {
			alert('staging is not defined');
		}

	}

	getForm(): FormGroup {
		return this.parseinfoform;
	}

	formatValue() {
		let ans = null;
		if (this.repositorystaging != null) {

			ans = this.parseinfoform.get('FileSourceFormat').value;
		}
		return ans;
	}
	formNeedsLineCount(): boolean {
		let ans = false;
		const format = this.formatValue();
		if (format != null) {
			const info = this.formatInformation[format];
			if (info != null) {
				const partition = info['dataset:partitionMethod'] as string;
				if (partition.match('dataset:PartitionToLineSet')) {
					ans = true;
				}
			}
		}
		return ans;
	}
	getSourceCatalog(): string {
		let ans = "";
		const format = this.formatValue();
		if (format != null) { }
		const info = this.formatInformation[format];
		if (info != null) {
			ans = info['dcat:catalog'] as string;
		}
		return ans;

	}
	blockCount(): string {
		let count = "";
		const format = this.formatValue();
		if (format != null) { }
		const info = this.formatInformation[format];
		if (info != null) {
			const val = info['dataset:blocklinecount'] as string;
			if (val.length > 0) {
				count = '(' + val + ')' as string;
			}
		}
		return count;
	}

	createParseActivity(): any {
		const json = {};
		json['prov:activity'] = 'dataset:PartiionSetWithinRepositoryFile';
		const jsonact = {};
		json['dataset:activityinfo'] = jsonact;
		const jsontransspec = {};
		alert(this.identifier);
		alert(this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier]);
		jsonact[this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier]] = jsontransspec;
		alert('createParseActivity() 0');
	/*
		jsontransspec[this.repannoinfo['dataset:DatasetName'][this.identifier]] = this.uploadinfoform.get('DatasetName').value;
		alert('createParseActivity() 1');
		jsontransspec[this.repannoinfo['dataset:DatasetVersion'][this.identifier]] = this.uploadinfoform.get('DatasetVersion').value;
		alert('createParseActivity() 2');
		jsontransspec[this.repannoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]] = this.uploadinfoform.get('CatalogObjectUniqueGenericLabel').value;
		alert('createParseActivity() 3');
		jsontransspec[this.repannoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;
*/
       this.gcs.getData(jsonact);
		alert('createParseActivity() 4');

		jsonact[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.parseinfoform.get('FileSourceFormat').value;
		jsonact[this.annoinfo['dataset:FilePartitionMethod'][this.identifier]] = this.formatInformation[this.parseinfoform.get('FileSourceFormat').value]['dataset:partitionMethod']
		alert('createParseActivity() 5');
		jsonact[this.annoinfo['dataset:BlockLineCount'][this.identifier]] = this.blockCount();
		jsonact[this.annoinfo['dataset:DatasetCollectionObjectType'][this.identifier]] = this.getSourceCatalog();
		alert('createParseActivity() 6');
		jsonact[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.parseinfoform.get('DescriptionTitle').value;
		
		alert('createParseActivity() 7');
		let prerequisites = {};
		const dummy = {};
		this.prereqfirestoreid.getData(dummy);
		alert('prerequisites 1');
		prerequisites[Ontologyconstants.InitialReadInOfRepositoryFile] = dummy[this.identifiers.FirestoreCatalogID];
		alert('prerequisites 2');
		json[Ontologyconstants.DatabaseIDFromRequiredTransaction] = prerequisites;
		alert('prerequisites 3');

		return json;
	}
fetchInformation() {
	alert("Fetch");
}
	submitParse() {
		alert("submit");
		const activity = this.createParseActivity();
		alert(JSON.stringify(activity))
	}
	displayTransactionInput(): void {
		const activity = this.createParseActivity();
		alert(JSON.stringify(activity));
		let title = 'Activity Value';
		if(this.parseinfoform.get('dataset:DescriptionTitle')) {
			title = this.parseinfoform.get('dataset:DescriptionTitle').value;
		}
		const myDialogRef = this.dialog.open(VisualizefileComponent, {
			data: { filename: title, dataimage: activity },
		});
}
}
