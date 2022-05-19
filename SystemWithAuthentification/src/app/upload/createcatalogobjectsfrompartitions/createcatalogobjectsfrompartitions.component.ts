import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadinterfaceconstantsService } from '../uploadinterfaceconstants.service';

@Component({
	selector: 'app-createcatalogobjectsfrompartitions',
	templateUrl: './createcatalogobjectsfrompartitions.component.html',
	styleUrls: ['./createcatalogobjectsfrompartitions.component.scss']
})
export class CreatecatalogobjectsfrompartitionsComponent implements OnInit {

	@Input() createform: FormGroup;
	@Input() uploadinfoform: FormGroup;
	@Input() formatInformation: any;
	@Input() unitsneeded: string[];
	@Input() unitInformation: any;
	@Input() uncertaintyInformation: any;
	@Input() interpretResult: string;
	@Output() submitInterpretEvent = new EventEmitter<any>();

	maintainer = 'Administrator';

	public enthalpyunitlabel = 'quantitykind:MolarEnergy';
	public entropyunitlabel = 'quantitykind:MolarEntropy';
	public heatcapacityunitlabel = 'quantitykind:MolarHeatCapacity';
	public frequencyunitlabel = 'quantitykind:Frequency';

	public unitslabel = 'qudt:QuantityKind';
	public hasunitslabel = 'qudt:hasUnitSystem';
	enthalpy: FormGroup;
	entropy: FormGroup;
	heatcapacity: FormGroup;
	frequency: FormGroup;


	constructor(public labels: UploadinterfaceconstantsService,
		private _formBuilder: FormBuilder) { }


	ngOnInit(): void {
		this.enthalpy = this._formBuilder.group({
			UnitsOfValue: ['', Validators.required],
			DataPointUncertainty: ['', Validators.required],
			ParameterLabel: ['Enthalpy', Validators.required]
		});

		this.entropy = this._formBuilder.group({
			UnitsOfValue: ['', Validators.required],
			DataPointUncertainty: ['', Validators.required],
			ParameterLabel: ['Entropy', Validators.required]
		});

		this.heatcapacity = this._formBuilder.group({
			UnitsOfValue: ['', Validators.required],
			DataPointUncertainty: ['', Validators.required],
			ParameterLabel: ['HeatCapacity', Validators.required]
		});

		this.frequency = this._formBuilder.group({
			UnitsOfValue: ['', Validators.required],
			DataPointUncertainty: ['', Validators.required],
			ParameterLabel: ['Frequency', Validators.required]
		});

	}


	activityJson(): any {
		const json = {};
		json['prov:activity'] = 'dataset:TransactionInterpretTextBlock';
		const jsoninfo = {};
		json['dataset:activityinfo'] = jsoninfo;
		const jsonspec = {};
		jsoninfo['dataset:datasettransactionspecification'] = jsonspec;

		jsonspec['dataset:catalogobjectmaintainer'] = this.maintainer;
		jsonspec['dataset:datasetname'] = this.uploadinfoform.get('DatasetName').value;
		jsonspec['dataset:datasetversion'] = this.uploadinfoform.get('DatasetVersion').value;
		jsonspec['dataset:uniquegenericname'] = this.uploadinfoform.get('CatalogObjectUniqueGenericLabel').value;

		jsoninfo['dataset:filesourceformat'] = this.uploadinfoform.get('FileSourceFormat').value;
		jsoninfo['dataset:blockinterpretationmethod'] = this.formatInformation[this.uploadinfoform.get('FileSourceFormat').value]['dataset:interpretMethod'];
		jsoninfo['dcterms:title'] = this.uploadinfoform.get('FileSourceTitle').value;
		jsoninfo['dataset:dataobjstatus'] = 'CatalogObjectStatusCurrent';
		jsoninfo['dataset:speciespectype'] = 'dataset:SpeciesSpecificationNancyLinearForm';
		this.allunitsAsJSON(json);
		return json;
	}


	allunitsAsJSON(json: any): any {
		const format = this.uploadinfoform.get('FileSourceFormat').value;
		const unitset = this.formatInformation[format][this.hasunitslabel] as string[];
		if (unitset.includes(this.enthalpyunitlabel)) {
			json[this.enthalpyunitlabel] = this.unitsAsJSON(this.enthalpyunitlabel, this.enthalpy);
		}

		if (unitset.includes(this.entropyunitlabel)) {
			json[this.entropyunitlabel] = this.unitsAsJSON(this.entropyunitlabel, this.entropy);
		}

		if (unitset.includes(this.heatcapacityunitlabel)) {
			json[this.heatcapacityunitlabel] = this.unitsAsJSON(this.heatcapacityunitlabel, this.heatcapacity);
		}

		if (unitset.includes(this.frequencyunitlabel)) {
			json[this.frequencyunitlabel] = this.unitsAsJSON(this.frequencyunitlabel, this.frequency);
		}
		return json;
	}

	unitsAsJSON(type: string, units: FormGroup): any {
		const specificunit = units.get('UnitsOfValue').value;
		const uncertainty = units.get('DataPointUncertainty').value;
		const label = units.get('ParameterLabel').value;

		const json = {
			'qudt:Unit': {
				'qudt:SystemOfQuantities': type,
				'qudt:QuantityKind': specificunit
			},
			'dataset:dynamicType': 'FixedParameter',
			'skos:prefLabel': label,
			'dataset:uncertainty': uncertainty
		};
		return json;

	}

	formatValue(): string {
		return this.uploadinfoform.get('FileSourceFormat').value;
	}

	getSourceCatalog(): string {
		let ans = '';
		const format = this.formatValue();
		if (format != null) { }
		const info = this.formatInformation[format];
		if (info != null) {
			ans = info['dcat:catalog'] as string;
		}
		return ans;
	}


	getUnitInformation(unit: string, parameter: string): any {
		let property = null;
		if (this.unitInformation != null) {
			const unitprops = this.unitInformation[unit];
			if (unitprops != null) {
				const prop = unitprops[parameter];
				if (prop != null) {
					property = prop;
				}
			}
		}
		return property;
	}

	getUnitChoices(unit: string): string[] {
		return this.getUnitInformation(unit, this.unitslabel);
	}

	testUnit(unit: string): boolean {
		let ans = false;
		const source = this.uploadinfoform.get('FileSourceFormat').value;
		const props = this.formatInformation[source];
		const units = props['qudt:hasUnitSystem'] as string[];
		ans = units.includes(unit);
		return ans;

	}

	enthalpyunit(): boolean {
		return this.testUnit('quantitykind:MolarEnthalpy');
	}
	entropyunit(): boolean {
		return this.testUnit('quantitykind:MolarEntropy');
	}
	heatcapacityunit(): boolean {
		return this.testUnit('quantitykind:MolarHeatCapacity');
	}
	submitInterpret(): void {
		const json = this.activityJson();
		this.interpretResult = JSON.stringify(json, null, 2);
		this.submitInterpretEvent.emit(json);
	}

}
