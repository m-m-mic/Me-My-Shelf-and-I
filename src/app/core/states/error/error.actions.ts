import { createAction, props } from '@ngrx/store';
import { ErrorType } from './error.state';

export const setErrorMessage = createAction(
  '[Error] Set Error',
  props<{ error: ErrorType }>(),
);

export const resolveError = createAction(
  '[Error] Resolve Error',
  props<{ errorType: string }>(),
);

export const resolveAllErrors = createAction('[Error] Resolve all errors');
