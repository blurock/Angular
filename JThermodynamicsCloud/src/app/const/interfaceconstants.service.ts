import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { UntypedFormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InterfaceconstantsService {
  


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

}
