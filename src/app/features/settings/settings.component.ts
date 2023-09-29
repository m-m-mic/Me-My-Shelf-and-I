import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthenticationService } from '../../core/services/authentication.service';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PasswordModule } from 'primeng/password';
import { AuthValidator } from '../../shared/validators/auth.validator';
import { passwordForm } from './settings.form';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  authenticationService = inject(AuthenticationService);
  destroyRef = inject(DestroyRef);
  formBuilder = inject(FormBuilder);

  email?: string | undefined;
  displayName?: string | undefined;

  displayNameFormControl = new FormControl(
    { value: '', disabled: true },
    {
      validators: [Validators.required, Validators.maxLength(12)],
    },
  );
  passwordFormControl = this.formBuilder.group(
    passwordForm(this.authenticationService),
    {
      validators: AuthValidator.matchPassword(),
    },
  );

  constructor() {
    this.passwordFormControl.disable();
    this.authenticationService
      .getUser()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((user) => {
          if (user) this.displayNameFormControl.setValue(user.displayName);
        }),
      )
      .subscribe((user) => {
        this.displayName = user?.displayName ?? undefined;
        this.email = user?.email ?? undefined;
      });
  }

  toggleDisplayNameDisabled() {
    if (this.displayNameFormControl.disabled) {
      this.displayNameFormControl.enable();
    } else {
      this.displayNameFormControl.setValue(this.displayName ?? '');
      this.displayNameFormControl.disable();
    }
  }

  updateDisplayName() {
    if (this.displayNameFormControl.value) {
      this.authenticationService.updateDisplayName(
        this.displayNameFormControl.value,
      );
      this.displayNameFormControl.disable();
    }
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
