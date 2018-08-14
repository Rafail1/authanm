import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {TasksComponent} from './tasks/tasks.component';
import {PostsComponent} from './posts/posts.component';
import {AddPostComponent} from './add-post/add-post.component';
import {AccountsComponent} from './accounts/accounts.component';
import {AddAccountComponent} from './add-account/add-account.component';
import {ProxyValidator} from '../directives/proxy-validator.directive';
import {HostValidator} from '../directives/host-validator.directive';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule,
    ],
    declarations: [HomeComponent, AddTaskComponent, TasksComponent, PostsComponent, AddPostComponent, AccountsComponent,
        AddAccountComponent, ProxyValidator, HostValidator, EditTaskComponent, EditAccountComponent]
})
export class AppModule {
}
