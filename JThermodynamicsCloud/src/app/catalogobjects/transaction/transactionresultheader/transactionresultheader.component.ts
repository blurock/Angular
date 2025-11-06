import { Component, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { ViewandlocalfilesavecatalogobjectService } from '../../../services/data/viewandlocalfilesavecatalogobject.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { RuntransactiondialogComponent } from '../../../dialog/runtransactiondialog/runtransactiondialog.component';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { FindspecifictransactionindatasetComponent } from '../../../dialog/findspecifictransactionindataset/findspecifictransactionindataset.component';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';

@Component({
	selector: 'app-transactionresultheader',
	standalone: true,
	imports: [CommonModule,
		MatGridListModule,
		MatFormFieldModule,
		MatTooltipModule,
		MatDividerModule],

	templateUrl: './transactionresultheader.component.html',
	styleUrl: './transactionresultheader.component.scss'
})
export class TransactionresultheaderComponent implements AfterViewInit {
	deltransaction: string;
	deltransactiontooltip: string;
	fetchtransaction: string;
	fetchtransactiontooltip: string;
	failedsubmission: string;
	transactiontype: string = Ontologyconstants.TransactionEventObject;
	catalogtype = 'dataset:ServiceEventFindTransactionFromOwnerAndType';

	annoinfoid = 'annoinfo';
	maintainerid = 'maintainer';
	transactionchoicesid = 'transactionchoices';
	transactionid = 'transaction';
	fetchanno: any;

	safeHtml: SafeHtml = '';

	maintainer: string = '';

	@Input() setData?: (catalog: any) => void;
	@Input() getData?: (catalog: any) => void;
	@Input() title: string = 'Catalog Object';
	@Input() transaction: string = '';
    @Output() transactionSuccess = new EventEmitter<any>();

	constructor(
		private annotations: OntologycatalogService,
		constants: UserinterfaceconstantsService,
		manageuser: ManageuserserviceService,
		private display: ViewandlocalfilesavecatalogobjectService,
		private sanitizer: DomSanitizer,
		private dialog: MatDialog
	) {
		this.deltransaction = constants.deltransaction;
		this.deltransactiontooltip = constants.deltransactiontooltip;
		this.fetchtransaction = constants.fetchtransaction;
		this.fetchtransactiontooltip = constants.fetchtransactiontooltip;
		this.failedsubmission = constants.failedsubmission;

		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});
		
		this.getCatalogAnnoations();

	}

	ngAfterViewInit() {
	}
	fetchInformation() {

		const datainfo: Record<string, unknown> = {};
		datainfo[this.annoinfoid] = this.fetchanno;
		datainfo[this.maintainerid] = this.maintainer;
		datainfo[this.transactionid] = this.transaction;
		const dialogRef = this.dialog.open(FindspecifictransactionindatasetComponent, {
			data: datainfo
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				if(this.setData) {
					this.setData(result);
				}
				const response: Record<string,unknown> = {};
				response[Ontologyconstants.message] = 'Transaction retrieved';
				response[Ontologyconstants.successful] = true;
				response[Ontologyconstants.TransactionEventObject] = result;
				this.transactionSuccess.emit(response);
			} else {
				this.safeHtml = this.sanitizer.bypassSecurityTrustHtml('TransactioninterprettextblockComponent: prerequisite not set up');
			}
		});
	}

	deleteTransaction() {
		const transaction: Record<string, unknown> = {};
		transaction['prov:activity'] = 'dataset:DatabaseDeleteTransaction';
		transaction['dcterms:creator'] = this.maintainer;
		transaction[Ontologyconstants.catalogobjectmaintainer] = this.maintainer;
		const activityinfo: Record<string, unknown> = {};
		const transtitle = 'Delection Collection: ' + ' this.maintainer' + '   ';
		activityinfo['dcterms:title'] = transtitle;
		const transactionobject: Record<string, unknown> = {};
		if (this.getData) {
			this.getData(transactionobject);
		}
		console.log(JSON.stringify(transactionobject));
		console.log(Object.keys(transactionobject));
		const fireid = Ontologyconstants.FirestoreCatalogID;
		const firestore: any = transactionobject[fireid];
		activityinfo[fireid] = firestore;
		transaction['dataset:activityinfo'] = activityinfo;
		console.log(JSON.stringify(transaction));
		const dialogRef = this.dialog.open(RuntransactiondialogComponent, {
			data: transaction
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				const resultHtml = result['dataset:serviceresponsemessage'];
				this.safeHtml = this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(resultHtml);
				if (success == 'true') {
					alert("Transaction delete successful");
				} else {
				}
			} else {
				this.safeHtml = this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.failedsubmission);;
			}
		});
	}
	
		public getCatalogAnnoations(): void {
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				if (responsedata) {
					const response = responsedata;
					if (response[Ontologyconstants.successful]) {
						const catalog = response[Ontologyconstants.catalogobject];
						this.fetchanno = catalog[Ontologyconstants.annotations];
						
					} else {
					}
				}
			},
		});
	}

}
