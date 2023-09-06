import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AngularFireModule.initializeApp({
        apiKey: 'AIzaSyBD1TWB0-MsRtLRkoVnfRyCm7bGs-XynV0',
        authDomain: 'me-my-shelf-and-i-d39be.firebaseapp.com',
        projectId: 'me-my-shelf-and-i-d39be',
        storageBucket: 'me-my-shelf-and-i-d39be.appspot.com',
        messagingSenderId: '543850357871',
        appId: '1:543850357871:web:cc08a8008229cfe3bed99a',
        measurementId: 'G-54GPBQRJ54',
      }),
      AngularFireAuthModule,
    ),
    provideRouter(ROUTES),
  ],
};
