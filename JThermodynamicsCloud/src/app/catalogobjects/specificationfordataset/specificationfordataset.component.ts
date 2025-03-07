import { Component, Input } from '@angular/core';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ManageuserserviceService } from '../../services/manageuserservice.service';

@Component({
	selector: 'app-specificationfordataset',
	templateUrl: './specificationfordataset.component.html',
	styleUrls: ['./specificationfordataset.component.scss']
})
export class SpecificationfordatasetComponent {
	@Input() annoinfo: any;
	@Input() subtitle: string;
	transspec: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	maintainer: string;
	idForm: UntypedFormGroup;

	waiting = 'waiting for annotations ';

	constructor(
		public fb: UntypedFormBuilder,
		private manageuser: ManageuserserviceService,
	) {
		this.idForm = this.fb.group({
			DatasetObjectType: ['', Validators.required],
			CatalogObjectUniqueGenericLabel: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		if (this.subtitle == null) {
			this.subtitle = 'Specification for Data Set';
		}
		this.manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(this.manageuser.errormaintainer);
			}
		});
	}
	invalid(): boolean {
		return this.idForm.invalid;
	}

	public setCatalogType(catalogtype: any): void {
		this.idForm.get('DatasetObjectType').setValue(catalogtype.dataset);
	}
	
	public getData(catalog: any): void {
		const jsontransspec = {};
		const specid = this.annoinfo['dataset:SpecificationForDataset'][this.identifier];
		catalog[specid] = jsontransspec;

		jsontransspec[this.annoinfo['dataset:DatasetObjectType'][this.identifier]] = this.idForm.get('DatasetObjectType').value;
		jsontransspec[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]] = this.idForm.get('CatalogObjectUniqueGenericLabel').value;
		jsontransspec[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;
		this.transspec = jsontransspec;
	}

	public setData(jsontransspec: any): void {
		const datasetname = jsontransspec[this.annoinfo['dataset:DatasetObjectType'][this.identifier]];
		this.idForm.get('DatasetName').setValue(datasetname);
		const label = jsontransspec[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]];
		this.idForm.get('CatalogObjectUniqueGenericLabel').setValue(label);
		this.transspec = jsontransspec;
	}

}
