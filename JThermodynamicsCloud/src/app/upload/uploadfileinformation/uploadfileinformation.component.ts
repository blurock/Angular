import { Output, EventEmitter, Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import { Ontologyconstants } from 'systemconstants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FetchcatalogobjectComponent } from '../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { ActivityrepositoryinitialreadlocalfileComponent } from '../../catalogobjects/activity/repository/activityrepositoryinitialreadlocalfile/activityrepositoryinitialreadlocalfile.component';
import { ViewcatalogandsavetolocalfileComponent } from '../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { RuntransactiondialogComponent } from '../../dialog/runtransactiondialog/runtransactiondialog.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-uploadfileinformation',
	templateUrl: './uploadfileinformation.component.html',
	styleUrls: ['./uploadfileinformation.component.scss'],
	standalone: true,
	imports: [MatCardModule,
	MatDividerModule,
	MatButtonModule,
	MatGridListModule,
	MatTooltipModule,
	MatProgressSpinnerModule,
	CommonModule,
	ActivityrepositoryinitialreadlocalfileComponent]
})
export class UploadfileinformationComponent implements OnInit {

	@Output() repositoryEvent = new EventEmitter<any>();

	catalogobj: any;
	annoinfo: any;
	activitydata: any;
	maintainer: string = '';
	resultHtml: string = '';

	getannotationsfnotsuccessful = 'Initialization not successful';
	failedresponse = 'Storage of stagine file failed';
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
	acterror = 'Expecting "dataset:activity" at the top level of the JSON object';

	@ViewChild('upload') upload!: ActivityrepositoryinitialreadlocalfileComponent;

	constructor(
		public annotations: OntologycatalogService,
		public dialog: MatDialog
	) {
		//this.getAnnotations();
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
		const activity: Record<string, unknown> = {};
		this.upload.getData(activity);
		transaction[Ontologyconstants.ActivityInfo] = activity;
		activity[Ontologyconstants.UploadFileSource] = Ontologyconstants.StringSource;
		activity[Ontologyconstants.FileSourceIdentifier] = this.upload.getDataImage();

	}

	setData(activity: any) {
		if(activity['dataset:activityinfo']) {
			this.upload.setData(activity['dataset:activityinfo']);
		} else {
			alert(this.acterror)
		}
		
	}


	displayCatalogInfo(): void {
		const activity = {};
		this.upload.getData(activity);
		alert(JSON.stringify(activity));
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
