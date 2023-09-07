import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(selectAuth, (state) => state.token);
export const selectIsLoggedIn = createSelector(
  selectAuth,
  (state) => !!state.token,
);
export const selectUserData = createSelector(selectAuth, (state) => state.user);
