import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { passwordForm } from '../../../features/settings/settings.form';
import { AuthValidator } from '../../../shared/validators/auth.validator';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  authenticationService = inject(AuthenticationService);
  formBuilder = inject(FormBuilder);

  passwordFormControl = this.formBuilder.group(
    passwordForm(this.authenticationService),
    {
      validators: AuthValidator.matchPassword(),
    },
  );

  constructor() {
    this.passwordFormControl.disable();
  }

  togglePasswordDisabled() {
    if (this.passwordFormControl.disabled) {
      this.passwordFormControl.enable();
    } else {
      this.passwordFormControl.reset();
      this.passwordFormControl.disable();
    }
  }

  updatePassword() {
    const password = this.passwordFormControl.controls['password'].value;
    if (password) {
      this.authenticationService.updatePassword(password);
      this.togglePasswordDisabled();
    }
  }
}
