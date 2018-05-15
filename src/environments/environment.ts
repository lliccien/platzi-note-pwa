// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBK0zeRT9oLxoUMdSVK6X1PlIbicuQxXvw',
    authDomain: 'pwa-platzi.firebaseapp.com',
    databaseURL: 'https://pwa-platzi.firebaseio.com',
    projectId: 'pwa-platzi',
    storageBucket: 'pwa-platzi.appspot.com',
    messagingSenderId: '487895962777'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
