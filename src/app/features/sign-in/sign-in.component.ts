import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { signIn } from '../../core/states/auth/auth.actions';
import { selectErrorMessage } from '../../core/states/error/error.selectors';
import { resolveError } from '../../core/states/error/error.actions';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../../shared/styles/form.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  errorMessage$ = this.store.select(selectErrorMessage({ error: 'signIn' }));

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.errorMessage$.subscribe((value) => {
      if (value) this.store.dispatch(resolveError({ errorType: 'signIn' }));
    });
  }

  signIn() {
    this.store.dispatch(
      signIn({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }),
    );
  }
}
