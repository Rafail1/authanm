import { Directive, forwardRef, Attribute } from '@angular/core';
import {Validator, AbstractControl, NG_VALIDATORS, Validators} from '@angular/forms';
import {HostValidator} from './host-validator.directive';

@Directive({
    selector: '[appProxyValidate][formControlName],[validateProxy][formControl],[validateProxy][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => ProxyValidator), multi: true }
    ]
})
export class ProxyValidator implements Validator {
    constructor() {
    }


    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        const v = c.value;
        const paddr = c.root.get('proxy_address');
        const plog = c.root.get('proxy_login');
        const ppass = c.root.get('proxy_password');
        const ptype = c.root.get('proxy_type');
        const pport = c.root.get('proxy_port');
        if (!v) {
            if (paddr) {
                paddr.clearValidators();
                paddr.updateValueAndValidity();
            }
            if (plog) {
                plog.clearValidators();
                plog.updateValueAndValidity();
            }
            if (ppass) {
                ppass.clearValidators();
                ppass.updateValueAndValidity();
            }
            if (ptype) {
                ptype.clearValidators();
                ptype.updateValueAndValidity();
            }
            if (pport) {
                pport.clearValidators();
                pport.updateValueAndValidity();
            }
            return null;
        }
        paddr.setValidators(Validators.compose([Validators.required, new HostValidator().validate]));
        paddr.updateValueAndValidity();

        plog.setValidators(Validators.required);
        plog.updateValueAndValidity();

        ppass.setValidators(Validators.required);
        ppass.updateValueAndValidity();

        ptype.setValidators(Validators.required);
        ptype.updateValueAndValidity();

        pport.setValidators(Validators.required);
        pport.updateValueAndValidity();
        return null;

    }
}
