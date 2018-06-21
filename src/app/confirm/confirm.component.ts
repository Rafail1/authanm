import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-confirm',
    template: '',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit, OnDestroy {
    private sub: any;

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private auth: AuthService,
                private notify: NotificationsService) {
    }

    ngOnInit() {
        if (this.auth.isAuthenticated()) {
            return this.router.navigate(['/login']);
        }
        this.sub = this.route.params.subscribe(params => {
            if (params['h']) {
                this.http.post('/api/confirm', {h: params['h']})
                    .subscribe(data => {
                        if (data['error']) {
                            this.notify.error('Ошибка!', data['message']);
                            this.router.navigate(['/register']);
                        } else {
                            this.notify.success('Успешно!', data['message']);
                            this.router.navigate(['/login']);
                        }
                    }, err => {
                        this.notify.error('Ошибка!', 'Ошибка сервера');
                    });
            } else {
                this.router.navigate(['/login']);
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
