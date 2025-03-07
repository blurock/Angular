import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
 import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';


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
      {provide: AuthService, useClass: AuthService},
      provideFirestore(() => getFirestore())

    ]
};
