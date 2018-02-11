"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../model/user.model");
const common_util_1 = require("../common-util");
const utils_1 = require("../utils");
class UserService {
    constructor() {
    }
    getItemByPrimary(id) {
        return new Promise((resolve, reject) => {
            user_model_1.User.findOne({ userId: id }).select('*').exec((err, result) => {
                err ? reject(utils_1.ResultUtils.result(utils_1.ResultCode.WEAK_NET_WORK, err, ''))
                    : resolve(utils_1.ResultUtils.result(utils_1.ResultCode.SUCCESS, '', result));
            });
        });
    }
    deleteItemByPrimary(id) {
    }
    updateItem(item) {
        return new Promise((resolve, reject) => {
            item.updatedtime = new Date();
            user_model_1.User.update({ userId: item.userId }, { $set: item }).exec(err => {
                err ? reject(utils_1.ResultUtils.result(utils_1.ResultCode.WEAK_NET_WORK, err, ''))
                    : resolve(utils_1.ResultUtils.result(utils_1.ResultCode.SUCCESS, '', ''));
            });
        });
    }
    insertItem(item) {
    }
    register(user) {
        return new Promise((resolve, reject) => {
            user.userId = common_util_1.CommonUtil.createUuid();
            user_model_1.User.create(user, err => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.SUCCESS, err));
                }
                else {
                    resolve(utils_1.ResultUtils.success(user));
                }
            });
        });
    }
}
exports.UserService = UserService;
