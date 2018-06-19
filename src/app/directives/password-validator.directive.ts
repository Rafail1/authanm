import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[appValidatePass][formControlName],[validatePass][formControl],[validatePass][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => PassValidator), multi: true }
    ]
})
export class PassValidator implements Validator {
    constructor(@Attribute('validatePass') public validatePass: string) {
    }

    validate(c: AbstractControl): { [key: string]: any } {
        const v = c.value;
        if (v && v.length < 7) {
            return {
                validatePass: false
            };
        }
        return null;
    }
}
