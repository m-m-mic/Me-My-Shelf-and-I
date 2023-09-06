import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../../shared/styles/form.scss'],
  imports: [
    ButtonModule,
    InputTextModule,
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class SignUpComponent implements OnInit {
  registrationForm!: FormGroup;
  isFetching = false;
  isError = false;
  errorMessage = 'An unexpected error occurred.';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group(
      {
        email: ['', [Validators.required]],
        password: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(8),
              this.verifyPasswordStrength,
            ],
            updateOn: 'blur',
          },
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.matchPasswords },
    );
  }

  matchPasswords: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ||
      password === '' ||
      confirmPassword === ''
      ? null
      : { notSame: true };
  };

  verifyPasswordStrength: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const password = control.value;
    if (!password) {
      return null;
    }
    const hasUpperCase = /[A-Z]+/.test(password);
    const hasLowerCase = /[a-z]+/.test(password);
    const hasNumeric = /[0-9]+/.test(password);
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
    return passwordValid ? null : { insufficientStrength: true };
  };

  get email() {
    return this.registrationForm.controls['email'];
  }

  get password() {
    return this.registrationForm.controls['password'];
  }

  signUp() {
    this.isFetching = true;
    this.isError = false;
    this.authenticationService
      .signUpWithEmailPassword(
        this.registrationForm.value.email,
        this.registrationForm.value.password,
      )
      .subscribe({
        next: (res) => console.log(res),
        error: (error) => {
          this.isError = true;
          this.isFetching = false;
          this.errorMessage = error.message;
        },
      });
  }
}
