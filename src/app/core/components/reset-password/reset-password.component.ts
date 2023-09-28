import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPasswords } from '../../../features/sign-up/sign-up.validators';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

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

  @Input() email?: string;
  @Input() oobCode?: string;

  passwordFormControl = this.formBuilder.group(
    {
      password: [
        '',
        {
          validators: [Validators.required, Validators.minLength(8)],
          updateOn: 'blur',
        },
      ],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: matchPasswords },
  );

  async resetPassword() {
    if (this.oobCode && this.passwordFormControl.controls['password'].value)
      try {
        await this.authenticationService.resetPassword(
          this.oobCode,
          this.passwordFormControl.controls['password'].value,
        );
        this.router.navigate(['/sign-in']);
      } catch {
        throw new Error('Password reset failed');
      }
  }
}
