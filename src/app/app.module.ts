import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { EqualValidator } from './directives/equal-validator.directive';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {
    AuthGuardService as AuthGuard
} from './services/auth/auth-guard.service';

import { MeComponent } from './me/me.component';
import {AuthService} from './services/auth/auth.service';
import {JwtHelper} from 'angular2-jwt';
import {GlobalErrorHandler} from './interceptors/global-error-handler';
import {PassValidator} from './directives/password-validator.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotAuthGuardService} from './services/auth/not-auth-guard.service';
import { ConfirmComponent } from './confirm/confirm.component';
import {RegisterService} from './services/auth/register.service';
import {NotifyService} from './services/notify.service';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import {MyHttpInterceptor} from './interceptors/my-http-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MeComponent,
    PassValidator,
    EqualValidator,
    ConfirmComponent,
    PasswordResetComponent,
    IndexComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
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
