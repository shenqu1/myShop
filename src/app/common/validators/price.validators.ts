import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PriceValidators {
  static canNotSmallerThanZero(control: AbstractControl): ValidationErrors | null {
    if(control.value < 0)
    return {
      canNotSmallerThanZero: true
    };

    return null;
  }
}
