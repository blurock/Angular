import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { DatasetrepositoryfilestagingComponent } from '../../catalogobjects/repository/datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import { FindspecifictransactionindatasetComponent } from '../../dialog/findspecifictransactionindataset/findspecifictransactionindataset.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageuserserviceService } from '../../services/manageuserservice.service';
import { DatasettransactioneventobjectComponent } from '../../catalogobjects/transaction/datasettransactioneventobject/datasettransactioneventobject.component';
import { FetchcatalogobjectComponent } from '../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { RuntransactiondialogComponent } from '../../dialog/runtransactiondialog/runtransactiondialog.component';
import { IdentifiersService } from '../../const/identifiers.service';
import {RunserviceprocessService} from '../../services/runserviceprocess.service';
import {FindintermediatettransactionComponent} from '../../dialog/findintermediatettransaction/findintermediatettransaction.component';
import { OntologycatalogService } from '../../services/ontologycatalog.service';

@Component({
	selector: 'app-initialreadinofrepositoryfileevent',
	templateUrl: './initialreadinofrepositoryfileevent.component.html',
	styleUrls: ['./initialreadinofrepositoryfileevent.component.scss']
})
export class InitialreadinofrepositoryfileeventComponent implements OnInit {

	@Output() repositoryEvent = new EventEmitter<any>();


	deletehint = 'Delete Repository File Transaction associated with the repository object';
	deletetransaction = 'Delete Transaction';
	loadcatalogfromdatabase = 'Fetch Previous Repository File Transaction';
	fetchcatalog = 'Fetch Catalog';
	readinfailed = 'Fetch Transaction Failed';
	readincanceled = 'Catalog Object fetch failed';
	catalogtype = 'dataset:DatasetTransactionEventObject';
	//activitytype = 'dataset:ActivityRepositoryInitialReadLocalFile';
	failedsubmission = 'Delete transaction failed';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	serviceid = 'service';
	catalogread = true;

	annoinfo: any;
	maintainer: string;
	resultHtml: string;
	catalogobj: any;
	activity: any;
	transactionobj: any;



	@ViewChild('repository') repository: DatasetrepositoryfilestagingComponent;

	constructor(
		public annotations: OntologycatalogService,
		private runservice: RunserviceprocessService,
		private identifiers: IdentifiersService,
		public dialog: MatDialog,
		manageuser: ManageuserserviceService
	) {
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});
		this.getCatalogAnnoations();
	}

	ngOnInit(): void {
	}
	
	fetchInformation() {
		const data = {};
		data[this.identifiers.CatalogDataObjectMaintainer] = this.maintainer;
		data[this.identifiers.TransactionEventType] = 'dataset:InitialReadInOfRepositoryFile';
		data[Ontologyconstants.annoinfo] = this.annoinfo;

		const dialogRef = this.dialog.open(FindintermediatettransactionComponent, {
			data: data,
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result[Ontologyconstants.successful];
				this.resultHtml = result[Ontologyconstants.message];
				if (success == 'true') {
					this.transactionobj = result[Ontologyconstants.catalogobject];
					const objfirestorearr = this.transactionobj[this.identifiers.DatabaseObjectIDOutputTransaction];
					const objfirestore = objfirestorearr[0];
					const json = {};
					json[Ontologyconstants.service] = 'ReadCatalogObjectWithFirestoreAddress';
					json[this.identifiers.FirestoreCatalogID] = objfirestore;
					this.runservice.run(json).subscribe({
						next: (responsedata: any) => {
							const message = responsedata[Ontologyconstants.message];
							const success = responsedata[Ontologyconstants.successful];
							if (success == 'true') {
								this.catalogobj = responsedata[Ontologyconstants.catalogobject];
								if (this.catalogobj != null) {
									this.catalogread = false;
									this.repository.setData(this.catalogobj);
									this.repositoryEvent.emit(responsedata);
								} else {
									alert('Error in reading catalog object, object is null: ' + JSON.stringify(message));
								}
							} else {
								alert('Error in reading catalog object: ' + JSON.stringify(message));
							}
						}
					});
				} else {
					alert('Error in reading transaction: ' + JSON.stringify(this.resultHtml));
				}
			} else {
				alert(this.readincanceled);
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
		const transfirestoreid = this.transactionobj[this.identifiers.FirestoreCatalogID];
		activityinfo[this.annoinfo['dataset:FirestoreCatalogID'][this.identifier]] = transfirestoreid;
		transaction['dataset:activityinfo'] = activityinfo;
		const dialogRef = this.dialog.open(RuntransactiondialogComponent, {
			data: transaction
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success == 'true') {
					this.catalogobj = null;
				} else {
					this.runservice.checkReturn(result);
				}
			} else {
				this.resultHtml = this.failedsubmission;
			}
		});

	}

	setCatalog(catalog): void {
		this.catalogobj = catalog;
		this.repository.setData(catalog);
	}

	public getCatalogAnnoations(): void {
		this.resultHtml = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.resultHtml = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.resultHtml = 'Annotations';
				} else {
					
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.resultHtml); }
		});
	}


}
