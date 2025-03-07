import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { ManageuserserviceService } from '../../../../services/manageuserservice.service';

@Component({
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
			DatasetCollectionsSetLabel: ['', Validators.required],
			CatalogDataObjectMaintainer: ['', Validators.required],
		});

		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.objectform.get('CatalogDataObjectMaintainer').setValue(result);

			} else {
				alert(manageuser.errormaintainer);
			}
		});


	}

	ngOnInit(): void {
	}
	
	public setMaintainer(maintainer: string): void {
		this.objectform.get('CatalogDataObjectMaintainer').setValue(maintainer);
	}
	
	invalid(): boolean {
		return this.objectform.invalid;
	}

	getData(activity: any): void {
		activity[this.annoinfo['dataset:DatasetCollectionsSetLabel'][this.identifier]] = this.objectform.get('DatasetCollectionsSetLabel').value;
		const mlabel = this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier];
		activity[mlabel] = this.objectform.get('CatalogDataObjectMaintainer').value;
	}
	setData(activity: any): void {
		this.objectform.get('DatasetCollectionsSetLabel').setValue(activity[this.annoinfo['dataset:DatasetCollectionsSetLabel']]);
		this.objectform.get('CatalogDataObjectMaintainer').setValue(activity[this.annoinfo['dataset:CatalogDataObjectMaintainer']]);
	}
	
	setDatasetCollectionsSetLabel(collectionid: string) {
		this.objectform.get('DatasetCollectionsSetLabel').setValue(collectionid);
		this.collectionidfixed = true;
	}

}
