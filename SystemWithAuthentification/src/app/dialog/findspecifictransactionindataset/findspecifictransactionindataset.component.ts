import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenutreeserviceService } from '../../services/menutreeservice.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { RunserviceprocessService } from '../../services/runserviceprocess.service';

@Component({
	selector: 'app-findspecifictransactionindataset',
	templateUrl: './findspecifictransactionindataset.component.html',
	styleUrls: ['./findspecifictransactionindataset.component.scss']
})
export class FindspecifictransactionindatasetComponent implements OnInit {

	idForm: FormGroup;

	annoinfo: any;

	transactionslabel = 'Transaction Event';
	transactionshint = 'Transaction Event';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	serviceid = 'service';
	annoinfoid = 'annoinfo';
	maintainerid = 'maintainer';
	transactionchoicesid = 'transactionchoices';
	transactionid = 'transaction';

	transactions = 'dataset:TransactionEventType';
	transactionsitems: any;
	maintainer: string;

	constructor(
		public fb: FormBuilder,
		private menusetup: MenutreeserviceService,
		public dialogRef: MatDialogRef<FindspecifictransactionindatasetComponent>,
		private runservice: RunserviceprocessService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.idForm = this.fb.group({
			DatasetName: ['', Validators.required],
			CatalogObjectUniqueGenericLabel: ['', Validators.required],
			TransactionID: ['', Validators.required],
			TransactionEventType: ['', Validators.required]
		});

		this.annoinfo = data[this.annoinfoid];
		this.maintainer = data[this.maintainerid];
		const choices = data[this.transactionchoicesid];
		if(choices != null) {
			this.transactions = choices;
		}
		const trans = data[this.transactionid];
		if(trans != null) {
			this.idForm.get('TransactionEventType').setValue(trans);
		}

		this.transactionsitems = this.menusetup.findChoices(this.annoinfo, this.transactions);
	}

	ngOnInit(): void {
	}

	setTransaction($event: any): void {
		this.idForm.get('TransactionEventType').setValue($event);
	}
	onNoClick(): void {
		this.dialogRef.close();

	}
	fetchFromDatabaseObject(): void {
		const json = {};
		json[this.serviceid] = 'FindSpecificTransactionInDataset';
		json[this.annoinfo['dataset:TransactionID'][this.identifier]] = this.idForm.get('TransactionID').value;
		json[this.annoinfo['dataset:TransactionEventType'][this.identifier]] = this.idForm.get('TransactionEventType').value;
		const activity = {};
		json[this.annoinfo['dataset:ActivityInformationRecord'][this.identifier]] = activity;
		const jsontransspec = {};
		const specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];
		activity[specid] = jsontransspec;
		jsontransspec[this.annoinfo['dataset:DatasetVersion'][this.identifier]] = "1.0";
		jsontransspec[this.annoinfo['dataset:DatasetName'][this.identifier]] = this.idForm.get('DatasetName').value;
		jsontransspec[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]] = this.idForm.get('CatalogObjectUniqueGenericLabel').value;
		jsontransspec['dataset:catalogobjectmaintainer'] = this.maintainer;
		this.runservice.run(json).subscribe({
			next: (responsedata: any) => {
				const success = responsedata['dataset:servicesuccessful'];
				if (success == 'true') {
					this.dialogRef.close(responsedata);
				} else {
					this.runservice.checkReturn(responsedata);
					this.dialogRef.close(responsedata);
				}
			}
		});

	}
}
