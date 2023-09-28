import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InitResetPasswordComponent } from '../../core/components/init-reset-password/init-reset-password.component';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ResetPasswordComponent } from '../../core/components/reset-password/reset-password.component';

@Component({
  selector: 'app-auth-management',
  standalone: true,
  imports: [CommonModule, InitResetPasswordComponent, ResetPasswordComponent],
  templateUrl: './auth-management.component.html',
  styleUrls: ['./auth-management.component.scss'],
})
export class AuthManagementComponent {
  mode?: string;
  email?: string;
  oobCode?: string;
  validCode?: boolean;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) {
    this.route.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
      if (!params) return;
      this.mode = params['mode'];
      this.email = params['email'];
      this.oobCode = params['oobCode'];

      if (this.mode === 'resetPassword') {
        this.authenticationService
          .verifyResetPasswordCode(this.oobCode ?? '')
          .then((email) => {
            this.validCode = true;
            this.email = email;
          })
          .catch(() => (this.mode = 'initResetPassword'));
      }
    });
  }
}
