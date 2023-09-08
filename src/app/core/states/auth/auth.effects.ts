import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { AuthenticationService } from '../../services/authentication.service';
import { signIn, signUp, signOut, setToken } from './auth.actions';
import { map, mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store,
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
              this.router.navigate(['/welcome']);
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );

  init$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        mergeMap(() => {
          return this.authenticationService
            .getUser()
            .pipe(
              map(
                (user) =>
                  user
                    ?.getIdToken()
                    .then((token) =>
                      this.store.dispatch(setToken({ token: token })),
                    ),
              ),
            );
        }),
      );
    },
    { dispatch: false },
  );
}
