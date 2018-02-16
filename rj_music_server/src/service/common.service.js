"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const music_model_1 = require("../model/music.model");
const utils_1 = require("../utils");
const user_model_1 = require("../model/user.model");
class CommonService {
    getItemByPrimary(id) {
    }
    deleteItemByPrimary(id) {
    }
    updateItem(item) {
    }
    insertItem(item) {
    }
    commonSearch(params) {
        return new Promise((resolve, reject) => {
            music_model_1.Music.find({ $or: [{ 'name': new RegExp(params.name, 'i') }] })
                .skip(0).limit(5)
                .sort({ name: 1 })
                .select("_id name")
                .exec((err, musics) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    user_model_1.User.find({ $or: [{ 'nickName': new RegExp(params.name, 'i') }] })
                        .skip(0).limit(5)
                        .sort({ name: 1 })
                        .select("_id name")
                        .exec((err, users) => {
                        if (err) {
                            reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                        }
                        else {
                            resolve(utils_1.ResultUtils.success({ users, musics }));
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
            });
        });
    }
}
exports.CommonService = CommonService;
