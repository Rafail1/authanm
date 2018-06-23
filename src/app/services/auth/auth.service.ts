
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class AuthService {
    constructor(public jwtHelper: JwtHelper) {}
    static getToken(): string {
        return localStorage.getItem('token');
    }
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return token && !this.jwtHelper.isTokenExpired(token);
    }
}
