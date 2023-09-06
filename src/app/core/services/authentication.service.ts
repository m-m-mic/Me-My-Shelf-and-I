import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, from, Observable, throwError } from 'rxjs';
import firebase from 'firebase/compat';
import FirebaseError = firebase.FirebaseError;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth) {}

  signInWithEmailPassword(email: string, password: string): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      catchError((err: FirebaseError) =>
        throwError(() => new Error(this.convertSignInError(err))),
      ),
    );
  }

  signUpWithEmailPassword(email: string, password: string): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      catchError((err: FirebaseError) =>
        throwError(() => new Error(this.convertSignUpError(err))),
      ),
    );
  }

  private convertSignUpError(error: FirebaseError) {
    if (error.code === 'auth/email-already-in-use') {
      return 'The entered email is already in use.';
    } else if (error.code === 'auth/invalid-email') {
      return 'The entered email is invalid.';
    } else if (error.code === 'auth/weak-password') {
      return 'The entered password is not strong enough.';
    }
    return 'An unexpected error occurred.';
  }

  private convertSignInError(error: FirebaseError) {
    if (
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/wrong-password' ||
      error.code === 'auth/invalid-email'
    ) {
      return 'Entered email or password is incorrect.';
    } else if (error.code === 'auth/user-disabled') {
      return 'The entered account is currently disabled.';
    }
    return 'An unexpected error occurred.';
  }
}
