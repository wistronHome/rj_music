/**
 * Created by GyjLoveLh on  2018/2/19
 */

import { ResultUtils, ResultCode } from "../utils";

import { CommonService } from "./common.service";
import { PlaylistInterface } from "../interface/playlist.interface";
import { Playlist } from "../model/playlist.model";
import { User } from "../model/user.model";
import { PLAYLIST_TYPES } from "../db-config/playlist-types";
import {CommonUtil} from "../common-util";
import {Music} from "../model/music.model";

export class PlaylistService extends CommonService implements PlaylistInterface {

    constructor() {
        super();
    }

    getItemByPrimary(id): Promise<any> {
        return new Promise((resolve, reject) => {
            Playlist.findOne({ _id: id })
                .populate('creator')
                .populate({
                    path: 'songs',
                    populate: [
                        {
                            path: 'uploader',
                            select: 'nickName'
                        }
                    ]
                })
                .exec((err, result) => {
                    if (err) {
                        reject(ResultUtils.error(ResultCode.PARAMETER_ERROR, err));
                    } else {
                        result.cover = CommonUtil.getSrcRealPath(result.cover);
                        result.songs.forEach(item => {
                            item.cover = CommonUtil.getSrcRealPath(item.cover);
                        });
                        result.creator.photo = CommonUtil.getSrcRealPath(result.creator.photo);
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

    addMusic(params): Promise<any> {
        return new Promise((resolve, reject) => {
            Playlist.findOne({ _id: params.plId }, (err, result) => {
                if (err) {
                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                } else {
                    if (result.songs.findIndex(item => item.toString() === params.songId) !== -1) {
                        reject(ResultUtils.error(ResultCode.SONG_DUPLICATE_ERROR));
                    } else {
                        if (result.songs.length === 0) {
                            Music.findById(params.songId)
                                .select('cover')
                                .exec((err, result) => {
                                    if (err) {
                                        reject(ResultUtils.error(ResultCode.SONG_DUPLICATE_ERROR));
                                    } else {
                                        Playlist.update(
                                            { _id: params.plId },
                                            { $set: { cover: result.cover } },
                                            err => {
                                                if (err) {
                                                    reject(ResultUtils.error(ResultCode.SONG_DUPLICATE_ERROR));
                                                }
                                            }
                                        )
                                    }
                                });
                        }
                        Playlist.update(
                            { _id: params.plId },
                            { $push: { songs: params.songId } },
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
            });
        });
    }
}

