export class LoginRequestModel {
    constructor() {
        this.userName = '';
        this.password = '';
    }
}

export class UserModel {
    constructor() {
        this.userId = 0;
        this.email = '';
        this.userName = '';
        this.password = '';
    }
}

export class NoticeModel {
    constructor() {
        this.noticeId = 0;
        this.userId = 0;
        this.title = '';
        this.body = '';
        this.postedOn = new Date();
        this.lastUpdatedOn = new Date();
        this.userData = new UserModel()
    }
}

export class NoticeFilterModel {
    constructor() {
        this.sortBy = '';
        this.pageNo = 0;
    }
}