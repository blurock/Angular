import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { UntypedFormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InterfaceconstantsService {
  
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
			label: 'Meta Atom', format: 'dataset:JThermodynamicsMetaAtomFormat',
			catalog: 'dataset:RepositoryParsedToFixedBlockSize', 
			id: 0, 
			method: 'dataset:PartitionToLineSet',
			type: 1,	
			BlockLineCount: 1,
			database: 'dataset:JThermodynamicsMetaAtomDefinitionDatabas3',
			dataset: 'dataset:ThermodynamicBensonRuleDefinitionDataset'
		},
		{
			label: 'Vibrational Modes', format: 'dataset:JThermodynamicsVibrationalModes',
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
	public errorcatalogtypes = 'Error in determining catalog types';


  constructor() { }
  
  public getTherGasCatalogTypes(): Observable<any> {
    return of(this.catalogtypes);
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
    public setDataFormat(typeInfo: any, objectform: UntypedFormGroup): number {
		const fmt = typeInfo['format'];
		objectform.get('FileSourceFormat').setValue(fmt);
		const method = typeInfo['method']
		objectform.get('FilePartitionMethod').setValue(method);
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

}
