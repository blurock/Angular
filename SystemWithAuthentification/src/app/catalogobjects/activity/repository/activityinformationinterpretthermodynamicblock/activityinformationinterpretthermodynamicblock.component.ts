import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatasettransactionspecificationforcollectionComponent } from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { ParameterspecificationComponent } from '../../../parameterspecification/parameterspecification.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
	selector: 'app-activityinformationinterpretthermodynamicblock',
	templateUrl: './activityinformationinterpretthermodynamicblock.component.html',
	styleUrls: ['./activityinformationinterpretthermodynamicblock.component.scss']
})
export class ActivityinformationinterpretthermodynamicblockComponent implements OnInit {

	molarenthalpyparameter = 'dataset:ParameterSpecificationEnthaply';
	molarentropyarameter = 'dataset:ParameterSpecificationEntropy';
	molarheatcapacityparameter = 'dataset:ParameterSpecificationHeatCapacity';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	
	title: string;

	temperaturelist = [
		300, 400, 500, 600, 800, 1000, 1500
	];

	molarenthalpy: any;
	molarentropy: any;
	molarheatcapacity: any;
	fileformatdata: any;

	objectform: FormGroup;


	@Input() annoinfo: any;
	@Input() fileformat: string;

	display = false;

	@ViewChild('enthalpy') enthalpy: ParameterspecificationComponent;
	@ViewChild('entropy') entropy: ParameterspecificationComponent;
	@ViewChild('heatcapacity') heatcapacity: ParameterspecificationComponent;
	@ViewChild('spec') spec: DatasettransactionspecificationforcollectionComponent;


	constructor(
		private formBuilder: FormBuilder,
		private menuserver: OntologycatalogService,
		private fileservice: UploadmenuserviceService

	) {
		const set = [];
		set.push(this.molarenthalpyparameter);
		set.push(this.molarentropyarameter);
		set.push(this.molarheatcapacityparameter);
		menuserver.getParameterSet(set).subscribe({
			next: (data: any) => {
				this.molarenthalpy = data[this.molarenthalpyparameter];
				this.molarentropy = data[this.molarentropyarameter];
				this.molarheatcapacity = data[this.molarheatcapacityparameter];
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
    
    this.title = this.fileformat;
		this.fileservice.getFormatClassification().subscribe({
			next: (data: any) => {
				this.fileformatdata = data;
				const Hdisformat = data[this.fileformat];
				this.objectform.get('FileSourceFormat').setValue(this.fileformat);
				const block = Hdisformat['dataset:interpretMethod'];
				this.objectform.get('BlockInterpretationMethod').setValue(block);
			}
		});

	}

	getData(activity: any): void {
 		activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod').value;
		activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat').value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		const specvalue = {};
		this.spec.getData(specvalue);
		activity[this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier]] = specvalue;
		const enthalpyvalue = {};
		this.enthalpy.getData(enthalpyvalue);                                     
		alert("ActivityinformationinterpretthermodynamicblockComponent 3.1" + JSON.stringify(this.annoinfo['dataset:ParameterSpecificationEnthaply']));
		activity[this.annoinfo['dataset:ParameterSpecificationEnthaply'][this.identifier]] = enthalpyvalue;
		const entropyvalue = {};
		this.entropy.getData(entropyvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationEntropy'][this.identifier]] = entropyvalue;
		const heatcapacityvalue = {};
		this.heatcapacity.getData(heatcapacityvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationHeatCapacity'][this.identifier]] = heatcapacityvalue;
	}
	setData(activity: any): void {
		this.objectform.get('BlockInterpretationMethod').setValue(activity[this.annoinfo['dataset:BlockInterpretationMethod']]);
		this.objectform.get('FileSourceFormat').setValue(activity[this.annoinfo['dataset:FileSourceFormat']]);
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle']]);
		this.spec.setData(activity);
		const enthalpyvalue = activity[this.annoinfo['dataset:ParameterSpecificationEnthalpy'][this.identifier]];
		this.enthalpy.setData(enthalpyvalue);
		const entropyvalue = activity[this.annoinfo['dataset:ParameterSpecificationEntropy'][this.identifier]];
		this.entropy.setData(entropyvalue);
		const heatcapacityvalue = activity[this.annoinfo['dataset:ParameterSpecificationHeatCapacity'][this.identifier]];
		this.heatcapacity.setData(heatcapacityvalue);
	}

	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = Number(event.value);
		this.temperaturelist.push(value);
	}
	remove(temperature: number): void {
		const index = this.temperaturelist.indexOf(temperature);
		if (index >= 0) {
			this.temperaturelist.splice(index, 1);
		}
	}

}
