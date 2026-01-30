import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { Jthermodynamics2dspeciesstructureComponent } from '../jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NavItem } from '../../../primitives/nav-item';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuItemComponent } from '../../../primitives/menu-item/menu-item.component';
import { CatalogbaseComponent } from '../../../primitives/catalogbase/catalogbase.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Ontologyconstants } from 'systemconstants';

@Component({
	selector: 'app-jthermodynamicsmetaatomdefinition',
	standalone: true,
	imports: [
		MatCardModule,
		MatInputModule,
		ReactiveFormsModule,
		MatGridListModule,
		MenuItemComponent,
		MatMenuModule,
		Jthermodynamics2dspeciesstructureComponent,
		ChemconnectthermodynamicsdatabaseComponent,
		NgIf
	],
	templateUrl: './jthermodynamicsmetaatomdefinition.component.html',
	styleUrls: ['./jthermodynamicsmetaatomdefinition.component.scss']
})
export class JthermodynamicsmetaatomdefinitionComponent extends CatalogbaseComponent implements AfterViewInit {


	title = 'Meta Atom Definition';

	catalogobj: any;
	display = false;
	specdisplay = false;
	items: NavItem[] = [];
	metaatomtypeitems: NavItem[] = [];
	typeloc = 'dataset:JThermodynamicsSpeciesSpecificationType';
	metaatomtypeloc = 'dataset:JThermodynamicsMetaAtomType';

	objectform: UntypedFormGroup = new UntypedFormGroup({});

	@ViewChild('base') base!: ChemconnectthermodynamicsdatabaseComponent;
	@ViewChild('structure') structure!: Jthermodynamics2dspeciesstructureComponent;

	constructor(
		annotations: OntologycatalogService,
		private formBuilder: UntypedFormBuilder,
		constants: UserinterfaceconstantsService,
		cdRef: ChangeDetectorRef
	) {
		super(constants, annotations, cdRef);
		this.objectform = this.formBuilder.group({
			JThermodynamics2DSpeciesLabel: ['', Validators.required],
			JThermodynamicsSpeciesSpecificationType: ['', Validators.required],
			JThermodynamicsStructureSpecification: ['', Validators.required],
			JThermodynamicsMetaAtomLabel: ['', Validators.required],
			JThermodynamicsMetaAtomType: ['', Validators.required],
			JThermodynamicsStructureName: ['', Validators.required]
		});

	}

	ngAfterViewInit(): void {
		if (this.catalog != null) {
			this.setData(this.catalog);
		}
	}


	override getData(catalog: any): void {
		catalog[Ontologyconstants.dctermsidentifier] = Ontologyconstants.JThermodynamicsMetaAtomDefinitionDataSet;

		const id1 = this.annoinfo['dataset:JThermodynamics2DSpeciesLabel'][this.identifier];
		catalog[id1] = this.objectform.get('JThermodynamics2DSpeciesLabel')!.value;
		const id2 = this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier];
		catalog[id2] = this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.value;
		const id3 = this.annoinfo['dataset:JThermodynamicsStructureSpecification'][this.identifier];
		catalog[id3] = this.objectform.get('JThermodynamicsStructureSpecification')!.value;
		const meta: Record<string, any> = {};
		const id4 = this.annoinfo['dataset:JThermodynamicsMetaAtomLabel'][this.identifier];
		meta[id4] = this.objectform.get('JThermodynamicsMetaAtomLabel')!.value;
		const id5 = this.annoinfo['dataset:JThermodynamicsMetaAtomType'][this.identifier];
		meta[id5] = this.objectform.get('JThermodynamicsMetaAtomType')!.value;
		//const id6 = this.annoinfo['dataset:JThermodynamicsStructureName'][this.identifier];
		//meta[id6] = this.objectform.get('JThermodynamicsStructureName')!.value;
		const id7 = this.annoinfo['dataset:JThermodynamicsMetaAtomInfo'][this.identifier];
		catalog[id7] = meta;

		this.base.getData(catalog);
		const struct = {};
		this.structure.getData(struct);
		meta[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;

	}
	override setData(catalog: any): void {
		if(!this.catalogdataset) {
		super.setData(catalog);
		if(this.annoinfo) {
		const id1 = this.annoinfo['dataset:JThermodynamics2DSpeciesLabel'][this.identifier];
		this.objectform.get('JThermodynamics2DSpeciesLabel')!.setValue(catalog[id1]);
		const id2 = this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier];
		this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue(catalog[id2]);
		const id3 = this.annoinfo['dataset:JThermodynamicsStructureSpecification'][this.identifier];
		this.objectform.get('JThermodynamicsStructureSpecification')!.setValue(catalog[id3]);

		const id7 = this.annoinfo['dataset:JThermodynamicsMetaAtomInfo'][this.identifier];
		const meta = catalog[id7];
		const id4 = this.annoinfo['dataset:JThermodynamicsMetaAtomLabel'][this.identifier];
		this.objectform.get('JThermodynamicsMetaAtomLabel')!.setValue(meta[id4]);
		const id5 = this.annoinfo['dataset:JThermodynamicsMetaAtomType'][this.identifier];
		this.objectform.get('JThermodynamicsMetaAtomType')!.setValue(meta[id5]);
		const id6 = this.annoinfo['dataset:JThermodynamicsStructureName'][this.identifier];
		this.objectform.get('JThermodynamicsStructureName')!.setValue(meta[id6]);


		this.base.setData(catalog);
		const struct = meta[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]];
		this.structure.setData(struct);
		this.catalogdataset = true;
		}
	}
	}

	setType($event: string): void {
		this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue($event);
	}
	setMetaAtomType($event: string): void {
		this.objectform.get('JThermodynamicsMetaAtomType')!.setValue($event);
	}

}
