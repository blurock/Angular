import { Component, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from 'systemconstants';
import { ManageuserserviceService } from '../../../../services/manageuserservice.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
	standalone: true,
	imports: [
		MatCardModule,
		MatGridListModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		NgIf
	],
	selector: 'app-datasetcollectionsetrecordidinfo',
	templateUrl: './datasetcollectionsetrecordidinfo.component.html',
	styleUrls: ['./datasetcollectionsetrecordidinfo.component.scss']
})
export class DatasetcollectionsetrecordidinfoComponent implements OnInit {

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	@Input() annoinfo: any;

	objectform: UntypedFormGroup;
	title = 'Collection Record ID';
	maintainernotchange = true;
	collectionidfixed = false;

	constructor(
		manageuser: ManageuserserviceService,
		private formBuilder: UntypedFormBuilder,
	) {
		this.objectform = this.formBuilder.group({
			CatalogObjectUniqueGenericLabel: ['', Validators.required],
			CatalogDataObjectMaintainer: ['', Validators.required],
		});

		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.objectform.get('CatalogDataObjectMaintainer')!.setValue(result);

			} else {
				alert(manageuser.errormaintainer);
			}
		});


	}

	ngOnInit(): void {
	}
	
	public setMaintainer(maintainer: string): void {
		this.objectform.get('CatalogDataObjectMaintainer')!.setValue(maintainer);
	}
	
	invalid(): boolean {
		return this.objectform.invalid;
	}

	getData(activity: any): void {
		activity[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]] = this.objectform.get('CatalogObjectUniqueGenericLabel')!.value;
		const mlabel = this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier];
		activity[mlabel] = this.objectform.get('CatalogDataObjectMaintainer')!.value;
	}
	setData(activity: any): void {
		this.objectform.get('CatalogObjectUniqueGenericLabel')!.setValue(activity[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel']]);
		this.objectform.get('CatalogDataObjectMaintainer')!.setValue(activity[this.annoinfo['dataset:CatalogDataObjectMaintainer']]);
	}
	
	setCatalogObjectUniqueGenericLabel(collectionid: string) {
		this.objectform.get('CatalogObjectUniqueGenericLabel')!.setValue(collectionid);
		this.collectionidfixed = true;
	}

}
