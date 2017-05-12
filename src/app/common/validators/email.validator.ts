import { FormControl, ValidatorFn } from '@angular/forms';

const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

export const EmailValidator: ValidatorFn = (control: FormControl): { [key: string]: boolean; } => {
  if (control.value != '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
    return { 'incorrectMailFormat': true };
  }

  return null;
};
