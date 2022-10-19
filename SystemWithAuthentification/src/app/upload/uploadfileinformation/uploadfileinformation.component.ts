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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FetchcatalogobjectComponent } from '../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { KeywordlistprimitiveComponent } from '../../primitives/keywordlistprimitive/keywordlistprimitive.component';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { ActivityrepositoryinitialreadlocalfileComponent } from '../../catalogobjects/activity/repository/activityrepositoryinitialreadlocalfile/activityrepositoryinitialreadlocalfile.component';
import { ViewcatalogandsavetolocalfileComponent } from '../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { RuntransactiondialogComponent } from '../../dialog/runtransactiondialog/runtransactiondialog.component';

@Component({
	selector: 'app-uploadfileinformation',
	templateUrl: './uploadfileinformation.component.html',
	styleUrls: ['./uploadfileinformation.component.scss']
})
export class UploadfileinformationComponent implements OnInit {

	@Output() repositoryEvent = new EventEmitter<any>();

	catalogobj: any;
	annoinfo: any;
	activitydata: any;
	maintainer: string;
	resultHtml: string;

	getannotationsfnotsuccessful = 'Initialization not successful';
	failedresponse = 'Storage of stagine file failed';
	message = 'Initializing';
	title = 'Upload File to Respository';
	filedefault = 'UploadFileActivity';
	displaydescbutton = 'Display  information to send to read local file transaction';
	displaybutton = 'Display';
	loadfromdatabase = 'Load transaction information from file';
	fetch = 'Load Info';
	submitdescr = 'Submit Read Local File Transaction';
	submitbutton = 'Submit';
	catalogtype = 'dataset:ActivityRepositoryInitialReadLocalFile';
	readinfailed = 'Activity Read Failed';
	readincanceled = 'Cancel Read';
	failedsubmission = 'Failed Submission';

	@ViewChild('upload') upload: ActivityrepositoryinitialreadlocalfileComponent;

	constructor(
		public annotations: OntologycatalogService,
		public dialog: MatDialog
	) {
		this.getAnnotations();
	}

	ngOnInit(): void {
	}

	invalid(): boolean {
		let ans = true;
		if (this.upload != null) {
			ans = this.upload.invalid();
		}
		return ans;
	}
	getTransactionData(transaction: any) {
		transaction[Ontologyconstants.TransactionEventType] = Ontologyconstants.InitialReadInOfRepositoryFileActivity;
		const activity = {};
		this.upload.getData(activity);
		transaction[Ontologyconstants.ActivityInfo] = activity;
		activity[Ontologyconstants.UploadFileSource] = Ontologyconstants.StringSource;
		activity[Ontologyconstants.FileSourceIdentifier] = this.upload.getDataImage();

	}

	setData(activity: any) {
		this.upload.setData(activity);
	}

	getAnnotations() {
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.activitydata = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
				} else {
					alert(this.getannotationsfnotsuccessful);
				}
			},
			error: (info: any) => { alert(this.getannotationsfnotsuccessful + '\n' + info); }
		});

	}

	displayCatalogInfo(): void {
		const activity = {};
		this.upload.getData(activity);
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
					this.repositoryEvent.emit(result);
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
			data: { annoinfo: this.annoinfo, maintainer: this.maintainer, fromdatabase: false, catalogtype: this.catalogtype },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				if (success == 'true') {
					this.activitydata = result['dataset:simpcatobj'];
					this.setData(this.activitydata);
				} else {
					alert(this.readinfailed);
				}
			} else {
				alert(this.readincanceled);
			}

		});


	}

}
