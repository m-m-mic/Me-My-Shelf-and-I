import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from '../../core/services/authentication.service';
import { RouterLink } from '@angular/router';

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
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  @Input() email = '';
  @Input() password = '';
  areCredentialsIncorrect = false;
  errorMessage = 'An unexpected error occurred.';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  signIn() {
    this.authenticationService
      .signInWithEmailPassword(
        this.loginForm.value.email,
        this.loginForm.value.password,
      )
      .subscribe({
        next: () => console.log('success!'),
        error: (error) => {
          this.areCredentialsIncorrect = true;
          this.errorMessage = error.message;
        },
      });
  }
}
