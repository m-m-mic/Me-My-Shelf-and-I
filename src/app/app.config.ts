import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ROUTES } from './app.routes';
import { provideStore } from '@ngrx/store';
import { authReducer } from './core/states/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './core/states/auth.effects';
import { environment } from '../environments/environment';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireAuthModule),
    provideRouter(ROUTES),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
