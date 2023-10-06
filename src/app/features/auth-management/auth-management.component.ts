import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InitResetPasswordComponent } from '../../core/components/init-reset-password/init-reset-password.component';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ResetPasswordComponent } from '../../core/components/reset-password/reset-password.component';
import { Store } from '@ngrx/store';
import { resolveAuthManagementErrors } from '../../core/states/error/error.actions';

@Component({
  selector: 'app-auth-management',
  standalone: true,
  imports: [CommonModule, InitResetPasswordComponent, ResetPasswordComponent],
  templateUrl: './auth-management.component.html',
  styleUrls: ['./auth-management.component.scss'],
})
export class AuthManagementComponent implements OnDestroy {
  params?: Params;
  mode?: string;
  email?: string;
  oobCode?: string;
  validCode?: boolean;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private store: Store,
  ) {
    this.route.queryParams
      .pipe(takeUntilDestroyed())
      .subscribe((params) => (this.params = params));

    if (!this.params) return;
    this.mode = this.params['mode'];
    this.email = this.params['email'];
    this.oobCode = this.params['oobCode'];

    if (this.mode === 'resetPassword') {
      this.authenticationService
        .verifyResetPasswordCode(this.oobCode ?? '')
        .then((email) => {
          if (email) {
            this.validCode = true;
            this.email = email;
          } else {
            this.mode = 'initResetPassword';
          }
        });
    }
  }

  ngOnDestroy() {
    this.store.dispatch(resolveAuthManagementErrors());
  }
}
