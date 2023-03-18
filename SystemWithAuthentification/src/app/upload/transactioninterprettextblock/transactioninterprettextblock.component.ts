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

	prereqdescbutton = 'Load prerequisite information (required for submission)'
	prereqbutton = 'Prerequisite';
	title = 'Partitions Interpretation to Catalog Objects';
	displaydescbutton = 'Display  information to send to read local file transaction';
	displaybutton = 'Display';
	loadfromdatabase = 'Load activity information from file';
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
	activitytype: string;
	formatinfodata: any;
	prerequisite: any;
	activityinitialdata: any;
	specificationid: any;
	
	prerequisitebutton: boolean;

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
		this.resultHtml = "<div>No Submission</div>";
	}

	invalid(): boolean {
		var ans = !this.prerequisitebutton;
		if(this.activity != null) {
		    ans = ans || this.activity.invalid();
		} else {
			ans = true;
		}
		return ans;
	}

	setFileFormat(fileformat: string) {
		alert("setFormat");
		this.formatinfodata = this.formatInformation[fileformat];
		if (this.formatinfodata == null) {
			this.formatinfodata = this.findInFormatInformation(fileformat);
			if (this.formatinfodata == null) {
				alert(this.fileformaterror + ': ' + fileformat)
			} else {
				this.activitytype = this.formatinfodata['prov:activity'];
			}
		} else {
			this.activitytype = this.formatinfodata['prov:activity'];
		}
		alert("setFormat: " + this.activitytype);
	}

	findInFormatInformation(formattrans: string): string {
		let ans = '';
		let notfound = true;
		const keys = Object.keys(this.formatInformation);
		let i = 0;
		while (notfound) {
			const key = keys[i];
			const data = this.formatInformation[key];
			if (data['dataset:filesourceformat'] == formattrans) {
				ans = key;
				notfound = false;
			}
			i++;
		}
		return ans;
	}
	setPrerequisite(transaction: any) {
		this.prerequisite = transaction;
		this.activityinfo = this.prerequisite['dataset:activityinfo'];
		if (this.activityinfo != null) {
			this.prerequisitebutton = true;
			this.specificationid = this.activityinfo['dataset:datasettransactionspecification'];
			if (this.specificationid != null) {
				this.filedefault = this.specificationid['dataset:uniquegenericname'];
			} else {
				alert(this.prerequisiteerror);
			}
			const fileformat = this.activityinfo['dataset:filesourceformat'];
			this.setFileFormat(fileformat);
			alert("Interpret: setPrerequisite: this.activity=" + this.activity);
			if (this.activity != null) {
				this.activity.setPrerequisiteData(this.prerequisite);
			}

		} else {
			alert(this.prerequisiteerror);
		}
		alert("Interpret: setPrerequisite:  end activityinfo " + JSON.stringify(this.activityinfo));
	}

	activitysetup(): void {
		alert("activitysetup() begin");
		if (this.prerequisite != null) {
				this.activity.setPrerequisiteData(this.prerequisite);
		} else {
			alert("prerequisite not set up");
		}
		alert("activitysetup() end");
	}

	getTransactionData(transaction: any) {
		if (this.activity != null) {
			transaction['prov:activity'] = 'dataset:TransactionInterpretTextBlock';
			const jsonact = {};
			transaction['dataset:activityinfo'] = jsonact;
			this.activity.getData(jsonact);
			if (this.prerequisite != null) {
				const firestoreid = this.prerequisite['dataset:firestorecatalog'];
				const prerequisites = {};
				prerequisites['dataset:partitionfile'] = firestoreid;
				transaction['dataset:transreqobj'] = prerequisites;
			} else {
				alert('Prerequisite not set');
			}

		} else {
			alert('Need to set up repository file');
		}
		return transaction;
	}

	getAnnotations(type: string): void {
		this.annotations.getNewCatalogObject(type).subscribe(
			(responsedata) => {
				const response = responsedata;
				//this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.activityinitialdata = catalog['dataobject'];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.activity.setActivity(this.activitytype);
				} else {
					alert(this.getannotationsfnotsuccessful);
				}
			}
		);

	}


	displayActivity(): void {
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
				//this.resultHtml = this.failedsubmission;
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
