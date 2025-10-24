import { AfterViewInit, Component, ComponentRef, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { UserinterfaceconstantsService } from '../../../../const/userinterfaceconstants.service';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-requiredtransactionblock',
	standalone: true,
	imports: [
		MatCardModule,
		MatGridListModule,
		MatIconModule,
		NgIf
	],
	templateUrl: './requiredtransactionblock.component.html',
	styleUrl: './requiredtransactionblock.component.scss'
})
export class RequiredtransactionblockComponent implements AfterViewInit {

	requiredtransactiontitle: string = '';
	catalogtype = null;
	catalogkey: string = '';
	intializing: string = '';

	required: any[] = [];
	firestoreid: any = null;
	
	@Output() firestoreAddress = new EventEmitter<any>();

	@ViewChild('requiredtransactions', { read: ViewContainerRef }) requiredtransactions!: ViewContainerRef;

	constructor(
		userconstants: UserinterfaceconstantsService
	) {
		this.intializing = userconstants.initializing;
	}
	
	ngAfterViewInit(): void {
		for (const prop of this.required) {
			const info = prop[Ontologyconstants.RequiredTransactionInformation];
			const transactionline: ComponentRef<RequiredtransactionblockComponent> = this.requiredtransactions.createComponent(RequiredtransactionblockComponent);
			transactionline.instance.setTitle(info[Ontologyconstants.DescriptionTitleRequiredTransaction]);
			transactionline.instance.setInformation(info);
			transactionline.instance.firestoreAddress.subscribe((firestoreid: any) => {
				this.firestoreAddress.emit(firestoreid);
				});

			transactionline.instance.setArrayData(prop[Ontologyconstants.CatalogObjectPrerequisiteTreeNode]);
		}

	}

	showTransaction() {
		this.firestoreAddress.emit(this.firestoreid);
	}

	setArrayData(required: any[]) {
		this.required = required;
	}

	setTitle(title: string) {
		this.requiredtransactiontitle = title;
	}
	setInformation(info: any) {
		this.firestoreid = info[Ontologyconstants.RequiredTransactionIDAndType];
		this.requiredtransactiontitle = info[Ontologyconstants.DescriptionTitleRequiredTransaction];
		this.catalogtype = info[Ontologyconstants.RequiredTransactionType];
		this.catalogkey = info[Ontologyconstants.RequiredTransactionKey];
	}

}
