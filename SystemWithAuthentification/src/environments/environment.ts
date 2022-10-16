// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	useEmulators: true,
	apiURL: 'http://localhost:8080',
	//apiURL: 'localapi',
	firebase: {
		apiKey: 'AIzaSyBFHXqA8MXdv-KbON_IU78BItS9KangM1Y',
		authDomain: 'blurock-database.firebaseapp.com',
		databaseURL: 'http://localhost:8083',
		projectId: 'blurock-database',
		storageBucket: 'blurock-database.appspot.com',
		messagingSenderId: '814571995343',
		appId: '1:814571995343:web:e048df62138c9d76b737ba',
		measurementId: 'YOUR measurementId HERE'
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
