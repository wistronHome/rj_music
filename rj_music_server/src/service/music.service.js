"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by GyjLoveLh on  2018/2/13
 */
const music_model_1 = require("../model/music.model");
const utils_1 = require("../utils");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const common_service_1 = require("./common.service");
const comment_model_1 = require("../model/comment.model");
class MusicService extends common_service_1.CommonService {
    constructor() {
        super();
    }
    getItemByPrimary(id) {
        return new Promise((resolve, reject) => {
            music_model_1.Music.findOne({ _id: id })
                .populate({
                path: 'comments',
                options: {
                    sort: { createdtime: -1 }
                },
                populate: [
                    {
                        path: 'commenter',
                        select: 'nickName '
                    },
                    {
                        path: 'beCommenter',
                        populate: {
                            path: 'commenter',
                            select: 'nickName '
                        }
                    }
                ],
            })
                .exec((err, result) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(err));
                }
                else {
                    resolve(utils_1.ResultUtils.success(result));
                }
            });
        });
    }
    deleteItemByPrimary(id) {
    }
    updateItem(item) {
    }
    insertItem(item) {
    }
    uploadMusic(req) {
        return new Promise((resolve, reject) => {
            let form = new formidable.IncomingForm();
            form.uploadDir = 'public/resource/tmp';
            form.parse(req, (err, fields, files) => {
                // let _cover = files.cover;
                // let _coverExtName = path.extname(_cover.name);
                // let _coverNewName = (_cover.path.split('upload_')[0] + _cover.path.split('upload_')[1] + _coverExtName).replace('/tmp/', '/' + _coverExtName.replace('.', '') + '/');
                // let _coverOldPath = __dirname.replace('/routes','') + '/' + _cover.path;
                // let _coverNewPath = __dirname.replace('/routes', '') + '/' + _coverNewName;
                let _src = files.src;
                let _srcExtName = path.extname(_src.name);
                let _srcNewName = (_src.path.split('upload_')[0] + _src.path.split('upload_')[1] + _srcExtName).replace('/tmp/', '/' + _srcExtName.replace('.', '') + '/');
                let _srcOldPath = __dirname.replace('/src/service', '') + '/' + _src.path;
                let _srcNewPath = __dirname.replace('/src/service', '') + '/' + _srcNewName;
                // let _coverDir = __dirname.replace('/routes', '') + '/public/resource/' + _coverExtName.replace('.', '');
                let _srcDir = __dirname.replace('/src/service', '') + '/public/resource/' + _srcExtName.replace('.', '');
                // try{
                //     fs.statSync(_coverDir);
                // } catch (error) {
                //     fs.mkdirSync(_coverDir);
                // }
                try {
                    fs.statSync(_srcDir);
                }
                catch (error) {
                    fs.mkdirSync(_srcDir);
                }
                // fs.readFile(_coverOldPath, (err, data) => {
                //     if (err) throw err;
                //     fs.writeFile(_coverNewPath, data, err => {
                //         if (err) throw err;
                //         fs.unlink(_coverOldPath, err => {
                //             if (err) throw err;
                //         });
                //     });
                // });
                fs.readFile(_srcOldPath, (err, data) => {
                    if (err)
                        throw err;
                    fs.writeFile(_srcNewPath, data, err => {
                        if (err)
                            throw err;
                        fs.unlink(_srcOldPath, err => {
                            if (err)
                                throw err;
                        });
                    });
                });
                // 储存数据
                let _data = {
                    name: fields.name,
                    uploader: fields.uploader,
                    singer: fields.singer,
                    // types: JSON.parse(fields.types),
                    // cover: _coverNewName,
                    src: _srcNewName
                };
                music_model_1.Music.create(_data, err => {
                    if (err) {
                        reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR, err));
                    }
                    else {
                        resolve(utils_1.ResultUtils.success(''));
                    }
                });
                // Music.create(_data).exec(err => {
                //     if (err) {
                //         reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                //     } else {
                //         resolve(ResultUtils.success(''))
                //     }
                // });
            });
        });
    }
    commitComment(body) {
        return new Promise((resolve, reject) => {
            comment_model_1.Comment.create({
                commenter: body.userId,
                content: body.content,
                createdtime: new Date()
            }, (err, result) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    if (result) {
                        music_model_1.Music.update({ _id: body.musicId }, { $push: { comments: result._id } }, err => {
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
    findSingers() {
        return new Promise((resolve, reject) => {
            music_model_1.Music.distinct('singer').exec((err, result) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    resolve(utils_1.ResultUtils.success(result));
                }
            });
        });
    }
}
exports.MusicService = MusicService;
