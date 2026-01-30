import { CommonModule} from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivityinformationinterpretthermodynamicblockComponent } from '../activityinformationinterpretthermodynamicblock.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemComponent } from 'systemprimitives';
import { CatalogactivitybaseComponent } from '../../../../../primitives/catalogactivitybase/catalogactivitybase.component';
import { NavItem } from 'systemprimitives';
import { UserinterfaceconstantsService } from '../../../../../const/userinterfaceconstants.service';
import { OntologycatalogService } from '../../../../../services/ontologycatalog.service';
import { MenutreeserviceService } from 'systemprimitives';
import { Ontologyconstants } from 'systemconstants';

@Component({
  selector: 'app-activityinformationmolecularthermodynamics',
  standalone: true,
  imports: [
	CommonModule,
	MatGridListModule,
	ReactiveFormsModule,
	MatFormFieldModule,
	MatInputModule,
	MatMenuModule,
	MenuItemComponent,
		ActivityinformationinterpretthermodynamicblockComponent
		
  ],
  templateUrl: './activityinformationmolecularthermodynamics.component.html',
  styleUrl: './activityinformationmolecularthermodynamics.component.scss'
})
export class ActivityinformationmolecularthermodynamicsComponent extends CatalogactivitybaseComponent {
	
	structurespecification = 'dataset:JThermodynamicsSpeciesSpecificationType';
	
	objectform: FormGroup;
	
	items: NavItem[] = [];
	
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
	
	setJThermodynamicsSpeciesSpecificationType($event: String) {
		this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue($event);
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
	}

	override setData(a: any): void {
		super.setData(a);
		const spectype = this.catalog[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]];
		this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue(spectype);
		if (this.thermo) {
			this.thermo.setData(this.catalog);
		}
	}

	override getData(activity: any): void {
		super.getData(activity);
		activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]]
			= this.objectform.get('JThermodynamicsSpeciesSpecificationType')?.value ?? '';
		this.thermo.getData(activity);
	}


}
