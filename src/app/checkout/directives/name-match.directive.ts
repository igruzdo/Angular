import { Directive } from '@angular/core';
import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {NameMatchValidator} from "../../validators/nameMatch.validator";

@Directive({
  selector: '[appNameMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NameMatchDirective,
      multi: true
    }
  ]
})
export class NameMatchDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {

    return NameMatchValidator(control)
  }
  constructor() { }

}
