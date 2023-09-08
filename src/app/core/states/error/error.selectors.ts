import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ErrorState } from './error.state';

export const selectError = createFeatureSelector<ErrorState>('error');

export const selectErrorMessage = (props: { error: string }) =>
  createSelector(selectError, (state) => {
    for (const errorState of state) {
      if (errorState.error === props.error) return errorState.message;
    }
    return undefined;
  });
