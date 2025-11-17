import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { Jthermodynamics2dspeciesstructureComponent } from '../jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';
import { NavItem } from '../../../primitives/nav-item';
import { CatalogbaseComponent } from '../../../primitives/catalogbase/catalogbase.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuItemComponent } from '../../../primitives/menu-item/menu-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from '../../../const/ontologyconstants';

@Component({
	selector: 'app-jthermodynamicssymmetrystructuredefinition',
	templateUrl: './jthermodynamicssymmetrystructuredefinition.component.html',
	styleUrls: ['./jthermodynamicssymmetrystructuredefinition.component.scss'],
	standalone: true,
	imports: [
		Jthermodynamics2dspeciesstructureComponent,
		ChemconnectthermodynamicsdatabaseComponent,
		FormsModule,
		MatMenuModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatGridListModule,
		MenuItemComponent,
		MatIconModule,
		NgIf, NgFor,
		MatSelectModule, MatInput
	]
})
export class JthermodynamicssymmetrystructuredefinitionComponent extends CatalogbaseComponent implements AfterViewInit{

	dataset = false;
	title = 'Symmetry Structure Information';
	addsymmelement = 'Add Symmetry Element';

	catalogobj: any;
	display = false;
	specdisplay = false;
	symmtypeitems: NavItem[] = [];
	nodetypeitems: NavItem[] = [];
	symmtypeloc = 'dataset:StructureSymmetryType';
	nodetypeloc = 'dataset:JThermodynamicsSymmetryDefinitionNodeType';


	objectform: UntypedFormGroup;

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
			JThermodynamicSymmetryDefinitionLabel: ['', Validators.required],
			StructureSymmetryType: ['', Validators.required],
			SymmetryFactorOfStructure: ['', Validators.required],
			symmelements: this.formBuilder.array([])
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

	get symmelements() {
		return this.objectform.controls["symmelements"] as UntypedFormArray;
	}

	newSymmElement(): UntypedFormGroup {
		return this.formBuilder.group({
			JThermodynamicsSymmetryDefinitionNodeLabel: ['', Validators.required],
			JThermodynamicsSymmetryDefinitionNodeType: ['', Validators.required],
			JThermodynamicsSymmetryDefinitionSubGroupLabel: ['', Validators.required]
		});
	}

	addSymmElement(): UntypedFormGroup {
		const countform = this.newSymmElement();
		this.symmelements.push(countform);
		return countform;
	}

	deleteAtomCount(countIndex: number): void {
		this.symmelements.removeAt(countIndex);
	}

	override getData(catalog: any): void {
		const symm: Record<string, any> = {};
		catalog[Ontologyconstants.dctermsidentifier] = Ontologyconstants.JThermodynamicsSymmetryStructureDefinitionDataSet;
		const id11 = this.annoinfo['dataset:JThermodynamicSymmetryDefinitionLabel'][this.identifier];
		symm[id11] = this.objectform.get('JThermodynamicSymmetryDefinitionLabel')!.value;
		const id12 = this.annoinfo['dataset:StructureSymmetryType'][this.identifier];
		symm[id12] = this.objectform.get('StructureSymmetryType')!.value;
		const id13 = this.annoinfo['dataset:SymmetryFactorOfStructure'][this.identifier];
		symm[id13] = this.objectform.get('SymmetryFactorOfStructure')!.value;

		const id7 = this.annoinfo['dataset:JThermodynamicsSymmetryDefinition'][this.identifier];
		catalog[id7] = symm;

		const symmarray: Record<string, any>[] = [];
		symm[this.annoinfo['dataset:JThermodynamicsSymmetryNodeGroupDefinition'][this.identifier]] = symmarray;
		for (const eleform of this.symmelements.controls) {
			const element: Record<string, any> = {};
			const id2 = this.annoinfo['dataset:JThermodynamicsSymmetryDefinitionNodeLabel'][this.identifier];
			element[id2] = eleform.get('JThermodynamicsSymmetryDefinitionNodeLabel')!.value;
			const id3 = this.annoinfo['dataset:JThermodynamicsSymmetryDefinitionNodeType'][this.identifier];
			element[id3] = eleform.get('JThermodynamicsSymmetryDefinitionNodeType')!.value;
			const id4 = this.annoinfo['dataset:JThermodynamicsSymmetryDefinitionSubGroupLabel'][this.identifier];
			element[id4] = eleform.get('JThermodynamicsSymmetryDefinitionSubGroupLabel')!.value;
			symmarray.push(element);
		}

		this.base.getData(catalog);
		const struct = {};
		this.structure.getData(struct);
		catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;

	}

	override setData(catalog: any): void {
		super.setData(catalog);
		if (this.annoinfo && this.base && this.structure) {
			if (!this.catalogdataset) {
				this.catalogdataset = true;
				this.objectform = this.formBuilder.group({
					JThermodynamicSymmetryDefinitionLabel: ['', Validators.required],
					StructureSymmetryType: ['', Validators.required],
					SymmetryFactorOfStructure: ['', Validators.required],
					symmelements: this.formBuilder.array([])
				});
				const id7 = this.annoinfo['dataset:JThermodynamicsSymmetryDefinition'][this.identifier];
				const symm = catalog[id7];
				const id1 = this.annoinfo['dataset:JThermodynamicSymmetryDefinitionLabel'][this.identifier];
				this.objectform.get('JThermodynamicSymmetryDefinitionLabel')!.setValue(symm[id1]);
				const id2 = this.annoinfo['dataset:StructureSymmetryType'][this.identifier];
				this.objectform.get('StructureSymmetryType')!.setValue(symm[id2]);
				const id3 = this.annoinfo['dataset:SymmetryFactorOfStructure'][this.identifier];
				this.objectform.get('SymmetryFactorOfStructure')!.setValue(symm[id3]);

				const symmarr = symm[this.annoinfo['dataset:JThermodynamicsSymmetryNodeGroupDefinition'][this.identifier]];

				for (const symmelement of symmarr) {
					const eleform = this.addSymmElement();
					const id2 = this.annoinfo['dataset:JThermodynamicsSymmetryDefinitionNodeLabel'][this.identifier];
					eleform.get('JThermodynamicsSymmetryDefinitionNodeLabel')!.setValue(symmelement[id2]);
					const id3 = this.annoinfo['dataset:JThermodynamicsSymmetryDefinitionNodeType'][this.identifier];
					eleform.get('JThermodynamicsSymmetryDefinitionNodeType')!.setValue(symmelement[id3]);
					const id4 = this.annoinfo['dataset:JThermodynamicsSymmetryDefinitionSubGroupLabel'][this.identifier];
					eleform.get('JThermodynamicsSymmetryDefinitionSubGroupLabel')!.setValue(symmelement[id4]);
				}
				this.base.setData(catalog);
				const struct = catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]];
				this.structure.setData(struct);
			}
		}
	}

	setSymmType($event: string): void {
		this.objectform.get('StructureSymmetryType')!.setValue($event);
	}
	setNodeType(countIndex: number, $event: string): void {
		const eleform = this.symmelements.controls[countIndex];
		//alert(eleform.get('JThermodynamicsSymmetryDefinitionNodeType'));
		eleform.get('JThermodynamicsSymmetryDefinitionNodeType')!.setValue($event);
	}

}
