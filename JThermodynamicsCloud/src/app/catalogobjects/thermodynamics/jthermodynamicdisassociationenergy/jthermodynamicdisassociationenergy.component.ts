import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { ParametervalueComponent } from '../../parametervalue/parametervalue.component';
import { Jthermodynamics2dspeciesstructureComponent } from '../jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { CatalogbaseComponent } from '../../../primitives/catalogbase/catalogbase.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { Ontologyconstants } from 'systemconstants';

@Component({
	selector: 'app-jthermodynamicdisassociationenergy',
	standalone: true,
	imports: [
		MatCardModule,
		NgIf,
		ParametervalueComponent,
		ChemconnectthermodynamicsdatabaseComponent,
		Jthermodynamics2dspeciesstructureComponent
	],
	templateUrl: './jthermodynamicdisassociationenergy.component.html',
	styleUrls: ['./jthermodynamicdisassociationenergy.component.scss']
})
export class JthermodynamicdisassociationenergyComponent extends CatalogbaseComponent implements AfterViewInit {

	display = false;
	specdisplay = false;

	molarenergyparameter = 'dataset:ParameterSpecificationHDisassociationEnergy';
	molarenergy: any;
	energytitle = 'Hydrogen Disassociation Energy Value';

	title = 'H Disassociation Energy of Structure';

	@ViewChild('energy') energy!: ParametervalueComponent;
	@ViewChild('structure') structure!: Jthermodynamics2dspeciesstructureComponent;

	private base: ChemconnectthermodynamicsdatabaseComponent | undefined;
	@ViewChild('base')
	set paramSpecComponent(component: ChemconnectthermodynamicsdatabaseComponent | undefined) {
		this.base = component;
		if (component) {
			if (this.catalog) {
				this.setData(this.catalog);
			}
		}
	}

	constructor(
		annotations: OntologycatalogService,
		constants: UserinterfaceconstantsService,
		cdRef: ChangeDetectorRef
	) {
		super(constants, annotations, cdRef);
		const set = [];
		set.push(this.molarenergyparameter);
		annotations.getParameterSet(set).subscribe({
			next: (data: any) => {
				this.molarenergy = data[this.molarenergyparameter];
				this.specdisplay = true;
			}
		});
	}

	ngAfterViewInit(): void {
		if (this.catalog != null) {
			this.setData(this.catalog);
		}
	}
	override annotationsFound(response: any): void {
		super.annotationsFound(response);
		this.display = true;
		if (this.catalog != null) {
			this.setData(this.catalog);
		}
	}


	override getData(catalog: any): void {
		catalog[Ontologyconstants.dctermsidentifier] = Ontologyconstants.JThermodynamicsDisassociationEnergyOfStructureDataSet;
		super.getData(catalog);
		this.base?.getData(catalog);
		const energyvalue: Record<string, any> = {};
		this.energy.getData(energyvalue);
		energyvalue[Ontologyconstants.dctermsidentifier] = Ontologyconstants.JThermodynamicDisassociationEnergy;
		catalog[this.annoinfo['dataset:JThermodynamicDisassociationEnergy'][this.identifier]] = energyvalue;
		const struct = {};
		this.structure.getData(struct);
		catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;
	}
	override setData(catalog: any): void {
		if (!this.catalogdataset) {
		super.setData(catalog);
		if (this.base && this.structure && this.energy) {
			
			this.base.setData(catalog);
			const energyvalue = catalog[this.annoinfo['dataset:JThermodynamicDisassociationEnergy'][this.identifier]];
			this.energy.setData(energyvalue);
			const struct = catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]];
			this.structure.setData(struct);
			this.catalogdataset = true;
		}
	}
	}

}
