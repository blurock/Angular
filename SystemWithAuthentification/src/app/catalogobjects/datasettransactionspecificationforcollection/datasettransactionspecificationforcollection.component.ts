import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { ManageuserserviceService } from '../../services/manageuserservice.service';
import { MenutreeserviceService } from '../../services/menutreeservice.service';
import { NavItem } from '../../primitives/nav-item';

@Component({
	selector: 'app-datasettransactionspecificationforcollection',
	templateUrl: './datasettransactionspecificationforcollection.component.html',
	styleUrls: ['./datasettransactionspecificationforcollection.component.scss']
})
export class DatasettransactionspecificationforcollectionComponent implements OnInit {

	@Input() annoinfo: any;
	@Input() subtitle: string;
	transspec: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	statusitems = 'dataset:CatalogDataObjectStatus';


	maintainer: string;
	idForm: FormGroup;
	items: NavItem[] = [];


	waiting = 'waiting for annotations ';
	



	constructor(
		public fb: FormBuilder,
		private manageuser: ManageuserserviceService,
		private menusetup: MenutreeserviceService
	) {
		this.items =[];
		this.idForm = this.fb.group({
			DatasetName: ['', Validators.required],
			DatasetVersion: ['', Validators.required],
			CatalogObjectUniqueGenericLabel: ['', Validators.required],
			CatalogDataObjectStatus: ['', Validators.required]
		});
	}

	ngOnInit(): void {
		if(this.subtitle == null) {
			this.subtitle = 'Specification for Collection';
		}
		this.items = this.menusetup.findChoices(this.annoinfo, this.statusitems);
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

	public getData(catalog: any): void {
		const jsontransspec = {};
		const specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];
		catalog[specid] = jsontransspec;

		jsontransspec[this.annoinfo['dataset:CatalogDataObjectStatus'][this.identifier]] = this.idForm.get('CatalogDataObjectStatus').value;
		jsontransspec[this.annoinfo['dataset:DatasetName'][this.identifier]] = this.idForm.get('DatasetName').value;
		jsontransspec[this.annoinfo['dataset:DatasetVersion'][this.identifier]] = this.idForm.get('DatasetVersion').value;
		jsontransspec[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]] = this.idForm.get('CatalogObjectUniqueGenericLabel').value;
		jsontransspec[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;
		this.transspec = jsontransspec;

	}

	public setData(jsontransspec: any): void {
		alert("DatasettransactionspecificationforcollectionComponent 0");
		const status = jsontransspec[this.annoinfo['dataset:CatalogDataObjectStatus'][this.identifier]];
		this.idForm.get('CatalogDataObjectStatus').setValue(status);
		const datasetname = jsontransspec[this.annoinfo['dataset:DatasetName'][this.identifier]];
		this.idForm.get('DatasetName').setValue(datasetname);
		const version = jsontransspec[this.annoinfo['dataset:DatasetVersion'][this.identifier]];
		this.idForm.get('DatasetVersion').setValue(version);
		const label = jsontransspec[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]];
		this.idForm.get('CatalogObjectUniqueGenericLabel').setValue(label);
		//this.maintainer = jsontransspec['dataset:catalogobjectmaintainer'];
		this.transspec = jsontransspec;
		alert("DatasettransactionspecificationforcollectionComponent done");
	}
setStatus(status: string): void {
	this.idForm.get('CatalogDataObjectStatus').setValue(status);
}

}
