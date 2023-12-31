import { createReducer, on } from '@ngrx/store';
import { ErrorState, initialErrorState } from './error.state';
import {
  resolveAuthManagementErrors,
  resolveError,
  setErrorMessage,
} from './error.actions';

export const errorReducer = createReducer(
  initialErrorState,
  on(setErrorMessage, (state, { error }): ErrorState => {
    const errorArray = [...state];
    for (let i = 0; i < errorArray.length; i++) {
      if (errorArray[i] && errorArray[i].error === error.error) {
        errorArray[i] = error;
        return errorArray;
      }
    }
    errorArray.push(error);
    return errorArray;
  }),
  on(resolveError, (state, { errorType }): ErrorState => {
    const errorArray = [...state];
    for (let i = 0; i < errorArray.length; i++) {
      if (errorArray[i] && errorArray[i].error === errorType) {
        delete errorArray[i];
      }
    }
    return errorArray;
  }),
  on(resolveAuthManagementErrors, (state): ErrorState => {
    const errorTypes = ['resetPassword'];
    const errorArray = [...state];
    for (let i = 0; i < errorArray.length; i++) {
      errorTypes.forEach((error) => {
        if (errorArray[i] && errorArray[i].error === error) {
          delete errorArray[i];
        }
      });
    }
    return errorArray;
  }),
);
