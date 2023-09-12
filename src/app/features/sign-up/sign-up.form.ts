import { Validators } from '@angular/forms';

export const signUpForm = {
  displayName: ['', [Validators.required, Validators.maxLength(12)]],
  email: ['', [Validators.required, Validators.email]],
  password: [
    '',
    {
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: 'blur',
    },
  ],
  confirmPassword: ['', [Validators.required]],
};
