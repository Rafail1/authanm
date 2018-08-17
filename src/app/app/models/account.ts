export class Account {
    _id: string;
    login: string;
    password: string;
    use_proxy: Boolean;
    proxy: {
        login: string,
        password: string,
        host: string,
        type: Number,
        port: Number,
    };
    constructor(account?) {
        if (account) {
            this._id = account._id;
            this.login = account.login;
            this.password = account.password;
            this.use_proxy = account.use_proxy;
            if (account.proxy) {
                this.proxy = account.proxy;
            } else {
                this.proxy = {login: null, host: null, password: null, type: null, port: null};
            }
        } else {
            this.proxy = {login: null, host: null, password: null, type: null, port: null};
        }
    }
}
