"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../model/user.model");
const common_util_1 = require("../common-util");
const utils_1 = require("../utils");
const crypto = require("crypto");
class UserService {
    constructor() {
    }
    getItemByPrimary(id) {
        return new Promise((resolve, reject) => {
            user_model_1.User.findOne({ userId: id }).select('sex birthday follows fans').exec((err, result) => {
                err ? reject(utils_1.ResultUtils.error(utils_1.ResultCode.WEAK_NET_WORK, err.message))
                    : resolve(utils_1.ResultUtils.success(result));
            });
        });
    }
    deleteItemByPrimary(id) {
    }
    updateItem(item) {
        return new Promise((resolve, reject) => {
            item.updatedtime = new Date();
            user_model_1.User.update({ userId: item.userId }, { $set: item }).exec(err => {
                err ? reject(utils_1.ResultUtils.error(utils_1.ResultCode.WEAK_NET_WORK, err.message))
                    : resolve(utils_1.ResultUtils.success(''));
            });
        });
    }
    insertItem(item) {
    }
    register(user) {
        return new Promise((resolve, reject) => {
            user.userId = common_util_1.CommonUtil.createUuid();
            if (!user.userCode || user.password.length < 6 || user.password.length > 16) {
                reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
            }
            else {
                let md5 = crypto.createHash('md5');
                md5.update(user.password);
                user.password = md5.digest('hex');
                user.nickName = `用户${Math.floor(Math.random() * 8999 + 1000)}_${user.userId.substring(0, 6)}`;
                let { userId, userCode, password, nickName } = user;
                user_model_1.User.create({ userId, userCode, password, nickName }, err => {
                    if (err) {
                        reject(utils_1.ResultUtils.error(utils_1.ResultCode.WEAK_NET_WORK, err.message));
                    }
                    else {
                        resolve(utils_1.ResultUtils.success(user));
                    }
                });
            }
        });
    }
    login(user) {
        return new Promise((resolve, reject) => {
            user_model_1.User.findOne({ userCode: user.userCode })
                .select('userCode password')
                .exec((err, result) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.REGISTER_ERROR));
                }
                else {
                    if (result) {
                        let md5 = crypto.createHash('md5');
                        md5.update(user.password);
                        let _pwd = md5.digest('hex');
                        if (_pwd === result.password) {
                            result.password = "";
                            resolve(utils_1.ResultUtils.success(result));
                        }
                        else {
                            reject(utils_1.ResultUtils.error(utils_1.ResultCode.REGISTER_ERROR));
                        }
                    }
                    else {
                        reject(utils_1.ResultUtils.error(utils_1.ResultCode.REGISTER_ERROR));
                    }
                }
            });
        });
    }
    validateNickName(user) {
        return new Promise((resolve, reject) => {
            user_model_1.User.find({ nickName: user.nickName }).select('userId').exec((err, result) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    if (result && result.length > 0) {
                        if (result.findIndex(item => item.userId === user.userId) !== -1) {
                            resolve(utils_1.ResultUtils.success(true));
                        }
                        else {
                            resolve(utils_1.ResultUtils.success(false));
                        }
                    }
                    else {
                        resolve(utils_1.ResultUtils.success(true));
                    }
                }
            });
        });
    }
    getRelationship(body) {
        return new Promise((resolve, reject) => {
            user_model_1.User.findOne({ userId: body.loginUserId }).select('follows fans').exec((err, result) => {
                if (err || !result) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    let isFollow = result.follows.findIndex(item => item === body.targetUserId) !== -1;
                    let isFan = result.fans.findIndex(item => item === body.targetUserId) !== -1;
                    resolve(utils_1.ResultUtils.success({ isFollow, isFan }));
                }
            });
        });
    }
    handleFollow(body) {
        return new Promise((resolve, reject) => {
            user_model_1.User.findOne({ userId: body.loginUserId }).select('follows').exec((err, result) => {
                if (err || !result) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    console.log(result);
                    let isFollow = result.follows.findIndex(item => item === body.targetUserId) !== -1;
                    // 已经关注 --> 取消关注
                    if (isFollow) {
                    }
                    else {
                        // 未关注 --> 添加关注
                        result.follows.push(body.targetUserId);
                        result.save().exec(err => {
                            if (err) {
                                reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                            }
                            else {
                                user_model_1.User.findOne({ userId: body.targetUserId }).populate('fans').exec((err, tar) => {
                                    if (err) {
                                        reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                                    }
                                    else {
                                        tar.fans.push(body.loginUserId);
                                        tar.save().exec(err => {
                                            if (err) {
                                                reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                                            }
                                            else {
                                                resolve(utils_1.ResultUtils.success('...'));
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        });
    }
}
exports.UserService = UserService;
