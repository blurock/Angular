import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ParametervalueComponent } from '../../parametervalue/parametervalue.component';
import { ParameterspecificationComponent } from '../../parameterspecification/parameterspecification.component';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';


@Component({
	selector: 'app-jthermodynamicstandardthermodynamics',
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

	pair = this.formBuilder.group({
		ThermodynamicHeatCapacityValue: ['', Validators.required],
		ThermodynamicTemperature: ['', Validators.required],
		ValueUncertainty: ['', Validators.required]
	});

	@Input() annoinfo: any;

	pairs: FormArray;

	enthalpyid = 'dataset:ParameterSpecificationEnthaply';
	entropyid = 'dataset:ParameterSpecificationEntropy';
	heatcapacityid = 'dataset:ParameterSpecificationHeatCapacity';
	temperatureid = 'dataset:ParameterSpecificationTemperature';

	specdisplay = false;

	enthalpyspec: any;
	entropyspec: any;
	heatcapacityspec: any;
	temperaturespec: any;

	@ViewChild('enthalpyobj') enthalpyobj: ParametervalueComponent;
	@ViewChild('entropyobj') entropyobj: ParametervalueComponent;
	@ViewChild('heatcapacityspecobj') heatcapacityspecobj: ParameterspecificationComponent;
	@ViewChild('temperaturespecobj') temperaturespecobj: ParameterspecificationComponent;


	constructor(
		public annotations: OntologycatalogService,
		private formBuilder: FormBuilder
	) {
		alert("JthermodynamicstandardthermodynamicsComponent constructor 0");
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
		alert("JthermodynamicstandardthermodynamicsComponent constructor Done");
this.message = 'Done';
	}

	ngOnInit(): void {
   alert("JthermodynamicstandardthermodynamicsComponent constructor ngOnInit() Done");
	}
	
	setData(thermodynamics: any): void {
		alert("JthermodynamicstandardthermodynamicsComponent: setData");
		const enthalpy = thermodynamics[this.annoinfo['dataset:ThermodynamicStandardEnthalpy'][this.identifier]];
		alert("JthermodynamicstandardthermodynamicsComponent: setData: " + JSON.stringify(enthalpy));
		alert("JthermodynamicstandardthermodynamicsComponent: setData: " + this.enthalpyobj);
		this.enthalpyobj.setData(enthalpy);
		const entropy = thermodynamics[this.annoinfo['dataset:ThermodynamicStandardEntropy'][this.identifier]];
		this.entropyobj.setData(entropy);
		alert("JthermodynamicstandardthermodynamicsComponent: setData");
		/*
		const cpspec = thermodynamics[this.annoinfo['dataset:ParameterSpecificationHeatCapacity'][this.identifier]];
		alert("JthermodynamicstandardthermodynamicsComponent: setData: " + JSON.stringify(cpspec));
		this.heatcapacityspec.setData(cpspec);
		const temperaturespec = thermodynamics[this.annoinfo['dataset:ParameterSpecificationTemperature'][this.identifier]];
		this.temperaturespecobj.setData(temperaturespec);
		*/
		alert("JthermodynamicstandardthermodynamicsComponent: setData 4");
		const cpTpairs = thermodynamics[this.annoinfo['dataset:ThermodynamicCpAtTemperature'][this.identifier]];
		alert("JthermodynamicstandardthermodynamicsComponent: setData 5 " + cpTpairs);
		this.setDataPairs(cpTpairs);
		alert("JthermodynamicstandardthermodynamicsComponent: setData 6");
		
	}
	getData(thermodynamics: any): void {
		
	}
	
	

	getDataPairs(pairarray: any) {
		for (const pair of this.pairs.controls) {
			const pairelement = {};
			pairelement[this.annoinfo['dataset:ThermodynamicHeatCapacityValue'][this.identifier]] = pair.get('ThermodynamicHeatCapacityValue').value;
			pairelement[this.annoinfo['dataset:ThermodynamicTemperature'][this.identifier]] = pair.get('ThermodynamicTemperature').value;
			pairelement[this.annoinfo['dataset:ValueUncertainty'][this.identifier]] = pair.get('ValueUncertainty').value;
			pairarray.push(pairelement);
		}
	}


	setDataPairs(pairarray: any): void {
		for (const pair of pairarray) {
			const pairform = this.newPair();
			alert(JSON.stringify(pair));
			pairform.get('ThermodynamicHeatCapacityValue').setValue(pair[this.annoinfo['dataset:ThermodynamicHeatCapacityValue'][this.identifier]]);
			pairform.get('ThermodynamicTemperature').setValue(pair[this.annoinfo['dataset:ThermodynamicTemperature'][this.identifier]]);
			pairform.get('ValueUncertainty').setValue(pair[this.annoinfo['dataset:ValueUncertainty'][this.identifier]]);
			this.pairs.push(pairform);
		}
	}

	newPair(): FormGroup {
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

	deletePair(countIndex): void {
		this.pairs.removeAt(countIndex);
	}


}
