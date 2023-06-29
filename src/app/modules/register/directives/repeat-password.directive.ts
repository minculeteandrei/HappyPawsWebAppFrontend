import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appRepeatPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: RepeatPasswordDirective, multi: true}]
})
export class RepeatPasswordDirective implements Validator {
  @Input('appRepeatPassword') repeatedPassword = '';
  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.repeatedPassword ? 
      (
        this.repeatedPassword !== control.value ? 
        {repeatedPassword: {value: control.value}} : 
        null
      ) : 
      null;
  }
}
