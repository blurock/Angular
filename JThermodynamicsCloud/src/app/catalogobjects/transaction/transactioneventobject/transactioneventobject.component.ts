import { Component, ChangeDetectorRef, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpledatabaseobjectstructureComponent } from '../../simpledatabaseobjectstructure/simpledatabaseobjectstructure.component';
import { CatalogbaseComponent } from '../../../primitives/catalogbase/catalogbase.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ListoffirestoreidsComponent } from '../../listoffirestoreids/listoffirestoreids.component';
import { ListofrequiredtransactioninformationComponent } from '../../listofrequiredtransactioninformation/listofrequiredtransactioninformation.component';

@Component({
	selector: 'app-transactioneventobject',
	standalone: true,
	imports: [CommonModule,
		MatProgressSpinner,
		SimpledatabaseobjectstructureComponent,
		ListoffirestoreidsComponent,
		ListofrequiredtransactioninformationComponent
	],
	templateUrl: './transactioneventobject.component.html',
	styleUrl: './transactioneventobject.component.scss'
})
export class TransactioneventobjectComponent extends CatalogbaseComponent {

	outputtransactions: string;
	inputtransactions: string;

	istransaction = true;

	@ViewChild('outputobjects') outputobjects!: ListoffirestoreidsComponent;
	@ViewChild('requiredobjects') requiredobjects!: ListofrequiredtransactioninformationComponent;
	@ViewChild('simpledata') simpledata!: SimpledatabaseobjectstructureComponent;

	constructor(constants: UserinterfaceconstantsService,
		annotations: OntologycatalogService,
		cdRef:  ChangeDetectorRef) {
		super(constants, annotations, cdRef);
		this.catalogtype = 'dataset:TransactionEventObject';

		this.outputtransactions = constants.outputtransactions;
		this.inputtransactions = constants.inputtransactions;


		this.getCatalogAnnoations();
	}

	override annotationsFound(response: any): void {
		super.annotationsFound(response);
	}
	override setData(catalog: any): void {
		if(this.annoinfo) {
		super.setData(catalog);
			const outputids = catalog[this.annoinfo['dataset:DatabaseObjectIDOutputTransaction'][this.identifier]];
					this.outputobjects.setData(outputids);
					const requiredids = catalog[this.annoinfo['dataset:RequiredTransactionInformation'][this.identifier]];
					this.simpledata.setData(catalog);
					this.requiredobjects.setData(requiredids);
		}
		
	
	}
	override getData(catalog: any): void {
		const outids: Record<string, unknown>[] = [];
		catalog[this.annoinfo['dataset:DatabaseObjectIDOutputTransaction'][this.identifier]] = outids;
		this.outputobjects.getData(outids);
		const requiredids: Record<string, unknown>[] = [];
		catalog[this.annoinfo['dataset:RequiredTransactionIDAndType'][this.identifier]] = requiredids;
		this.requiredobjects.getData(requiredids);
		this.simpledata.getData(catalog);

	}
}
