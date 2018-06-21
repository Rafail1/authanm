import { Injectable } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
@Injectable()
export class NotifyService {
    private params: { timeOut: number; showProgressBar: boolean; pauseOnHover: boolean; clickToClose: boolean };
    constructor(private notif: NotificationsService) {
        this.params = {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
        };
    }
    notify(data) {
        if (!data.error) {
            this.notif.success(
                'Успешно!',
                data.message,
                this.params
            );
        } else {
            this.notif.error(
                'Ошибка',
                data.message,
                this.params
            );
        }
    }
}
