import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectErrorMessage } from '../../core/states/error/error.selectors';
import { resolveError } from '../../core/states/error/error.actions';
import { AuthCredentials } from '../../core/models/authCredentials.interface';
import { signIn } from '../../core/states/auth/auth.actions';

@Injectable({ providedIn: 'root' })
export class SignInStoreFacade {
  private store = inject(Store);
  errorMessage$ = this.store.select(selectErrorMessage({ error: 'signIn' }));

  resolveError() {
    this.store.dispatch(resolveError({ errorType: 'signIn' }));
  }

  signIn({ email, password }: AuthCredentials) {
    this.store.dispatch(signIn({ email, password }));
  }
}
