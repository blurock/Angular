import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { CatalogInfo, CatalogAnnotation, ClassificationHiearchy } from '../const/routes.const';
import { ServiceUtilityRoutines } from './serviceutilityroutines';

import * as express from 'express';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';


@Injectable({
	providedIn: 'root'
})
export class OntologycatalogService {
	errorMsg: string;
	headers: HttpHeaders;

	constructor(private readonly snackBar: MatSnackBar,
		private httpClient: HttpClient) {
	}
	
		PARAMETERDEFINITIONS = {
		'dataset:ParameterSpecificationHDisassociationEnergy': {
			'qudt:QuantityKind': 'quantitykind:MolarEnergy',
			'dataset:dynamicType': 'FixedParameter',
			'skos:prefLabel': 'MolarEnergy',
			'qudt:Unit': ['unit:KiloCAL-PER-MOL', 'unit:KiloJ-PER-MOL', 'dataset:CAL-PER-MOL', 'unit:J-PER-MOL']
		},
		'dataset:ParameterSpecificationEnthaply': {
			'qudt:QuantityKind': 'quantitykind:MolarEnergy',
			'dataset:dynamicType': 'FixedParameter',
			'skos:prefLabel': 'MolarEnergy',
			'qudt:Unit': ['unit:KiloCAL-PER-MOL', 'unit:KiloJ-PER-MOL', 'dataset:CAL-PER-MOL', 'unit:J-PER-MOL']
		},
		'dataset:ParameterSpecificationEntropy': {
			'qudt:QuantityKind': 'quantitykind:MolarEntropy',
			'dataset:dynamicType': 'FixedParameter',
			'skos:prefLabel': 'MolarEntropy',
			'qudt:Unit': ['unit:J-PER-MOL-K', 'dataset:CAL-PER-MOL-K']
		},
		'dataset:ParameterSpecificationHeatCapacity': {
			'qudt:QuantityKind': 'quantitykind:MolarHeatCapacity',
			'dataset:dynamicType': 'FixedParameter',
			'skos:prefLabel': 'MolarHeatCapacity',
			'qudt:Unit': ['unit:J-PER-MOL-K', 'dataset:CAL-PER-MOL-K']
		},
		'dataset:ParameterSpecificationStructureVibrationFrequency': {
			'qudt:QuantityKind': 'quantitykind:Frequency',
			'dataset:dynamicType': 'FixedParameter',
			'skos:prefLabel': 'Frequency',
			'qudt:Unit': ['unit:PER-SEC', 'unit:HZ', 'dataset:cmMinus1']
		},
		'dataset:ParameterSpecificationTemperature': {
			'qudt:QuantityKind': 'quantitykind:Temperature',
			'dataset:dynamicType': 'FixedParameter',
			'skos:prefLabel': 'Temperature',
			'qudt:Unit': ['unit:K', 'unit:DEG_R','unit:DEG_F','unit:DEG_C','unit:DEG_MilliDEG_C', 'unit:PlankTemperature']
		}
	}
	public getParameterSet(choices: string[]): Observable<any> {
		const set = {};
		for(let choice of choices) {
			set[choice] = this.PARAMETERDEFINITIONS[choice];
		}
		return of(set);
	}



	public getAnnotationsFromID(id: string): Observable<any> {
		const annotationshttp = environment.apiURL + '/' + CatalogAnnotation + '?catalogname=' + id;
		return this.standardHttpCall(annotationshttp);
	}

	public getNewCatalogObject(id: string): Observable<any> {
		const cataloginfoshttp = environment.apiURL + '/' + CatalogInfo + '?catalogname=' + id;
		return this.standardHttpCall(cataloginfoshttp);
	}
	public getClassificationHierarchy(id: string): Observable<any> {
		const classificationhttp = environment.apiURL + '/' + ClassificationHiearchy + '?catalogname=' + id;
		return this.standardHttpCall(classificationhttp);
	}

	private standardHttpCall(httpaddr: string): Observable<any> {
		const headers = ServiceUtilityRoutines.setupHeader();
  		return this.httpClient.get(httpaddr,{ 'headers': headers })
			.pipe(
				catchError(error => {
					if (error.error instanceof ErrorEvent) {
						this.errorMsg = `Error: ${error.error.message}`;
					} else {
						
						this.errorMsg = ServiceUtilityRoutines.getServerErrorMessage(error);
					}
					return of(this.errorMsg);
				}));

	}


}
