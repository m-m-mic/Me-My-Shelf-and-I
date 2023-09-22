import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './core/states/auth/auth.effects';
import { environment } from '../environments/environment';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthenticationGuard } from './core/services/authentication.guard';
import { errorReducer } from './core/states/error/error.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      AgGridModule,
    ),
    provideRouter(ROUTES),
    provideStore({ error: errorReducer }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimations(),
    AuthenticationGuard,
  ],
};
