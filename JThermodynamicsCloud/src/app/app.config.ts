import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthService } from 'systemprimitives';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { API_CONFIG } from 'systemprimitives';
import { VISUALIZATION_MAPPING } from 'systemprimitives';

const firebaseconst = environment.firebase;

export const appConfig: ApplicationConfig = {
	providers:
		//[provideZoneChangeDetection({ eventCoalescing: true })]

		[
			BrowserModule,
			provideRouter(routes),
			provideHttpClient(),
			provideAnimationsAsync(),
			provideAnimations(),
			provideFirebaseApp(() => initializeApp(environment.firebase)),
			provideAuth(() => getAuth()),
			{ provide: AuthService, useClass: AuthService },
			provideFirestore(() => getFirestore()),
			{ provide: API_CONFIG, useValue: environment.apiURL },
			{
				provide: VISUALIZATION_MAPPING,
				useValue: {
					// We use an arrow function with a dynamic import
					'dataset:RepositoryFileStaging': () =>
						import('./catalogobjects/repository/datasetrepositoryfilestaging/datasetrepositoryfilestaging.component').then(m => m.DatasetrepositoryfilestagingComponent),

					'dataset:RepositoryParsedToFixedBlockSize': () =>
						import('./catalogobjects/repository/repositorydatapartitionblock/repositorydatapartitionblock.component').then(m => m.RepositorydatapartitionblockComponent),

					'dataset:JThermodynamicsSymmetryStructureDefinitionDataSet': () =>
						import('./catalogobjects/thermodynamics/jthermodynamicssymmetrystructuredefinition/jthermodynamicssymmetrystructuredefinition.component').then(m => m.JthermodynamicssymmetrystructuredefinitionComponent),

					'dataset:JThermodynamicsSymmetryStructureDefinitionDatabase': () =>
						import('./catalogobjects/thermodynamics/jthermodynamicssymmetrystructuredefinition/jthermodynamicssymmetrystructuredefinition.component').then(m => m.JthermodynamicssymmetrystructuredefinitionComponent),

					'dataset:ThermodynamicBensonRuleDefinitionDataSet': () =>
						import('./catalogobjects/thermodynamics/thermodynamicbensonruledefinition/thermodynamicbensonruledefinition.component').then(m => m.ThermodynamicbensonruledefinitionComponent),

					'dataset:ThermodynamicBensonRuleDefinitionDatabase': () =>
						import('./catalogobjects/thermodynamics/thermodynamicbensonruledefinition/thermodynamicbensonruledefinition.component').then(m => m.ThermodynamicbensonruledefinitionComponent),

					'dataset:RepositoryTherGasThermodynamicsBlock': () =>
						import('./catalogobjects/repository/partition/repositorythergasthermodynamicsblock/repositorythergasthermodynamicsblock.component').then(m => m.RepositorythergasthermodynamicsblockComponent),

					'dataset:JThermodynamicsMetaAtomDefinitionDataSet': () =>
						import('./catalogobjects/thermodynamics/jthermodynamicsmetaatomdefinition/jthermodynamicsmetaatomdefinition.component').then(m => m.JthermodynamicsmetaatomdefinitionComponent),

					'dataset:JThermodynamicsMetaAtomDefinitionDatabase': () =>
						import('./catalogobjects/thermodynamics/jthermodynamicsmetaatomdefinition/jthermodynamicsmetaatomdefinition.component').then(m => m.JthermodynamicsmetaatomdefinitionComponent),

					'dataset:JThermodynamics2DSubstructureThermodynamicsDataSet': () =>
						import('./catalogobjects/thermodynamics/jthermodynamics2dsubstructurethermodynamics/jthermodynamics2dsubstructurethermodynamics.component').then(m => m.Jthermodynamics2dsubstructurethermodynamicsComponent),

					'dataset:JThermodynamics2DSubstructureThermodynamicsDatabase': () =>
						import('./catalogobjects/thermodynamics/jthermodynamics2dsubstructurethermodynamics/jthermodynamics2dsubstructurethermodynamics.component').then(m => m.Jthermodynamics2dsubstructurethermodynamicsComponent),

					'dataset:JThermodynamicsVibrationalStructureDataSet': () =>
						import('./catalogobjects/thermodynamics/jthermodynamicsvibrationalstructure/jthermodynamicsvibrationalstructure.component').then(m => m.JthermodynamicsvibrationalstructureComponent),

					'dataset:JThermodynamicsVibrationalStructureDatabase': () =>
						import('./catalogobjects/thermodynamics/jthermodynamicsvibrationalstructure/jthermodynamicsvibrationalstructure.component').then(m => m.JthermodynamicsvibrationalstructureComponent),

					'dataset:JThermodynamicsDisassociationEnergyOfStructureDataSet': () =>
						import('./catalogobjects/thermodynamics/jthermodynamicdisassociationenergy/jthermodynamicdisassociationenergy.component').then(m => m.JthermodynamicdisassociationenergyComponent),

					'dataset:JThermodynamicsDisassociationEnergyOfStructureDatabase': () =>
						import('./catalogobjects/thermodynamics/jthermodynamicdisassociationenergy/jthermodynamicdisassociationenergy.component').then(m => m.JthermodynamicdisassociationenergyComponent),
				}
			}
		]
};
