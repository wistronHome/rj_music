"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../model/user.model");
class UserService {
    constructor() {
    }
    getItemByPrimary(id) {
        return new Promise((resolve, reject) => {
            User['findOne']({ userId: id }, { userId: 1, nickName: 1 }, {}, (err, user) => {
                console.log(user);
                if (err) {
                    reject({ code: -1 });
                }
                else {
                    resolve({ code: 0, data: user });
                }
            });
        });
    }
    deleteItemByPrimary(id) {
    }
    updateItem(item) {
    }
    insertItem(item) {
    }
    register(user) {
        return new Promise((resolve, reject) => {
            console.log(user);
            if (user.nickName) {
                User['create'](user, err => {
                    if (err) {
                        reject({ code: -1 });
                    }
                    else {
                        resolve({ code: 0 });
                    }
                });
            }
        });
    }
}
exports.UserService = UserService;
