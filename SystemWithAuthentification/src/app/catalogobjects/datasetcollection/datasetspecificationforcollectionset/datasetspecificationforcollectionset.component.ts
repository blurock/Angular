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
	@Input() maintainer: string;
	@Input() subtitle: string;
	transspec: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	//statusitems = 'dataset:CatalogDataObjectStatus';
	status = 'CatalogObjectStatusCurrent';
	


	idForm: FormGroup;
	//items: NavItem[];


	waiting = 'waiting for annotations ';

	constructor(
		public fb: FormBuilder,
		private menusetup: MenutreeserviceService
	) {
		this.idForm = this.fb.group({
			DatasetName: ['Standard', Validators.required],
			DatasetVersion: ['1.0', Validators.required],
		});
	}

	ngOnInit(): void {
		if (this.subtitle == null) {
			this.subtitle = 'Specification for Collection';
		}
	}
	
	setStatus(newstatus: string) {
		this.status = newstatus;
	}
	
	getData(catalog: any): void {
		catalog[this.annoinfo['dataset:CatalogDataObjectStatus'][this.identifier]] = this.status;
		catalog[this.annoinfo['dataset:DatasetName'][this.identifier]] = this.idForm.get('DatasetName').value;
		catalog[this.annoinfo['dataset:DatasetVersion'][this.identifier]] = this.idForm.get('DatasetVersion').value;
		catalog[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;
	}

	public setData(jsontransspec: any): void {
		this.idForm.get('CatalogDataObjectStatus').setValue(this.status);
		const datasetname = jsontransspec[this.annoinfo['dataset:DatasetName'][this.identifier]];
		this.idForm.get('DatasetName').setValue(datasetname);
		const version = jsontransspec[this.annoinfo['dataset:DatasetVersion'][this.identifier]];
		this.idForm.get('DatasetVersion').setValue(version);
		this.transspec = jsontransspec;
	}



}
