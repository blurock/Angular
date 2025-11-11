import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ParametervalueComponent } from '../../parametervalue/parametervalue.component';
import { ParameterspecificationComponent } from '../../parameterspecification/parameterspecification.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';


@Component({
	selector: 'app-jthermodynamicstandardthermodynamics',
	standalone: true,
	imports: [
		ParametervalueComponent,
		ParameterspecificationComponent,
		MatCardModule, 
		MatFormFieldModule, 
		MatInputModule, 
		ReactiveFormsModule, 
		NgIf,NgFor,
		MatGridListModule,
		MatIconModule,
		FormsModule,
	],
	templateUrl: './jthermodynamicstandardthermodynamics.component.html',
	styleUrls: ['./jthermodynamicstandardthermodynamics.component.scss']
})
export class JthermodynamicstandardthermodynamicsComponent implements OnInit {

	message = 'Start';

	title = 'Temperature Dependent Thermodynamic Specification';
	display = false;
	enthalpytitle = 'Standard Enthalpy';
	entropytitle = 'Standard Entropy';
	addpair = 'Add Temperature/HeatCapacityPair';

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	
	pair: UntypedFormGroup;
	pairs: UntypedFormArray;

	@Input() annoinfo: any;

	

	enthalpyid = 'dataset:ParameterSpecificationEnthalpy';
	entropyid = 'dataset:ParameterSpecificationEntropy';
	heatcapacityid = 'dataset:ParameterSpecificationHeatCapacity';
	temperatureid = 'dataset:ParameterSpecificationTemperature';

	specdisplay = false;

	enthalpyspec: any;
	entropyspec: any;
	heatcapacityspec: any;
	temperaturespec: any;

	@ViewChild('enthalpyobj') enthalpyobj!: ParametervalueComponent;
	@ViewChild('entropyobj') entropyobj!: ParametervalueComponent;
	@ViewChild('heatcapacityspecobj') heatcapacityspecobj!: ParameterspecificationComponent;
	@ViewChild('temperaturespecobj') temperaturespecobj!: ParameterspecificationComponent;


	constructor(
		public annotations: OntologycatalogService,
		private formBuilder: UntypedFormBuilder
	) {
		this.pair = this.formBuilder.group({
			ThermodynamicHeatCapacityValue: ['', Validators.required],
			ThermodynamicTemperature: ['', Validators.required],
			ValueUncertainty: ['', Validators.required]
		});

	this.pairs = this.formBuilder.array([]);

		const set = [];
		set.push(this.enthalpyid);
		set.push(this.entropyid);
		set.push(this.heatcapacityid);
		set.push(this.temperatureid);
		annotations.getParameterSet(set).subscribe({
			next: (data: any) => {
				this.enthalpyspec = data[this.enthalpyid];
				this.entropyspec = data[this.entropyid];
				this.heatcapacityspec = data[this.heatcapacityid];
				this.temperaturespec = data[this.temperatureid];
				this.specdisplay = true;
			}
		});
		this.message = 'Done';
	}

	ngOnInit(): void {
	}

	setData(thermodynamics: any): void {
		const enthalpy = thermodynamics[this.annoinfo['dataset:ThermodynamicStandardEnthalpy'][this.identifier]];
		this.enthalpyobj.setData(enthalpy);
		const entropy = thermodynamics[this.annoinfo['dataset:ThermodynamicStandardEntropy'][this.identifier]];
		this.entropyobj.setData(entropy);
		const cpTpairs = thermodynamics[this.annoinfo['dataset:ThermodynamicCpAtTemperature'][this.identifier]];
		this.setDataPairs(cpTpairs);
		this.heatcapacityspecobj.setData(thermodynamics[this.annoinfo['dataset:ParameterSpecificationHeatCapacity'][this.identifier]]);
		this.temperaturespecobj.setData(thermodynamics[this.annoinfo['dataset:ParameterSpecificationTemperature'][this.identifier]]);
	}
	getData(thermodynamics: any): void {
		const enthalpy:Record<string,any> = {};
		this.enthalpyobj.getData(enthalpy);
		enthalpy[Ontologyconstants.dctermsidentifier] = this.annoinfo['dataset:ThermodynamicStandardEnthalpy'][this.identifier];
		thermodynamics[this.annoinfo['dataset:ThermodynamicStandardEnthalpy'][this.identifier]] = enthalpy;
		const entropy:Record<string,any> = {};
		entropy[Ontologyconstants.dctermsidentifier] = this.annoinfo['dataset:ThermodynamicStandardEntropy'][this.identifier];
		this.entropyobj.getData(entropy);
		thermodynamics[this.annoinfo['dataset:ThermodynamicStandardEntropy'][this.identifier]] = entropy;
		const cpTpairs: any[] = [];
		this.getDataPairs(cpTpairs);
		thermodynamics[this.annoinfo['dataset:ThermodynamicCpAtTemperature'][this.identifier]] = cpTpairs;
		const cphspec:Record<string,any> =  {};
		thermodynamics[this.annoinfo['dataset:ParameterSpecificationHeatCapacity'][this.identifier]] = cphspec;
		this.heatcapacityspecobj.getData(cphspec);
		const tempspec:Record<string,any> = {};
		thermodynamics[this.annoinfo['dataset:ParameterSpecificationTemperature'][this.identifier]] = tempspec;
		this.temperaturespecobj.getData(tempspec);
	}



	getDataPairs(pairarray: any) {
		for (const pair of this.pairs.controls) {
			const pairelement: Record<string, any> = {};
			pairelement[Ontologyconstants.dctermsidentifier] = this.annoinfo['dataset:ThermodynamicCpAtTemperature'][this.identifier];
			pairelement[this.annoinfo['dataset:ThermodynamicHeatCapacityValue'][this.identifier]] = pair.get('ThermodynamicHeatCapacityValue')!.value;
			pairelement[this.annoinfo['dataset:ThermodynamicTemperature'][this.identifier]] = pair.get('ThermodynamicTemperature')!.value;
			pairelement[this.annoinfo['dataset:ValueUncertainty'][this.identifier]] = pair.get('ValueUncertainty')!.value;
			pairarray.push(pairelement);
		}
	}


	setDataPairs(pairarray: any): void {
		this.pairs.clear();
		for (const pair of pairarray) {
			const pairform = this.newPair();
			pairform.get('ThermodynamicHeatCapacityValue')!.setValue(pair[this.annoinfo['dataset:ThermodynamicHeatCapacityValue'][this.identifier]]);
			pairform.get('ThermodynamicTemperature')!.setValue(pair[this.annoinfo['dataset:ThermodynamicTemperature'][this.identifier]]);
			pairform.get('ValueUncertainty')!.setValue(pair[this.annoinfo['dataset:ValueUncertainty'][this.identifier]]);
			this.pairs.push(pairform);
		}
	}

	newPair(): UntypedFormGroup {
		return this.formBuilder.group({
			ThermodynamicHeatCapacityValue: ['', Validators.required],
			ThermodynamicTemperature: ['', Validators.required],
			ValueUncertainty: ['', Validators.required],
		});
	}
	addPair(): void {

		const countform = this.newPair();
		this.pairs.push(countform);
	}

	deletePair(countIndex: number): void {
		this.pairs.removeAt(countIndex);
	}


}
