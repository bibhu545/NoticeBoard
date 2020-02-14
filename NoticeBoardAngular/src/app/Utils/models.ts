export class LoginRequestModel {
    userName: string;
    password: string;
    constructor() {
        this.userName = '';
        this.password = '';
    }
}

export class LoginResponseModel {
    userName: string;
    userId: number;
    email: string;
}
