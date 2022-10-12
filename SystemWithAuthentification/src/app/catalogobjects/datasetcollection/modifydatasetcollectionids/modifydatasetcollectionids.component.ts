import { Component, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RuntransactiondialogComponent } from '../../../dialog/runtransactiondialog/runtransactiondialog.component';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { ViewcatalogandsavetolocalfileComponent } from '../../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivityinformationdatasetcollectionsetadddatasetComponent} from '../../activity/collectionset/activityinformationdatasetcollectionsetadddataset/activityinformationdatasetcollectionsetadddataset.component';

@Component({
	selector: 'app-modifydatasetcollectionids',
	templateUrl: './modifydatasetcollectionids.component.html',
	styleUrls: ['./modifydatasetcollectionids.component.scss']
})
export class ModifydatasetcollectionidsComponent implements OnInit {


	@Output() newCollectionM = new EventEmitter<any>();
	@Input() maintainer: string;
	@Input() annoinfo: any;

	actannoinfo: any;
	resultHtml: string;
	transfirestoreid: any;
	catalog: any;
	prerequisite: any;
	objectform: FormGroup;
	original = false;

	viewtransactionid = false;
	transfirestoretitle = 'Transaction Information for Modification';

	title = 'Modify Dataset Information in Collection Set';
	displaydescbutton = 'Display Activity informaition for Collection Modification';
	displaybutton = 'Display';
	subtransaction = 'Submit modification transaction';
	submit = 'Transaction';
	waitmessage = 'Setting up Information';
	deltransdescbutton = 'Retract the last modification of the collection set';
	deltransbutton = 'Delete Transaction';
	failedsubmission = 'Failed to execute modification';
	specsubtitle = 'New Rectord Information';
	originaltransactionnamelabel = 'Original Collection Set';
	originaltransactionnamehint = 'The Collecton Set that is to be modified';

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	activitytype = 'dataset:ActivityInformationDatasetCollectionSetAddDataset';

	@ViewChild('activity') activity: ActivityinformationdatasetcollectionsetadddatasetComponent;
	@ViewChild('tranactionfirestoreid') tranactionfirestoreid: FiresytorecatalogidComponent;


	constructor(
		private formBuilder: FormBuilder,
		public annotations: OntologycatalogService,
		public dialog: MatDialog
	) {
		this.objectform = this.formBuilder.group({
			DatasetCollectionsSetLabel: ['', Validators.required]
		});
		this.getCatalogAnnoations();
	}

	ngOnInit(): void {
	}

	invalid(): boolean {
        let ans = false;
        if(this.activity != null) {
			ans = this.activity.invalid() || this.objectform.invalid;
		}
		return ans;
	}

	setPrerequisite(catalog) {
		this.original = true;
		this.prerequisite = catalog[this.annoinfo['dataset:FirestoreCatalogIDForTransaction'][this.identifier]];
		const originalcollectionname = catalog[this.annoinfo['dataset:DatasetCollectionsSetLabel'][this.identifier]]
		this.objectform.get('DatasetCollectionsSetLabel').setValue(originalcollectionname);
	}

	public getCatalogAnnoations(): void {
		this.waitmessage = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.activitytype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.waitmessage = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.actannoinfo = catalog[Ontologyconstants.annotations];
				} else {
					this.waitmessage = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.waitmessage); }
		});
	}

	getData(transaction: any): void {
		transaction['prov:activity'] = 'dataset:DatasetCollectionSetAddDatasetEvent';
		const prerequisiteset = {};
		prerequisiteset['dataset:datasetcollectionsetcreationevent'] = this.prerequisite;
		transaction['dataset:transreqobj'] = prerequisiteset;
		transaction['dcterms:creator'] = this.maintainer;
		transaction[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;



		const activityinfo = {};
		this.activity.getData(activityinfo);
		transaction['dataset:activityinfo'] = activityinfo;
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
						this.newCollectionM.emit(this.catalog);
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

	deleteTransaction(): void {
		const transaction = {};
		transaction['prov:activity'] = 'dataset:DatabaseDeleteTransaction';
		transaction['dcterms:creator'] = this.maintainer;
		transaction[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;
		const activityinfo = {};
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
					this.viewtransactionid = false;
					
				} else {
				}
			} else {
				this.resultHtml = this.failedsubmission;
			}
		});

	}

}
