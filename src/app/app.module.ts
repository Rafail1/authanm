import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { EqualValidator } from './directives/equal-validator.directive';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {
    AuthGuardService as AuthGuard
} from './services/auth/auth-guard.service';
import {
    RoleGuardService as RoleGuard
} from './services/auth/role-guard.service';
import { MeComponent } from './me/me.component';
import { AdminComponent } from './admin/admin.component';
import {AuthService} from './services/auth/auth.service';
import {JwtHelper} from 'angular2-jwt';
import {GlobalErrorHandler} from './interceptors/global-error-handler';
import {PassValidator} from './directives/password-validator.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotAuthGuardService} from './services/auth/not-auth-guard.service';
import { HomeComponent } from './home/home.component';
import { ConfirmComponent } from './confirm/confirm.component';
import {RegisterService} from './services/auth/register.service';
import {NotifyService} from './services/notify.service';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import {MyHttpInterceptor} from './interceptors/my-http-interceptor';
const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NotAuthGuardService]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NotAuthGuardService]
    },
    {
        path: 'confirm/:h',
        component: ConfirmComponent,
        canActivate: [NotAuthGuardService]
    },
    {
        path: 'me',
        component: MeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        }
    },
    { path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'password-reset',
        component: PasswordResetComponent,
        canActivate: [NotAuthGuardService]
    },
    {
        path: 'password-reset/:h',
        component: PasswordResetComponent,
        canActivate: [NotAuthGuardService]
    }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MeComponent,
    AdminComponent,
    PassValidator,
    EqualValidator,
    HomeComponent,
    ConfirmComponent,
    PasswordResetComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        ),
        SimpleNotificationsModule.forRoot()
    ],
    providers: [AuthGuard, AuthService, NotifyService, RegisterService, NotAuthGuardService, JwtHelper, {
        provide: ErrorHandler,
        useClass: GlobalErrorHandler
    },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyHttpInterceptor,
            multi: true
        }],
  bootstrap: [AppComponent]
})
export class AppModule { }
