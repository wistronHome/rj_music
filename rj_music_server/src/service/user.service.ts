/**
 * Created by GyjLoveLh on  2018/2/9
 */
import { UserInterface } from "../interface/user.interface";
import { User } from '../model/user.model'
import { CommonUtil } from '../common-util'
import { ResultUtils, ResultCode } from "../utils";
import * as crypto from 'crypto';
import { CommonService } from "./common.service";
import { Playlist } from "../model/playlist.model";

export class UserService extends CommonService implements UserInterface {

    constructor() {
        super();
    }

    getItemByPrimary(id) {
        return new Promise((resolve, reject) => {
            User.findOne({_id: id}).select('sex birthday follows fans').exec((err, result) => {
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
                { _id: item._id },
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
            // user._id = CommonUtil.createUuid();
            if (!user.userCode || user.password.length < 6 || user.password.length > 16) {
                reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
            } else {
                let md5 = crypto.createHash('md5');
                md5.update(user.password);
                user.password = md5.digest('hex');
                user.nickName = `用户${Math.floor(Math.random() * 8999 + 1000)}_${CommonUtil.createUuid().substring(0, 6)}`;
                let { userCode, password, nickName } = user;
                User.create({ userCode, password, nickName }, (err, user) => {
                    if (err) {
                        reject(ResultUtils.error(ResultCode.WEAK_NET_WORK, err.message));
                    } else {
                        Playlist.create({
                            name: '我喜欢的音乐',
                            creator: user._id,
                            favorite: true,
                            createdtime: new Date()
                        }, (err, pl) => {
                            if (err) {
                                reject(ResultUtils.error(ResultCode.WEAK_NET_WORK, err.message));
                            } else {
                                User.update(
                                    { _id: user._id },
                                    { $push: { createdPls: pl._id } },
                                    err => {
                                        if (err) {
                                            reject(ResultUtils.error(ResultCode.WEAK_NET_WORK, err.message));
                                        } else {
                                            resolve(ResultUtils.success(user));
                                        }
                                    }
                                )
                            }
                        });
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
            User.find({ nickName: user.nickName }).select('_id').exec((err, result) => {
                if (err) {
                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                } else {
                    if (result && result.length > 0) {
                        if (result.findIndex(item => item._id === user._id) !== -1) {
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
            User.findOne({_id: body.login_id}).select('follows fans').exec((err, result) => {
                if (err || !result) {
                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                } else {
                    let isFollow = result.follows.findIndex(item => item === body.target_id) !== -1;
                    let isFan = result.fans.findIndex(item => item === body.target_id) !== -1;
                    resolve(ResultUtils.success({ isFollow, isFan }));
                }
            })
        });
    }

    handleFollow(body): Promise<any> {
        return new Promise((resolve, reject) => {
            User.findOne({ _id: body.loginUserId }).select('follows').exec((err, result) => {
                if (err || !result) {
                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                } else {

                    let isFollow = result.follows.indexOf(body.targetUserId) !== -1;
                    // 已经关注 --> 取消关注
                    if (isFollow) {
                        User.update(
                            { _id: body.loginUserId },
                            { $pull: { follows: body.targetUserId } },
                            err => {
                                if (err) {
                                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                                } else {
                                    User.update(
                                        { _id: body.targetUserId },
                                        { $pull: { fans: body.loginUserId } },
                                        err => {
                                            if (err) {
                                                reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                                            } else {
                                                resolve(ResultUtils.success(''));
                                            }
                                        }
                                    )
                                }
                            }
                        )
                    } else {
                        // 未关注 --> 添加关注
                        // result.follows.push(body.target_id);
                        User.update(
                            { _id: body.loginUserId },
                            { $push: { follows: body.targetUserId } },
                            err => {
                                if (err) {
                                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                                } else {
                                    User.update(
                                        { _id: body.targetUserId },
                                        { $push: { fans: body.loginUserId } },
                                        err => {
                                            if (err) {
                                                reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                                            } else {
                                                resolve(ResultUtils.success(''));
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            });
        });
    }

    getUserFollows(id): Promise<any> {
        return new Promise((resolve, reject) => {
            User.findOne({ _id: id }).populate('follows').exec((err, result) => {
                if (err) {
                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                } else {
                    let { _id, follows } = result;
                    resolve(ResultUtils.success({ _id, follows } ));
                }
            })
        });
    }

    getUserFans(id): Promise<any> {
        return new Promise((resolve, reject) => {
            User.findOne({ _id: id }).populate('fans').exec((err, result) => {
                if (err) {
                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                } else {
                    let { _id, fans } = result;
                    resolve(ResultUtils.success({ _id, fans }));
                }
            })
        });
    }

    getUserPls(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            User.findOne({ _id: id }).populate('createdPls storePls').exec((err, user) => {
                if (err) {
                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                } else {
                    resolve(ResultUtils.success(user));
                }
            });
        });
    }

    removePls(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            User.update(
                { _id: params.userId },
                { $pull: { createdPls: params.plId } },
                err => {
                    if (err) {
                        reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                    } else {
                        resolve(ResultUtils.success(''));
                    }
                }
            )
        });
    }
}

