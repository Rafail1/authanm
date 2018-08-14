import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {TasksComponent} from './tasks/tasks.component';
import {PostsComponent} from './posts/posts.component';
import {AddPostComponent} from './add-post/add-post.component';
import {AccountsComponent} from './accounts/accounts.component';
import {AddAccountComponent} from './add-account/add-account.component';
import {EditAccountComponent} from './edit-account/edit-account.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [{
            path: 'tasks',
            component: TasksComponent,
            children: [{
                path: 'add-task',
                component: AddTaskComponent
            }]
        }, {
            path: 'posts',
            component: PostsComponent,
            children: [{
                path: 'add-post',
                component: AddPostComponent
            }]
        }, {
            path: 'accounts',
            component: AccountsComponent
        }, {
            path: 'add-account',
            component: AddAccountComponent,
        }, {
            path: 'edit-account/:id',
            component: EditAccountComponent,
        }]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
