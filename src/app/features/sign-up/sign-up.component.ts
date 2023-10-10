import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AsyncPipe, NgIf } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SignUpStoreFacade } from './sign-up.store-facade';
import { signUpForm } from './sign-up.form';
import { AuthValidator } from '../../shared/validators/auth.validator';
import { Title } from '@angular/platform-browser';
import { convertTitle } from '../../shared/converters/title.converter';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
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
  private title = inject(Title);

  registrationForm!: FormGroup;
  errorMessage$ = this.store.errorMessage$;

  ngOnInit() {
    this.registrationForm = this.formBuilder.group(signUpForm, {
      validators: AuthValidator.matchPassword(),
    });
    this.title.setTitle(convertTitle('Sign Up'));
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
