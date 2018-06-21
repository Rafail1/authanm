import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterService} from '../services/auth/register.service';
import {NotifyService} from '../services/notify.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    password: string;
    passwordConfirm: string;
    email: string;
    name: string;
    submitted: boolean;
    message: string;
    unconfirmed: boolean;
    constructor(private http: HttpClient, private notify: NotifyService, private rService: RegisterService) {

    }

    register() {
        this.rService.register({
            email: this.email,
            name: this.name,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
        }).subscribe(data => {
            if (data.error && data.code === 'resend') {
                this.unconfirmed = true;
            }
            this.notify.notify(data);
        });
    }
    resend() {
        if (!this.email) {
            this.notify.notify({error: true, message: 'отсутствует email'});
            return;
        }
        this.rService.resend(this.email).subscribe(data => { this.notify.notify(data); });
    }

    ngOnInit() {
    }

}
