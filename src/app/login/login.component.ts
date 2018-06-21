import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RegisterService} from '../services/auth/register.service';
import {NotifyService} from '../services/notify.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email: string;
    unconfirmed: boolean;
    password: string;

    constructor(private http: HttpClient, private rService: RegisterService, private router: Router, private notif: NotifyService) {
    }

    ngOnInit() {
    }

    login() {
        this.http.post<any>('/api/login', {
            email: this.email,
            password: this.password,
        }).subscribe(
            data => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    this.router.navigate(['/home']);
                    this.notif.notify({message: 'добро пожаловать!)'});
                } else {
                    if (data.code === 'resend') {
                        this.unconfirmed = true;
                    }
                    this.notif.notify(data);
                }
            }
        );
    }
    resend() {
        this.rService.resend(this.email).subscribe(data => { this.notif.notify(data); });
    }

}
