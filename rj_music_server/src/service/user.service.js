"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../model/user.model");
const common_util_1 = require("../common-util");
const utils_1 = require("../utils");
const crypto = require("crypto");
const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const common_service_1 = require("./common.service");
const playlist_model_1 = require("../model/playlist.model");
class UserService extends common_service_1.CommonService {
    constructor() {
        super();
    }
    getItemByPrimary(id) {
        return new Promise((resolve, reject) => {
            user_model_1.User.findById(id).select('sex birthday follows fans photo').exec((err, result) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.WEAK_NET_WORK, err.message));
                }
                else {
                    result.photo = common_util_1.CommonUtil.getSrcRealPath(result.photo);
                    resolve(utils_1.ResultUtils.success(result));
                }
            });
        });
    }
    deleteItemByPrimary(id) {
    }
    updateItem(item) {
        return new Promise((resolve, reject) => {
            item.updatedtime = new Date();
            user_model_1.User.update({ _id: item._id }, { $set: item }).exec(err => {
                err ? reject(utils_1.ResultUtils.error(utils_1.ResultCode.WEAK_NET_WORK, err.message))
                    : resolve(utils_1.ResultUtils.success(''));
            });
        });
    }
    insertItem(item) {
    }
    register(user) {
        return new Promise((resolve, reject) => {
            // user._id = CommonUtil.createUuid();
            if (!user.userCode || user.password.length < 6 || user.password.length > 16) {
                reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
            }
            else {
                let md5 = crypto.createHash('md5');
                md5.update(user.password);
                user.password = md5.digest('hex');
                user.nickName = `用户${Math.floor(Math.random() * 8999 + 1000)}_${common_util_1.CommonUtil.createUuid().substring(0, 6)}`;
                let { userCode, password, nickName } = user;
                user_model_1.User.create({ userCode, password, nickName }, (err, user) => {
                    if (err) {
                        reject(utils_1.ResultUtils.error(utils_1.ResultCode.WEAK_NET_WORK, err.message));
                    }
                    else {
                        playlist_model_1.Playlist.create({
                            name: '我喜欢的音乐',
                            creator: user._id,
                            favorite: true,
                            createdtime: new Date()
                        }, (err, pl) => {
                            if (err) {
                                reject(utils_1.ResultUtils.error(utils_1.ResultCode.WEAK_NET_WORK, err.message));
                            }
                            else {
                                user_model_1.User.update({ _id: user._id }, { $push: { createdPls: pl._id } }, err => {
                                    if (err) {
                                        reject(utils_1.ResultUtils.error(utils_1.ResultCode.WEAK_NET_WORK, err.message));
                                    }
                                    else {
                                        user.photo = common_util_1.CommonUtil.getSrcRealPath(user.photo);
                                        resolve(utils_1.ResultUtils.success(user));
                                    }
                                });
                            }
                        });
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
            user_model_1.User.find({ nickName: user.nickName }).select('_id').exec((err, result) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    if (result && result.length > 0) {
                        if (result.findIndex(item => item._id === user._id) !== -1) {
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
            user_model_1.User.findOne({ _id: body.login_id }).select('follows fans').exec((err, result) => {
                if (err || !result) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    let isFollow = result.follows.findIndex(item => item === body.target_id) !== -1;
                    let isFan = result.fans.findIndex(item => item === body.target_id) !== -1;
                    resolve(utils_1.ResultUtils.success({ isFollow, isFan }));
                }
            });
        });
    }
    handleFollow(body) {
        return new Promise((resolve, reject) => {
            user_model_1.User.findOne({ _id: body.loginUserId }).select('follows').exec((err, result) => {
                if (err || !result) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    let isFollow = result.follows.indexOf(body.targetUserId) !== -1;
                    // 已经关注 --> 取消关注
                    if (isFollow) {
                        user_model_1.User.update({ _id: body.loginUserId }, { $pull: { follows: body.targetUserId } }, err => {
                            if (err) {
                                reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                            }
                            else {
                                user_model_1.User.update({ _id: body.targetUserId }, { $pull: { fans: body.loginUserId } }, err => {
                                    if (err) {
                                        reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                                    }
                                    else {
                                        resolve(utils_1.ResultUtils.success(''));
                                    }
                                });
                            }
                        });
                    }
                    else {
                        // 未关注 --> 添加关注
                        // result.follows.push(body.target_id);
                        user_model_1.User.update({ _id: body.loginUserId }, { $push: { follows: body.targetUserId } }, err => {
                            if (err) {
                                reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                            }
                            else {
                                user_model_1.User.update({ _id: body.targetUserId }, { $push: { fans: body.loginUserId } }, err => {
                                    if (err) {
                                        reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                                    }
                                    else {
                                        resolve(utils_1.ResultUtils.success(''));
                                    }
                                });
                            }
                        });
                    }
                }
            });
        });
    }
    getUserFollows(id) {
        return new Promise((resolve, reject) => {
            user_model_1.User.findOne({ _id: id }).populate('follows').exec((err, result) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    result.follows.forEach(item => {
                        item.photo = common_util_1.CommonUtil.getSrcRealPath(item.photo);
                    });
                    let { _id, follows } = result;
                    resolve(utils_1.ResultUtils.success({ _id, follows }));
                }
            });
        });
    }
    getUserFans(id) {
        return new Promise((resolve, reject) => {
            user_model_1.User.findOne({ _id: id }).populate('fans').exec((err, result) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    result.fans.forEach(item => {
                        item.photo = common_util_1.CommonUtil.getSrcRealPath(item.photo);
                    });
                    let { _id, fans } = result;
                    resolve(utils_1.ResultUtils.success({ _id, fans }));
                }
            });
        });
    }
    getUserPls(id) {
        return new Promise((resolve, reject) => {
            user_model_1.User.findById(id)
                .populate('createdPls storePls')
                .exec((err, user) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    user.createdPls.forEach(item => {
                        item.cover = common_util_1.CommonUtil.getSrcRealPath(item.cover);
                    });
                    user.storePls.forEach(item => {
                        item.cover = common_util_1.CommonUtil.getSrcRealPath(item.cover);
                    });
                    resolve(utils_1.ResultUtils.success(user));
                }
            });
        });
    }
    removePls(params) {
        return new Promise((resolve, reject) => {
            user_model_1.User.update({ _id: params.userId }, { $pull: { createdPls: params.plId } }, err => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    resolve(utils_1.ResultUtils.success(''));
                }
            });
        });
    }
    uploadPhoto(req) {
        return new Promise((resolve, reject) => {
            let form = new formidable.IncomingForm();
            form.uploadDir = 'public/resource/tmp';
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    let _cover = files.photo;
                    let _coverExtName = path.extname(_cover.name);
                    let _coverNewName = (_cover.path.split('upload_')[0] + _cover.path.split('upload_')[1] + _coverExtName).replace('/tmp/', '/' + _coverExtName.replace('.', '') + '/');
                    let _coverOldPath = __dirname.replace('/src/service', '') + '/' + _cover.path;
                    let _coverNewPath = __dirname.replace('/src/service', '') + '/' + _coverNewName;
                    let _coverDir = __dirname.replace('/src/service', '') + '/public/resource/' + _coverExtName.replace('.', '');
                    try {
                        fs.statSync(_coverDir);
                    }
                    catch (error) {
                        fs.mkdirSync(_coverDir);
                    }
                    Jimp.read(_coverOldPath).then(image => {
                        image.resize(parseInt(fields.photoWidth), parseInt(fields.photoHeight));
                        image.crop(parseInt(fields.left), parseInt(fields.top), parseInt(fields.width), parseInt(fields.height));
                        image.resize(180, 180);
                        image.write(_coverNewPath, result => {
                            fs.unlink(_coverOldPath, err => {
                                if (err)
                                    throw err;
                            });
                            user_model_1.User.update({ _id: fields.userId }, { $set: { photo: _coverNewName } }, err => {
                                if (err) {
                                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                                }
                                else {
                                    resolve(utils_1.ResultUtils.success(''));
                                }
                            });
                        });
                    }).catch(err => reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR, err)));
                }
            });
        });
    }
}
exports.UserService = UserService;
