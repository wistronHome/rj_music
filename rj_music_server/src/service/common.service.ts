///<reference path="../interface/common.interface.ts"/>
/**
 * Created by GyjLoveLh on  2018/2/16
 */
import { CommonInterface } from "../interface/common.interface";
import { Music } from "../model/music.model";
import { ResultCode, ResultUtils } from "../utils";
import { User } from "../model/user.model";
import { CommonUtil } from "../common-util";

export class CommonService implements CommonInterface<any> {

    getItemByPrimary(id: string) {
    }

    deleteItemByPrimary(id: string) {
    }

    updateItem(item: any) {
    }

    insertItem(item: any) {
    }

    commonSearch(params) {
        return new Promise((resolve, reject) => {
            Music.find({ $or: [{ 'name': new RegExp(params.name, 'i') }] })
                .skip(0).limit(5)
                .sort({name: 1})
                .select("_id name")
                .exec((err, musics) => {
                    if (err) {
                        reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                    } else {
                        User.find({ $or: [{ 'nickName': new RegExp(params.name, 'i') }] })
                            .skip(0).limit(5)
                            .sort({ name: 1 })
                            .select("_id name")
                            .exec((err, users) => {
                                if (err) {
                                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                                } else {
                                    resolve(ResultUtils.success({ users, musics }));
                                    // Music.find({ $or: [{ 'singer': new RegExp(params.name, 'i') }] })
                                    //     .skip(0).limit(5)
                                    //     .sort({name: 1})
                                    //     .select("_id singer")
                                    //     .distinct('singer')
                                    //     .exec((err, singers) => {
                                    //         if (err) {
                                    //             reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                                    //         } else {
                                    //             resolve(ResultUtils.success({ users, musics, singers}));
                                    //         }
                                    //     });
                                }
                            });
                    }
                }
            );
        });
    }

    getAddressIp() {
        return new Promise((resolve, reject) => {
            resolve(ResultUtils.success(CommonUtil.getIPAdress()))
        });
    }
}