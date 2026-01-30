import { Input, Output, Component, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { FormArray, UntypedFormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UploadinterfaceconstantsService } from '../uploadinterfaceconstants.service'
import { Ontologyconstants } from 'systemconstants';
import { UploadfileinformationComponent } from '../uploadfileinformation/uploadfileinformation.component';
import { UploadmenuserviceService } from '../../services/uploadmenuservice.service';
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import { DatasetrepositoryfilestagingComponent } from '../../catalogobjects/repository/datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import { DatasetreferenceComponent } from '../../catalogobjects/datasetreference/datasetreference.component';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IdentifiersService } from '../../const/identifiers.service';
import { ViewcatalogandsavetolocalfileComponent } from '../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { ManageuserserviceService } from '../../services/manageuserservice.service';
import { ActivityrepositorypartitiontocatalogComponent } from '../../catalogobjects/activity/repository/activityrepositorypartitiontocatalog/activityrepositorypartitiontocatalog.component';
import { RuntransactiondialogComponent } from '../../dialog/runtransactiondialog/runtransactiondialog.component';

@Component({
	selector: 'app-parseuploadedfile',
	templateUrl: './parseuploadedfile.component.html',
	styleUrls: ['./parseuploadedfile.component.scss']
})
export class ParseuploadedfileComponent implements AfterViewInit {

	@Output() parsedEvent = new EventEmitter<any>();

	repositorystaging: any;
	annoinfo: any;
	maintainer: string;
	title: string;
	fileformatdata: any;

	identifier = Ontologyconstants.dctermsidentifier;
	formatInformation: any;
	fetch = 'Fetch Defaults';
	fetchdescr = 'Fetch default information from repository object information';
	displaybutton = 'Display';
	displaydescbutton = 'Display activity information and save to file';
	submitbutton = 'Submit Transaction';
	submitdescr = 'Submit transaction to parse repository file';
	transfirestoreid: any;
	failedsubmission = 'Partition of file failed';
	failedresponse = 'Partitioning gave error';
	resultHtml = 'Initializing';

	@ViewChild('partition') partition: ActivityrepositorypartitiontocatalogComponent;


	constructor(
		manageuser: ManageuserserviceService,
		public annotations: OntologycatalogService,
		private _formBuilder: UntypedFormBuilder,
		public labels: UploadinterfaceconstantsService,
		private uploadService: UploadmenuserviceService,
		public identifiers: IdentifiersService,
		public dialog: MatDialog,
		private fileservice: UploadmenuserviceService
	) {
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});
	}

	ngAfterViewInit(): void {
		this.fileservice.getFormatClassification().subscribe({
			next: (data: any) => {
				this.fileformatdata = data;
			}
		});

		const catalogtype = 'dataset:ActivityRepositoryPartitionToCatalog';

		this.annotations.getNewCatalogObject(catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.resultHtml = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
				} else {
					this.resultHtml = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' ); }
		});

		this.uploadService.getFormatClassification().subscribe((data) => {
			this.formatInformation = data;
		}, (error) => {
			console.log("An error accessing getFormatClassification Service");
		});
	}

	invalid(): boolean {
		return this.repositorystaging == null || this.partition.invalid();
	}
	public setFileStaging(staging: any): void {
		if (staging != null) {
			this.repositorystaging = staging;
			this.setFormatDefaults();
		} else {
			alert('staging is not defined');
		}
	}

	setFormatDefaults() {
		if (this.annoinfo != null) {
			if (this.repositorystaging != null) {
				const format = this.formatValue();
				if (format != null && this.formatInformation != null) {
					const info = this.formatInformation[format];
					if (info != null) {
						const partitionmethod = info['dataset:partitionMethod'] as string;
						const linecount = info['dataset:blocklinecount'] as string;
						const activityinfo = {};
						this.partition.setIDs();
						activityinfo[this.partition.blkcntid] = linecount;
						activityinfo[this.partition.formatid] = format;
						activityinfo[this.partition.methodid] = partitionmethod;
						activityinfo[this.partition.descrtitleid] = this.repositorystaging[this.partition.descrtitleid];
						activityinfo[this.partition.specid] = this.repositorystaging[this.partition.specid];
						this.partition.setData(activityinfo);
					} else {
						alert('Unknown file format type');
					}
				} else {
					alert('Could not set up format defaults based on file format')
				}
			} else {
				alert('Need to set up repository file prerequisite');
			}
		} else {
			alert('Partition interface not set up: reload repository when set up');
		}
	}

	formatValue() {
		let ans = null;
		if (this.repositorystaging != null) {
			const blob = this.repositorystaging['dataset:gcsstagingblob'];
			if (blob != null) {
				ans = blob[this.annoinfo['dataset:FileSourceFormat'][this.identifier]]
			} else {
				alert('blob not found');
			}
		}
		return ans;
	}


	createParseActivity(): any {
		const jsonobj = {};
		if (this.repositorystaging != null) {
			jsonobj['prov:activity'] = 'dataset:PartiionSetWithinRepositoryFile';
			const jsonact = {};
			jsonobj['dataset:activityinfo'] = jsonact;
			this.partition.getData(jsonact);
			const firestoreid = this.repositorystaging['dataset:transactionforobject'];
			const prerequisites = {};
			prerequisites['dataset:initreposfile'] = firestoreid;
			jsonobj['dataset:transreqobj'] = prerequisites;
		} else {
			alert('Need to set up repository file');
		}
		return jsonobj;
	}

	submitParse() {
		const transaction = this.createParseActivity();
		const dialogRef = this.dialog.open(RuntransactiondialogComponent, {
			data: transaction
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success == 'true') {
					this.parsedEvent.emit(result);
				} else {
					alert(this.failedresponse);
				}
			} else {
				this.resultHtml = this.failedsubmission;
			}
		});
	}

	displayActivity(): void {
		const activity = {};
		this.partition.getData(activity);
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
