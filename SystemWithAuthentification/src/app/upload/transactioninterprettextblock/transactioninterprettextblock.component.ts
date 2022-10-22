import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageuserserviceService } from '../../services/manageuserservice.service';
import { ActivityinformationComponent } from '../../catalogobjects/transaction/activityinformation/activityinformation.component';
import { FetchcatalogobjectComponent } from '../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { RuntransactiondialogComponent } from '../../dialog/runtransactiondialog/runtransactiondialog.component';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { ViewcatalogandsavetolocalfileComponent } from '../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { UploadmenuserviceService } from '../../services/uploadmenuservice.service';

@Component({
	selector: 'app-transactioninterprettextblock',
	templateUrl: './transactioninterprettextblock.component.html',
	styleUrls: ['./transactioninterprettextblock.component.scss']
})
export class TransactioninterprettextblockComponent implements OnInit {

	@Output() interpretEvent = new EventEmitter();

	title = 'Partitions Interpretation to Catalog Objects';
	displaydescbutton = 'Display  information to send to read local file transaction';
	displaybutton = 'Display';
	loadfromdatabase = 'Load transaction information from file';
	fetch = 'Load Info';
	submitdescr = 'Submit Read Local File Transaction';
	submitbutton = 'Submit';
	fileformaterror = 'File format not found';
	noactivitymessage = 'Activity type not defined';
	prerequisiteerror = 'Error in prerequisite information';
	filedefault = 'Interpretation';
	failedresponse = 'Failed Interpretation';
	readinfailed = 'Failed to read in Activity information';
	readincanceled = 'Canceled read in';
	failedsubmission = 'Failed interpretation';
	getannotationsfnotsuccessful = 'Annotations not found';
	message: 'Initializing';
	activityinfo: any;
	catalogobj: any;
	annoinfo: any;
	maintainer: string;
	resultHtml: string;
	formatInformation: any;
	activitytype: string
	formatinfodata: any;
	prerequisite: any;
	activityinitialdata: any;
	specificationid: any;

	@ViewChild('activity') activity: ActivityinformationComponent;

	constructor(
		manageuser: ManageuserserviceService,
		private uploadService: UploadmenuserviceService,
		public annotations: OntologycatalogService,
		public dialog: MatDialog
	) {
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});
		this.uploadService.getFormatClassification().subscribe((data) => {
			this.formatInformation = data;
		}, (error) => {
			console.log("An error accessing getFormatClassification Service");
		});
	}

	ngOnInit(): void {
	}

	setFileFormat(fileformat: string) {
		this.formatinfodata = this.formatInformation[fileformat];
		if (this.formatinfodata  != null) {
      
			this.activitytype = this.formatinfodata['prov:activity'];
alert(this.activitytype);
			this.activity.setActivity(this.activitytype);
			this.getAnnotations(this.activitytype);
		} else {
			alert(this.fileformaterror + ': ' + fileformat)
		}

	}
	setPrerequisite(transaction: any) {
		this.prerequisite = transaction;
		this.activityinfo = transaction['dataset:activityinfo'];
		if (this.activityinfo != null) {
			this.specificationid = this.activityinfo['dataset:datasettransactionspecification'];
			if (this.specificationid != null) {
				this.filedefault = this.specificationid['dataset:uniquegenericname'];
			} else {
				alert(this.prerequisiteerror);
			}
			const fileformat = this.activityinfo['dataset:filesourceformat'];
			this.setFileFormat(fileformat);
		} else {
			alert(this.prerequisiteerror);
		}
	}

	getTransactionData(transaction: any) {
		if (this.activity != null) {
			transaction['prov:activity'] = this.formatinfodata['dataset:interpretMethod'];
			const jsonact = {};
			transaction['dataset:activityinfo'] = jsonact;
			this.activity.getData(jsonact);
			const firestoreid = this.prerequisite['dataset:firestorecatalog'];
			const prerequisites = {};
			prerequisites['dataset:RepositoryDataFilePartition'] = firestoreid;
			transaction['dataset:transreqobj'] = prerequisites;
		} else {
			alert('Need to set up repository file');
		}
		return transaction;
	}

	setupInitialData() {
		if (this.activityinitialdata != null) {
			this.activityinitialdata['dataset:datasettransactionspecification'] = this.specificationid;
			this.activityinitialdata['dataset:filesourceformat'] = this.formatinfodata;
			this.activityinitialdata['dcterms:title'] = this.activityinfo['dcterms:title']
		} else {
			alert('Activity data not set up yet');
		}
		if(this.activity != null) {
      this.activity.setData(this.activityinitialdata);
    } else {
      alert('Activity interface not set up')
    }
	}

	getAnnotations(type: string) {
    alert("getAnnotations(): " + type)
		this.annotations.getNewCatalogObject(type).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					alert(JSON.stringify(catalog));
					this.activityinitialdata = catalog['dataobject'];
					alert(Ontologyconstants.outputobject)
					alert(JSON.stringify(this.activityinitialdata));
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.setupInitialData();
				} else {
					alert(this.getannotationsfnotsuccessful);
				}
			},
			error: (info: any) => { alert(this.getannotationsfnotsuccessful + '\n' + info); }
		});

	}


	displayCatalogInfo(): void {
		const activity = {};
		this.activity.getData(activity);
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;

		dialogConfig.data = {
			filename: this.filedefault,
			dataimage: activity
		};

		const myDialogRef = this.dialog.open(ViewcatalogandsavetolocalfileComponent, dialogConfig);

		myDialogRef.afterClosed().subscribe(result => {
		});
	}

	submit(): void {
		const transaction = {};
		this.getTransactionData(transaction);
		const dialogRef = this.dialog.open(RuntransactiondialogComponent, {
			data: transaction
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success == 'true') {
					this.interpretEvent.emit(result);
				} else {
					alert(this.failedresponse);
				}
			} else {
				this.resultHtml = this.failedsubmission;
			}
		});
	}




	fetchInformation() {
		const dialogRef = this.dialog.open(FetchcatalogobjectComponent, {
			data: { annoinfo: this.annoinfo, maintainer: this.maintainer, fromdatabase: false, catalogtype: this.activitytype },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				if (success == 'true') {
					const activitydata = result['dataset:simpcatobj'];
					this.activity.setData(activitydata);
				} else {
					alert(this.readinfailed);
				}
			} else {
				alert(this.readincanceled);
			}

		});


	}


}
