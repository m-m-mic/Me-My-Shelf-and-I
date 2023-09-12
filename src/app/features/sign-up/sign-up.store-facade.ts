import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectErrorMessage } from '../../core/states/error/error.selectors';
import { resolveError } from '../../core/states/error/error.actions';
import { SignUpCredentials } from '../../shared/types/authCredentials.type';
import { signUp } from '../../core/states/auth/auth.actions';

@Injectable({ providedIn: 'root' })
export class SignUpStoreFacade {
  private store = inject(Store);
  errorMessage$ = this.store.select(selectErrorMessage({ error: 'signUp' }));

  resolveError() {
    this.store.dispatch(resolveError({ errorType: 'signUp' }));
  }

  signUp({ email, password, displayName }: SignUpCredentials) {
    this.store.dispatch(signUp({ email, password, displayName }));
  }
}
