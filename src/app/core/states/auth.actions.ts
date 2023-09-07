import { createAction, props } from '@ngrx/store';
import { AuthState, UserData } from './auth.state';

export const setToken = createAction(
  '[Auth] Set Token',
  props<{ token: string }>(),
);

export const setUser = createAction(
  '[Auth] Set User',
  props<{ user: UserData }>(),
);

export const removeToken = createAction('[Auth] Remove Token');

export const signIn = createAction(
  '[Auth] Sign In',
  props<{ email: string; password: string }>(),
);

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ email: string; password: string }>(),
);

export const successfulAuthentication = createAction(
  '[Auth] Successful Authentication',
  props<{ data: AuthState; redirect: boolean }>(),
);

export const signOut = createAction('[Auth] Sign Out');
