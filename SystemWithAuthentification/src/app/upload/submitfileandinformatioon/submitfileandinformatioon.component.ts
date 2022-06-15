import { Input, Output, EventEmitter, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RuntransactiondialogComponent } from '../../dialog/runtransactiondialog/runtransactiondialog.component';
import { FetchcatalogobjectComponent } from '../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FiresytorecatalogidComponent } from '../../catalogobjects/firesytorecatalogid/firesytorecatalogid.component';
import { DatasetrepositoryfilestagingComponent } from '../../catalogobjects/repository/datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import { UploadfileinformationComponent } from '../uploadfileinformation/uploadfileinformation.component';
import { Ontologyconstants } from '../../const/ontologyconstants';

@Component({
	selector: 'app-submitfileandinformatioon',
	templateUrl: './submitfileandinformatioon.component.html',
	styleUrls: ['./submitfileandinformatioon.component.scss']
})
export class SubmitfileandinformatioonComponent implements OnInit {

	@Input() uploadinfo: UploadfileinformationComponent;

	@ViewChild('filestaging') filestaging: DatasetrepositoryfilestagingComponent;
	@ViewChild('tranactionfirestoreid') tranactionfirestoreid: FiresytorecatalogidComponent;


	readinfailed = 'Catalog Read in failed or canceled';
	filestagingsubtitle = 'File staging transaction submission'
	loadfromdatabase = 'Load previously generated staging information from database (or file)'
	submit = 'Submit Transaction'
	subtransaction = 'Submit staging transaction with given information';
	fetchstaging = 'Fetch From Database';
	failedsubmission = 'Failed Submission';
	transactionidsubtitle = 'Transaction ID for Staging';

	identifier = Ontologyconstants.dctermsidentifier;

	resultHtml: string;
	tranafirestoreid: any;
	maintainer: string;
	annoinfo: any;
	catalog: any;

	constructor(
		public dialog: MatDialog
	) {
		this.maintainer = 'Administrator';
	}

	ngOnInit(): void {
	}

	fetchInformation() {
		this.annoinfo = this.filestaging.annoinfo;
		const dialogRef = this.dialog.open(FetchcatalogobjectComponent, {
			data: { annoinfo: this.annoinfo, maintainer: this.maintainer, fromdatabase: true, catalogtype: 'dataset:RepositoryFileStaging' },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success == 'true') {
					this.catalog = result['dataset:simpcatobj'];
					this.filestaging.setData(this.catalog);
					this.tranafirestoreid = this.catalog['dataset:transactionforobject'];
					this.tranactionfirestoreid.setData(this.tranafirestoreid);
				} else {
				}
			} else {
				this.resultHtml = this.readinfailed;
			}

		});


	}
	submitInformation() {
		const catalog = {};
		this.uploadinfo.getData(catalog);
		const dialogRef = this.dialog.open(RuntransactiondialogComponent, {
			data: catalog
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success == 'true') {
					this.catalog = result['dataset:simpcatobj'];
					if (this.catalog != null) {
						this.filestaging.setData(this.catalog);
						this.tranafirestoreid = this.catalog['dataset:transactionforobject'];
						if(this.tranafirestoreid != null) {
							this.tranactionfirestoreid.setData(this.tranafirestoreid);
						}
					}
				} else {
				}
			} else {
				this.resultHtml = this.failedsubmission;
			}
		});
	}

}
