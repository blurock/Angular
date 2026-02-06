import { InjectionToken, Type } from '@angular/core';
import { CatalogbaseComponent } from '../catalogbase/catalogbase/catalogbase.component';

// The value is now a function: () => Promise<Type<any>>
export interface LazyVisualizationRegistry {
  [catalogType: string]: () => Promise<Type<CatalogbaseComponent>>;
}

export const VISUALIZATION_MAPPING = new InjectionToken<LazyVisualizationRegistry>('LazyVisualizationMapping');
