import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { ParameterspecificationComponent } from '../../../parameterspecification/parameterspecification.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { NavItem } from '../../../../primitives/nav-item';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import { CatalogactivitybaseComponent } from '../../../../primitives/catalogactivitybase/catalogactivitybase.component';
import { CommonModule } from '@angular/common';
import { UserinterfaceconstantsService } from '../../../../const/userinterfaceconstants.service';
import { FileformatmanagerService } from '../../../../services/fileformatmanager.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemComponent } from '../../../../primitives/menu-item/menu-item.component';
import { SpecificationfordatasetComponent } from '../../../specificationfordataset/specificationfordataset.component';

@Component({
	selector: 'app-activityinformationinterpretdisassociationenergy',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
	MatGridListModule,
	ReactiveFormsModule,
	MatFormFieldModule,
	MatInputModule,
	MatMenuModule,
	MenuItemComponent,
		SpecificationfordatasetComponent,
		ParameterspecificationComponent
	],
	templateUrl: './activityinformationinterpretdisassociationenergy.component.html',
	styleUrls: ['./activityinformationinterpretdisassociationenergy.component.scss']
})
export class ActivityinformationinterpretdisassociationenergyComponent extends CatalogactivitybaseComponent implements OnInit {

	molarenergy: any;
	display = false;
	objectform: FormGroup;

	fileformat = 'dataset:JThermodynamicsDisassociationEnergyFormat';
	speciesspecification = 'dataset:SpeciesSpecificationNancyLinearForm';

    specsubtitle: string = 'Dataset Specification for Disassociation Energy';

	fileformatdata: any;
	items: NavItem[] = [];


	molarenergyparameter = ['dataset:ParameterSpecificationHDisassociationEnergy'];
	title = 'This is the Activity Information for Interpreting Hydrogen Disassociation Energy';
	
	structurespecification = 'dataset:JThermodynamicsSpeciesSpecificationType';

	@ViewChild('paramspec') paramspec!: SpecificationfordatasetComponent;
	@ViewChild('spec') spec!: ParameterspecificationComponent;

	constructor(
		cd: ChangeDetectorRef,
		constants: UserinterfaceconstantsService,
		annotations: OntologycatalogService,
		private formBuilder: FormBuilder,
		private menuserver: OntologycatalogService,
		private fileservice: FileformatmanagerService,
		private menusetup: MenutreeserviceService
	) {
		super(constants, annotations, cd);
		annotations.getParameterSet(this.molarenergyparameter).subscribe({
			next: (data: any) => {
				this.molarenergy = data[this.molarenergyparameter[0]];
				this.display = true;
			}
		});

		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required],
			BlockInterpretationMethod: ['', Validators.required],
			FileSourceFormat: ['File Format', Validators.required],
			JThermodynamicsSpeciesSpecificationType: ['dataset:SpeciesSpecificationNancyLinearForm', Validators.required]
		});
		this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue(this.speciesspecification);

	}
	override invalid(): boolean {
		var ans = this.objectform.invalid;
		return ans;
	}

	ngOnInit(): void {
		this.fileservice.getFormatClassification().subscribe({
			next: (data: any) => {
				this.fileformatdata = data;
				const Hdisformat = data[this.fileformat];
				this.objectform.get('FileSourceFormat')!.setValue(this.fileformat);
				const block = Hdisformat['dataset:interpretMethod'];
				this.objectform.get('BlockInterpretationMethod')!.setValue(block);
			}
		});
		this.items = this.menusetup.findChoices(this.annoinfo, this.structurespecification);
	}
	
	override annotationsFound(response: any): void {
		super.annotationsFound(response);
	}

	override setPrerequisiteData(prerequisite: any) {
		const activity = prerequisite['dataset:activityinfo'];
		const formatdata = this.fileformatdata[this.fileformat];
		const block = formatdata['dataset:interpretMethod'];
		this.objectform.get('BlockInterpretationMethod')!.setValue(block);
		this.objectform.get('DescriptionTitle')!.setValue(activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]]);
		const specid = this.annoinfo['dataset:SpecificationForDataset'][this.identifier];
		this.spec.setData(activity[specid]);
	}

	override getData(activity: any): void {
		activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod')?.value ?? '';
		activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat')?.value ?? '';
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle')?.value ?? '';
		activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]] 
		     = this.objectform.get('JThermodynamicsSpeciesSpecificationType')?.value ?? '';
		
		this.spec.getData(activity);
		const paramspecvalue = {};
		this.paramspec.getData(paramspecvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationHDisassociationEnergy'][this.identifier]] = paramspecvalue;
	}
	override setData(a: any): void {
		super.setData(a);
		this.objectform.get('BlockInterpretationMethod')!.setValue(this.catalog[this.annoinfo['dataset:BlockInterpretationMethod']][this.identifier]);
		this.objectform.get('FileSourceFormat')!.setValue(this.catalog[this.annoinfo['dataset:FileSourceFormat'][this.identifier]]);
		this.objectform.get('DescriptionTitle')!.setValue(this.catalog[this.annoinfo['dataset:DescriptionTitle']][this.identifier]);
		this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue(this.catalog[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]]);

		const specid = this.annoinfo['dataset:SpecificationForDataset'][this.identifier];
		this.spec.setData(this.catalog[specid]);
		const energy = this.catalog[this.annoinfo['dataset:ParameterSpecificationHDisassociationEnergy'][this.identifier]];
		this.paramspec.setData(energy);
	}
setJThermodynamicsSpeciesSpecificationType($event: String) {
	this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue($event);
}

}
