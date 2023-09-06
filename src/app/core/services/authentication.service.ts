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
        throwError(() => new Error(this.convertFirebaseError(err))),
      ),
    );
  }

  private convertFirebaseError(error: FirebaseError) {
    if (
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/wrong-password' ||
      error.code === 'auth/invalid-email'
    ) {
      return 'Entered email or password is incorrect.';
    }
    return 'An unexpected error occurred';
  }
}
