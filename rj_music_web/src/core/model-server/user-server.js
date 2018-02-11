"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
class UserServer {
    constructor() {
        this.$prefix = '/api/user';
        this.$http = Http;
    }
    getUser(userId) {
    }
    register(user) {
        return this.$http.put(`${this.$prefix}`, user);
    }
}
exports.UserServer = UserServer;
class User {
    constructor() {
        this.sex = 3;
    }
}
exports.User = User;
