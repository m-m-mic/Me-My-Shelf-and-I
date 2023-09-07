import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '../services/authentication.service';
import { signIn, signUp, signOut } from './auth.actions';
import { mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  signIn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signIn),
        mergeMap(({ email, password }) => {
          return this.authenticationService
            .signInWithEmailPassword(email, password)
            .pipe(
              tap(() => {
                this.router.navigate(['/']);
              }),
            );
        }),
      );
    },
    { dispatch: false },
  );

  signUp$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signUp),
        mergeMap(({ email, password, displayName }) => {
          return this.authenticationService
            .signUpWithEmailPassword(email, password, displayName)
            .pipe(
              tap(() => {
                this.router.navigate(['/']);
              }),
            );
        }),
      );
    },
    { dispatch: false },
  );

  signOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signOut),
        mergeMap(() => {
          return this.authenticationService.signOut().pipe(
            tap(() => {
              this.router.navigate(['/']);
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );
}
