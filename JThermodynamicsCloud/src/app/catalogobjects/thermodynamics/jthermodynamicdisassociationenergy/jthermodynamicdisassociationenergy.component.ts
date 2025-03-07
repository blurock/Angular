import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { ParametervalueComponent } from '../../parametervalue/parametervalue.component';
import { Jthermodynamics2dspeciesstructureComponent } from '../jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';

@Component({
	selector: 'app-jthermodynamicdisassociationenergy',
	templateUrl: './jthermodynamicdisassociationenergy.component.html',
	styleUrls: ['./jthermodynamicdisassociationenergy.component.scss']
})
export class JthermodynamicdisassociationenergyComponent implements OnInit {

	message: string;
	annoinfo: any;
	catalogobj: any;
	display = false;
	specdisplay = false;
	identifier = Ontologyconstants.dctermsidentifier;


	@Output() annoReady = new EventEmitter<any>();

	molarenergyparameter = 'dataset:ParameterSpecificationHDisassociationEnergy';
	molarenergy: any;
	energytitle = 'Hydrogen Disassociation Energy Value';

	catalogtype = 'dataset:JThermodynamicsDisassociationEnergyOfStructure';
	title = 'H Disassociation Energy of Structure';

	@ViewChild('base') base: ChemconnectthermodynamicsdatabaseComponent;
	@ViewChild('energy') energy: ParametervalueComponent;
	@ViewChild('structure') structure: Jthermodynamics2dspeciesstructureComponent;

	constructor(
		public annotations: OntologycatalogService,
	) {
		this.getCatalogAnnoations();
		const set = [];
		set.push(this.molarenergyparameter);
		annotations.getParameterSet(set).subscribe({
			next: (data: any) => {
				this.molarenergy = data[this.molarenergyparameter];
				this.specdisplay = true;
			}
		});
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
		this.base.getData(catalog);
		const energyvalue = {};
		this.energy.getData(energyvalue);
		catalog[this.annoinfo['dataset:JThermodynamicDisassociationEnergy'][this.identifier]] = energyvalue;
		const struct = {};
		this.structure.getData(struct);
		catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;

	}
	setData(catalog: any): void {
		this.base.setData(catalog);
		const energyvalue = catalog.get('dataset:JThermodynamicDisassociationEnergy').value;
		this.energy.setData(energyvalue);
		const struct = catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]];
		this.structure.setData(struct);
	}

}
