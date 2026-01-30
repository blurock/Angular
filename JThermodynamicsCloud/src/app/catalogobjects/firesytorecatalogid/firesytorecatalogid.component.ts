import { Component, Input, AfterViewInit, OnInit, OnChanges, ChangeDetectionStrategy,ChangeDetectorRef  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentifiersService } from '../../const/identifiers.service';
import { Ontologyconstants } from 'systemconstants';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
//import {MenuItemComponent} from '../../primitives/menu-item/menu-item.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserinterfaceconstantsService } from '../../const/userinterfaceconstants.service';

interface addresspair {
	DatasetCollectionID: string;
	DatasetDocumentID: string;
	DatasetIDLevel: string;
}

@Component({
	selector: 'app-firesytorecatalogid',
	templateUrl: './firesytorecatalogid.component.html',
	styleUrls: ['./firesytorecatalogid.component.scss'],
	standalone: true,
	imports: [MatCardModule, MatGridListModule, MatInputModule,
		MatFormFieldModule, ReactiveFormsModule, CommonModule, MatIconModule]
})
export class FiresytorecatalogidComponent implements AfterViewInit,OnInit
 {



	@Input() anno: any;
	@Input() catalogID: any;
	@Input() allowchange: boolean = false;
	@Input() title: string = 'Firestore ID';

	//display: boolean;

	form!: FormGroup;
	objectform: FormGroup;

	message = '';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = 'rdfs:comment';


	constructor(
		private formBuilder: FormBuilder,
		public identifiers: IdentifiersService,
		public cdRef: ChangeDetectorRef,
		public interfaceconst: UserinterfaceconstantsService) {
		this.title = interfaceconst.firestoreIDtitle;
		this.objectform = this.formBuilder.group({
			DataCatalog: ['', Validators.required],
			SimpleCatalogName: ['', Validators.required],
		});
		this.form = this.formBuilder.group({
		      documentdpairaddress: this.formBuilder.array([]),
		    });
	}
	
	
	ngAfterViewInit(): void {
		if (this.catalogID != null) {
			this.setData(this.catalogID);
		}
	}

	ngOnInit(): void {
	}
	get documentdpairaddress() {
		return this.form.get('documentdpairaddress') as FormArray;
	}

	newAddressPair(): FormGroup {
		return this.formBuilder.group({
			DatasetCollectionID: ['', Validators.required],
			DatasetDocumentID: ['', Validators.required],
			DatasetIDLevel: [''],
		});
	}

	addAddressPair() {
		this.documentdpairaddress.push(this.newAddressPair());
		this.cdRef.detectChanges();
	}

	removeAddress(i: number) {
		this.documentdpairaddress.removeAt(i);
	}



	public setData(catalogID: any) {
		this.message = '  Set FirestoreID';
		this.catalogID = catalogID;
		if (catalogID != null) {
			const arr = this.documentdpairaddress;
            arr.clear();
			this.objectform.get('DataCatalog')?.setValue(catalogID[this.identifiers.DataCatalog]);
			this.objectform.get('SimpleCatalogName')?.setValue(catalogID[this.identifiers.SimpleCatalogName]);

			const catalogpairobj = catalogID[this.identifiers.CollectionDocumentIDPairAddress];
			const pairarray = catalogpairobj[this.identifiers.CollectionDocumentIDPair];
			for (const pair of pairarray) {
				const collectionidpair = this.newAddressPair();
				arr.push(collectionidpair);
				this.cdRef.detectChanges();
				collectionidpair.get('DatasetCollectionID')?.setValue(pair[this.identifiers.DatasetCollectionID]);
				collectionidpair.get('DatasetDocumentID')?.setValue(pair[this.identifiers.DatasetDocumentID]);
				collectionidpair.get('DatasetIDLevel')?.setValue(pair[this.identifiers.DatasetIDLevel]);
			}
		}
	}

	public getData(catalog: any) {
		if (catalog != null) {
			const catalogID: Record<string, any> = {};
			catalogID[this.identifiers.DataCatalog] = this.objectform.get('DataCatalog')?.value;
			catalogID[this.identifiers.SimpleCatalogName] = this.objectform.get('SimpleCatalogName')?.value;
			const catalogpairobj: Record<string, any> = {};
			catalogID[this.identifiers.CollectionDocumentIDPairAddress] = catalogpairobj;
			const pairarray: Record<string, any>[] = [];
			catalogpairobj[this.identifiers.CollectionDocumentIDPair] = pairarray;
			for (let i = 0; i < this.documentdpairaddress.length; i++) {
				const address = this.documentdpairaddress.at(i);
				const addresspair: Record<string, any> = {};
				addresspair[this.identifiers.DatasetCollectionID] = address.get('DatasetCollectionID')?.value;
				addresspair[this.identifiers.DatasetDocumentID] = address.get('DatasetDocumentID')?.value;
				addresspair[this.identifiers.DatasetIDLevel] = address.get('DatasetIDLevel')?.value;

				pairarray.push(addresspair);
			}
			catalog[this.identifiers.FirestoreCatalogID] = catalogID;
		}
	}
}
