import { Validators } from '@angular/forms';

export const resetPasswordForm = {
  password: [
    '',
    {
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: 'blur',
    },
  ],
  confirmPassword: ['', [Validators.required]],
};
