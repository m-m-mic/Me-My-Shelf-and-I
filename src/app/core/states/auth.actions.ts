import { createAction, props } from '@ngrx/store';

export const signIn = createAction(
  '[Auth] Sign In',
  props<{ email: string; password: string }>(),
);

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ email: string; password: string; displayName: string }>(),
);

export const signOut = createAction('[Auth] Sign Out');
