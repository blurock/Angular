import { Component, OnInit, Input, Inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from 'systemconstants';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({standalone: true,
	imports: [
		MatCardModule,
		MatGridListModule,
		MatTooltipModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		MatProgressSpinnerModule,
		CommonModule
		],
	selector: 'app-datasetspecificationforcollectionset',
	templateUrl: './datasetspecificationforcollectionset.component.html',
	styleUrls: ['./datasetspecificationforcollectionset.component.scss']
})
export class DatasetspecificationforcollectionsetComponent implements OnInit {


	@Input() annoinfo: any;
	@Input() maintainer: string='';
	@Input() subtitle: string='';
	transspec: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	status = 'CatalogObjectStatusCurrent';

	idForm: UntypedFormGroup;

	waiting = 'waiting for annotations ';

	constructor(
		public fb: UntypedFormBuilder,
		private menusetup: MenutreeserviceService
	) {
		this.idForm = this.fb.group({
			CatalogDataObjectStatus: ['Standard', Validators.required],
			CatalogDataObjectMaintainer: ['Standard', Validators.required],
			CollectionName: ['StandardData', Validators.required],
			DatasetVersion: ['1.0', Validators.required],
		});
	}

	ngOnInit(): void {
		if (this.subtitle == null) {
			this.subtitle = 'Specification for Collection';
		}
	}
	
	invalid(): boolean {
		return this.idForm.invalid;
	}
	
	setStatus(newstatus: string) {
		this.status = newstatus;
	}
	
	getData(catalog: any): void {
		catalog[this.annoinfo['dataset:CatalogDataObjectStatus'][this.identifier]] = this.status;
		catalog[this.annoinfo['dataset:CollectionName'][this.identifier]] = this.idForm.get('CollectionName')!.value;
		catalog[this.annoinfo['dataset:DatasetVersion'][this.identifier]] = this.idForm.get('DatasetVersion')!.value;
		catalog[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;
	}

	public setData(jsontransspec: any): void {
		this.idForm.get('CatalogDataObjectStatus')!.setValue(this.status);
		const datasetname = jsontransspec[this.annoinfo['dataset:CollectionName'][this.identifier]];
		this.idForm.get('CollectionName')!.setValue(datasetname);
		const version = jsontransspec[this.annoinfo['dataset:DatasetVersion'][this.identifier]];
		this.idForm.get('DatasetVersion')!.setValue(version);
		this.transspec = jsontransspec;
}

}
