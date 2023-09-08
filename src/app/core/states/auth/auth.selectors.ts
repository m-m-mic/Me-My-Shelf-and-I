import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthToken } from './auth.state';

export const selectAuth = createFeatureSelector<AuthToken>('auth');

export const selectToken = createSelector(selectAuth, (state) => state);
