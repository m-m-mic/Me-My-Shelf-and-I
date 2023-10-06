import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';

export class AuthValidator {
  static matchPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password === confirmPassword ||
        password === '' ||
        confirmPassword === ''
        ? null
        : { notSame: true };
    };
  }

  static checkPassword(
    authenticationService: AuthenticationService,
  ): AsyncValidatorFn {
    return async (
      control: AbstractControl,
    ): Promise<ValidationErrors | null> => {
      const reauth = await authenticationService.validatePassword(
        control.value,
      );
      return reauth ? null : { wrongPassword: true };
    };
  }
}
