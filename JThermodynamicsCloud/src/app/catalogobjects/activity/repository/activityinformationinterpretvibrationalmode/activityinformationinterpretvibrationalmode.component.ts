import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { ParameterspecificationComponent } from '../../../parameterspecification/parameterspecification.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import { NavItem } from '../../../../primitives/nav-item';
import { SpecificationfordatasetComponent } from '../../../specificationfordataset/specificationfordataset.component';
import { MenuItemComponent } from '../../../../primitives/menu-item/menu-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CatalogactivitybaseComponent } from '../../../../primitives/catalogactivitybase/catalogactivitybase.component';
import { UserinterfaceconstantsService } from '../../../../const/userinterfaceconstants.service';
import { FileformatmanagerService } from '../../../../services/fileformatmanager.service';

@Component({
	selector: 'app-activityinformationinterpretvibrationalmode',
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
	templateUrl: './activityinformationinterpretvibrationalmode.component.html',
	styleUrls: ['./activityinformationinterpretvibrationalmode.component.scss']
})
export class ActivityinformationinterpretvibrationalmodeComponent extends CatalogactivitybaseComponent implements OnInit {

	frequency: any;
	display = false;
	objectform: FormGroup;

	fileformat = 'dataset:JThermodynamicsVibrationalModes';
	structurespecification = 'dataset:JThermodynamicsSpeciesSpecificationType';
	items: NavItem[] = [];

	fileformatdata: any;

	frequencyparameter = 'dataset:ParameterSpecificationStructureVibrationFrequency';
	title = 'This is the Activity Information for Interpreting Vibrational Contributions';
	specsubtitle: string = 'Dataset Specification';
	

	@ViewChild('paramspec') paramspec!: SpecificationfordatasetComponent;
	@ViewChild('frequencyspec') frequencyspec!: ParameterspecificationComponent;

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
		const set = [];
		set.push(this.frequencyparameter);
		menuserver.getParameterSet(set).subscribe({
			next: (data: any) => {
				this.frequency = data[this.frequencyparameter];
				this.display = true;
			}
		});

		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required],
			BlockInterpretationMethod: ['', Validators.required],
			FileSourceFormat: ['File Format', Validators.required],
            JThermodynamicsSpeciesSpecificationType: ['dataset:SpeciesSpecificationNancyLinearForm', Validators.required]
		});

	}
    override invalid(): boolean {
		return this.objectform.invalid;
	}
	ngOnInit(): void {
		this.fileservice.getFormatClassification().subscribe({
			next: (data: any) => {
				this.fileformatdata = data;
				const freqformat = data[this.fileformat];
				this.objectform.get('FileSourceFormat')!.setValue(this.fileformat);
				const block = freqformat['dataset:interpretMethod'];
				this.objectform.get('BlockInterpretationMethod')!.setValue(block);
			}
		});
		this.items = this.menusetup.findChoices(this.annoinfo, this.structurespecification);
	}
	
	override annotationsFound(response: any): void {
		super.annotationsFound(response);
	}
	
	override setPrerequisiteData(prerequisite: any) {
		const actinfo = prerequisite['dataset:activityinfo'];
		const titleid = this.annoinfo['dataset:DescriptionTitle'][this.identifier];
		this.objectform.get('DescriptionTitle')!.setValue(actinfo[titleid]);

		const specid = this.annoinfo['dataset:SpecificationForDataset'][this.identifier];
		const specdata = actinfo[specid];
		this.paramspec.setData(specdata);
	}

	override getData(activity: any): void {
		activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]] = this.objectform.get('JThermodynamicsSpeciesSpecificationType')?.value ?? '';
		activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod')?.value ?? '';
		activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat')?.value ?? '';
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle')?.value ?? '';
		this.paramspec.getData(activity);
		const freqspecvalue = {};
		this.frequencyspec.getData(freqspecvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationStructureVibrationFrequency'][this.identifier]] = freqspecvalue;
	}
	override setData(a: any): void {
		super.setData(a);
		this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue(this.catalog[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]]);
		this.objectform.get('BlockInterpretationMethod')!.setValue(this.catalog[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]]);
		this.objectform.get('FileSourceFormat')!.setValue(this.catalog[this.annoinfo['dataset:FileSourceFormat'][this.identifier]]);
		this.objectform.get('DescriptionTitle')!.setValue(this.catalog[this.annoinfo['dataset:DescriptionTitle'][this.identifier]]);
		this.paramspec.setData(this.catalog);
		const freq = this.catalog[this.annoinfo['dataset:ParameterSpecificationStructureVibrationFrequency'][this.identifier]];
		this.frequencyspec.setData(freq);
	}
	setJThermodynamicsSpeciesSpecificationType($event: String) {
	    this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue($event);
   }

}
