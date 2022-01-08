import {AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors} from "@angular/forms";

export function NameMatchValidator(control: AbstractControl): ValidationErrors | null {

  const wordCount = control.value.toString().split(" ").length

  return wordCount <= 1 ? {nameMatch: true} : null;
}
