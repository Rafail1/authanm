import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotificationsService} from 'angular2-notifications';

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
    constructor(private http: HttpClient, private notify: NotificationsService) {}

    register(form) {
        this.http.post<any>('/api/register', {
            email: this.email,
            name: this.name,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
        }).subscribe(
                data => {
                    if (!data.error) {
                        form.reset();
                        this.notify.success('Успешно!', data['message']);
                    } else {
                        this.notify.error(
                            'Ошибка',
                            data.message
                        );
                    }
                }
            );
    }

    ngOnInit() {
    }

}
