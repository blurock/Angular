import { Component, OnInit, ViewChild, Output, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { ParametervalueComponent } from '../../parametervalue/parametervalue.component';
import { Jthermodynamics2dspeciesstructureComponent } from '../jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { CatalogbaseComponent } from '../../../primitives/catalogbase/catalogbase.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-jthermodynamicsvibrationalstructure',
  standalone: true,
  imports: [
	MatCardModule,
	ChemconnectthermodynamicsdatabaseComponent,
	ReactiveFormsModule,
	MatInputModule,
	MatGridListModule,
	NgIf,
	ParametervalueComponent,
	Jthermodynamics2dspeciesstructureComponent
  ],
  
  templateUrl: './jthermodynamicsvibrationalstructure.component.html',
  styleUrls: ['./jthermodynamicsvibrationalstructure.component.scss']
})
export class JthermodynamicsvibrationalstructureComponent extends CatalogbaseComponent  implements AfterViewInit {

	display = false;
	specdisplay = false;
	idForm: UntypedFormGroup;

    annowaiting = 'Waiting for annotations setup';
	frequencyparameter = 'dataset:ParameterSpecificationStructureVibrationFrequency';
	frequency: any;
	frequencytitle = 'Frequency Associated with Structure';

	title = 'Frequency Contribution to Thermodynamics';

	@ViewChild('base') base!: ChemconnectthermodynamicsdatabaseComponent;
	@ViewChild('freqobject') freqobject!: ParametervalueComponent;
	@ViewChild('structure') structure!: Jthermodynamics2dspeciesstructureComponent;

	constructor(
		public fb: UntypedFormBuilder,
			annotations: OntologycatalogService,
			constants: UserinterfaceconstantsService,
			cdRef: ChangeDetectorRef
		) {
			super(constants, annotations, cdRef);
    		this.idForm = this.fb.group({
			JThermodynamicsVibrationalModeLabel: ['', Validators.required],
			StructureVibrationalFrequencySymmetry: ['', Validators.required],
		});

    
		this.getCatalogAnnoations();
		const set = [];
		set.push(this.frequencyparameter);
		annotations.getParameterSet(set).subscribe({
			next: (data: any) => {
				this.frequency = data[this.frequencyparameter];
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


	override	getData(catalog: any): void {
		super.getData(catalog);
		this.base.getData(catalog);
		catalog[this.annoinfo['dataset:JThermodynamicsVibrationalModeLabel'][this.identifier]] = this.idForm.get('JThermodynamicsVibrationalModeLabel')!.value;
		catalog[this.annoinfo['dataset:StructureVibrationalFrequencySymmetry'][this.identifier]] = this.idForm.get('StructureVibrationalFrequencySymmetry')!.value;

		const value = {};
		this.freqobject.getData(value);
		catalog[this.annoinfo['dataset:StructureVibrationalFrequency'][this.identifier]] = value;
		const struct = {};
		this.structure.getData(struct);
		catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;

	}
	override setData(catalog: any): void {
		super.setData(catalog);
		if (this.annoinfo != null) {
    	const name = catalog[this.annoinfo['dataset:JThermodynamicsVibrationalModeLabel'][this.identifier]];
		this.idForm.get('JThermodynamicsVibrationalModeLabel')!.setValue(name);
		const symmetry = catalog[this.annoinfo['dataset:StructureVibrationalFrequencySymmetry'][this.identifier]];
		this.idForm.get('StructureVibrationalFrequencySymmetry')!.setValue(symmetry);

    
		const value = catalog[this.annoinfo['dataset:StructureVibrationalFrequency'][this.identifier]];
		this.freqobject.setData(value);
		const struct = catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]];
		this.structure.setData(struct);
        this.base.setData(catalog);
		}
	}

}
