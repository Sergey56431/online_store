import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[repeatPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: RepeatPasswordDirective, multi: true}]
})
export class RepeatPasswordDirective implements Validator{

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordRepeat = control.get('repeatPassword');

    if (password?.value !== passwordRepeat?.value){
      passwordRepeat?.setErrors({passwordRepeat: true});
      return {passwordRepeat: true};
    }
    return null;
  }

}
