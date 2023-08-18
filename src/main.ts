import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBD5cl7LcCmtcXbx1V-lup89opZkkeKb58',
	authDomain: 'dogs-multiverse.firebaseapp.com',
	projectId: 'dogs-multiverse',
	storageBucket: 'dogs-multiverse.appspot.com',
	messagingSenderId: '1015185813925',
	appId: '1:1015185813925:web:c38f3022836df60325384c',
};

firebase.initializeApp(firebaseConfig);

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));
