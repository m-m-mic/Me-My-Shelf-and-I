import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InitResetPasswordComponent } from '../../core/components/init-reset-password/init-reset-password.component';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ResetPasswordComponent } from '../../core/components/reset-password/reset-password.component';
import { Store } from '@ngrx/store';
import { resolveAuthManagementErrors } from '../../core/states/error/error.actions';
import { tap } from 'rxjs';
import { VerifyEmailComponent } from '../../core/components/verify-email/verify-email.component';

@Component({
  selector: 'app-auth-management',
  standalone: true,
  imports: [
    CommonModule,
    InitResetPasswordComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
  ],
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
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store,
  ) {
    this.route.queryParams
      .pipe(
        takeUntilDestroyed(),
        tap((params) => (this.params = params)),
      )
      .subscribe();

    const routerData = this.router.getCurrentNavigation()?.extras.state;

    this.email = routerData ? routerData['email'] : '';

    if (!this.params) return;
    this.mode = this.params['mode'];
    this.oobCode = this.params['oobCode'];

    this.handleMode();
  }

  handleMode() {
    switch (this.mode) {
      case 'resetPassword':
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
        return;
      case 'initResetPassword':
        return;
      case 'verifyEmail':
        this.authenticationService
          .verifyEmail(this.oobCode ?? '')
          .then((result) => {
            this.authenticationService.authUser$.subscribe((user) =>
              console.log(user?.emailVerified),
            );
            this.validCode = result;
          });
        return;
    }

    this.router.navigate(['/404']);
  }

  ngOnDestroy() {
    this.store.dispatch(resolveAuthManagementErrors());
  }
}
