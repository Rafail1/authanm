import {Component, OnInit} from '@angular/core';
import {Account} from '../models/account';
import {HttpClient} from '@angular/common/http';
import {NotifyService} from '../../services/notify.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
    account: Account;

    constructor(private http: HttpClient, private router: Router, private notif: NotifyService) {
        this.account = new Account();
    }

    ngOnInit() {
    }

    addAccount() {
        this.http.post<any>('/api/accounts', this.account).subscribe(
            data => {
                if (!data.error) {
                        this.notif.notify({message: 'Аккаунт добавлен'});
                        this.router.navigate(['/app/accounts']);
                } else {
                    this.notif.notify(data);
                }
            }
        );
    }
}
