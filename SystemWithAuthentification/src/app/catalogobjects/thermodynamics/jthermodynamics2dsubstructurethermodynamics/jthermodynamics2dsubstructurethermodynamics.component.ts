import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { Jthermodynamics2dspeciesstructureComponent } from '../jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';
import { FormBuilder, Validators } from '@angular/forms';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';

@Component({
	selector: 'app-jthermodynamics2dsubstructurethermodynamics',
	templateUrl: './jthermodynamics2dsubstructurethermodynamics.component.html',
	styleUrls: ['./jthermodynamics2dsubstructurethermodynamics.component.scss']
})
export class Jthermodynamics2dsubstructurethermodynamicsComponent implements OnInit {

	title = 'Temperature Dependent Thermodynamics of Species';

	message = 'Still loading';
	annoinfo: any;
	catalogobj: any;
	display = false;
	specdisplay = false;
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	items: NavItem[];
	typeloc = 'dataset:JThermodynamicsSubstructureType';


	objectform = this.formBuilder.group({
		JThermodynamicsSubstructureType: ['', Validators.required]
	});

	@Output() annoReady = new EventEmitter<any>();

	catalogtype = 'dataset:JThermodynamics2DSubstructureThermodynamics';

	@ViewChild('base') base: ChemconnectthermodynamicsdatabaseComponent;
	@ViewChild('structure') structure: Jthermodynamics2dspeciesstructureComponent;

	constructor(
		public annotations: OntologycatalogService,
		private formBuilder: FormBuilder,
		private menusetup: MenutreeserviceService

	) {
		this.getCatalogAnnoations();
	}

	ngOnInit(): void {
	}

	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.items = this.menusetup.findChoices(this.annoinfo, this.typeloc);
					this.display = true;
					this.annoReady.emit(this.annoinfo);
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}
	getData(catalog: any): void {
		const id = this.annoinfo['dataset:JThermodynamicsSubstructureType'][this.identifier];
		catalog[id] = this.objectform.get('JThermodynamicsSubstructureType').value;

		this.base.getData(catalog);
		const struct = {};
		this.structure.getData(struct);
		catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;

	}
	setData(catalog: any): void {
		this.objectform.get('JThermodynamicsSubstructureType').setValue(catalog[this.annoinfo['dataset:JThermodynamicsSubstructureType'][this.identifier]]);
		this.base.setData(catalog);
		const struct = catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]];
		this.structure.setData(struct);
	}

	setType($event) {

		this.objectform.get('JThermodynamicsSubstructureType').setValue($event);
	}

}
