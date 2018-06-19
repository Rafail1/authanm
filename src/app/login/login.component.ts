import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;

    constructor(private http: HttpClient, private router: Router, private notify: NotificationsService) {
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
                    this.notify.success('Успешно!', 'добро пожаловать!)');
                } else {
                    this.notify.error('Ошибка', data.message);
                }
            },
            err => {
                console.log(err);
            },
            () => {
                console.log('all done');
            }
        );
    }

}
