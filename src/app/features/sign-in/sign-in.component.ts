import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [
    RouterModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  @Input() email = '';
  @Input() password = '';
  areInputsValid = false;
  areCredentialsIncorrect = false;

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
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => console.log('success!'),
        error: (error) => {
          this.areCredentialsIncorrect = true;
          console.log(error);
        },
      });
  }
}
