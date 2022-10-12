import { Component, OnInit, ViewChild, EventEmitter, Input,Output } from '@angular/core';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ActivityinformationdatasetcollectionsetcreationComponent } from '../../activity/collectionset/activityinformationdatasetcollectionsetcreation/activityinformationdatasetcollectionsetcreation.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RuntransactiondialogComponent } from '../../../dialog/runtransactiondialog/runtransactiondialog.component';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { ViewcatalogandsavetolocalfileComponent } from '../../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';

@Component({
	selector: 'app-createnewdatasetcollection',
	templateUrl: './createnewdatasetcollection.component.html',
	styleUrls: ['./createnewdatasetcollection.component.scss']
})
export class CreatenewdatasetcollectionComponent implements OnInit {

	@Output() newCollectionC = new EventEmitter<any>();
	@Input() maintainer: string;
	@Input() cataloganno; any;

	annoinfo: any;
	transfirestoretitle = 'Transaction for Collection Creation';
	deltransdescbutton = 'Delete the Collection Creation Transaction';
	deltransbutton = 'Delete';
	title = 'Create New Dataset Collection';
	waitmessage = 'Waiting for Initialization';
	failedsubmission = 'Creation of Dataset Collection not successful';
	subtransaction = 'Run Transaction to create a new Collection Set';
	submit = 'Transaction';
	displaybutton = 'Activity Info'
	displaydescbutton = 'Display Activity Information';

	identifier = Ontologyconstants.dctermsidentifier;

	resultHtml: string;
	catalog: any;
	transfirestoreid: any;
	viewcollectionset = false;
	viewtransactionid = true;
	catalogtype = "dataset:ActivityInformationDatasetCollectionSetCreation";


	@ViewChild('activity') activity: ActivityinformationdatasetcollectionsetcreationComponent;
	@ViewChild('tranactionfirestoreid') tranactionfirestoreid: FiresytorecatalogidComponent;

	constructor(
		public annotations: OntologycatalogService,
		public dialog: MatDialog
	) {
		this.getCatalogAnnoations();
	}

	ngOnInit(): void {
	}
	
	invalid(): boolean {
		let ans = false;
		if(this.activity != null) {
			ans = this.activity.invalid();
		}
		return ans;
	}
	
	public setTransaction(catalog) {
				this.catalog = catalog;
				this.transfirestoreid = this.catalog['dataset:transactionforobject'];
				if (this.transfirestoreid != null) {
					this.viewtransactionid = true;
					this.tranactionfirestoreid.setData(this.transfirestoreid);
				}		
	}
	public getCatalogAnnoations(): void {
		this.waitmessage = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.waitmessage = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
				} else {
					this.waitmessage = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.waitmessage); }
		});
	}



	getData(transaction: any): void {
		transaction['prov:activity'] = 'dataset:DatasetCollectionSetCreationEvent';
		transaction['dcterms:creator'] = this.maintainer;
		transaction[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;
		const activityinfo = {};
		this.activity.getData(activityinfo);
		transaction['dataset:activityinfo'] = activityinfo;
	}

	submitInformation(): void {
		const catalog = {};
		this.getData(catalog);
		const dialogRef = this.dialog.open(RuntransactiondialogComponent, {
			data: catalog
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success == 'true') {
					const catarray = result['dataset:simpcatobj'];
					this.catalog = catarray[0];
					if (this.catalog != null) {
						this.newCollectionC.emit(this.catalog);
						this.transfirestoreid = this.catalog['dataset:transactionforobject'];
						if (this.transfirestoreid != null) {
							this.viewtransactionid = true;
							this.tranactionfirestoreid.setData(this.transfirestoreid);
						}
					}
				} else {
				}
			} else {
				this.resultHtml = this.failedsubmission;
			}
		});
	}
	displayTransactionInput(): void {
		const catalog = {};
		this.getData(catalog);
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;

		dialogConfig.data = {
			filename: this.title,
			dataimage: catalog
		};

		const myDialogRef = this.dialog.open(ViewcatalogandsavetolocalfileComponent, dialogConfig);

		myDialogRef.afterClosed().subscribe(result => {
		});
	}



	deleteTransaction(): void {
		const transaction = {};
		transaction['prov:activity'] = 'dataset:DatabaseDeleteTransaction';
		transaction['dcterms:creator'] = this.maintainer;
		transaction[this.cataloganno['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;
		const activityinfo = {};
		const transtitle = 'Delection Collection: ' + ' this.maintainer' + '   ';
		activityinfo['dcterms:title'] = transtitle;

		activityinfo[this.cataloganno['dataset:FirestoreCatalogID'][this.identifier]] = this.transfirestoreid;
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

	}

}
