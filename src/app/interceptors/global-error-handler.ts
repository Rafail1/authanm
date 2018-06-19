import { ErrorHandler, Injectable} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private notif: NotificationsService) { }
    handleError(error) {
        const message = error.message ? error.message : error.toString();
        throw error;
    }
}
