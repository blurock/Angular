import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatasettransactionspecificationforcollectionComponent } from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { ParameterspecificationComponent } from '../../../parameterspecification/parameterspecification.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import { NavItem } from '../../../../primitives/nav-item';

@Component({
	selector: 'app-activityinformationinterpretvibrationalmode',
	templateUrl: './activityinformationinterpretvibrationalmode.component.html',
	styleUrls: ['./activityinformationinterpretvibrationalmode.component.scss']
})
export class ActivityinformationinterpretvibrationalmodeComponent implements OnInit {

	frequency: any;
	display = false;
	objectform: FormGroup;

	fileformat = 'dataset:JThermodynamicsVibrationalModes';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	structurespecification = 'dataset:JThermodynamicsSpeciesSpecificationType';
	items: NavItem[];

	fileformatdata: any;

	@Input() annoinfo: any;

	frequencyparameter = 'dataset:ParameterSpecificationStructureVibrationFrequency';
	title = 'This is the Activity Information for Interpreting Vibrational Contributions';

	@ViewChild('paramspec') paramspec: DatasettransactionspecificationforcollectionComponent;
	@ViewChild('frequencyspec') frequencyspec: ParameterspecificationComponent;

	constructor(
		private formBuilder: FormBuilder,
		private menuserver: OntologycatalogService,
		private fileservice: UploadmenuserviceService,
		private menusetup: MenutreeserviceService
	) {
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
    invalid(): boolean {
		return this.objectform.invalid;
	}
	ngOnInit(): void {
		this.fileservice.getFormatClassification().subscribe({
			next: (data: any) => {
				this.fileformatdata = data;
				const freqformat = data[this.fileformat];
				this.objectform.get('FileSourceFormat').setValue(this.fileformat);
				const block = freqformat['dataset:interpretMethod'];
				this.objectform.get('BlockInterpretationMethod').setValue(block);
			}
		});
		this.items = this.menusetup.findChoices(this.annoinfo, this.structurespecification);
	}
	
	setPrerequisiteData(prerequisite: any) {
		const actinfo = prerequisite['dataset:activityinfo'];
		const titleid = this.annoinfo['dataset:DescriptionTitle'][this.identifier];
		this.objectform.get('DescriptionTitle').setValue(actinfo[titleid]);

		const specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];
		const specdata = actinfo[specid];
		this.paramspec.setData(specdata);
	}

	getData(activity: any): void {
		activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]] = this.objectform.get('JThermodynamicsSpeciesSpecificationType').value;
		activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod').value;
		activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat').value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		this.paramspec.getData(activity);
		const freqspecvalue = {};
		this.frequencyspec.getData(freqspecvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationStructureVibrationFrequency'][this.identifier]] = freqspecvalue;
	}
	setData(activity: any): void {
		this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue(activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]]);
		this.objectform.get('BlockInterpretationMethod').setValue(activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]]);
		this.objectform.get('FileSourceFormat').setValue(activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]]);
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]]);
		this.paramspec.setData(activity);
		const freq = activity[this.annoinfo['dataset:ParameterSpecificationStructureVibrationFrequency'][this.identifier]];
		this.frequencyspec.setData(freq);
	}
	setJThermodynamicsSpeciesSpecificationType($event) {
	    this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue($event);
   }

}
