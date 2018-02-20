/**
 * Created by GyjLoveLh on  2018/2/19
 */

import { ResultUtils, ResultCode } from "../utils";

import { CommonService } from "./common.service";
import { PlaylistInterface } from "../interface/playlist.interface";
import { Playlist } from "../model/playlist.model";
import { User } from "../model/user.model";
import { PLAYLIST_TYPES } from "../db-config/playlist-types";

export class PlaylistService extends CommonService implements PlaylistInterface {

    constructor() {
        super();
    }

    getItemByPrimary(id): Promise<any> {
        return new Promise((resolve, reject) => {
            Playlist.findOne({ _id: id })
                .populate('creator songs')
                .exec((err, result) => {
                    if (err) {
                        reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                    } else {
                        resolve(ResultUtils.success(result));
                    }
                });
        });
    }

    insertPl(param): Promise<any> {
        return new Promise((resolve, reject) => {
            Playlist.create(
                { name: param.name, creator: param.userId, createdtime: new Date() },
                (err, pl) => {
                    if (err) {
                        reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                    } else {
                        User.update(
                            { _id: param.userId },
                            { $push: { createdPls: pl._id } },
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
            );
        });
    }

    getTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(ResultUtils.success(PLAYLIST_TYPES));
        });
    }

    modifyPlaylist(params): Promise<any> {
        return new Promise((resolve, reject) => {
            Playlist.update(
                { _id: params._id },
                { $set: { name: params.name, types: params.types, description: params.description } },
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

