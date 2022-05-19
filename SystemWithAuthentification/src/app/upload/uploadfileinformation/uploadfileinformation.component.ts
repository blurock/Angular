import { Input, Output, EventEmitter, Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { UploadinterfaceconstantsService } from '../uploadinterfaceconstants.service';
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import {Ontologyconstants} from '../../const/ontologyconstants';
import {IdentifiersService} from '../../const/identifiers.service';


@Component({
	selector: 'app-uploadfileinformation',
	templateUrl: './uploadfileinformation.component.html',
	styleUrls: ['./uploadfileinformation.component.scss']
})
export class UploadfileinformationComponent implements OnInit {

	@Input() uploadinfoform: FormGroup;
	@Input() references: FormArray;
	@Input() filesourcetypechoices: string[];
	@Input() titleInformation: any;
	@Output() newItemEvent = new EventEmitter<FormGroup>();

catalogobj: any;
annoinfo: any;
display = false;
message = 'Initializing';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;

	genericnamelabel = 'Generic'
	genericnamehint = 'A unique name for this dataset object process';

	datasetnamelabel = 'Source set name';
	datasetnamehint = 'Source name (refers to same collection of sources)';

	versionlabel = 'Version';
	versionhint = 'Refers to version of this data source';

	constructor(public annotations: OntologycatalogService,
	public identifiers: IdentifiersService,
		public labels: UploadinterfaceconstantsService) { }

	ngOnInit(): void {
		const catalogtype = 'dataset:ActivityRepositoryInitialReadLocalFile';
		this.annotations.getNewCatalogObject(catalogtype).subscribe({
			next: (responsedata: any) => {
				this.message = 'got response';
				this.message = responsedata;
				const response = responsedata;
				this.message = 'response JSON';
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.display = true;
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});

	}

	addReference(reference: FormGroup): void {
		this.newItemEvent.emit(reference);
	}
}
