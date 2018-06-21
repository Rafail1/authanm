import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class RegisterService {
    constructor(public http: HttpClient) {}
    register(body) {
        return this.http.post<any>('/api/register', body);
    }
    resend(email) {
        return this.http.post<any>('/api/resend', {
            email: email
        });
    }
}
