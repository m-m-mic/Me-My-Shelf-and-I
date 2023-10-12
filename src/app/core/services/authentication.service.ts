import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, from, Observable, take, throwError } from 'rxjs';
import firebase from 'firebase/compat';
import { Store } from '@ngrx/store';
import { resolveError, setErrorMessage } from '../states/error/error.actions';
import { AuthCredentials } from '../models/authCredentials.interface';
import FirebaseError = firebase.FirebaseError;
import UserCredential = firebase.auth.UserCredential;
import { EmailAuthProvider } from 'firebase/auth';

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
    return this.auth.authState;
  }

  async initializeResetPassword(email: string) {
    try {
      this.auth.sendPasswordResetEmail(email);
    } catch {
      return;
    }
  }

  async verifyResetPasswordCode(code: string) {
    try {
      return await this.auth.verifyPasswordResetCode(code);
    } catch {
      this.store.dispatch(
        setErrorMessage({
          error: {
            error: 'verifyOobCode',
            message: 'The authentication code is invalid.',
          },
        }),
      );
      return;
    }
  }

  async resetPassword(code: string, password: string) {
    try {
      this.auth.confirmPasswordReset(code, password);
      return true;
    } catch {
      this.store.dispatch(
        setErrorMessage({
          error: {
            error: 'resetPassword',
            message: 'Password could not be reset.',
          },
        }),
      );
      return;
    }
  }

  updateDisplayName(name: string) {
    this.auth.authState.pipe(take(1)).subscribe((user) => {
      if (user) {
        user.updateProfile({ displayName: name });
      }
    });
  }

  updatePassword(password: string) {
    this.auth.authState.pipe(take(1)).subscribe((user) => {
      if (user) {
        user.updatePassword(password);
      }
    });
  }

  async validatePassword(password: string) {
    const user = await this.auth.currentUser;
    if (!user?.email) {
      throw new Error('Could not find user');
    }

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      const reauth = await user.reauthenticateWithCredential(credential);
      return !!reauth;
    } catch {
      return false;
    }
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
