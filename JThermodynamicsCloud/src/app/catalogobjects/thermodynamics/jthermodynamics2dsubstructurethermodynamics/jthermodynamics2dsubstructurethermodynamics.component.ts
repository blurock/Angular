import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { Jthermodynamics2dspeciesstructureComponent } from '../jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NavItem } from '../../../primitives/nav-item';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemComponent } from '../../../primitives/menu-item/menu-item.component';
import { CatalogbaseComponent } from '../../../primitives/catalogbase/catalogbase.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { NgIf } from '@angular/common';
import { JthermodynamicstandardthermodynamicsComponent } from '../jthermodynamicstandardthermodynamics/jthermodynamicstandardthermodynamics.component';
import { Ontologyconstants } from '../../../const/ontologyconstants';

@Component({
	selector: 'app-jthermodynamics2dsubstructurethermodynamics',
	standalone: true,
	imports: [
		MatCardModule,
		ReactiveFormsModule,
		MatInputModule,
		MatMenuModule,
		MenuItemComponent,
		ChemconnectthermodynamicsdatabaseComponent,
		Jthermodynamics2dspeciesstructureComponent,
		JthermodynamicstandardthermodynamicsComponent,
		NgIf
	],
	templateUrl: './jthermodynamics2dsubstructurethermodynamics.component.html',
	styleUrls: ['./jthermodynamics2dsubstructurethermodynamics.component.scss']
})
export class Jthermodynamics2dsubstructurethermodynamicsComponent extends CatalogbaseComponent implements AfterViewInit {

	title = 'Temperature Dependent Thermodynamics of Species';

	catalogobj: any;
	display = false;
	specdisplay = false;
	items: NavItem[] = [];
	typeloc = 'dataset:JThermodynamicsSubstructureType';

	objectform: UntypedFormGroup = new UntypedFormGroup({});

	@ViewChild('structure') structure!: Jthermodynamics2dspeciesstructureComponent;
	@ViewChild('thermo') thermo!: JthermodynamicstandardthermodynamicsComponent;
	private base: ChemconnectthermodynamicsdatabaseComponent | undefined; @ViewChild('base')
	set paramSpecComponent(component: ChemconnectthermodynamicsdatabaseComponent | undefined) {
		this.base = component;
		if (component) {
			if (this.catalog) {
				this.setData(this.catalog);
			}
		}
	}

	constructor(
		private formBuilder: UntypedFormBuilder,
		annotations: OntologycatalogService,
		constants: UserinterfaceconstantsService,
		cdRef: ChangeDetectorRef
	) {
		super(constants, annotations, cdRef);
		this.objectform = this.formBuilder.group({
			JThermodynamicsSubstructureType: ['', Validators.required]
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
		catalog[Ontologyconstants.dctermsidentifier] = Ontologyconstants.JThermodynamics2DSubstructureThermodynamicsDataSet;
		const id = this.annoinfo['dataset:JThermodynamicsSubstructureType'][this.identifier];
		catalog[id] = this.objectform.get('JThermodynamicsSubstructureType')!.value;
		catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = {};
		const struct = {};
		catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;
		this.structure.getData(struct);
		this.base?.getData(catalog);
		const thermodata = {};
		this.thermo.getData(thermodata);
		catalog[this.annoinfo['dataset:JThermodynamicStandardThermodynamics'][this.identifier]] = thermodata;
	}
	override setData(catalog: any): void {
		if (!this.catalogdataset) {
			super.setData(catalog);
			if (this.annoinfo && this.thermo && this.base && this.structure) {
				const value = catalog[this.annoinfo['dataset:JThermodynamicsSubstructureType'][this.identifier]];
				this.objectform.get('JThermodynamicsSubstructureType')!.setValue(value);
				const thermodata = catalog[this.annoinfo['dataset:JThermodynamicStandardThermodynamics'][this.identifier]];
				this.thermo.setData(thermodata);
				this.structure.setData(catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]]);
				this.base.setData(catalog);
				this.catalogdataset = true;
			}
		}
	}

	setType($event: any) {
		this.objectform.get('JThermodynamicsSubstructureType')!.setValue($event);
	}

}
