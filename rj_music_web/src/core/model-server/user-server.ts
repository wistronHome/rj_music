
import * as Http from 'http';

export class UserServer {
    private $http;
    private $prefix: string = '/api/user';
    constructor() {
        this.$http = Http;
    }
    getUser(userId: string) {

    }

    register(user: User): Promise<any> {
        return this.$http.put(`${this.$prefix}`, user);
    }
}

export class User {
    userId: string;
    nickName: string;
    password: string;
    photo: string;
    sex: number;
    address: string;
    age: Date;

    constructor() {
        this.sex = 3;
    }
}
