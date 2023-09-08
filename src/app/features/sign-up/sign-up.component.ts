import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AsyncPipe, NgIf } from '@angular/common';
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
import { Store } from '@ngrx/store';
import { signUp } from '../../core/states/auth/auth.actions';
import { resolveError } from '../../core/states/error/error.actions';
import { selectErrorMessage } from '../../core/states/error/error.selectors';

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
    AsyncPipe,
  ],
})
export class SignUpComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
  errorMessage$ = this.store.select(selectErrorMessage({ error: 'signUp' }));

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group(
      {
        displayName: ['', [Validators.required, Validators.maxLength(12)]],
        email: ['', [Validators.required, Validators.email]],
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

  ngOnDestroy() {
    this.errorMessage$.subscribe((value) => {
      if (value) this.store.dispatch(resolveError({ errorType: 'signIn' }));
    });
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

  get displayName() {
    return this.registrationForm.controls['displayName'];
  }

  get email() {
    return this.registrationForm.controls['email'];
  }

  get password() {
    return this.registrationForm.controls['password'];
  }

  signUp() {
    this.store.dispatch(
      signUp({
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        displayName: this.registrationForm.value.displayName,
      }),
    );
  }
}
