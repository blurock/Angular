import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterfaceconstantsService {
  
  	catalogtypes = [
		{
			label: 'Benson Rules', format: 'dataset:TherGasBensonRules',
			catalog: 'dataset:RepositoryTherGasThermodynamicsBlock', id: 1
		},
		{
			label: 'Disassociation Energy', format: 'dataset:JThermodynamicsDisassociationEnergyFormat',
			catalog: 'dataset:RepositoryParsedToFixedBlockSize', id: 0, BlockLineCount: 1
		},
		{
			label: 'Meta Atom', format: 'dataset:JThermodynamicsMetaAtomFormat',
			catalog: 'dataset:RepositoryParsedToFixedBlockSize', id: 0, BlockLineCount: 1
		},
		{
			label: 'Vibrational Modes', format: 'dataset:JThermodynamicsVibrationalModes',
			catalog: 'dataset:RepositoryParsedToFixedBlockSize', id: 0, BlockLineCount: 1
		}
	];
	public errorcatalogtypes = 'Error in determining catalog types';


  constructor() { }
  
  public getTherGasCatalogTypes(): Observable<any> {
    return of(this.catalogtypes);
    }
}
