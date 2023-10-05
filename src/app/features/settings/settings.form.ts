import { AuthenticationService } from '../../core/services/authentication.service';
import { Validators } from '@angular/forms';
import { AuthValidator } from '../../shared/validators/auth.validator';

export const passwordForm = (authenticationService: AuthenticationService) => {
  return {
    originalPassword: [
      '',
      {
        validators: [Validators.required],
        updateOn: 'blur',
        asyncValidators: [AuthValidator.checkPassword(authenticationService)],
      },
    ],
    password: [
      '',
      {
        validators: [Validators.required, Validators.minLength(8)],
        updateOn: 'blur',
      },
    ],
    confirmPassword: ['', [Validators.required]],
  };
};
