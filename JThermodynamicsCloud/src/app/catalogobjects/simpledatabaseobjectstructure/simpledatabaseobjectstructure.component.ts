import { Input, Component, OnInit, ViewChild, AfterViewInit, SimpleChanges, ElementRef, AfterViewChecked, OnChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { IdentifiersService } from '../../const/identifiers.service';
import { Ontologyconstants } from 'systemconstants';
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
export class SimpledatabaseobjectstructureComponent implements AfterViewInit, OnChanges {

	cataloginfotitle: string;
	objectpositiontitle: string;
	transactionpositiontitle: string;
	showobject: boolean = false;

	objectform: UntypedFormGroup;
	identifier = Ontologyconstants.dctermsidentifier;
	simpledata: any | null = null;
	objectelement!: FiresytorecatalogidComponent;

	@Input() anno: any;
	@Input() allowchange: boolean = false;
	@Input() istransaction: boolean = false;

	firestoreidtrans!: FiresytorecatalogidComponent;
@ViewChild('firestoreidtrans') 
   set setcontent(content: FiresytorecatalogidComponent | undefined) {
	    this.firestoreidtrans = content!;
		if(content && !this.istransaction && this.simpledata && this.anno) {
			const transactionvalues = this.simpledata[this.anno['dataset:FirestoreCatalogIDForTransaction'][this.identifier]];
			this.firestoreidtrans.setData(transactionvalues);
		}
	}
	
	get setcontent(): FiresytorecatalogidComponent | undefined {
	    return this.firestoreidtrans;
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
			ShortDescription: ['']
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
		if (this.simpledata) {
				this.setData(this.simpledata);
		}
	}



	public setData(catalog: any): void {
		this.simpledata = catalog;
		if (this.anno) {
			this.objectform.patchValue({
				DatabaseObjectType: catalog[this.identifiers.DatabaseObjectType]
			});
			this.objectform.get('CatalogObjectAccessRead')?.setValue(catalog[this.identifiers.CatalogObjectAccessRead]);
			this.objectform.get('CatalogObjectOwner')?.setValue(catalog[this.identifiers.CatalogObjectOwner]);
			this.objectform.get('CatalogObjectKey')?.setValue(catalog[this.identifiers.CatalogObjectKey]);
			this.objectform.get('CatalogObjectAccessModify')?.setValue(catalog[this.identifiers.CatalogObjectAccessModify]);
			this.objectform.get('TransactionID')?.setValue(catalog[this.identifiers.TransactionID]);
			if (!this.istransaction && this.firestoreidtrans) {
				const transactionvalues = catalog[this.anno['dataset:FirestoreCatalogIDForTransaction'][this.identifier]];
				this.firestoreidtrans.setData(transactionvalues);
			}
			if(this.istransaction) {
				const short = catalog[this.anno['dataset:ShortTransactionDescription'][this.identifier]];
				this.objectform.get('ShortDescription')?.setValue(short[this.identifiers.ShortDescription]);
			} else {
				this.objectform.get('ShortDescription')?.setValue(catalog[this.identifiers.ShortDescription]);
				
			}
		} else  {
			console.log("annotations not yet set in simple database object structure");
		}
	}
	public getData(catalog: any): void {
		this.showobject = true;
		catalog[this.anno['dataset:CatalogObjectID'][this.identifier]] = this.simpledata[this.anno['dataset:CatalogObjectID'][this.identifier]];
		catalog[this.anno['dataset:ShortDescription'][this.identifier]] = this.simpledata[this.anno['dataset:ShortDescription'][this.identifier]];
		catalog[this.anno['dataset:DatasetObjectType'][this.identifier]] = this.simpledata[this.anno['dataset:DatasetObjectType'][this.identifier]];
		catalog[this.anno['dataset:CatalogObjectID'][this.identifier]] = this.simpledata[this.anno['dataset:CatalogObjectID'][this.identifier]];
		catalog[this.identifiers.ShortDescription] = this.objectform.get('ShortDescription')?.value;
		catalog[this.identifiers.DatabaseObjectType] = this.objectform.get('DatabaseObjectType')?.value;
		catalog[this.identifiers.CatalogObjectAccessRead] = this.objectform.get('CatalogObjectAccessRead')?.value;
		catalog[this.identifiers.CatalogObjectOwner] = this.objectform.get('CatalogObjectOwner')?.value;
		catalog[this.identifiers.CatalogObjectKey] = this.objectform.get('CatalogObjectKey')?.value;
		catalog[this.identifiers.CatalogObjectAccessModify] = this.objectform.get('CatalogObjectAccessModify')?.value;
		catalog[this.identifiers.CatalogObjectAccessRead] = this.objectform.get('CatalogObjectAccessRead')?.value;
		catalog[this.identifiers.TransactionID] = this.objectform.get('TransactionID')?.value;
		if (!this.istransaction) {
			const dummy: Record<string,any> = {};
			this.firestoreidtrans.getData(dummy);
			catalog[this.anno['dataset:FirestoreCatalogIDForTransaction'][this.identifier]] = dummy[this.anno['dataset:FirestoreCatalogID'][this.identifier]];
		}
	}

}
