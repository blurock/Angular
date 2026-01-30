import { Component, Input, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ParameterspecificationComponent } from '../../../parameterspecification/parameterspecification.component';
import { Ontologyconstants } from 'systemconstants';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SpecificationfordatasetComponent } from '../../../specificationfordataset/specificationfordataset.component';
import { MatCardModule } from '@angular/material/card';
import { FileformatmanagerService } from '../../../../services/fileformatmanager.service';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { KeywordlistprimitiveComponent } from '../../../../primitives/keywordlistprimitive/keywordlistprimitive.component';

@Component({
	selector: 'app-activityinformationinterpretthermodynamicblock',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		ReactiveFormsModule,
		MatGridListModule,
		MatFormFieldModule,
		MatInputModule,
		SpecificationfordatasetComponent,
		MatSelectModule,
		MatInputModule,
		MatMenuModule,
		MatChipsModule,
		ParameterspecificationComponent,
		SpecificationfordatasetComponent,
		KeywordlistprimitiveComponent
	],
	templateUrl: './activityinformationinterpretthermodynamicblock.component.html',
	styleUrls: ['./activityinformationinterpretthermodynamicblock.component.scss']
})
export class ActivityinformationinterpretthermodynamicblockComponent implements AfterViewInit {

	rdfslabel: string = Ontologyconstants.rdfslabel;
	rdfscomment: string = Ontologyconstants.rdfscomment;
	identifier: string = Ontologyconstants.dctermsidentifier;


	molarenthalpyparameter = 'dataset:ParameterSpecificationEnthalpy';
	molarentropyarameter = 'dataset:ParameterSpecificationEntropy';
	molarheatcapacityparameter = 'dataset:ParameterSpecificationHeatCapacity';
	specsubtitle = 'Datasaet Specification';

	title: string = '';

	temperaturelist = [
		300, 400, 500, 600, 800, 1000, 1500
	];

	molarenthalpy: any;
	molarentropy: any;
	molarheatcapacity: any;
	fileformatdata: any;

	objectform: UntypedFormGroup;
	fileformat: string = '';
	prerequisite: any;

	display = false;

	@Input() annoinfo: any;

	@ViewChild('enthalpy') enthalpy!: ParameterspecificationComponent;
	@ViewChild('entropy') entropy!: ParameterspecificationComponent;
	@ViewChild('heatcapacity') heatcapacity!: ParameterspecificationComponent;
	@ViewChild('keywords') keywords!: KeywordlistprimitiveComponent;
	@ViewChild('temperatures') temperatures!: KeywordlistprimitiveComponent;

	private spec: SpecificationfordatasetComponent | undefined;
	@ViewChild('spec')
	set subComponent(comp: SpecificationfordatasetComponent | undefined) {
		this.spec = comp;
		if (this.spec) {
			if (this.prerequisite) {
				this.prerequisiteWithAnnpublic()
			}
		}
	}


	constructor(
		private formBuilder: UntypedFormBuilder,
		private format: FileformatmanagerService,
		private menuserver: OntologycatalogService,
		private cdr: ChangeDetectorRef
	) {
		const set = [];
		set.push(this.molarenthalpyparameter);
		set.push(this.molarentropyarameter);
		set.push(this.molarheatcapacityparameter);
		this.menuserver.getParameterSet(set).subscribe({
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

		this.fileformatdata = this.format.formatInformation;
	}

	ngAfterViewInit(): void {
	}


	invalid(): boolean {
		const paramvalid = !this.enthalpy.invalid() && !this.entropy.invalid() &&!this.heatcapacity.invalid();
		return !(!this.objectform.invalid && paramvalid);
	}

	setPrerequisiteData(prerequisite: any): void {
		this.prerequisite = prerequisite;
		const activityinfo = prerequisite[Ontologyconstants.ActivityInfo];
		this.fileformat = activityinfo['dataset:filesourceformat']
		this.objectform.get('FileSourceFormat')!.setValue(this.fileformat);
		if (this.annoinfo) {
			this.prerequisiteWithAnnpublic();
		}
	}

	prerequisiteWithAnnpublic() {
		const activityinfo = this.prerequisite['dataset:activityinfo'];
		const Hdisformat = this.fileformatdata[this.fileformat];
		const block = Hdisformat['dataset:interpretMethod'];
		this.objectform.get('BlockInterpretationMethod')!.setValue(block);
		this.objectform.get('DescriptionTitle')!.setValue(activityinfo[this.annoinfo['dataset:DescriptionTitle'][this.identifier]]);
		if (this.spec) {
			this.spec.setData(activityinfo);
			this.setTemperatures();
		}
	}

	annotationsFound(response: any): void {
		if (this.prerequisite) {
			this.prerequisiteWithAnnpublic();
		}
	}

	getData(activity: any): void {
		activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod')?.value ?? '';
		activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat')?.value ?? '';
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle')?.value ?? '';
		this.spec!.getData(activity);
		const enthalpyvalue = {};
		this.enthalpy.getData(enthalpyvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationEnthalpy'][this.identifier]] = enthalpyvalue;
		const entropyvalue = {};
		this.entropy.getData(entropyvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationEntropy'][this.identifier]] = entropyvalue;
		const heatcapacityvalue = {};
		this.heatcapacity.getData(heatcapacityvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationHeatCapacity'][this.identifier]] = heatcapacityvalue;
		const tempparam: Record<string, unknown> = {};

		activity['dataset:thermotemperature'] = tempparam;
		const parameterlabeltid = this.annoinfo['dataset:ParameterLabel'][this.identifier];
		tempparam[parameterlabeltid] = 'Temperature';
		const unitvalue: Record<string, unknown> = {};
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
		this.getTemperatures();
		activity[this.annoinfo['dataset:JThermodynamicBensonTemperatures'][this.identifier]] = this.temperaturelist;
	}
	setData(activity: any): void {
		if (this.annoinfo && activity) {
			this.objectform.get('FileSourceFormat')!.setValue(activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]]);
			this.objectform.get('DescriptionTitle')!.setValue(activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]]);
			if (this.spec) {
				this.spec!.setData(activity);
			}
			if (this.entropy) {
				const entropyvalue = activity[this.annoinfo['dataset:ParameterSpecificationEntropy'][this.identifier]];
				this.entropy.setData(entropyvalue);
			}
			if (this.heatcapacity) {
				const heatcapacityvalue = activity[this.annoinfo['dataset:ParameterSpecificationHeatCapacity'][this.identifier]];
				this.heatcapacity.setData(heatcapacityvalue);
			}
			
			const templist = activity[this.annoinfo['dataset:JThermodynamicBensonTemperatures'][this.identifier]];
			if(templist){
				if(templist.length>0) {
					this.temperaturelist = templist;
				}
			}
			this.setTemperatures();
			if (this.enthalpy) {
				const enthalpyvalue = activity[this.annoinfo['dataset:ParameterSpecificationEnthalpy'][this.identifier]];
				this.enthalpy.setData(enthalpyvalue);
			}
		}
	}

	setTemperatures() {
		if(this.temperatures) {
			const stringArray: string[] = this.temperaturelist.map((num: number) => String(num));
			this.temperatures.setKeys(stringArray);
		}
	}
	getTemperatures() {
		const stringArray = this.temperatures.getKeys();
		this.temperaturelist = stringArray.map((numS: string) => Number(numS));
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
