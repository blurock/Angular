import { Component, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { Ontologyconstants } from 'systemconstants';
import { ActivityinformationdatasetcollectionsetcreationComponent } from '../../activity/collectionset/activityinformationdatasetcollectionsetcreation/activityinformationdatasetcollectionsetcreation.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RuntransactiondialogComponent } from '../../../dialog/runtransactiondialog/runtransactiondialog.component';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { ViewcatalogandsavetolocalfileComponent } from '../../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';

@Component({
	standalone: true,
	imports: [
		MatCardModule,
		MatGridListModule,
		MatTooltipModule,
		MatDividerModule,
		ActivityinformationdatasetcollectionsetcreationComponent,
		NgIf
	],
	selector: 'app-createnewdatasetcollection',
	templateUrl: './createnewdatasetcollection.component.html',
	styleUrls: ['./createnewdatasetcollection.component.scss']
})
export class CreatenewdatasetcollectionComponent implements OnInit {

	@Output() newCollectionC = new EventEmitter<any>();
	@Input() maintainer: string = '';
    @Input() annoinfo: any;


	transfirestoretitle = 'Transaction for Collection Creation';
	deltransdescbutton = 'Delete the Collection Creation Transaction';
	deltransbutton = 'Delete';
	title = 'Create New Dataset Collection';
	waitmessage = 'Waiting for Initialization';
	failedsubmission = 'Creation of Dataset Collection not successful';
	subtransaction = 'Run Transaction to create a new Collection Set';
	submit = 'Create';
	displaybutton = 'Activity Info'
	displaydescbutton = 'Display Activity Information';

	identifier = Ontologyconstants.dctermsidentifier;

	resultHtml: string = '';
	catalog: any;
	transfirestoreid: any;
	viewcollectionset = false;
	viewtransactionid = true;


	@ViewChild('activity') activity!: ActivityinformationdatasetcollectionsetcreationComponent;
	//@ViewChild('tranactionfirestoreid') tranactionfirestoreid!: FiresytorecatalogidComponent;

	constructor(
		public dialog: MatDialog
	) {
		
	}

	ngOnInit(): void {
	}

	invalid(): boolean {
		let ans = false;
		if (this.activity != null) {
			ans = this.activity.invalid();
		}
		return ans;
	}

	public setTransaction(catalog: any): void {
		this.catalog = catalog;
		this.transfirestoreid = this.catalog['dataset:transactionforobject'];
		if (this.transfirestoreid != null) {
			this.viewtransactionid = true;
			//this.tranactionfirestoreid.setData(this.transfirestoreid);
		}
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
		const catalog:Record<string,any> = {};
		this.getData(catalog);
		catalog['prov:activity'] = 'dataset:DatasetCollectionSetCreationEvent';

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
							//this.tranactionfirestoreid.setData(this.transfirestoreid);
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
		const transaction: Record<string,any> = {};
		transaction['prov:activity'] = 'dataset:DatabaseDeleteTransaction';
		transaction['dcterms:creator'] = this.maintainer;
		transaction[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;
		const activityinfo:Record<string,any> = {};
		const transtitle = 'Delection Collection: ' + ' this.maintainer' + '   ';
		activityinfo['dcterms:title'] = transtitle;

		activityinfo[this.annoinfo['dataset:FirestoreCatalogID'][this.identifier]] = this.transfirestoreid;
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
