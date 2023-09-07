import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  BehaviorSubject,
  catchError,
  from,
  map,
  Observable,
  throwError,
} from 'rxjs';
import firebase from 'firebase/compat';
import FirebaseError = firebase.FirebaseError;
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  constructor(
    private auth: AngularFireAuth,
    private usersService: UsersService,
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn.next(true);
      } else {
        this.loggedIn.next(false);
      }
    });
  }

  signInWithEmailPassword(email: string, password: string): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      catchError((err: FirebaseError) =>
        throwError(() => new Error(this.convertSignInError(err))),
      ),
    );
  }

  signUpWithEmailPassword(
    email: string,
    password: string,
    displayName: string,
  ): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      map((result) => {
        result.user?.updateProfile({ displayName: displayName });
        this.usersService.create({
          id: result.user?.uid,
          collection: { games: [], movies: [], music: [] },
        });
      }),
      catchError((err: FirebaseError) =>
        throwError(() => new Error(this.convertSignUpError(err))),
      ),
    );
  }

  signOut(): Observable<any> {
    return from(this.auth.signOut());
  }

  public getUser() {
    return from(this.auth.authState);
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
