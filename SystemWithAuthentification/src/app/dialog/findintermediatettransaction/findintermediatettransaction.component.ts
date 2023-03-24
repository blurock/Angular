import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IdentifiersService } from '../../const/identifiers.service';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { RunserviceprocessService } from '../../services/runserviceprocess.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-findintermediatettransaction',
	templateUrl: './findintermediatettransaction.component.html',
	styleUrls: ['./findintermediatettransaction.component.scss']
})
export class FindintermediatettransactionComponent implements OnInit {

	annoinfo: any;
	idForm: FormGroup;

	datasetitems: [];
	uniquenameitems = [];
	typeitems = [];
	transactionitems = [];

	transaction: any;
	waiting = 'Initialization';

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;



	constructor(
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<FindintermediatettransactionComponent>,
		private runservice: RunserviceprocessService,
		private identifiers: IdentifiersService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.annoinfo = data[Ontologyconstants.annoinfo];
		this.idForm = this.fb.group({
			CatalogDataObjectMaintainer: ['', Validators.required],
			CatalogObjectUniqueGenericLabel: ['', Validators.required],
			DatasetName: ['', Validators.required],
			TransactionEventType: ['', Validators.required],
			TransactionID: ['', Validators.required]
		});

		const json = {};
		json[Ontologyconstants.service] = 'ReadCatalogTransactionObjectHierarchy';
		json[this.identifiers.CatalogDataObjectMaintainer] = data[this.identifiers.CatalogDataObjectMaintainer];
		json[this.identifiers.TransactionEventType] = data[this.identifiers.TransactionEventType];
		this.runservice.run(json).subscribe({
			next: (responsedata: any) => {
				const success = responsedata[Ontologyconstants.successful];
				if (success === 'true') {
					const arrmaintaince = responsedata[Ontologyconstants.catalogobject];
					const menu = arrmaintaince[0];

					this.idForm.get('CatalogDataObjectMaintainer').setValue(menu[identifiers.CatalogObjectKey]);
					const arrdataset = menu[identifiers.CatalogHiearchyNode];
					this.processDatasetMenu(arrdataset);
				} else {
					this.dialogRef.close(responsedata);
				}
			}
		});


	}
	ngOnInit(): void {
	}


	processDatasetMenu(arrdataset: any): void {
		if (arrdataset.length > 1) {
			this.setDatasetMenu(arrdataset);
		} else {
			if (arrdataset.length === 1) {
				const menu = arrdataset[0];
				this.setDatasetName(menu);
				this.datasetitems = [];
			} else {
				this.notransactionsfound('No datasets found');
			}
		}

	}

	setDatasetMenu(arrdataset: any): void {
		this.datasetitems = arrdataset;
	}


	setDatasetName(choice: any): void {
		const datasetname = choice[this.identifiers.CatalogObjectKey];
		this.idForm.get('DatasetName').setValue(datasetname);
		const arruniquename = choice[this.identifiers.CatalogHiearchyNode];
		this.processUniqueNameMenu(arruniquename);
	}

	processUniqueNameMenu(arruniquename: any): void {
		if (arruniquename.length > 1) {
			this.setUniqueNameMenu(arruniquename);
		} else {
			if (arruniquename.length === 1) {
				const menu = arruniquename[0];
				this.setUniqueName(menu);
				this.uniquenameitems = [];
			} else {
				this.notransactionsfound('No transaction classes found');
			}
		}

	}

	setUniqueNameMenu(arruniquename: any): void {
		this.uniquenameitems = arruniquename;
	}

	setUniqueName(choice: any): void {
		alert("setUniqueName");
		const uniquename = choice[this.identifiers.CatalogObjectKey];
		alert(uniquename);
		const arrtransactiontype = choice[this.identifiers.CatalogHiearchyNode];
		alert(JSON.stringify(arrtransactiontype));
		this.processTransactiontypeMenu(arrtransactiontype);
		this.idForm.get('CatalogObjectUniqueGenericLabel').setValue(uniquename);
		alert(this.idForm.get('CatalogObjectUniqueGenericLabel').value);
	}
	processTransactiontypeMenu(arrtransactiontype: any): void {
		if (arrtransactiontype.length > 1) {
			this.setTransactionTypeMenu(arrtransactiontype);
		} else {
			if (arrtransactiontype.length === 1) {
				const menu = arrtransactiontype[0];
				this.setTransactionTypeName(menu);
				this.typeitems = [];
			} else {
				this.notransactionsfound('No datasets found');
			}
		}

	}
	setTransactionTypeMenu(arrtransactiontype: any): void {
		this.typeitems = arrtransactiontype;
	}

	setTransactionTypeName(choice: any): void {
		const transactiontype = choice[this.identifiers.CatalogObjectKey];
		const arrtransaction = choice[this.identifiers.CatalogHiearchyNode];
		this.idForm.get('TransactionEventType').setValue(transactiontype);
		this.processTransactionMenu(arrtransaction);
	}

	processTransactionMenu(arrtransaction: any): void {

		if (arrtransaction.length > 1) {
			this.setTransactionMenu(arrtransaction);
		} else {
			if (arrtransaction.length === 1) {
				const menu = arrtransaction[0];
				this.setTransactionName(menu);
			} else {
				this.notransactionsfound('No datasets found');
			}
		}

	}

	setTransactionMenu(arrtransaction: any): void {
		this.transactionitems = arrtransaction;
	}

	setTransactionName(choice: any): void {
		this.transaction = choice['dataset:minimumdatabaseobject'];
		const transactionid = this.transaction[this.identifiers.TransactionID];

		this.idForm.get('TransactionID').setValue(transactionid);
	}


	notransactionsfound(message: string): void {
		alert('No transactions found: \n' + message);
		this.dialogRef.close();
	}

	transactionFound(): void {
		const response = {};
		response[Ontologyconstants.successful] = 'true';
		response[Ontologyconstants.message] = 'Transaction found';
		response[Ontologyconstants.catalogobject] = this.transaction;
		this.dialogRef.close(response);
	}
	onNoClick(): void {
		this.dialogRef.close();

	}


}
