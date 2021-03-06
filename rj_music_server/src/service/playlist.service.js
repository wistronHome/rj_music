"use strict";
/**
 * Created by GyjLoveLh on  2018/2/19
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const common_service_1 = require("./common.service");
const playlist_model_1 = require("../model/playlist.model");
const user_model_1 = require("../model/user.model");
const playlist_types_1 = require("../db-config/playlist-types");
const common_util_1 = require("../common-util");
const music_model_1 = require("../model/music.model");
const comment_model_1 = require("../model/comment.model");
class PlaylistService extends common_service_1.CommonService {
    constructor() {
        super();
    }
    getItemByPrimary(id) {
        return new Promise((resolve, reject) => {
            playlist_model_1.Playlist.findOne({ _id: id })
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
                .populate({
                path: 'comments',
                options: {
                    sort: { createdtime: -1 }
                },
                populate: [
                    {
                        path: 'commenter',
                        select: 'nickName photo'
                    },
                    {
                        path: 'beCommenter',
                        populate: {
                            path: 'commenter',
                            select: 'nickName'
                        }
                    }
                ]
            })
                .exec((err, result) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR, err));
                }
                else {
                    result.cover = common_util_1.CommonUtil.getSrcRealPath(result.cover);
                    result.songs.forEach(item => {
                        item.cover = common_util_1.CommonUtil.getSrcRealPath(item.cover);
                    });
                    result.creator.photo = common_util_1.CommonUtil.getSrcRealPath(result.creator.photo);
                    result.comments.forEach(item => {
                        item.commenter.photo = common_util_1.CommonUtil.getSrcRealPath(item.commenter.photo);
                    });
                    resolve(utils_1.ResultUtils.success(result));
                }
            });
        });
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
    getTypes() {
        return new Promise((resolve, reject) => {
            resolve(utils_1.ResultUtils.success(playlist_types_1.PLAYLIST_TYPES));
        });
    }
    modifyPlaylist(params) {
        return new Promise((resolve, reject) => {
            playlist_model_1.Playlist.update({ _id: params._id }, { $set: { name: params.name, types: params.types, description: params.description } }, err => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    resolve(utils_1.ResultUtils.success(''));
                }
            });
        });
    }
    addMusic(params) {
        return new Promise((resolve, reject) => {
            playlist_model_1.Playlist.findOne({ _id: params.plId }, (err, result) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    if (result.songs.findIndex(item => item.toString() === params.songId) !== -1) {
                        reject(utils_1.ResultUtils.error(utils_1.ResultCode.SONG_DUPLICATE_ERROR));
                    }
                    else {
                        if (result.songs.length === 0) {
                            music_model_1.Music.findById(params.songId)
                                .select('cover')
                                .exec((err, result) => {
                                if (err) {
                                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.SONG_DUPLICATE_ERROR));
                                }
                                else {
                                    playlist_model_1.Playlist.update({ _id: params.plId }, { $set: { cover: result.cover } }, err => {
                                        if (err) {
                                            reject(utils_1.ResultUtils.error(utils_1.ResultCode.SONG_DUPLICATE_ERROR));
                                        }
                                    });
                                }
                            });
                        }
                        playlist_model_1.Playlist.update({ _id: params.plId }, { $push: { songs: params.songId } }, err => {
                            if (err) {
                                reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                            }
                            else {
                                resolve(utils_1.ResultUtils.success(''));
                            }
                        });
                    }
                }
            });
        });
    }
    commitComment(params) {
        return new Promise((resolve, reject) => {
            if (params.beCommenter) {
                comment_model_1.Comment.create({
                    commenter: params.userId,
                    content: params.content,
                    beCommenter: params.beCommenter,
                    createdtime: new Date()
                }, (err, result) => {
                    if (err) {
                        reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR, err));
                    }
                    else {
                        playlist_model_1.Playlist.update({ _id: params.plId }, { $push: { comments: result._id } }, err => {
                            if (err) {
                                reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR, err));
                            }
                            else {
                                resolve(utils_1.ResultUtils.success(''));
                            }
                        });
                    }
                });
            }
            else {
                comment_model_1.Comment.create({
                    commenter: params.userId,
                    content: params.content,
                    createdtime: new Date()
                }, (err, result) => {
                    if (err) {
                        reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR, err));
                    }
                    else {
                        playlist_model_1.Playlist.update({ _id: params.plId }, { $push: { comments: result._id } }, err => {
                            if (err) {
                                reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR, err));
                            }
                            else {
                                resolve(utils_1.ResultUtils.success(''));
                            }
                        });
                    }
                });
            }
        });
    }
    storePlaylist(params) {
        return new Promise((resolve, reject) => {
            playlist_model_1.Playlist.update({ _id: params.plId }, { $push: { stores: params.userId } }, err => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR, err));
                }
                else {
                    user_model_1.User.update({ _id: params.userId }, { $push: { storePls: params.plId } }, err => {
                        if (err) {
                            reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR, err));
                        }
                        else {
                            resolve(utils_1.ResultUtils.success(''));
                        }
                    });
                }
            });
        });
    }
    cancelStorePlaylist(params) {
        return new Promise((resolve, reject) => {
            playlist_model_1.Playlist.update({ _id: params.plId }, { $pull: { stores: params.userId } }, err => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR, err));
                }
                else {
                    user_model_1.User.update({ _id: params.userId }, { $pull: { storePls: params.plId } }, err => {
                        if (err) {
                            reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR, err));
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
