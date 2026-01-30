import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivityinformationinterpretthermodynamicblockComponent } from '../activityinformationinterpretthermodynamicblock.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemComponent } from 'systemprimitives';
import { CatalogactivitybaseComponent } from '../../../../../primitives/catalogactivitybase/catalogactivitybase.component';
import { UserinterfaceconstantsService } from '../../../../../const/userinterfaceconstants.service';
import { OntologycatalogService } from '../../../../../services/ontologycatalog.service';
import { NavItem } from 'systemprimitives';
import { MenutreeserviceService } from 'systemprimitives';
import { Ontologyconstants } from 'systemconstants';

@Component({
	selector: 'app-activityinformationinterpretsubstructurethermodynamics',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatGridListModule,
		MatFormFieldModule,
		MatInputModule,
		MatInputModule,
		MatMenuModule,
		MenuItemComponent,
		ActivityinformationinterpretthermodynamicblockComponent
	],
	templateUrl: './activityinformationinterpretsubstructurethermodynamics.component.html',
	styleUrl: './activityinformationinterpretsubstructurethermodynamics.component.scss'
})
export class ActivityinformationinterpretsubstructurethermodynamicsComponent extends CatalogactivitybaseComponent {

	objectform: FormGroup;
	structurespecification = 'dataset:JThermodynamicsSpeciesSpecificationType';
	structuretype = 'dataset:JThermodynamicsSubstructureType';

	items: NavItem[] = [];
	structitems: NavItem[] = [];

	@ViewChild('thermo') thermo!: ActivityinformationinterpretthermodynamicblockComponent;

	constructor(
		private cd: ChangeDetectorRef,
		constants: UserinterfaceconstantsService,
		annotations: OntologycatalogService,
		private formBuilder: FormBuilder,
		private menusetup: MenutreeserviceService
	) {
		super(constants, annotations, cd);

		this.objectform = this.formBuilder.group({
			JThermodynamicsSpeciesSpecificationType: ['dataset:SpeciesSpecificationNancyLinearForm', Validators.required],
			JThermodynamicsSubstructureType: ['', Validators.required]

		});

		this.catalogtype = 'dataset:ActivityInformationInterpretSubstructureThermodynamics';
		this.getCatalogAnnoations();
	}
	
	override invalid(): boolean {
    	const valid = !this.objectform.invalid;
		var thermovalid = false;
		if(this.thermo) {
			thermovalid = !this.thermo.invalid();
		}
		return !(valid || thermovalid);
	}

	setJThermodynamicsSpeciesSpecificationType($event: String) {
		this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue($event);
	}

	setJThermodynamicsSubstructureType($event: String) {
		this.objectform.get('JThermodynamicsSubstructureType')!.setValue($event);
	}

	override setPrerequisiteData(prerequisite: any): void {
		super.setPrerequisiteData(prerequisite);
		if (this.thermo) {
			this.thermo.setPrerequisiteData(prerequisite);
		}
	}

	override annotationsFound(response: any): void {
		super.annotationsFound(response);
		const catalog = response[Ontologyconstants.catalogobject];
		const anno = catalog[Ontologyconstants.annotations];
		this.thermo.annoinfo = anno;

		if (this.catalog) {
			this.setData(this.catalog);
		}
		if (this.prerequisite) {
			this.setPrerequisiteData(this.prerequisite);
		}

		this.items = this.menusetup.findChoices(this.annoinfo, this.structurespecification);
		this.structitems = this.menusetup.findChoices(this.annoinfo, this.structuretype);
	}

	override setData(a: any): void {
		super.setData(a);
		if (this.thermo) {
			this.thermo.setData(this.catalog);
		}
		const spectype = this.catalog[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]];
		this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue(spectype);
		const structtype = this.catalog[this.annoinfo['dataset:JThermodynamicsSubstructureType'][this.identifier]];
		this.objectform.get('JThermodynamicsSubstructureType')!.setValue(structtype);
	}

	override getData(activity: any): void {
		super.getData(activity);
		activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]]
			= this.objectform.get('JThermodynamicsSpeciesSpecificationType')?.value ?? '';
		activity[this.annoinfo['dataset:JThermodynamicsSubstructureType'][this.identifier]]
			= this.objectform.get('JThermodynamicsSubstructureType')?.value ?? '';
		this.thermo.getData(activity);
	}

}
