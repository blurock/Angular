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
	//@Input() 
	transspec: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	statusitems = 'dataset:CatalogDataObjectStatus';


	maintainer: string;
	idForm: FormGroup;
	items: NavItem[];


	waiting = 'waiting for annotations ';
	subtitle = 'Specification for Collection';



	constructor(
		public fb: FormBuilder,
		manageuser: ManageuserserviceService,
		private menusetup: MenutreeserviceService
	) {
		this.idForm = this.fb.group({
			DatasetName: ['', Validators.required],
			DatasetVersion: ['', Validators.required],
			CatalogObjectUniqueGenericLabel: ['', Validators.required],
			SimpleCatalogName: ['', Validators.required],
			CatalogDataObjectStatus: ['', Validators.required]
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
		this.items = this.menusetup.findChoices(this.annoinfo, this.statusitems);
		
	}

	public getData(catalog: any): void {
		const jsontransspec = {};
		const specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];
		catalog[specid] = jsontransspec;

		jsontransspec[this.annoinfo['dataset:CatalogDataObjectStatus'][this.identifier]] = this.idForm.get('CatalogDataObjectStatus').value;
		jsontransspec[this.annoinfo['dataset:DatasetName'][this.identifier]] = this.idForm.get('DatasetName').value;
		jsontransspec[this.annoinfo['dataset:DatasetVersion'][this.identifier]] = this.idForm.get('DatasetVersion').value;
		jsontransspec[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]] = this.idForm.get('CatalogObjectUniqueGenericLabel').value;
		jsontransspec['dataset:catalogobjectmaintainer'] = this.maintainer;
		this.transspec = jsontransspec;

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
