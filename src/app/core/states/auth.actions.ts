import { createAction, props } from '@ngrx/store';
import { UserData } from './auth.state';

export const setToken = createAction(
  '[Auth] Set Token',
  props<{ token: string }>(),
);

export const setUser = createAction(
  '[Auth] Set User',
  props<{ user: UserData }>(),
);

export const removeToken = createAction('[Auth] Remove Token');
