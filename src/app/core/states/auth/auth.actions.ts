import { createAction, props } from '@ngrx/store';
import { AuthToken } from './auth.state';

export const setToken = createAction(
  '[Auth] Set Token',
  props<{ token: AuthToken }>(),
);

export const removeToken = createAction('[Auth] Remove Token');

export const signIn = createAction(
  '[Auth] Sign In',
  props<{ email: string; password: string }>(),
);

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ email: string; password: string; displayName: string }>(),
);

export const signOut = createAction('[Auth] Sign Out');
