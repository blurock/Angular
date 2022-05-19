import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IdentifiersService } from '../../const/identifiers.service';
import { Ontologyconstants } from '../../const/ontologyconstants';

@Component({
	selector: 'app-simpledatabaseobjectstructure',
	templateUrl: './simpledatabaseobjectstructure.component.html',
	styleUrls: ['./simpledatabaseobjectstructure.component.scss']
})
export class SimpledatabaseobjectstructureComponent implements OnInit {

	objectform: FormGroup;

	@Input() anno: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = 'rdfs:comment';
	label: string;

	constructor(
		private formBuilder: FormBuilder,
		public identifiers: IdentifiersService) { }

	ngOnInit(): void {
		this.objectform = this.formBuilder.group({
			DatabaseObjectType: ['', Validators.required],
			CatalogObjectAccessRead: ['', Validators.required],
			CatalogObjectOwner: ['', Validators.required],
			CatalogObjectKey: ['', Validators.required],
			CatalogObjectAccessModify: ['', Validators.required],
			TransactionID: [''],
		});

	}

	public setData(catalog: any): void {
		this.objectform.patchValue({
			DatabaseObjectType: catalog[this.identifiers.DatabaseObjectType]
		});
		this.objectform.get('CatalogObjectAccessRead').setValue(catalog[this.identifiers.CatalogObjectAccessRead]);
		this.objectform.get('CatalogObjectOwner').setValue(catalog[this.identifiers.CatalogObjectOwner]);
		this.objectform.get('CatalogObjectKey').setValue(catalog[this.identifiers.CatalogObjectKey]);
		this.objectform.get('CatalogObjectAccessModify').setValue(catalog[this.identifiers.CatalogObjectAccessModify]);
		this.objectform.get('TransactionID').setValue(catalog[this.identifiers.TransactionID]);

	}
	public getData(catalog: any): void {
		catalog[this.identifiers.DatabaseObjectType] = this.objectform.get('DatabaseObjectType').value;
		catalog[this.identifiers.CatalogObjectAccessRead] = this.objectform.get('CatalogObjectAccessRead').value;
		catalog[this.identifiers.CatalogObjectOwner] = this.objectform.get('CatalogObjectOwner').value;
		catalog[this.identifiers.CatalogObjectKey] = this.objectform.get('CatalogObjectKey').value;
		catalog[this.identifiers.CatalogObjectAccessModify] = this.objectform.get('CatalogObjectAccessModify').value;
		catalog[this.identifiers.CatalogObjectAccessRead] = this.objectform.get('CatalogObjectAccessRead').value;
		catalog[this.identifiers.TransactionID] = this.objectform.get('CatalogObjectAccessRead').value;
	}

}
