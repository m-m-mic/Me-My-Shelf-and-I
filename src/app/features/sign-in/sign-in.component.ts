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
import { Title } from '@angular/platform-browser';
import { convertTitle } from '../../shared/converters/title.converter';

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
  private title = inject(Title);

  loginForm!: FormGroup;
  errorMessage$ = this.store.errorMessage$;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.title.setTitle(convertTitle('Sign In'));
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
