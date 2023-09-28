import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPasswords } from '../../../features/sign-up/sign-up.validators';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { selectErrorMessage } from '../../states/error/error.selectors';
import { Store } from '@ngrx/store';
import { resetPasswordForm } from './reset-password.form';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  authenticationService = inject(AuthenticationService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  store = inject(Store);

  @Input() email?: string;
  @Input() oobCode?: string;

  passwordFormControl = this.formBuilder.group(resetPasswordForm, {
    validators: matchPasswords,
  });
  errorMessage$ = this.store.select(
    selectErrorMessage({ error: 'resetPassword' }),
  );

  async resetPassword() {
    if (this.oobCode && this.passwordFormControl.controls['password'].value) {
      const response = await this.authenticationService.resetPassword(
        this.oobCode,
        this.passwordFormControl.controls['password'].value,
      );
      if (response) this.router.navigate(['/sign-in']);
    }
  }
}
