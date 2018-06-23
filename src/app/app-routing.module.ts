import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {MeComponent} from './me/me.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {LoginComponent} from './login/login.component';
import {NotAuthGuardService} from './services/auth/not-auth-guard.service';
import {AuthGuardService as AuthGuard} from './services/auth/auth-guard.service';
import {IndexComponent} from './index/index.component';


const routes: Routes = [
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
        path: 'password-reset',
        component: PasswordResetComponent,
        canActivate: [NotAuthGuardService]
    },
    {
        path: 'password-reset/:h',
        component: PasswordResetComponent,
        canActivate: [NotAuthGuardService]
    }, {
        path: 'app',
        canActivate: [AuthGuard],
        loadChildren: './app/app.module#AppModule'
    },  {
        path: '',
        pathMatch: 'full',
        component: IndexComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
