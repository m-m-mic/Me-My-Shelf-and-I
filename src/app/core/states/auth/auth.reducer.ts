import { createReducer, on } from '@ngrx/store';
import { AuthToken, initialAuthState } from './auth.state';
import { removeToken, setToken } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(setToken, (state, { token }): AuthToken => token),
  on(removeToken, (): AuthToken => undefined),
);
