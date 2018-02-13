/**
 * Created by GyjLoveLh on  2018/2/9
 */
import { UserInterface } from "../interface/user.interface";
import { User } from '../model/user.model'
import { CommonUtil } from '../common-util'
import { ResultUtils, ResultCode } from "../utils";
import * as crypto from 'crypto';
export class UserService implements UserInterface {

    constructor(
    ) {

    }

    getItemByPrimary(id) {
        return new Promise((resolve, reject) => {
            User.findOne({userId: id}).select('sex birthday follows fans').exec((err, result) => {
                err ? reject(ResultUtils.error(ResultCode.WEAK_NET_WORK, err.message)) 
                    : resolve(ResultUtils.success(result));        
            });
        })
    }

    deleteItemByPrimary(id) {
    }

    updateItem(item) {
        return new Promise((resolve, reject) => {
            item.updatedtime = new Date();
            User.update(
                { userId: item.userId },
                { $set: item } 
            ).exec(err => {
                err ? reject(ResultUtils.error(ResultCode.WEAK_NET_WORK, err.message)) 
                    : resolve(ResultUtils.success(''));
            });
        });
    }

    insertItem(item) {
    }

    register(user) {
        return new Promise((resolve, reject) => {
            user.userId = CommonUtil.createUuid();
            if (!user.userCode || user.password.length < 6 || user.password.length > 16) {
                reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
            } else {
                let md5 = crypto.createHash('md5');
                md5.update(user.password);
                user.password = md5.digest('hex');
                user.nickName = `用户${Math.floor(Math.random() * 8999 + 1000)}_${user.userId.substring(0, 6)}`;
                let { userId, userCode, password, nickName } = user;
                User.create({ userId, userCode, password, nickName }, err => {
                    if (err) {
                        reject(ResultUtils.error(ResultCode.WEAK_NET_WORK, err.message));
                    } else {
                        resolve(ResultUtils.success(user));
                    }
                });
            }
        });
    }

    login(user) {
        return new Promise((resolve, reject) => {
            User.findOne({userCode: user.userCode})
            .select('userCode password')
            .exec((err, result) => {
                if (err) {
                    reject(ResultUtils.error(ResultCode.REGISTER_ERROR));
                } else {
                    if (result) {
                        let md5 = crypto.createHash('md5');
                        md5.update(user.password);
                        let _pwd = md5.digest('hex');
                        if (_pwd === result.password) {
                            result.password = "";
                            resolve(ResultUtils.success(result));
                        } else {
                            reject(ResultUtils.error(ResultCode.REGISTER_ERROR));
                        }
                    } else {
                        reject(ResultUtils.error(ResultCode.REGISTER_ERROR));
                    }
                }
            })
        });
    }

    validateNickName(user): Promise<any> {
        return new Promise((resolve, reject) => {
            User.find({ nickName: user.nickName }).select('userId').exec((err, result) => {
                if (err) {
                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                } else {
                    if (result && result.length > 0) {
                        if (result.findIndex(item => item.userId === user.userId) !== -1) {
                            resolve(ResultUtils.success(true));
                        } else {
                            resolve(ResultUtils.success(false));
                        }
                    } else {
                        resolve(ResultUtils.success(true));
                    }
                }
            })
        });
    }

    getRelationship(body): Promise<any> {
        return new Promise((resolve, reject) => {
            User.findOne({userId: body.loginUserId}).select('follows fans').exec((err, result) => {
                if (err || !result) {
                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                } else {
                    let isFollow = result.follows.findIndex(item => item === body.targetUserId) !== -1;
                    let isFan = result.fans.findIndex(item => item === body.targetUserId) !== -1;
                    resolve(ResultUtils.success({ isFollow, isFan }));
                }
            })
        });
    }

    handleFollow(body): Promise<any> {
        return new Promise((resolve, reject) => {
            User.findOne({ userId: body.loginUserId }).select('follows').exec((err, result) => {
                if (err || !result) {
                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                } else {
                    console.log(result);
                    let isFollow = result.follows.findIndex(item => item === body.targetUserId) !== -1;
                    // 已经关注 --> 取消关注
                    if (isFollow) {

                    } else {
                        // 未关注 --> 添加关注
                        result.follows.push(body.targetUserId);
                        result.save().exec(err => {
                            if (err) {
                                reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                            } else {
                                User.findOne({ userId: body.targetUserId}).populate('fans').exec((err, tar) => {
                                    if (err) {
                                        reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                                    } else {
                                        tar.fans.push(body.loginUserId);
                                        tar.save().exec(err => {
                                            if (err) {
                                                reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                                            } else {
                                                resolve(ResultUtils.success('...'));
                                            }
                                        })
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

