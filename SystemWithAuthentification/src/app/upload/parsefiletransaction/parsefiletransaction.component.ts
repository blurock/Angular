import { Component, OnInit, Input, EventEmitter, ViewChild, Output } from '@angular/core';
import { ParseuploadedfileComponent } from '../parseuploadedfile/parseuploadedfile.component';
import { InterfaceconstantsService } from '../../const/interfaceconstants.service';
import { DatasettransactioneventobjectComponent } from '../../catalogobjects/transaction/datasettransactioneventobject/datasettransactioneventobject.component';
import { FindspecifictransactionindatasetComponent } from '../../dialog/findspecifictransactionindataset/findspecifictransactionindataset.component';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { MatDialog } from '@angular/material/dialog';
import { UploadmenuserviceService } from '../../services/uploadmenuservice.service';
import { ManageuserserviceService } from '../../services/manageuserservice.service';
import { RuntransactiondialogComponent } from '../../dialog/runtransactiondialog/runtransactiondialog.component';
import { ListoffirestoreidsComponent } from '../../catalogobjects/listoffirestoreids/listoffirestoreids.component';
import { OntologycatalogService } from '../../services/ontologycatalog.service';

@Component({
	selector: 'app-parsefiletransaction',
	templateUrl: './parsefiletransaction.component.html',
	styleUrls: ['./parsefiletransaction.component.scss']
})
export class ParsefiletransactionComponent implements OnInit {

	@Output() parsedTransactionEvent = new EventEmitter<any>();

	transactiontitle = 'Parse File Transaction';
	subtransaction = 'Submit parsing transaction with given information';
	transactionidsubtitle = 'Transaction IDs for parsing';
	fetchtransaction = 'Fetch';
	loadfromdatabase = 'Load Transaction from database or from file';
	deltransaction = 'Delete transaction from database';
	delete = 'Delete';
	readinfailed = 'Error in fetching Partition transaction';
	failedsubmission = 'Failed to delete transaction';
	identifier = Ontologyconstants.dctermsidentifier;

	annoinfo: any;
	activity: any;
	transactioninfo: any;
	transfirestoreid: any;
	maintainer: string;
	resultHtml = 'Initializing';
	catalogtype = 'dataset:DatasetTransactionEventObject';
	message: string;


	outputtransactions = 'Result of parsing';

	@ViewChild('outlst') outlst: ListoffirestoreidsComponent;

	constructor(
		public annotations: OntologycatalogService,
		manageuser: ManageuserserviceService,
		private uploadService: UploadmenuserviceService,
		public dialog: MatDialog) {

		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.determineMaintainer);
			}
		});
		this.getCatalogAnnoations();
	}

	ngOnInit(): void {
	}

	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.resultHtml = 'Annotations';
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}


	public setData(catalog: any) {
		this.transactioninfo = catalog;
		this.activity = this.transactioninfo['dataset:activityinfo'];
		const outobj = this.transactioninfo['dataset:transoutobjid'];
		this.outlst.setData(outobj);
	}

	public getData(catalog: any) {

	}

	annoReady($event) {
		//const activitytype = 'dataset:ActivityRepositoryPartitionToCatalog';
		//this.transaction.setTransaction(activitytype);
	}

	fetchInformation() {
		alert(JSON.stringify(this.annoinfo));
		const dialogRef = this.dialog.open(FindspecifictransactionindatasetComponent, {
			data: { annoinfo: this.annoinfo, maintainer: this.maintainer, transaction: 'dataset:PartiionSetWithinRepositoryFile' },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result[Ontologyconstants.successful];
				this.resultHtml = result[Ontologyconstants.message];
				if (success == 'true') {
					const transobj = result[Ontologyconstants.catalogobject];
					if (transobj != null) {
						this.setData(transobj);
						this.parsedTransactionEvent.emit(transobj);
					}
				} else {
					alert("Error in reading: " + JSON.stringify(result));
				}
			} else {
				this.resultHtml = this.readinfailed;
			}

		});
	}
	deleteTransaction(): void {
		const transaction = {};
		transaction['prov:activity'] = 'dataset:DatabaseDeleteTransaction';
		transaction['dcterms:creator'] = this.maintainer;
		transaction[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;
		const activityinfo = {};
		const transtitle = 'Delection Collection: ' + ' this.maintainer' + '   ';
		activityinfo['dcterms:title'] = transtitle;
		if (this.transactioninfo != null) {
			const firestore = this.transactioninfo[this.annoinfo['dataset:FirestoreCatalogID'][this.identifier]];
			activityinfo[this.annoinfo['dataset:FirestoreCatalogID'][this.identifier]] = firestore;
			transaction['dataset:activityinfo'] = activityinfo;
			const dialogRef = this.dialog.open(RuntransactiondialogComponent, {
				data: transaction
			});

			dialogRef.afterClosed().subscribe(result => {
				if (result != null) {
					const success = result['dataset:servicesuccessful'];
					this.resultHtml = result['dataset:serviceresponsemessage'];
					if (success == 'true') {
						//this.viewtransactionid = false;
					} else {
					}
				} else {
					this.resultHtml = this.failedsubmission;
				}
			});

		} else {
			alert('Transaction not set up yet');
		}
}
	}
