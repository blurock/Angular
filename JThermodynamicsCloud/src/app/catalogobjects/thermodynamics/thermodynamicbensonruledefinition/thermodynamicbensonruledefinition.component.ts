import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { JthermodynamicsbensonrulestructureComponent } from '../jthermodynamicsbensonrulestructure/jthermodynamicsbensonrulestructure.component';
import { JthermodynamicstandardthermodynamicsComponent } from '../jthermodynamicstandardthermodynamics/jthermodynamicstandardthermodynamics.component';
import { MatCardModule } from '@angular/material/card';
import { CatalogbaseComponent } from '../../../primitives/catalogbase/catalogbase.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { NgIf } from '@angular/common';
import { Ontologyconstants } from '../../../const/ontologyconstants';
@Component({
	selector: 'app-thermodynamicbensonruledefinition',
	standalone: true,
	imports: [
		MatCardModule,
		JthermodynamicsbensonrulestructureComponent,
		JthermodynamicstandardthermodynamicsComponent,
		ChemconnectthermodynamicsdatabaseComponent,
		NgIf
	],
	templateUrl: './thermodynamicbensonruledefinition.component.html',
	styleUrls: ['./thermodynamicbensonruledefinition.component.scss']
})
export class ThermodynamicbensonruledefinitionComponent extends CatalogbaseComponent implements AfterViewInit {

	title = 'Benson Rule Definition';


	catalogobj: any;
	specdisplay = false;

	@ViewChild('bensonstructure') bensonstructure!: JthermodynamicsbensonrulestructureComponent;
	@ViewChild('thermo') thermo!: JthermodynamicstandardthermodynamicsComponent;
	@ViewChild('base') base!: ChemconnectthermodynamicsdatabaseComponent;

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
		catalog[Ontologyconstants.dctermsidentifier] = Ontologyconstants.ThermodynamicBensonRuleDefinitionDataSet;
		this.base.getData(catalog);
		const benson = {};
		this.bensonstructure.getData(benson);
		catalog[this.annoinfo['dataset:JThermodynamicsBensonRuleStructure'][this.identifier]] = benson;
		this.base.getData(catalog);
		const thermodata = {};
		this.thermo.getData(thermodata);
		catalog[this.annoinfo['dataset:JThermodynamicStandardThermodynamics'][this.identifier]] = thermodata;
	}
	override setData(catalog: any): void {
		super.setData(catalog);
		if (this.annoinfo != null) {
			if (this.thermo != null) {
				const thermodata = catalog[this.annoinfo['dataset:JThermodynamicStandardThermodynamics'][this.identifier]];
				this.thermo.setData(thermodata);
				const benson = catalog[this.annoinfo['dataset:JThermodynamicsBensonRuleStructure'][this.identifier]];
				this.bensonstructure.setData(benson);
				this.base.setData(catalog);
			} else {
				alert('Refresh data if not shown');
			}
		} else {
		}
	}

}
