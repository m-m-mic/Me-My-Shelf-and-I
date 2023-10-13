import { createAction, props } from '@ngrx/store';
import firebase from 'firebase/compat';
import UserCredential = firebase.auth.UserCredential;

export const signIn = createAction(
  '[Auth] Sign In',
  props<{ email: string; password: string }>(),
);

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ email: string; password: string; displayName: string }>(),
);

export const signOut = createAction('[Auth] Sign Out');

export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<{ redirect: boolean }>(),
);

export const authFailure = createAction('[Auth] Auth Failure');
