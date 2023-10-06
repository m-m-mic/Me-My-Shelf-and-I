import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { SignInStoreFacade } from './sign-in.store-facade';

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
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  private store = inject(SignInStoreFacade);

  loginForm!: FormGroup;
  errorMessage$ = this.store.errorMessage$;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.store.resolveError();
  }

  signIn() {
    this.store.signIn({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
}
