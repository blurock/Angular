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

	@ViewChild('base') base!: ChemconnectthermodynamicsdatabaseComponent;
	@ViewChild('structure') structure!: Jthermodynamics2dspeciesstructureComponent;

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
		const id = this.annoinfo['dataset:JThermodynamicsSubstructureType'][this.identifier];
		catalog[id] = this.objectform.get('JThermodynamicsSubstructureType')!.value;

		this.base.getData(catalog);
		const struct = {};
		this.structure.getData(struct);
		catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;

	}
	override setData(catalog: any): void {
		super.setData(catalog);
		if (this.annoinfo) {
			const value = catalog[this.annoinfo['dataset:JThermodynamicsSubstructureType'][this.identifier]];
			this.objectform.get('JThermodynamicsSubstructureType')!.setValue(value);
			const struct = catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]];
			this.structure.setData(struct);
			this.base.setData(catalog);
		}
	}

	setType($event: any) {
		this.objectform.get('JThermodynamicsSubstructureType')!.setValue($event);
	}

}
