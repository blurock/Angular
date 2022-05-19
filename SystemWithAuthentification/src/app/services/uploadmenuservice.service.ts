import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UploadmenuserviceService {

	DATATYPES = {
		'dataset:JThermodynamicsVibrationalModes': {
			'dataset:partitionMethod': 'dataset:PartitionToLineSet',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsVibrationalStructure',
			'dataset:blocklinecount': '1',
			'dcat:catalog': 'dataset:JThermodynamicsVibrationalStructure',
			'qudt:hasUnitSystem': ['quantitykind:Frequency']
		},
		'dataset:TherGasBensonRules': {
			'dataset:partitionMethod': 'dataset:PartitionTherGasThermodynamics',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsBensonRules',
			'dataset:blocklinecount': '',
			'dcat:catalog': 'dataset:ThermodynamicBensonRuleDefinition',
			'qudt:hasUnitSystem': ['quantitykind:MolarEnergy', 'quantitykind:MolarEntropy', 'quantitykind:MolarHeatCapacity']
		},
		'dataset:ThergasSpeciesThermodynamics': {
			'dataset:partitionMethod': 'dataset:PartitionTherGasThermodynamics',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsMolecule',
			'dataset:blocklinecount': '',
			'dcat:catalog': 'dataset:JThermodynamics2DMoleculeThermodynamics',
			'qudt:hasUnitSystem': ['quantitykind:MolarEnergy', 'quantitykind:MolarEntropy', 'quantitykind:MolarHeatCapacity']
		},
		'dataset:TherGasSubstructureThermodynamics': {
			'dataset:partitionMethod': 'dataset:PartitionTherGasThermodynamics',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsSubstructures',
			'dataset:blocklinecount': '',
			'dcat:catalog': 'dataset:JThermodynamics2DSubstructureThermodynamics',
			'qudt:hasUnitSystem': ['quantitykind:MolarEnergy', 'quantitykind:MolarEntropy', 'quantitykind:MolarHeatCapacity']
		},
		'dataset:TherGasMoleculeThermodynamics': {
			'dataset:partitionMethod': 'dataset:PartitionTherGasThermodynamics',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsMolecule',
			'dataset:blocklinecount': '',
			'dcat:catalog': 'dataset:JThermodynamics2DMoleculeThermodynamics',
			'qudt:hasUnitSystem': ['quantitykind:MolarEnergy', 'quantitykind:MolarEntropy', 'quantitykind:MolarHeatCapacity']
		},
		'dataset:JThermodynamicsDisassociationEnergyFormat': {
			'dataset:partitionMethod': 'dataset:PartitionToLineSet',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsDisassociationEnergy',
			'dataset:blocklinecount': '2',
			'dcat:catalog': 'dataset:JThermodynamicsDisassociationEnergyOfStructure',
			'qudt:hasUnitSystem': ['quantitykind:MolarEnergy']
		},
		'dataset:JThermodynamicsMetaAtomFormat': {
			'dataset:partitionMethod': 'dataset:PartitionToLineSet',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsMetaAtoms',
			'dataset:blocklinecount': '1',
			'dcat:catalog': 'dataset:JThermodynamicsMetaAtomDefinition',
			'qudt:hasUnitSystem': []
		},
		'dataset:JThermodynamicsSymmetryDefinitionFormat': {
			'dataset:partitionMethod': 'dataset:PartitionXMLListOfCatalogObjects',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsSymmetryDefinition',
			'dataset:blocklinecount': '',
			'dcat:catalog': 'dataset:JThermodynamicsSymmetryStructureDefinition',
			'qudt:hasUnitSystem': []
		},
	}

	UNITS = {
		'quantitykind:MolarEnergy': {
			'qudt:QuantityKind': ['unit:KiloCAL-PER-MOL', 'unit:KiloJ-PER-MOL', 'dataset:CAL-PER-MOL', 'unit:J-PER-MOL'],
			'dataset:dynamicType': 'FixedParameter',
			'skos:prefLabel': 'MolarEnergy'
		},
		'quantitykind:MolarEntropy': {
			'qudt:QuantityKind': ['unit:J-PER-MOL-K', 'dataset:CAL-PER-MOL-K'],
			'dataset:dynamicType': 'FixedParameter',
			'skos:prefLabel': 'MolarEntropy'
		},
		'quantitykind:MolarHeatCapacity': {
			'qudt:QuantityKind': ['unit:J-PER-MOL-K', 'dataset:CAL-PER-MOL-K'],
			'dataset:dynamicType': 'FixedParameter',
			'skos:prefLabel': 'MolarHeatCapacity'
		},
		'quantitykind:Frequency': {
			'qudt:QuantityKind': ['unit:PER-SEC', 'unit:HZ', 'dataset:cmMinus1'],
			'dataset:dynamicType': 'FixedParameter',
			'skos:prefLabel': 'Frequency'
		}
	};

	UNCERTAINTY = {
		'dataset:AbsoluteUncertainty': {
			'rdfs:label': 'Absolute Uncertainty',
			'rdfs:comment': ''
		}, 'dataset:ImpliedDigitsUncertainty': {
			'rdfs:label': 'ImpliedDigitsUncertainty',
			'rdfs:comment': 'Uncertainty implied by number of digits (no value given)'
		}, 'dataset:RelativeUncertainty': {
			'rdfs:label': 'Relative Uncertainty',
			'rdfs:comment': 'Relative Uncertainty'
		}, 'dataset:PercentageRelativeUncertainty': {
			'rdfs:label': 'PercentageRelativeUncertainty',
			'rdfs:comment': 'Uncertainty given as a percentage'
		}, 'dataset:RelativeErrorUncertainty': {
			'rdfs:label': 'Relative Error Uncertainty',
			'rdfs:comment': 'Uncertainty given as a relative decimal value'
		},

	};
	
	TITLES = [
		{
			'dc:type': 'dataset:Professor',
			'rdfs:label': 'Prof.',
			'rdfs:comment': 'the academic rank of professor in a university or other institution'
		},
		{
			'dc:type': 'dataset:Eur_Ing',
			'rdfs:label': 'Eur Ing',
			'rdfs:comment': 'engineers registered as European Engineers with the European Federation of National Engineering Associations'
		},
		{
			'dc:type': 'dataset:Doctor',
			'rdfs:label': 'Dr.',
			'rdfs:comment': 'Academic title of doctor or Ph.D'
		},
		 {
			 'dc:type': 'dataset:Mister',
			'rdfs:label': 'Mr.',
			'rdfs:comment': 'Mister'
		},
		{
			'dc:type': 'dataset:Ms',
			'rdfs:label': 'Ms.',
			'rdfs:comment': 'Ms.'
		},
		{
			'dc:type': 'Lord',
			'rdfs:label': 'Lord',
			'rdfs:comment': 'male barons, viscounts, earls, and marquesses, as well as some of their children'
		}
		]


	constructor(private httpClient: HttpClient) { }

	public getFormatClassification(): Observable<any> {
		return of(this.DATATYPES);
	}

	public getUnitSet(choices: string[]): Observable<any> {
		return of(this.UNITS);
	}

	public getUncertaintyChoices(): Observable<any> {
		return of(this.UNCERTAINTY);
	}
	public getTitleChoices(): Observable<any> {
		return of(this.TITLES);
	}

}
