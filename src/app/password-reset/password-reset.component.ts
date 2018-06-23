import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotifyService} from '../services/notify.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
    email;
    h;
    passwordConfirm;
    password;
    private sub: any;
    constructor(private http: HttpClient, private notify: NotifyService, private router: Router, private route: ActivatedRoute) { }

    resetPassword() {
        this.http.post('/api/resetPassword', {email: this.email}).subscribe(data => {
            this.notify.notify(data);
        });
    }

    changePassword() {
        this.http.post('/api/changePassword', {
            h: this.h,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
        }).subscribe(data => {
            if (!data['error']) {
                this.router.navigate(['login']);
            }
            this.notify.notify(data);
        });
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.h = params['h'];
        });
    }

}
