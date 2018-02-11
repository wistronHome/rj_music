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
            User.findOne({userId: id}).select('*').exec((err, result) => {
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
                    let md5 = crypto.createHash('md5');
                    md5.update(user.password);
                    let _pwd = md5.digest('hex');
                    if (_pwd === result.password) {
                        result.password = "";
                        resolve(ResultUtils.success(result));
                    } else {
                        reject(ResultUtils.error(ResultCode.REGISTER_ERROR));
                    }
                }
            })
        });
    }
}

