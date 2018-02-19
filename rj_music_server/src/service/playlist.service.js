"use strict";
/**
 * Created by GyjLoveLh on  2018/2/19
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const common_service_1 = require("./common.service");
const playlist_model_1 = require("../model/playlist.model");
const user_model_1 = require("../model/user.model");
class PlaylistService extends common_service_1.CommonService {
    constructor() {
        super();
    }
    insertPl(param) {
        return new Promise((resolve, reject) => {
            playlist_model_1.Playlist.create({ name: param.name, creator: param.userId, createdtime: new Date() }, (err, pl) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    user_model_1.User.update({ _id: param.userId }, { $push: { createdPls: pl._id } }, err => {
                        if (err) {
                            reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                        }
                        else {
                            resolve(utils_1.ResultUtils.success(''));
                        }
                    });
                }
            });
        });
    }
}
exports.PlaylistService = PlaylistService;
