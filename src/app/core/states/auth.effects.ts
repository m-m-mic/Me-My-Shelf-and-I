import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '../services/authentication.service';
import {
  signIn,
  setToken,
  signUp,
  successfulAuthentication,
  setUser,
  signOut,
} from './auth.actions';
import { map, mergeMap, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthState } from './auth.state';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signIn),
      mergeMap(({ email, password }) => {
        return this.authenticationService
          .signInWithEmailPassword(email, password)
          .pipe(
            tap((res) => {
              this.cookieService.set('token', res.token);
            }),
            map((res) => {
              const data: AuthState = {
                token: res.user._delegate.accessToken,
                user: {
                  uid: res.user._delegate.uid,
                  displayName: res.user._delegate.displayName
                    ? res.user._delegate.displayName
                    : '',
                  email: res.user._delegate.email,
                },
              };
              return successfulAuthentication({ data, redirect: true });
            }),
          );
      }),
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUp),
      mergeMap(({ email, password }) => {
        return this.authenticationService.signUpWithEmailPassword(
          email,
          password,
        );
      }),
    );
  });

  signOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signOut),
        mergeMap(() => {
          return this.authenticationService.signOut().pipe(
            tap(() => {
              this.cookieService.delete('token');
              this.cookieService.delete('userData');
              // TODO: delete tokens
              this.router.navigate(['/']);
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );

  successfulAuthentication$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(successfulAuthentication),
        tap(({ data, redirect }) => {
          this.cookieService.set('token', data.token);
          this.cookieService.set('userData', JSON.stringify(data.user));
          setToken({ token: data.token });
          setUser({ user: data.user });
          if (redirect) this.router.navigate(['/']);
        }),
      );
    },
    { dispatch: false },
  );
}
