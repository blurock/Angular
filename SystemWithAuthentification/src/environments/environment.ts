// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://localhost:8080',
  firebase: {
    apiKey: 'AIzaSyCI6851gPulMki7d4oSVlMkAaolt8o_Br0',
    authDomain: 'blurock-firebase.firebaseapp.com',
    databaseURL: 'https://blurock-firebase.firebaseio.com',
    projectId: 'blurock-firebase',
    storageBucket: 'blurock-firebase.appspot.com',
    messagingSenderId: '814571995343',
    appId: '1:814571995343:web:e048df62138c9d76b737ba',
    measurementId: 'YOUR measurementId HERE',
    
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
