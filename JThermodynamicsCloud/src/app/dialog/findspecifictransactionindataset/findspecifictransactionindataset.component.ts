import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ontologyconstants } from 'systemconstants';
import { RunserviceprocessService } from '../../services/runserviceprocess.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MenutreeserviceService } from 'systemprimitives';
import { MenuItemComponent } from 'systemprimitives';
import { NavItem } from 'systemprimitives';

@Component({
	selector: 'app-findspecifictransactionindataset',
	standalone: true,
	imports: [
		MatFormFieldModule, 
  	MatCardModule, 
  	MatGridListModule,
  	FormsModule,
	CommonModule, 
	ReactiveFormsModule,  
	MatInput,
	MatMenuModule,
	MatIconModule,
	MatButtonModule,
	MenuItemComponent],
	templateUrl: './findspecifictransactionindataset.component.html',
	styleUrls: ['./findspecifictransactionindataset.component.scss']
})
export class FindspecifictransactionindatasetComponent implements OnInit {

	idForm: UntypedFormGroup;

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
	transactionsitems: NavItem[];
	
	transchoices: NavItem[] = [];
	setoftransactions = [];

	transactiontype = 'dataset:TransactionEventType';
	maintainer: string;

	constructor(
		public fb: UntypedFormBuilder,
		private menusetup: MenutreeserviceService,
		public dialogRef: MatDialogRef<FindspecifictransactionindatasetComponent>,
		private runservice: RunserviceprocessService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.annoinfo = data[this.annoinfoid];
		this.maintainer = data[this.maintainerid];
		this.transactionsitems = this.menusetup.findChoices(this.annoinfo, this.transactiontype);
		this.idForm = this.fb.group({
			CatalogObjectOwner: [this.maintainer, Validators.required],
			TransactionEventType: ['', Validators.required],
			TransactionKey: ['', Validators.required]
		});
		if(data[this.transactionid]) {
			this.setTransaction(data[this.transactionid]);
		}
	}

	ngOnInit(): void {
	}

	setTransaction($event: any): void {
		this.idForm.get('TransactionEventType')!.setValue($event);
	}
	setChoice($event: any) {
		this.idForm.get('TransactionKey')!.setValue($event);
	}
	onNoClick(): void {
		this.dialogRef.close();

	}
	
	
	fetchFromDatabaseObject(): void {
			const json: Record<string,unknown>  = {};
			json[Ontologyconstants.service] = 'FindTransactionFromOwnerAndType';
			json[this.annoinfo['dataset:CatalogObjectOwner'][this.identifier]] = this.idForm.get('CatalogObjectOwner')!.value;
			json[this.annoinfo['dataset:TransactionEventType'][this.identifier]] = this.idForm.get('TransactionEventType')!.value;
			const activity: Record<string,unknown> = {};
			activity[this.annoinfo['dataset:CatalogObjectOwner'][this.identifier]] = this.idForm.get('CatalogObjectOwner')!.value;
			activity[this.annoinfo['dataset:TransactionEventType'][this.identifier]] = this.idForm.get('TransactionEventType')!.value;
			this.runservice.run(json).subscribe({
				next: (responsedata: any) => {
					const success = responsedata[Ontologyconstants.successful];
					if (success == 'true') {
						
						const array = responsedata[Ontologyconstants.catalogobject];
						this.createChoiceMenu(array);
						} else {
							this.dialogRef.close(null);
				}
				}
			});

		}
	createChoiceMenu(transarray: any) {
			this.transchoices = [];
			this.setoftransactions = transarray;
			for(var trans of transarray) {
				
				const descr = trans['dataset:transactiondescriptionshort'];
				const name = descr['dataset:transactionkey'];
				
				
				const item: NavItem = {
					displayName: name,
	 				 disabled: false,
	  				value: name,
	  				children: []
				};
				this.transchoices.push(item);
			}
			this.idForm.get('TransactionKey')!.setValue(this.transchoices[0].value);
		}
		
		fetchTransaction() {
			const key = this.idForm.get('TransactionKey')?.value ?? '';
			var i = 0;
			for(var trans of this.setoftransactions) {
				const descr = trans['dataset:transactiondescriptionshort'];
				const name = descr['dataset:transactionkey'];
				if(name == key) {
					this.dialogRef.close(this.setoftransactions[i]);
				}
			i++;
		}
		}
	
	
}
