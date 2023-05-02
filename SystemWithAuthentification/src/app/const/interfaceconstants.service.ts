import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { FormGroup} from '@angular/forms';

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
			type: 0
		},
		{
			label: 'Disassociation Energy', 
			format: 'dataset:JThermodynamicsDisassociationEnergyFormat',
			catalog: 'dataset:RepositoryParsedToFixedBlockSize', 
			id: 0, 
			method: 'dataset:PartitionToLineSet',
			type: 1,	
			BlockLineCount: 1
		},
		{
			label: 'Meta Atom', format: 'dataset:JThermodynamicsMetaAtomFormat',
			catalog: 'dataset:RepositoryParsedToFixedBlockSize', 
			id: 0, 
			method: 'dataset:PartitionToLineSet',
			type: 1,	
			BlockLineCount: 1
		},
		{
			label: 'Vibrational Modes', format: 'dataset:JThermodynamicsVibrationalModes',
			catalog: 'dataset:RepositoryParsedToFixedBlockSize', id: 0,
			method: 'dataset:PartitionToLineSet',
			type: 1,
			BlockLineCount: 1			
		},
		{
			label: 'Symmetry Definition', 
			format: 'dataset:JThermodynamicsSymmetryDefinitionFormat',
			catalog: 'dataset:RepositoryParsedToFixedBlockSize', id: 0,
			method: 'dataset:PartitionXMLListOfCatalogObjects',
			type: 1,
			BlockLineCount: 1			
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
    public setDataFormat(typeInfo: any, objectform: FormGroup): number {
		const fmt = typeInfo['format'];
		objectform.get('FileSourceFormat').setValue(fmt);
		const method = typeInfo['method']
		objectform.get('FilePartitionMethod').setValue(method);
		return typeInfo['type'];
	}

}
