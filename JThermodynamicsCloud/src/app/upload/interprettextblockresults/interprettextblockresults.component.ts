import { Component, OnInit, Input, EventEmitter, ViewChild, Output } from '@angular/core';
import { FindspecifictransactionindatasetComponent } from '../../dialog/findspecifictransactionindataset/findspecifictransactionindataset.component';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { MatDialog } from '@angular/material/dialog';
import { UploadmenuserviceService } from '../../services/uploadmenuservice.service';
import { ManageuserserviceService } from '../../services/manageuserservice.service';
import { RuntransactiondialogComponent } from '../../dialog/runtransactiondialog/runtransactiondialog.component';
import { ListoffirestoreidsComponent } from '../../catalogobjects/listoffirestoreids/listoffirestoreids.component';
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import {FindintermediatettransactionComponent} from '../../dialog/findintermediatettransaction/findintermediatettransaction.component';
import {IdentifiersService} from '../../const/identifiers.service';

@Component({
  selector: 'app-interprettextblockresults',
  templateUrl: './interprettextblockresults.component.html',
  styleUrls: ['./interprettextblockresults.component.scss']
})
export class InterprettextblockresultsComponent implements OnInit {

	@Output() interpretTransactionEvent = new EventEmitter<any>();

	transactiontitle = 'Interpret Text Block Transaction';
	fetchtransaction = 'Fetch';
	loadfromdatabase = 'Load Transaction from database or from file';
	deltransaction = 'Delete transaction from database';
	delete = 'Delete';
	readinfailed = 'Error in fetching Partition transaction';
	failedsubmission = 'Failed to delete transaction';
	identifier = Ontologyconstants.dctermsidentifier;

	annoinfo: any;
	activity: any;
	transfirestoreid: any;
	maintainer: string;
	catalogtype = 'dataset:DatasetTransactionEventObject';
	resultHtml: string;
	transactionobject: any;


	outputtransactions = 'Result of text block interpretation';

	@ViewChild('outlst') outlst: ListoffirestoreidsComponent;

	constructor(
        private identifiers: IdentifiersService,
		public annotations: OntologycatalogService,
		manageuser: ManageuserserviceService,
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
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.resultHtml = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
				} else {
					
				}
			},
			error: (info: any) => { alert('Get Annotations failed:'); }
		});
	}


	public setData(catalog: any) {
		this.transactionobject = catalog;
		this.activity = this.transactionobject['dataset:activityinfo'];
		
		const outobj = this.transactionobject['dataset:transoutobjid'];
		this.outlst.setData(outobj);
	}

	public getData(catalog: any) {
		//this.transaction.getData(catalog);
	}

	annoReady($event) {
		//const activitytype = 'dataset:ActivityRepositoryPartitionToCatalog';
		//this.transaction.setTransaction(activitytype);
	}
		fetchInformation() {
					const data = {};
			data[this.identifiers.CatalogDataObjectMaintainer] = this.maintainer;
			data[this.identifiers.TransactionEventType] = 'dataset:TransactionInterpretTextBlock';
			data[Ontologyconstants.annoinfo] = this.annoinfo;

		const dialogRef = this.dialog.open(FindintermediatettransactionComponent, {
			data: data,
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result[Ontologyconstants.successful];
				this.resultHtml = result[Ontologyconstants.message];
				if (success == 'true') {
          
          			this.transactionobject = result[Ontologyconstants.catalogobject];
					if (this.transactionobject != null) {
						this.setData(this.transactionobject);
						this.interpretTransactionEvent.emit(this.transactionobject);
					}
				} else {
					alert('Error in reading: ' + JSON.stringify(result));
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

		const firestore = this.transactionobject[this.annoinfo['dataset:FirestoreCatalogID'][this.identifier]];
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
					alert("Transaction delete successful");
				} else {
				}
			} else {
				this.resultHtml = this.failedsubmission;
			}
		});

	}

}
