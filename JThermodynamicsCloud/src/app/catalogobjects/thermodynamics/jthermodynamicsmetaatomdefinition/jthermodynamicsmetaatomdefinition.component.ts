import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { Jthermodynamics2dspeciesstructureComponent } from '../jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';

@Component({
	selector: 'app-jthermodynamicsmetaatomdefinition',
	templateUrl: './jthermodynamicsmetaatomdefinition.component.html',
	styleUrls: ['./jthermodynamicsmetaatomdefinition.component.scss']
})
export class JthermodynamicsmetaatomdefinitionComponent implements OnInit {


	title = 'Meta Atom Definition';

	message = 'Still loading';
	annoinfo: any;
	catalogobj: any;
	display = false;
	specdisplay = false;
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	items: NavItem[];
	metaatomtypeitems: NavItem[];
	typeloc = 'dataset:JThermodynamicsSpeciesSpecificationType';
	metaatomtypeloc = 'dataset:JThermodynamicsMetaAtomType';


	objectform = this.formBuilder.group({
		JThermodynamics2DSpeciesLabel: ['', Validators.required],
		JThermodynamicsSpeciesSpecificationType: ['', Validators.required],
		JThermodynamicsStructureSpecification: ['', Validators.required],
		JThermodynamicsMetaAtomLabel: ['', Validators.required],
		JThermodynamicsMetaAtomType: ['', Validators.required],
		JThermodynamicsStructureName: ['', Validators.required]
	});

	@Output() annoReady = new EventEmitter<any>();

	catalogtype = 'dataset:JThermodynamicsMetaAtomDefinition';

	@ViewChild('base') base: ChemconnectthermodynamicsdatabaseComponent;
	@ViewChild('structure') structure: Jthermodynamics2dspeciesstructureComponent;

	constructor(
		public annotations: OntologycatalogService,
		private formBuilder: UntypedFormBuilder,
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
					this.metaatomtypeitems = this.menusetup.findChoices(this.annoinfo, this.metaatomtypeloc);
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
		const id1 = this.annoinfo['dataset:JThermodynamics2DSpeciesLabel'][this.identifier];
		catalog[id1] = this.objectform.get('JThermodynamics2DSpeciesLabel').value;
		const id2 = this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier];
		catalog[id2] = this.objectform.get('JThermodynamicsSpeciesSpecificationType').value;
		const id3 = this.annoinfo['dataset:JThermodynamicsStructureSpecification'][this.identifier];
		catalog[id3] = this.objectform.get('JThermodynamicsStructureSpecification').value;
		const meta = {}
		const id4 = this.annoinfo['dataset:JThermodynamicsMetaAtomLabel'][this.identifier];
		meta[id4] = this.objectform.get('JThermodynamicsMetaAtomLabel').value;
		const id5 = this.annoinfo['dataset:JThermodynamicsMetaAtomType'][this.identifier];
		meta[id5] = this.objectform.get('JThermodynamicsMetaAtomType').value;
		const id6 = this.annoinfo['dataset:JThermodynamicsStructureName'][this.identifier];
		meta[id6] = this.objectform.get('JThermodynamicsStructureName').value;
		const id7 = this.annoinfo['dataset:JThermodynamicsMetaAtomInfo'][this.identifier];
		catalog[id7] = meta;

		this.base.getData(catalog);
		const struct = {};
		this.structure.getData(struct);
		meta[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;

	}
	setData(catalog: any): void {
		const id1 = this.annoinfo['dataset:JThermodynamics2DSpeciesLabel'][this.identifier];
		this.objectform.get('JThermodynamics2DSpeciesLabel').setValue(catalog[id1]);
		const id2 = this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier];
		this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue(catalog[id2]);
		const id3 = this.annoinfo['dataset:JThermodynamicsStructureSpecification'][this.identifier];
		this.objectform.get('JThermodynamicsStructureSpecification').setValue(catalog[id3]);

		const id7 = this.annoinfo['dataset:JThermodynamicsMetaAtomInfo'][this.identifier];
		const meta = catalog[id7];
		const id4 = this.annoinfo['dataset:JThermodynamicsMetaAtomLabel'][this.identifier];
		this.objectform.get('JThermodynamicsMetaAtomLabel').setValue(meta[id4]);
		const id5 = this.annoinfo['dataset:JThermodynamicsMetaAtomType'][this.identifier];
		this.objectform.get('JThermodynamicsMetaAtomType').setValue(meta[id5]);
		const id6 = this.annoinfo['dataset:JThermodynamicsStructureName'][this.identifier];
		this.objectform.get('JThermodynamicsStructureName').setValue(meta[id6]);


		this.base.setData(catalog);
		const struct = meta[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]];
		this.structure.setData(struct);
	}

	setType($event: string): void {
		this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue($event);
	}
	setMetaAtomType($event: string): void {
		this.objectform.get('JThermodynamicsMetaAtomType').setValue($event);
	}

}
