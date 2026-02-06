import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { CatalogbaseComponent } from 'systemprimitives';

@Injectable({
  providedIn: 'root'
})
export class SetdynamicchildbaseService {

  constructor() { }
  
  setChild(catalogtype: string, dynamicChild: ViewContainerRef): ComponentRef<CatalogbaseComponent> {
	return dynamicChild.createComponent(CatalogbaseComponent);;
  }
}
