import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '../../services/authentication.service';
import {
  signIn,
  signUp,
  signOut,
  authSuccess,
  authFailure,
} from './auth.actions';
import { exhaustMap, map, mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  private usersService = inject(UsersService);

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signIn),
      exhaustMap(({ email, password }) => {
        return this.authenticationService.signIn({ email, password }).pipe(
          map((result) => {
            if (result.user) {
              return authSuccess({ redirect: true });
            } else {
              return authFailure();
            }
          }),
        );
      }),
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUp),
      exhaustMap(({ email, password, displayName }) => {
        return this.authenticationService.signUp({ email, password }).pipe(
          map((result) => {
            if (result.user) {
              result.user?.updateProfile({ displayName: displayName });
              this.usersService.create(result.user.uid);
              return authSuccess({ redirect: true });
            } else {
              return authFailure();
            }
          }),
        );
      }),
    );
  });

  authSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authSuccess),
        tap(({ redirect }) => {
          if (redirect) this.router.navigate(['/']);
        }),
      );
    },
    { dispatch: false },
  );

  authFailure$ = createEffect(
    () => {
      return this.actions$.pipe(ofType(authFailure));
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
}
