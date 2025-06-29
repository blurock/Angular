import { Component, Input } from '@angular/core';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageuserserviceService } from '../../services/manageuserservice.service';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { UserinterfaceconstantsService } from '../../const/userinterfaceconstants.service';

@Component({
	selector: 'app-specificationfordataset',
	templateUrl: './specificationfordataset.component.html',
	styleUrls: ['./specificationfordataset.component.scss'],
	standalone: true,
	imports: [MatCardModule,
	ReactiveFormsModule,
	MatGridListModule,
	MatFormFieldModule,
	MatInput,
	CommonModule]
})
export class SpecificationfordatasetComponent {
	@Input() annoinfo: any;
	@Input() subtitle!: string;
	transspec: any;
	rdfslabel: string = Ontologyconstants.rdfslabel;
	rdfscomment: string = Ontologyconstants.rdfscomment;
	identifier: string = Ontologyconstants.dctermsidentifier;


	maintainer: string = '';
	idForm: FormGroup;
	nochange = true;

	waiting = 'waiting for annotations ';

	constructor(private constants: UserinterfaceconstantsService,
		public fb: FormBuilder,
		private manageuser: ManageuserserviceService,
	) {
		this.idForm = this.fb.group({
			DatasetObjectType: ['', Validators.required],
			CatalogObjectUniqueGenericLabel: ['', Validators.required],
		});
		
		this.manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(this.manageuser.errormaintainer);
			}
		});
		
	}

	ngOnInit(): void {
		if (this.subtitle == null) {
			this.subtitle = this.constants.datasetspectitle;
		}
	}
	invalid(): boolean {
		return this.idForm.invalid;
	}

	public setCatalogType(catalogtype: any): void {
		this.idForm.get('DatasetObjectType')?.setValue(catalogtype.dataset);
	}
	
	public getData(catalog: any): void {
		const jsontransspec: Record<string, unknown> = {};
		catalog[this.annoinfo['dataset:DatasetObjectType'][this.identifier]] = this.idForm.get('DatasetObjectType')?.value ?? '';;
		catalog[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]] = this.idForm.get('CatalogObjectUniqueGenericLabel')?.value ?? '';;
		catalog[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;
		this.transspec = jsontransspec;
	}

	public setData(jsontransspec: any): void {
		if(jsontransspec) {
		const datasetname = jsontransspec[this.annoinfo['dataset:DatasetObjectType'][this.identifier]];
		this.idForm.get('DatasetObjectType')?.setValue(datasetname);
		const label = jsontransspec[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]];
		this.idForm.get('CatalogObjectUniqueGenericLabel')?.setValue(label);
		this.transspec = jsontransspec;
		}
	}

}
