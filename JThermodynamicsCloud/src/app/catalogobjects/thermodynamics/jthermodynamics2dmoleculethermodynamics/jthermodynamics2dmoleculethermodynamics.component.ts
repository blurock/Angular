import { Component, ViewChild,ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { Jthermodynamics2dspeciesstructureComponent } from '../jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';
import { CatalogbaseComponent } from '../../../primitives/catalogbase/catalogbase.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { MatCardModule } from '@angular/material/card';

@Component({
	selector: 'app-jthermodynamics2dmoleculethermodynamics',
	standalone: true,
	imports: [
		MatCardModule,
		ChemconnectthermodynamicsdatabaseComponent,
		Jthermodynamics2dspeciesstructureComponent
	],
	templateUrl: './jthermodynamics2dmoleculethermodynamics.component.html',
	styleUrls: ['./jthermodynamics2dmoleculethermodynamics.component.scss']
})
export class Jthermodynamics2dmoleculethermodynamicsComponent  extends CatalogbaseComponent implements AfterViewInit {

	title = 'Temperature Dependent Thermodynamics of Species';

	display = false;
	specdisplay = false;
	@ViewChild('base') base!: ChemconnectthermodynamicsdatabaseComponent;
	@ViewChild('structure') structure!: Jthermodynamics2dspeciesstructureComponent;

	constructor(
			annotations: OntologycatalogService,
			constants: UserinterfaceconstantsService,
			cdRef: ChangeDetectorRef
		) {
			super(constants, annotations, cdRef);
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
		const struct = {};
		this.structure.getData(struct);
		catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;

	}
	override setData(catalog: any): void {
		const struct = catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]];
		this.structure.setData(struct);
		this.base.setData(catalog);
	}

}
