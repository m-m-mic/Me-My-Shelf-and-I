import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from '../../services/authentication.service';
import { Store } from '@ngrx/store';
import { selectErrorMessage } from '../../states/error/error.selectors';

@Component({
  selector: 'app-init-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './init-reset-password.component.html',
  styleUrls: ['./init-reset-password.component.scss'],
})
export class InitResetPasswordComponent implements OnChanges {
  authenticationService = inject(AuthenticationService);
  store = inject(Store);
  @Input() email?: string;

  errorMessage$ = this.store.select(
    selectErrorMessage({ error: 'initResetPassword' }),
  );
  emailForm = new FormControl('', [Validators.required]);
  emailSent = false;

  ngOnChanges(changes: SimpleChanges) {
    if (this.email) {
      this.emailForm.setValue(this.email);
    }
  }

  async sendResetEmail() {
    if (this.emailForm.value) {
      const response = await this.authenticationService.initializeResetPassword(
        this.emailForm.value,
      );
      if (response) this.emailSent = true;
    }
  }
}
