import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from '@angular/forms';
import { CollectiondocumentidpairaddressComponent } from '../recordobjects/collectiondocumentidpairaddress/collectiondocumentidpairaddress.component';
import { IdentifiersService } from '../../const/identifiers.service';
import { Ontologyconstants } from '../../const/ontologyconstants';


@Component({
	selector: 'app-firesytorecatalogid',
	templateUrl: './firesytorecatalogid.component.html',
	styleUrls: ['./firesytorecatalogid.component.scss']
})
export class FiresytorecatalogidComponent implements AfterViewInit {

	@Input() anno: any;
	@Input() catalogID: any;
	
	display: boolean;

	objectform: UntypedFormGroup;
	documentdpairaddress: UntypedFormArray;
	message = 'No FirestoreID';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = 'rdfs:comment';


	constructor(
		private formBuilder: UntypedFormBuilder,
		public identifiers: IdentifiersService) {
		this.objectform = this.formBuilder.group({
			DataCatalog: ['', Validators.required],
			SimpleCatalogName: ['', Validators.required],
		});
		this.documentdpairaddress = new UntypedFormArray([]);
		this.display = false;
	}
	


ngAfterViewInit(): void {
	if(this.catalogID != null) {
		this.setData(this.catalogID);
	}
	}

	public setData(catalogID: any) {
		this.message = '  Set FirestoreID';
		this.catalogID = catalogID;
		if (catalogID != null) {
			this.objectform.get('DataCatalog').setValue(catalogID[this.identifiers.DataCatalog]);
			this.objectform.get('SimpleCatalogName').setValue(catalogID[this.identifiers.SimpleCatalogName]);
			this.documentdpairaddress = new UntypedFormArray([]);
			const catalogpairobj = catalogID[this.identifiers.CollectionDocumentIDPairAddress];
			const pairarray = catalogpairobj[this.identifiers.CollectionDocumentIDPair];
			for (let pair of pairarray) {
				const collectionidpair = this.formBuilder.group({
					DatasetCollectionID: ['', Validators.required],
					DatasetDocumentID: ['', Validators.required],
					DatasetIDLevel: [''],
				});
				this.documentdpairaddress.push(collectionidpair);
				collectionidpair.get('DatasetCollectionID').setValue(pair[this.identifiers.DatasetCollectionID]);
				collectionidpair.get('DatasetDocumentID').setValue(pair[this.identifiers.DatasetDocumentID]);
				collectionidpair.get('DatasetIDLevel').setValue(pair[this.identifiers.DatasetIDLevel]);
			}
			this.display = true;
			
		}
	}

	public getData(catalog: any) {
		if (catalog != null) {
			const catalogID = {};
			catalogID[this.identifiers.DataCatalog] = this.objectform.get('DataCatalog').value;
			catalogID[this.identifiers.SimpleCatalogName] = this.objectform.get('SimpleCatalogName').value;
			const catalogpairobj = {};
			catalogID[this.identifiers.CollectionDocumentIDPairAddress] = catalogpairobj;
			const pairarray = [];
			catalogpairobj[this.identifiers.CollectionDocumentIDPair] = pairarray;
			for (let i = 0; i < this.documentdpairaddress.length; i++) {
				const address = this.documentdpairaddress.at(i);
				const addresspair = {};
				addresspair[this.identifiers.DatasetCollectionID] = address.get('DatasetCollectionID').value;
				addresspair[this.identifiers.DatasetDocumentID] = address.get('DatasetDocumentID').value;
				addresspair[this.identifiers.DatasetIDLevel] = address.get('DatasetIDLevel').value;

				pairarray.push(addresspair);
			}
			catalog[this.identifiers.FirestoreCatalogID] = catalogID;
		}
	}
}
