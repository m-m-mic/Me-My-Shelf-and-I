import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import { removeToken, setToken, setUser } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(setToken, (state, { token }): AuthState => ({ ...state, token })),
  on(removeToken, (state): AuthState => ({ ...state, token: '' })),
  on(setUser, (state, { user }): AuthState => ({ ...state, user })),
);
