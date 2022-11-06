import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatasettransactionspecificationforcollectionComponent } from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { ParameterspecificationComponent } from '../../../parameterspecification/parameterspecification.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';

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

	fileformatdata: any;

	@Input() annoinfo: any;

	frequencyparameter = 'dataset:ParameterSpecificationStructureVibrationFrequency';
	title = 'This is the Activity Information for Interpreting Vibrational Contributions';

	@ViewChild('paramspec') paramspec: DatasettransactionspecificationforcollectionComponent;
	@ViewChild('frequencyspec') frequencyspec: ParameterspecificationComponent;

	constructor(
		private formBuilder: FormBuilder,
		private menuserver: OntologycatalogService,
		private fileservice: UploadmenuserviceService
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
			FileSourceFormat: ['File Format', Validators.required]

		});

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
	}
	
	setPrerequisiteData(prerequisite: any) {
		const actinfo = prerequisite['dataset:activityinfo'];
		const titleid = this.annoinfo['dataset:DescriptionTitle'][this.identifier];
		this.objectform.get('DescriptionTitle').setValue(actinfo[titleid]);

		alert("ActivityinformationinterpretvibrationalmodeComponent setPrerequisiteData: ");
		const specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];
		alert("ActivityinformationinterpretvibrationalmodeComponent setPrerequisiteData: " + specid);
		const specdata = actinfo[specid];
		alert("ActivityinformationinterpretvibrationalmodeComponent setPrerequisiteData: " + JSON.stringify(specdata));
		alert("ActivityinformationinterpretvibrationalmodeComponent setPrerequisiteData: paramspec" + this.paramspec);
		this.paramspec.setData(specdata);
 		alert("ActivityinformationinterpretvibrationalmodeComponent setPrerequisiteData: done");
       		
	}

	getData(activity: any): void {
		activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod').value;
		activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat').value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		this.paramspec.getData(activity);
		const freqspecvalue = {};
		this.frequencyspec.getData(freqspecvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationStructureVibrationFrequency'][this.identifier]] = freqspecvalue;
	}
	setData(activity: any): void {
		this.objectform.get('BlockInterpretationMethod').setValue(activity[this.annoinfo['dataset:BlockInterpretationMethod']]);
		this.objectform.get('FileSourceFormat').setValue(activity[this.annoinfo['dataset:FileSourceFormat']]);
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle']]);
		this.paramspec.setData(activity);
		const freq = activity[this.annoinfo['dataset:ParameterSpecificationStructureVibrationFrequency'][this.identifier]];
		this.frequencyspec.setData(freq);
	}
}
