export class Account {
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
        if (account.proxy) {
            this.proxy = account.proxy;
        } else {
            this.proxy = {login: null, host: null, password: null, type: null, port: null};
        }
    }
}
