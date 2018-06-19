import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
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
} from './auth/auth-guard.service';
import {
    RoleGuardService as RoleGuard
} from './auth/role-guard.service';
import { MeComponent } from './me/me.component';
import { AdminComponent } from './admin/admin.component';
import {AuthService} from './auth/auth.service';
import {JwtHelper} from 'angular2-jwt';
import {GlobalErrorHandler} from './interceptors/global-error-handler';
import {PassValidator} from './directives/password-validator.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotAuthGuardService} from './auth/not-auth-guard.service';
import { HomeComponent } from './home/home.component';
import { ConfirmComponent } from './confirm/confirm.component';
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
    ConfirmComponent
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
    providers: [AuthGuard, AuthService, NotAuthGuardService, JwtHelper, {
        provide: ErrorHandler,
        useClass: GlobalErrorHandler
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
