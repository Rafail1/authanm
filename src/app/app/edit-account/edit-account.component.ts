import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {Account} from '../models/account';
import {NotifyService} from '../../services/notify.service';

@Component({
    selector: 'app-edit-account',
    templateUrl: './edit-account.component.html',
    styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit, OnDestroy {
    private sub: any;
    account: Account;

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private auth: AuthService,
                private notify: NotifyService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (!params['id']) {
                this.router.navigate(['/app/accounts']);
                return;
            }
            this.http.get<any>(`/api/accounts?id=${params['id']}`).subscribe(
                data => {
                    if (!data.error && data.accounts) {
                        this.account = new Account(data.accounts[0]);
                        console.log(this.account);
                    } else {
                        this.notify.notify(data.error);
                    }
                }
            );
        });
    }

    editAccount() {
        console.log(this.account);
        this.http.put('api/accounts', {account: this.account}).subscribe(
            data => {
                console.log(data);
            }
        );
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}
