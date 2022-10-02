import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';

@Component({
	selector: 'app-datasetspecificationforcollectionset',
	templateUrl: './datasetspecificationforcollectionset.component.html',
	styleUrls: ['./datasetspecificationforcollectionset.component.scss']
})
export class DatasetspecificationforcollectionsetComponent implements OnInit {


	@Input() annoinfo: any;
	@Input() subtitle: string;
	transspec: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	statusitems = 'dataset:CatalogDataObjectStatus';


	maintainer: string;
	idForm: FormGroup;
	items: NavItem[];


	waiting = 'waiting for annotations ';

	constructor(
		public fb: FormBuilder,
		manageuser: ManageuserserviceService,
		private menusetup: MenutreeserviceService
	) {
		this.idForm = this.fb.group({
			DatasetName: ['Standard', Validators.required],
			DatasetVersion: ['1.0', Validators.required],
			CatalogObjectUniqueGenericLabel: ['', Validators.required],
			CatalogDataObjectStatus: ['CatalogObjectStatusCurrent', Validators.required]
		});
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});
	}

	ngOnInit(): void {
		if (this.subtitle == null) {
			this.subtitle = 'Specification for Collection';
		}
		this.items = this.menusetup.findChoices(this.annoinfo, this.statusitems);
	}
	
	function() {
    alert("Hello");
  }

	getData(catalog: any): void {
		catalog[this.annoinfo['dataset:CatalogDataObjectStatus'][this.identifier]] = this.idForm.get('CatalogDataObjectStatus').value;
		catalog[this.annoinfo['dataset:DatasetName'][this.identifier]] = this.idForm.get('DatasetName').value;
		catalog[this.annoinfo['dataset:DatasetVersion'][this.identifier]] = this.idForm.get('DatasetVersion').value;
		catalog[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]] = this.idForm.get('CatalogObjectUniqueGenericLabel').value;
		catalog['dataset:catalogobjectmaintainer'] = this.maintainer;
	}

	public setData(jsontransspec: any): void {
		const status = jsontransspec[this.annoinfo['dataset:CatalogDataObjectStatus'][this.identifier]];
		this.idForm.get('CatalogDataObjectStatus').setValue(status);
		const datasetname = jsontransspec[this.annoinfo['dataset:DatasetName'][this.identifier]];
		this.idForm.get('DatasetName').setValue(datasetname);
		const version = jsontransspec[this.annoinfo['dataset:DatasetVersion'][this.identifier]];
		this.idForm.get('DatasetVersion').setValue(version);
		const label = jsontransspec[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]];
		this.idForm.get('CatalogObjectUniqueGenericLabel').setValue(label);
		this.maintainer = jsontransspec['dataset:catalogobjectmaintainer'];
		this.transspec = jsontransspec;
	}



}
