import { Component, OnInit, AfterViewInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatasettransactionspecificationforcollectionComponent } from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { ParameterspecificationComponent } from '../../../parameterspecification/parameterspecification.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { MatChipInputEvent } from '@angular/material/chips';
import { NavItem } from '../../../../primitives/nav-item';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';

@Component({
	selector: 'app-activityinformationinterpretthermodynamicblock',
	templateUrl: './activityinformationinterpretthermodynamicblock.component.html',
	styleUrls: ['./activityinformationinterpretthermodynamicblock.component.scss']
})
export class ActivityinformationinterpretthermodynamicblockComponent implements OnInit, AfterViewInit {

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

	structurespecification = 'dataset:JThermodynamicsSpeciesSpecificationType';
	structuretype = 'dataset:JThermodynamicsSubstructureType';
	items: NavItem[];
	structitems: NavItem[];
	notbenson = false;

	@Input() annoinfo: any;
	@Input() fileformat: string;
	@Output() activitysetup = new EventEmitter();

	display = false;

	@ViewChild('enthalpy') enthalpy: ParameterspecificationComponent;
	@ViewChild('entropy') entropy: ParameterspecificationComponent;
	@ViewChild('heatcapacity') heatcapacity: ParameterspecificationComponent;
	@ViewChild('spec') spec: DatasettransactionspecificationforcollectionComponent;


	constructor(
		private formBuilder: FormBuilder,
		private menuserver: OntologycatalogService,
		private fileservice: UploadmenuserviceService,
		private menusetup: MenutreeserviceService

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
			FileSourceFormat: ['File Format', Validators.required],
			JThermodynamicsSpeciesSpecificationType: ['dataset:SpeciesSpecificationNancyLinearForm', Validators.required],
			JThermodynamicsSubstructureType: ['', Validators.required]

		});
	}

	ngOnInit(): void {
		this.title = this.fileformat;
		if (this.fileformat != null) {
			this.fileservice.getFormatClassification().subscribe({
				next: (data: any) => {
					this.fileformatdata = data;
				}
			});
		} else {
			alert("File format not defined in ActivityinformationinterpretthermodynamicblockComponent");
		}
		this.items = this.menusetup.findChoices(this.annoinfo, this.structurespecification);
		this.structitems = this.menusetup.findChoices(this.annoinfo, this.structuretype);

	}
	ngAfterViewInit(): void {
		this.activitysetup.emit();
	}

	invalid(): boolean {
		return this.objectform.invalid;
	}

	setPrerequisiteData(prerequisite: any): void {
		const activityinfo = prerequisite['dataset:activityinfo'];
		const Hdisformat = this.fileformatdata[this.fileformat];
		this.objectform.get('FileSourceFormat').setValue(this.fileformat);
		if(this.fileformat === "dataset:TherGasBensonRules") {
			this.notbenson = false;
		} else {
			this.notbenson = true;
		}
		const block = Hdisformat['dataset:interpretMethod'];
		this.objectform.get('BlockInterpretationMethod').setValue(block);
		this.objectform.get('DescriptionTitle').setValue(activityinfo[this.annoinfo['dataset:DescriptionTitle'][this.identifier]]);

		const specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];
		const specdata = activityinfo[specid];
		this.spec.setData(specdata);
	}

	getData(activity: any): void {
		activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod').value;
		activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat').value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		if (this.notbenson) {
			activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]] = this.objectform.get('JThermodynamicsSpeciesSpecificationType').value;
			activity[this.annoinfo['dataset:JThermodynamicsSubstructureType'][this.identifier]] = this.objectform.get('JThermodynamicsSubstructureType').value;
		}
		this.spec.getData(activity);
		const enthalpyvalue = {};
		this.enthalpy.getData(enthalpyvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationEnthaply'][this.identifier]] = enthalpyvalue;
		const entropyvalue = {};
		this.entropy.getData(entropyvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationEntropy'][this.identifier]] = entropyvalue;
		const heatcapacityvalue = {};
		this.heatcapacity.getData(heatcapacityvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationHeatCapacity'][this.identifier]] = heatcapacityvalue;
		const tempparam = {};

		activity['dataset:thermotemperature'] = tempparam;
		const parameterlabeltid = this.annoinfo['dataset:ParameterLabel'][this.identifier];
		tempparam[parameterlabeltid] = 'Temperature';
		const unitvalue = {};
		const unitsid = this.annoinfo['dataset:ValueUnits'][this.identifier];
		tempparam[unitsid] = unitvalue;
		const unitclassid = this.annoinfo['dataset:UnitClass'][this.identifier];
		unitvalue[unitclassid] = 'quantitykind:Temperature';
		const unitsofvalueid = this.annoinfo['dataset:UnitsOfValue'][this.identifier];
		unitvalue[unitsofvalueid] = 'unit:K';
		const parametertypeid = this.annoinfo['dataset:ParameterTypeSpecification'][this.identifier];
		tempparam[parametertypeid] = 'dataset:FixedParameter';
		const uncertaintyid = this.annoinfo['dataset:DataPointUncertainty'][this.identifier];
		tempparam[uncertaintyid] = 'dataset:ImpliedDigitsUncertainty';
		activity[this.annoinfo['dataset:JThermodynamicBensonTemperatures'][this.identifier]] = this.temperaturelist;
	}
	setData(activity: any): void {
		//this.objectform.get('BlockInterpretationMethod').setValue(activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]]);
		this.objectform.get('FileSourceFormat').setValue(activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]]);
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]]);
		if (this.notbenson) {
			const spectype = activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]];
			this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue(spectype);
			const structtype = activity[this.annoinfo['dataset:JThermodynamicsSubstructureType'][this.identifier]];
			this.objectform.get('JThermodynamicsSubstructureType').setValue(structtype);
		} else {

		}
		const specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];

		this.spec.setData(activity[specid]);

		const entropyvalue = activity[this.annoinfo['dataset:ParameterSpecificationEntropy'][this.identifier]];
		this.entropy.setData(entropyvalue);
		const heatcapacityvalue = activity[this.annoinfo['dataset:ParameterSpecificationHeatCapacity'][this.identifier]];
		this.heatcapacity.setData(heatcapacityvalue);
		this.temperaturelist = activity[this.annoinfo['dataset:JThermodynamicBensonTemperatures'][this.identifier]];

		const enthalpyvalue = activity[this.annoinfo['dataset:ParameterSpecificationEnthalpy'][this.identifier]];
		this.enthalpy.setData(enthalpyvalue);

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
	setJThermodynamicsSpeciesSpecificationType($event) {
		this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue($event);
	}
	setJThermodynamicsSubstructureType($event) {
		this.objectform.get('JThermodynamicsSubstructureType').setValue($event);
	}

}
