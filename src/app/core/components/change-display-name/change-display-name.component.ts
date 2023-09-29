import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-change-display-name',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './change-display-name.component.html',
  styleUrls: ['./change-display-name.component.scss'],
})
export class ChangeDisplayNameComponent implements OnChanges {
  authenticationService = inject(AuthenticationService);

  @Input() displayName?: string;

  displayNameFormControl = new FormControl(
    { value: '', disabled: true },
    {
      validators: [Validators.required, Validators.maxLength(12)],
    },
  );

  ngOnChanges(changes: SimpleChanges) {
    if (this.displayName)
      this.displayNameFormControl.setValue(this.displayName);
  }

  toggleDisplayNameDisabled() {
    if (this.displayNameFormControl.disabled) {
      this.displayNameFormControl.enable();
    } else {
      this.displayNameFormControl.setValue(this.displayName ?? '');
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
