import { Input, Component, OnInit, ViewChild, AfterViewInit, SimpleChanges, ElementRef, AfterViewChecked, OnChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { IdentifiersService } from '../../const/identifiers.service';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FiresytorecatalogidComponent } from '../firesytorecatalogid/firesytorecatalogid.component';
import { UserinterfaceconstantsService } from '../../const/userinterfaceconstants.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-simpledatabaseobjectstructure',
	templateUrl: './simpledatabaseobjectstructure.component.html',
	styleUrls: ['./simpledatabaseobjectstructure.component.scss'],
	standalone: true,
	imports: [MatCardModule,
		MatFormFieldModule,
		MatGridListModule,
		ReactiveFormsModule,
		MatInputModule,
		CommonModule,
		FiresytorecatalogidComponent,
		MatIconModule]
})
export class SimpledatabaseobjectstructureComponent implements AfterViewInit, OnChanges{

	cataloginfotitle: string;
	objectpositiontitle: string;
	transactionpositiontitle: string;
	showobject: boolean = true;

	objectform: UntypedFormGroup;
	identifier = Ontologyconstants.dctermsidentifier;
	simpledata: any | null = null;
	transactionelement!: FiresytorecatalogidComponent;
	objectelement!: FiresytorecatalogidComponent;

	@Input() anno: any;
	@Input() allowchange: boolean = false;
	@Input() istransaction: boolean = false;

	@ViewChild('transaction') set transaction(element: FiresytorecatalogidComponent) {
		this.objectelement = element;
		if (this.objectelement && this.transactionelement) {
			if (this.simpledata) {
				this.setData(this.simpledata);
			}
		}
	}

	@ViewChild('firestoreidtrans') set firestoreidtrans(element: FiresytorecatalogidComponent) {
		this.transactionelement = element;
		if (this.transactionelement && this.objectelement) {
			if (this.simpledata) {
				this.setData(this.simpledata);
			}
		}
	}

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = 'rdfs:comment';
	label: string = '';

	constructor(
		public interfaceconst: UserinterfaceconstantsService,
		private formBuilder: UntypedFormBuilder,
		public identifiers: IdentifiersService) {
		this.cataloginfotitle = interfaceconst.cataloginfotitle;
		this.transactionpositiontitle = interfaceconst.transactionpositiontitle;
		this.objectpositiontitle = interfaceconst.catalogaddresstitle;
		this.objectform = this.formBuilder.group({
			DatabaseObjectType: [''],
			CatalogObjectAccessRead: [''],
			CatalogObjectOwner: [''],
			CatalogObjectKey: [''],
			CatalogObjectAccessModify: [''],
			TransactionID: [''],
			DateCreated: [''],
		});

	}

	toggleShow(): void {
		this.showobject = !this.showobject;
	}


	ngAfterViewInit(): void {
		if (this.simpledata) {
			this.setData(this.simpledata);
		}
		this.showobject = false;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['anno'] && changes['anno'].currentValue) {
			if (this.simpledata) {
				this.setData(this.simpledata);
			}
		}
	}



	public setData(catalog: any): void {
		this.simpledata = catalog;
		if (this.anno && this.objectelement) {
			this.objectform.patchValue({
				DatabaseObjectType: catalog[this.identifiers.DatabaseObjectType]
			});
			this.objectform.get('CatalogObjectAccessRead')?.setValue(catalog[this.identifiers.CatalogObjectAccessRead]);
			this.objectform.get('CatalogObjectOwner')?.setValue(catalog[this.identifiers.CatalogObjectOwner]);
			this.objectform.get('CatalogObjectKey')?.setValue(catalog[this.identifiers.CatalogObjectKey]);
			this.objectform.get('CatalogObjectAccessModify')?.setValue(catalog[this.identifiers.CatalogObjectAccessModify]);
			this.objectform.get('TransactionID')?.setValue(catalog[this.identifiers.TransactionID]);
			if (!this.istransaction) {
				const transactionvalues = catalog[this.anno['dataset:FirestoreCatalogIDForTransaction'][this.identifier]];
				this.transactionelement.setData(transactionvalues);
			}
			const firestoreidtransaction = catalog[this.anno['dataset:FirestoreCatalogID'][this.identifier]];
			this.objectelement.setData(firestoreidtransaction);
		}
	}
	public getData(catalog: any): void {
		this.showobject = true;
		catalog[this.identifiers.DatabaseObjectType] = this.objectform.get('DatabaseObjectType')?.value;
		catalog[this.identifiers.CatalogObjectAccessRead] = this.objectform.get('CatalogObjectAccessRead')?.value;
		catalog[this.identifiers.CatalogObjectOwner] = this.objectform.get('CatalogObjectOwner')?.value;
		catalog[this.identifiers.CatalogObjectKey] = this.objectform.get('CatalogObjectKey')?.value;
		catalog[this.identifiers.CatalogObjectAccessModify] = this.objectform.get('CatalogObjectAccessModify')?.value;
		catalog[this.identifiers.CatalogObjectAccessRead] = this.objectform.get('CatalogObjectAccessRead')?.value;
		catalog[this.identifiers.TransactionID] = this.objectform.get('TransactionID')?.value;
		if (!this.istransaction) {
			if (this.transactionelement) {
				this.transactionelement.getData(catalog);
				const transaction = catalog[this.anno['dataset:FirestoreCatalogID'][this.identifier]];
				catalog[this.anno['dataset:FirestoreCatalogIDForTransaction'][this.identifier]] = transaction;
			} else {
				console.log("SimpledatabaseobjectstructureComponent getData transactionelement not defined")
			}
		}
		if (this.objectelement) {
			this.objectelement.getData(catalog);
		} else {
			console.log("SimpledatabaseobjectstructureComponent getData objectelement not defined")
		}

	}

}
