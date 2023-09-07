import { Component, OnInit } from '@angular/core';
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
import { signIn } from '../../core/states/auth.actions';

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
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  isError = false;
  errorMessage = 'An unexpected error occurred.';

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

  signIn() {
    this.store.dispatch(
      signIn({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }),
    );
  }
}
