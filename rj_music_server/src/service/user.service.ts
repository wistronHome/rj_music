/**
 * Created by GyjLoveLh on  2018/2/9
 */
import { UserInterface } from "../interface/user.interface";
import { User } from '../model/user.model'
import { CommonUtil } from '../common-util'
import { ResultUtils, ResultCode } from "../utils";

export class UserService implements UserInterface {

    constructor(
    ) {

    }

    getItemByPrimary(id) {
        return new Promise((resolve, reject) => {
            User.findOne({userId: id}).select('*').exec((err, result) => {
                err ? reject(ResultUtils.result(ResultCode.WEAK_NET_WORK, err, '')) 
                    : resolve(ResultUtils.result(ResultCode.SUCCESS, '', result));        
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
                err ? reject(ResultUtils.result(ResultCode.WEAK_NET_WORK, err, '')) 
                    : resolve(ResultUtils.result(ResultCode.SUCCESS, '', ''));
            });
        });
    }

    insertItem(item) {
    }

    register(user) {
        return new Promise((resolve, reject) => {
            user.userId = CommonUtil.createUuid();
            User.create(user, err => {
                if (err) {
                    reject(ResultUtils.error(ResultCode.SUCCESS, err));
                } else {
                    resolve(ResultUtils.success(user));
                }
            });
        });
    }

}

