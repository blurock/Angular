import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';

@Component({
	selector: 'app-chemconnectdatasetcollectionidsset',
	templateUrl: './chemconnectdatasetcollectionidsset.component.html',
	styleUrls: ['./chemconnectdatasetcollectionidsset.component.scss']
})
export class ChemconnectdatasetcollectionidssetComponent implements OnInit {

    @Input() annoinfo: any;
    @Input() maintainer: string;

	transspec: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
maintainernotchange = true;

	idForm: UntypedFormGroup;
	waiting = 'waiting for annotations ';


	constructor(
		public fb: UntypedFormBuilder
	) {
		this.idForm = this.fb.group({
			CatalogDataObjectMaintainer: ['', Validators.required],
			DatasetCollectionsSetLabel: ['', Validators.required],
			DescriptionAbstract: ['', Validators.required],
		});
		
	}

	ngOnInit(): void {
		this.idForm.get('CatalogDataObjectMaintainer').setValue(this.maintainer);
	}
	
	public setMaintainer(maintainer: string): void {
		this.idForm.get('CatalogDataObjectMaintainer').setValue(maintainer);
	}

	public getData(catalog: any): void {
		catalog[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.idForm.get('CatalogDataObjectMaintainer').value;
		catalog[this.annoinfo['dataset:DatasetCollectionsSetLabel'][this.identifier]] = this.idForm.get('DatasetCollectionsSetLabel').value;
		catalog[this.annoinfo['dataset:DescriptionAbstract'][this.identifier]] = this.idForm.get('DescriptionAbstract').value;
	}

	public setData(catalog: any): void {
		const maintainer = catalog[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]];
		this.idForm.get('CatalogDataObjectMaintainer').setValue(maintainer);
		const datasetname = catalog[this.annoinfo['dataset:DatasetCollectionsSetLabel'][this.identifier]];
		this.idForm.get('DatasetCollectionsSetLabel').setValue(datasetname);
		const version = catalog[this.annoinfo['dataset:DescriptionAbstract'][this.identifier]];
		this.idForm.get('DescriptionAbstract').setValue(version);
		
	}


}
