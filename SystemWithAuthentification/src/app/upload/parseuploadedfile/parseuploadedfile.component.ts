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
import { GcsblobfileinformationstagingComponent } from '../../catalogobjects/repository/gcsblobfileinformationstaging/gcsblobfileinformationstaging.component';
import { FiresytorecatalogidComponent } from '../../catalogobjects/firesytorecatalogid/firesytorecatalogid.component';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IdentifiersService } from '../../const/identifiers.service';
import { ViewcatalogandsavetolocalfileComponent } from '../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { ManageuserserviceService } from '../../services/manageuserservice.service';
import { FetchcatalogobjectComponent } from '../../dialog/fetchcatalogobject/fetchcatalogobject.component';


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
	maintainer: string;
	catalogobj: any;
	annoinfo: any;
	topdisplay = false;
	tranafirestoreid: any;
	title: string;

	repcatalogobj: any;
	repannoinfo: any;
	repdisplay = false;


	display = false;
	message = 'Initializing';
	rdfslabel = Ontologyconstants.rdfslabel;
	identifier = 'dcterms:identifier';
	rdfscomment = Ontologyconstants.rdfscomment;

	readinfailed = 'Catalog object read failed';
	errormaintainer = 'Error in determining maintainer';
	nostaginginfo = 'No staging information';
	stagingprerequiitesubtitle = "Staging Prerequisite Transacton"
	parsedescbutton = 'Parse Uploaded File with the information above';
	parsebutton = 'Parse';
	displaydescbutton = 'Display Transaction Input';
	displaybutton = 'Display';
	loadfromdatabase = 'Load Parse Information from database';
	load = 'load';

	titleid: string;
	gcsstagingblobid: string;
	formatid: string;
	methodid: string;
	specforcolid: string;
	datasetid: string;
    datasetverid: string;
	genericlabelid: string;
	maintainerid: string;


	@ViewChild('gcs') gcs: GcsblobfileinformationstagingComponent;
	@ViewChild('prereqfirestoreid') prereqfirestoreid: FiresytorecatalogidComponent;


	constructor(
		manageuser: ManageuserserviceService,
		public annotations: OntologycatalogService,
		private _formBuilder: FormBuilder,
		public labels: UploadinterfaceconstantsService,
		private uploadService: UploadmenuserviceService,
		public identifiers: IdentifiersService,
		public dialog: MatDialog) {
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(this.errormaintainer);
			}
		});


		this.repositorystaging = null;


		this.parseinfoform = this._formBuilder.group({
			BlockLineCount: ['1'],
			DescriptionTitle: ['', Validators.required],
			FileSourceFormat: ['', Validators.required],
			FilePartitionMethod: ['', Validators.required],
			DatasetCollectionObjectType: ['', Validators.required],
			CatalogObjectUniqueGenericLabel: ['', Validators.required],
			DatasetName: ['', Validators.required],
			DatasetVersion: ['', Validators.required]
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
		this.specforcolid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];
		this.datasetid = this.annoinfo['dataset:DatasetName'][this.identifier];
		this.datasetverid = this.annoinfo['dataset:DatasetVersion'][this.identifier];
		this.genericlabelid = this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier];
		this.maintainerid = this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier];
	}
	setRepIDs(): void {
		this.gcsstagingblobid = this.repannoinfo['dataset:GCSBlobFileInformationStaging'][this.identifier];
	}

	public setFileStaging(staging: any): void {
		if (staging != null) {
			this.setIDs();
			this.setRepIDs();
			const titl = staging[this.titleid]
			this.parseinfoform.get('DescriptionTitle').setValue(titl);
			const fmt = staging[this.formatid];
			this.parseinfoform.get('FileSourceFormat').setValue(fmt);
			const pmeth = staging[this.methodid];
			this.parseinfoform.get('FilePartitionMethod').setValue(pmeth);
			this.repositorystaging = staging;
			
			const gcsdata = staging[this.gcsstagingblobid];
			if (gcsdata != null) {
				this.gcs.setData(gcsdata);
			} else {
				alert("Cloud Storage Information is not defined")
			}
			
			const specforcol = staging[this.specforcolid];
			if(specforcol != null) {
				const dataset = specforcol[this.datasetid];
				this.parseinfoform.get('DatasetName').setValue(dataset);
				const datasetver = specforcol[this.datasetverid];
				this.parseinfoform.get('DatasetVersion').setValue(datasetver);
				const genericlabel = specforcol[this.genericlabelid];
				this.parseinfoform.get('CatalogObjectUniqueGenericLabel').setValue(genericlabel);
			}
			
			this.display = true;
			this.tranafirestoreid = staging['dataset:firestorecatalog'];
			if (this.tranafirestoreid != null) {
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
		jsonact[this.specforcolid] = jsontransspec;
		jsontransspec[this.datasetid] = this.parseinfoform.get('DatasetName').value;
		jsontransspec[this.datasetverid] = this.parseinfoform.get('DatasetVersion').value;
		jsontransspec[this.genericlabelid] = this.parseinfoform.get('CatalogObjectUniqueGenericLabel').value;
		jsontransspec[this.maintainerid] = this.maintainer;
			
		this.gcs.getData(jsonact);
		jsonact[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.parseinfoform.get('FileSourceFormat').value;

		const fmt = this.formatInformation[this.parseinfoform.get('FileSourceFormat').value];
		if (fmt != null) {
			jsonact[this.annoinfo['dataset:FilePartitionMethod'][this.identifier]] = this.formatInformation[this.parseinfoform.get('FileSourceFormat').value]['dataset:partitionMethod']
		} else {
			jsonact[this.annoinfo['dataset:FilePartitionMethod'][this.identifier]] = "";
		}
		jsonact[this.annoinfo['dataset:BlockLineCount'][this.identifier]] = this.blockCount();
		jsonact[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.parseinfoform.get('DescriptionTitle').value;

		let prerequisites = {};
		const dummy = {};
		this.prereqfirestoreid.getData(dummy);
		prerequisites[Ontologyconstants.InitialReadInOfRepositoryFile] = dummy[this.identifiers.FirestoreCatalogID];
		json[Ontologyconstants.DatabaseIDFromRequiredTransaction] = prerequisites;

		return json;
	}
	fetchInformation() {
		const dialogRef = this.dialog.open(FetchcatalogobjectComponent, {
			data: { annoinfo: this.annoinfo, maintainer: this.maintainer, fromdatabase: false },
		});

		dialogRef.afterClosed().subscribe(response => {
			if (response['dataset:servicesuccessful'] == 'true') {
				const activity = response['dataset:simpcatobj']
				alert(JSON.stringify(activity));
				const staging = activity['dataset:activityinfo'];
				if (staging != null) {
					this.setFileStaging(staging);
				} else {
					alert(' activityinfo ot found');
				}

			} else {
				alert(this.readinfailed);
			}
		});
	}
	submitParse() {
		alert("submit");
		const activity = this.createParseActivity();
		alert(JSON.stringify(activity))
	}

	displayTransactionInput(): void {
		const activity = this.createParseActivity();
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;
		this.title = 'Activity Value';

		dialogConfig.data = {
			filename: this.title,
			dataimage: activity
		};

		const myDialogRef = this.dialog.open(ViewcatalogandsavetolocalfileComponent, dialogConfig);

		myDialogRef.afterClosed().subscribe(result => {
		});
	}
}
