import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const checkPassword: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  return { valid: true };
};
