import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-verify-email-disclaimer',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './verify-email-disclaimer.component.html',
  styleUrls: ['./verify-email-disclaimer.component.scss'],
})
export class VerifyEmailDisclaimerComponent {
  authenticationService = inject(AuthenticationService);

  @Input() static = false;

  isEmailVerified$ = this.authenticationService.isEmailVerified$;
  isDismissed = false;

  dismiss() {
    this.isDismissed = true;
  }

  sendEmail() {
    this.authenticationService.initializeVerifyEmail();
    if (!this.static) {
      this.dismiss();
    }
  }
}
