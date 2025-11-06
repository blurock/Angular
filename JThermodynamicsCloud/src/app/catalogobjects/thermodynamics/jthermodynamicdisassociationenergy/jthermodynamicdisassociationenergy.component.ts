import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { ParametervalueComponent } from '../../parametervalue/parametervalue.component';
import { Jthermodynamics2dspeciesstructureComponent } from '../jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { CatalogbaseComponent } from '../../../primitives/catalogbase/catalogbase.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';

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
export class JthermodynamicdisassociationenergyComponent extends CatalogbaseComponent  implements AfterViewInit {

	display = false;
	specdisplay = false;

	molarenergyparameter = 'dataset:ParameterSpecificationHDisassociationEnergy';
	molarenergy: any;
	energytitle = 'Hydrogen Disassociation Energy Value';

	title = 'H Disassociation Energy of Structure';

	@ViewChild('base') base!: ChemconnectthermodynamicsdatabaseComponent;
	@ViewChild('energy') energy!: ParametervalueComponent;
	@ViewChild('structure') structure!: Jthermodynamics2dspeciesstructureComponent;

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
	}


	override getData(catalog: any): void {
		this.base.getData(catalog);
		const energyvalue = {};
		this.energy.getData(energyvalue);
		catalog[this.annoinfo['dataset:JThermodynamicDisassociationEnergy'][this.identifier]] = energyvalue;
		const struct = {};
		this.structure.getData(struct);
		catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;

	}
	override setData(catalog: any): void {
		this.base.setData(catalog);
		const energyvalue = catalog.get('dataset:JThermodynamicDisassociationEnergy').value;
		this.energy.setData(energyvalue);
		const struct = catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]];
		this.structure.setData(struct);
	}

}
