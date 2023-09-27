import {
  Component,
  DestroyRef,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthenticationService } from '../../core/services/authentication.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  authenticationService = inject(AuthenticationService);
  destroyRef = inject(DestroyRef);

  currentDisplayName?: string | undefined;
  displayNameFormControl = new FormControl(
    { value: '', disabled: true },
    {
      validators: [Validators.required, Validators.maxLength(12)],
    },
  );

  constructor() {
    this.authenticationService
      .getUser()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((user) => {
          if (user) this.displayNameFormControl.setValue(user.displayName);
        }),
      )
      .subscribe((user) => {
        this.currentDisplayName = user?.displayName ?? undefined;
      });
  }

  toggleDisplayNameDisabled() {
    if (this.displayNameFormControl.disabled) {
      this.displayNameFormControl.enable();
    } else {
      this.displayNameFormControl.setValue(this.currentDisplayName ?? '');
      this.displayNameFormControl.disable();
    }
  }

  updateDisplayName() {
    if (this.displayNameFormControl.value) {
      this.authenticationService.updateDisplayName(
        this.displayNameFormControl.value,
      );
      this.displayNameFormControl.disable();
    }
  }
}
