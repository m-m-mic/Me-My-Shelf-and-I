import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, from, Observable, throwError } from 'rxjs';
import firebase from 'firebase/compat';
import FirebaseError = firebase.FirebaseError;
import { Store } from '@ngrx/store';
import { resolveError, setErrorMessage } from '../states/error/error.actions';
import { AuthCredentials } from '../models/authCredentials.interface';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  auth = inject(AngularFireAuth);
  store = inject(Store);
  authUser$ = this.auth.authState;

  signIn({ email, password }: AuthCredentials): Observable<UserCredential> {
    this.store.dispatch(resolveError({ errorType: 'signIn' }));
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      catchError((err) =>
        throwError(() =>
          this.store.dispatch(
            setErrorMessage({
              error: {
                error: 'signIn',
                message: this.convertSignInError(err),
              },
            }),
          ),
        ),
      ),
    );
  }

  signUp({ email, password }: AuthCredentials) {
    this.store.dispatch(resolveError({ errorType: 'signUp' }));
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      catchError((err: FirebaseError) =>
        throwError(() =>
          this.store.dispatch(
            setErrorMessage({
              error: { error: 'signUp', message: this.convertSignUpError(err) },
            }),
          ),
        ),
      ),
    );
  }

  signOut() {
    return from(this.auth.signOut());
  }

  getUser() {
    return from(this.auth.authState);
  }

  convertSignUpError(error: FirebaseError): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'The entered email is already in use.';
      case 'auth/invalid-email':
        return 'The entered email is invalid.';
      case 'auth/weak-password':
        return 'The entered password is not strong enough.';
      default:
        return 'An unexpected error occurred.';
    }
  }

  convertSignInError(error: FirebaseError): string {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'Entered email or password is incorrect.';
      case 'auth/wrong-password':
        return 'Entered email or password is incorrect.';
      case 'auth/invalid-email':
        return 'Entered email or password is incorrect.';
      case 'auth/user-disabled':
        return 'The entered account is currently disabled.';
      default:
        return 'An unexpected error occurred.';
    }
  }
}
