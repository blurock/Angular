import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { FormGroup} from '@angular/forms';
import { Ontologyconstants } from 'systemconstants';
import { NavItem } from 'systemprimitives';

@Injectable({
  providedIn: 'root'
})
export class FileformatmanagerService {
	
	formatinfodata: any;
	
	activitytype: string = '';
	
	fileformaterror = 'File format not found';
	errorclassification = 'An error accessing getFormatClassification Service';
	errorcatalogtypes = 'Error in determining catalog types';
	
	
	catalogtypes = [
		{
			label: 'Benson Rules', 
			format: 'dataset:TherGasBensonRules',
			catalog: 'dataset:RepositoryTherGasThermodynamicsBlock', 
			id: 1,
			method: 'dataset:PartitionTherGasThermodynamics',
			type: 0,
			database: 'dataset:ThermodynamicBensonRuleDefinitionDatabase',
			dataset: 'dataset:ThermodynamicBensonRuleDefinitionDataset'
		},
		{
			label: '2D Substructures', 
			format: 'dataset:TherGasSubstructureThermodynamics',
			catalog: 'dataset:RepositoryTherGasThermodynamicsBlock', 
			id: 1,
			method: 'dataset:PartitionTherGasThermodynamics',
			type: 0,
			database: 'dataset:JThermodynamicsSymmetryStructureDefinitionDatabase',
			dataset: 'dataset:JThermodynamicsSymmetryStructureDefinitionDataset'
		},
		{
			label: 'Molecules', 
			format: 'dataset:TherGasSubstructureThermodynamics',
			catalog: 'dataset:RepositoryTherGasThermodynamicsBlock', 
			id: 1,
			method: 'dataset:PartitionTherGasThermodynamics',
			type: 0,
			database: 'dataset:JThermodynamics2DMoleculeThermodynamicsDatabase',
			dataset: 'dataset:JThermodynamics2DMoleculeThermodynamicsDataset'
		},
		{
			label: 'Disassociation Energy', 
			format: 'dataset:JThermodynamicsDisassociationEnergyFormat',
			catalog: 'dataset:RepositoryParsedToFixedBlockSize', 
			id: 0, 
			method: 'dataset:PartitionToLineSet',
			type: 1,	
			BlockLineCount: 1,
			database: 'dataset:JThermodynamicsDisassociationEnergyOfStructureDatabase',
			dataset: 'dataset:JThermodynamicsDisassociationEnergyOfStructureDataset'
		},
		{
			label: 'Meta Atom', 
			format: 'dataset:JThermodynamicsMetaAtomFormat',
			catalog: 'dataset:RepositoryParsedToFixedBlockSize', 
			id: 0, 
			method: 'dataset:PartitionToLineSet',
			type: 1,	
			BlockLineCount: 1,
			database: 'dataset:JThermodynamicsMetaAtomDefinitionDatabase',
			dataset: 'dataset:ThermodynamicBensonRuleDefinitionDataset'
		},
		{
			label: 'Vibrational Modes', 
			format: 'dataset:JThermodynamicsVibrationalModes',
			catalog: 'dataset:RepositoryParsedToFixedBlockSize',
			id: 0,
			method: 'dataset:PartitionToLineSet',
			type: 1,
			BlockLineCount: 1,
			database: 'dataset:JThermodynamicsVibrationalStructureDatabase',
			dataset: 'dataset:JThermodynamicsVibrationalStructureDataset'
			
		},
		{
			label: 'Symmetry Definition', 
			format: 'dataset:JThermodynamicsSymmetryDefinitionFormat',
			catalog: 'dataset:RepositoryParsedToFixedBlockSize', 
			id: 0,
			method: 'dataset:PartitionXMLListOfCatalogObjects',
			type: 1,
			BlockLineCount: 1,
			database: 'dataset:JThermodynamicsSymmetryStructureDefinitionDatabase',
			dataset: 'dataset:JThermodynamicsSymmetryStructureDefinitionDataset'
			
		}
		
	];

	formatInformation: Record<string,unknown> = {
		'dataset:JThermodynamicsVibrationalModes': {
			'dataset:filesourceformat': 'dataset:JThermodynamicsVibrationalModes',
			'dataset:partitionMethod': 'dataset:PartitionToLineSet',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsVibrationalStructure',
			'dataset:blocklinecount': '1',
			'dcat:catalog': 'dataset:JThermodynamicsVibrationalStructure',
			'qudt:hasUnitSystem': ['quantitykind:Frequency'],
			'prov:activity': 'dataset:ActivityInformationInterpretVibrationalMode'
		},
		'dataset:TherGasBensonRules': {
			'dataset:filesourceformat': 'dataset:TherGasBensonRules',
			'dataset:partitionMethod': 'dataset:PartitionTherGasThermodynamics',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsBensonRules',
			'dataset:blocklinecount': '',
			'dcat:catalog': 'dataset:ThermodynamicBensonRuleDefinition',
			'qudt:hasUnitSystem': ['quantitykind:MolarEnergy', 'quantitykind:MolarEntropy', 'quantitykind:MolarHeatCapacity'],
			'prov:activity': 'dataset:ActivityInformationInterpretBensonRuleData'
		},
		'dataset:ThergasSpeciesThermodynamics': {
			'dataset:filesourceformat': 'dataset:ThergasSpeciesThermodynamics',
			'dataset:partitionMethod': 'dataset:PartitionTherGasThermodynamics',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsMolecule',
			'dataset:blocklinecount': '',
			'dcat:catalog': 'dataset:JThermodynamics2DMoleculeThermodynamics',
			'qudt:hasUnitSystem': ['quantitykind:MolarEnergy', 'quantitykind:MolarEntropy', 'quantitykind:MolarHeatCapacity'],
			'prov:activity': 'dataset:ActivityInformationMolecularThermodynamics'
		},
		'dataset:TherGasSubstructureThermodynamics': {
			'dataset:filesourceformat': 'dataset:TherGasSubstructureThermodynamics',
			'dataset:partitionMethod': 'dataset:PartitionTherGasThermodynamics',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsSubstructures',
			'dataset:blocklinecount': '',
			'dcat:catalog': 'dataset:JThermodynamics2DSubstructureThermodynamics',
			'qudt:hasUnitSystem': ['quantitykind:MolarEnergy', 'quantitykind:MolarEntropy', 'quantitykind:MolarHeatCapacity'],
			'prov:activity': 'dataset:ActivityInformationInterpretSubstructureThermodynamics'
		},
		'dataset:TherGasMoleculeThermodynamics': {
			'dataset:filesourceformat': 'dataset:TherGasMoleculeThermodynamics',
			'dataset:partitionMethod': 'dataset:PartitionTherGasThermodynamics',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsMolecule',
			'dataset:blocklinecount': '',
			'dcat:catalog': 'dataset:JThermodynamics2DMoleculeThermodynamics',
			'qudt:hasUnitSystem': ['quantitykind:MolarEnergy', 'quantitykind:MolarEntropy', 'quantitykind:MolarHeatCapacity'],
			'prov:activity': 'dataset:ActivityInformationMolecularThermodynamics'
		},
		'dataset:JThermodynamicsDisassociationEnergyFormat': {
			'dataset:filesourceformat': 'dataset:JThermodynamicsDisassociationEnergyFormat',
			'dataset:partitionMethod': 'dataset:PartitionToLineSet',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsDisassociationEnergy',
			'dataset:blocklinecount': '2',
			'dcat:catalog': 'dataset:JThermodynamicsDisassociationEnergyOfStructure',
			'qudt:hasUnitSystem': ['quantitykind:MolarEnergy'],
			'prov:activity': 'dataset:ActivityInformationInterpretDisassociationEnergy'
		},
		'dataset:JThermodynamicsMetaAtomFormat': {
			'dataset:filesourceformat': 'dataset:JThermodynamicsMetaAtomFormat',
			'dataset:partitionMethod': 'dataset:PartitionToLineSet',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsMetaAtoms',
			'dataset:blocklinecount': '1',
			'dcat:catalog': 'dataset:JThermodynamicsMetaAtomDefinition',
			'qudt:hasUnitSystem': [],
			'prov:activity': 'dataset:ActivityInformationInterpretMetaAtom'
		},
		'dataset:JThermodynamicsSymmetryDefinitionFormat': {
			'dataset:filesourceformat': 'dataset:symmetrystructuredefinition',
			'dataset:partitionMethod': 'dataset:PartitionXMLListOfCatalogObjects',
			'dataset:interpretMethod': 'dataset:ParseLinesJThermodynamicsSymmetryDefinition',
			'dataset:blocklinecount': '',
			'dcat:catalog': 'dataset:JThermodynamicsSymmetryStructureDefinition',
			'qudt:hasUnitSystem': [],
			'prov:activity': 'dataset:ActivityInformationInterpretSymmetryInformation'
		},
	}


  constructor(
	//private uploadService: UploadmenuserviceService
  ) { 
  }

	setFileFormat(fileformat: string): string {
		var activitytype = null;
		this.formatinfodata = this.formatInformation[fileformat];
		if (this.formatinfodata == null) {
			this.formatinfodata = this.findInFormatInformation(fileformat);
			if (this.formatinfodata == null) {
				alert(this.fileformaterror + ': ' + fileformat)
			} else {
				activitytype = this.formatinfodata[Ontologyconstants.ActivityInfo];
			}
		} else {
			activitytype = this.formatinfodata[Ontologyconstants.TransactionEventType];
		}
		return activitytype;
	}

	findInFormatInformation(formattrans: string): string {
		let ans = '';
		let notfound = true;
		const keys = Object.keys(this.formatInformation);
		let i = 0;
		while (notfound) {
			const key = keys[i];
			const data: any = this.formatInformation[key];
			if (data['dataset:filesourceformat'] == formattrans) {
				ans = key;
				notfound = false;
			}
			i++;
		}
		return ans;
	}
  public getTherGasCatalogTypes(): Observable<NavItem[]> {
	const items: NavItem[] = [];
	  for (let i = 0; i < this.catalogtypes.length; i++) {
		  const choice = this.catalogtypes[i];
		  const type = choice['format'];
		  const children: NavItem[] = [];
		  const celement: NavItem = {
			  displayName: type,
			  disabled: false,
			  value: choice,
			  children: children
		  };
		  items.push(celement);
	  }
    return of(items);
    }
    
    public dataFormatInformation(format: string): Observable<any> {
      let typeInfo = null;
      let i=0;
      while(typeInfo == null && i < this.catalogtypes.length) {
        const choice = this.catalogtypes[i];
        if(format == choice['format']) {
          typeInfo = choice;
        }
        i++;
        }
        return of(typeInfo);
    }   
    public setDataFormat(typeInfo: any, objectform: FormGroup): number {
		const fmt = typeInfo['format'];
		
			objectform.get('FileSourceFormat')?.setValue(fmt) ?? ''
			const method = typeInfo['method']
			objectform.get('FilePartitionMethod')?.setValue(method) ?? '';
		
		return typeInfo['type'];
	}
	public menuLabelsForFileFormat(): string[] {
		const labels = [];
		for (let i = 0; i < this.catalogtypes.length; i++) {
			const choice = this.catalogtypes[i];
			labels.push(choice['label']);
		}
		return labels;
	}
	
	public getCatalogTypeForFormat(format: string): any {
		let typeInfo = null;
		let i = 0;
		while (typeInfo == null && i < this.catalogtypes.length) {
			const choice = this.catalogtypes[i];
			if (format == choice['format']) {
				typeInfo = choice;
			}
			i++;
		}
		return typeInfo;
	}
	
	public getCatalogTypeForLabel(label: string): any {
		let typeInfo = null;
		let i = 0;
		while (typeInfo == null && i < this.catalogtypes.length) {
			const choice = this.catalogtypes[i];
			if (label == choice['label']) {
				typeInfo = choice;
			}
			i++;
		}
		return typeInfo;
	}
	
	public getFormatClassification(): Observable<any> {
		return of(this.formatInformation);
	}


}