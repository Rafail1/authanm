import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotifyService} from '../../services/notify.service';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
    accounts;
    constructor(private http: HttpClient, private notify: NotifyService) {}
    ngOnInit() {
        this.http.get<any>('/api/accounts').subscribe(
            data => {
                if (!data.error && data.accounts) {
                    this.accounts = data.accounts;
                } else {
                    this.notify.notify(data.error);
                }
            }
        );
    }
    deleteAccount(id) {
        this.http.delete<any>('/api/accounts', {
            params: {id: id},
        }).subscribe(
            data => {
                console.log(data);
            }
        );
    }
}
