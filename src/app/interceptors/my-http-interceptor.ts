import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = AuthService.getToken();
        if (!token) {
            return next.handle(req);
        }
        req = req.clone({
            setHeaders: {
                'x-access-token': AuthService.getToken()
            }
        });
        return next.handle(req);
    }
}
