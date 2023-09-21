import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SignUpStoreFacade } from './sign-up.store-facade';
import { signUpForm } from './sign-up.form';
import { matchPasswords } from './sign-up.validators';

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
  private formBuilder = inject(FormBuilder);
  private store = inject(SignUpStoreFacade);

  registrationForm!: FormGroup;
  errorMessage$ = this.store.errorMessage$;

  ngOnInit() {
    this.registrationForm = this.formBuilder.group(signUpForm, {
      validators: matchPasswords,
    });
  }

  ngOnDestroy() {
    this.store.resolveError();
  }

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
    this.store.signUp({
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      displayName: this.registrationForm.value.displayName,
    });
  }
}
