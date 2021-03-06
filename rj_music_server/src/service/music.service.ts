/**
 * Created by GyjLoveLh on  2018/2/13
 */
import { Music } from '../model/music.model'
import { ResultUtils, ResultCode } from "../utils";
import * as fs from 'fs';
import * as path from 'path';
import * as Jimp from 'jimp';
import * as formidable from 'formidable'
import { MusicInterface } from "../interface/music.interface";
import { CommonService } from "./common.service";
import { Comment } from "../model/comment.model";
import { CommonUtil } from "../common-util";
import {User} from "../model/user.model";

export class MusicService extends CommonService implements MusicInterface {

    constructor() {
        super();
    }

    getItemByPrimary(id: string) {
        return new Promise((resolve, reject) => {
            Music.findOne({ _id: id })
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
                    ],
                })
                .exec((err, result) => {
                if (err) {
                    reject(ResultUtils.error(err));
                } else {
                    result.cover = CommonUtil.getSrcRealPath(result.cover);
                    result.src = CommonUtil.getSrcRealPath(result.src);
                    result.comments.forEach(item => {
                        if (item.commenter) {
                            item.commenter.photo = CommonUtil.getSrcRealPath(item.commenter.photo);
                        }
                    });
                    resolve(ResultUtils.success(result));
                }
            });
        });
    }

    deleteItemByPrimary(id: string) {
    }

    updateItem(item: any) {
    }

    insertItem(item: any) {
    }

    uploadMusic(req): Promise<any> {
        return new Promise((resolve, reject) => {
            let form = new formidable.IncomingForm();
            form.uploadDir = 'public/resource/tmp';
            form.parse(req, (err, fields, files) => {
                let _cover = files.cover;
                let _coverExtName = path.extname(_cover.name);
                let _coverNewName = (_cover.path.split('upload_')[0] + _cover.path.split('upload_')[1] + _coverExtName).replace('/tmp/', '/' + _coverExtName.replace('.', '') + '/');
                let _coverOldPath = __dirname.replace('/src/service','') + '/' + _cover.path;
                let _coverNewPath = __dirname.replace('/src/service', '') + '/' + _coverNewName;

                let _src = files.src;
                let _srcExtName = path.extname(_src.name);
                let _srcNewName = (_src.path.split('upload_')[0] + _src.path.split('upload_')[1] + _srcExtName).replace('/tmp/', '/' + _srcExtName.replace('.', '') + '/');
                let _srcOldPath = __dirname.replace('/src/service','') + '/' + _src.path;
                let _srcNewPath = __dirname.replace('/src/service','') + '/' + _srcNewName;

                let _coverDir = __dirname.replace('/src/service', '') + '/public/resource/' + _coverExtName.replace('.', '');
                let _srcDir = __dirname.replace('/src/service', '') + '/public/resource/' + _srcExtName.replace('.', '');
                try{
                    fs.statSync(_coverDir);
                } catch (error) {
                    fs.mkdirSync(_coverDir);
                }
                try {
                    fs.statSync(_srcDir);
                } catch (error) {
                    fs.mkdirSync(_srcDir);
                }
                Jimp.read(_coverOldPath).then(image => {
                    image.resize(200, 200);
                    image.write(_coverNewPath, _ => {
                        fs.unlink(_coverOldPath, err => {
                            if (err) throw err;
                        });
                    });
                });
                fs.readFile(_srcOldPath, (err, data) => {
                    if (err) throw err;
                    fs.writeFile(_srcNewPath, data, err => {
                        if (err) throw err;
                        fs.unlink(_srcOldPath, err => {
                            if (err) throw err;
                        });
                    });
                });

                // 储存数据
                let _data = {
                    name: fields.name,
                    uploader: fields.uploader,
                    singer: fields.singer,
                    // types: JSON.parse(fields.types),
                    cover: _coverNewName,
                    src: _srcNewName
                };
                Music.create(_data, err => {
                    if (err) {
                        reject(ResultUtils.error(ResultCode.PARAMETER_ERROR, err));
                    } else {
                        resolve(ResultUtils.success(''))
                    }
                })
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

    commitComment(body): Promise<any> {
        return new Promise((resolve, reject) => {
            Comment.create({
                commenter: body.userId,
                content: body.content,
                createdtime: new Date()
            }, (err, result) => {
                if (err) {
                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                } else {
                    if (result) {
                        Music.update(
                            { _id: body.musicId },
                            { $push: { comments: result._id } },
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

    findSingers(): Promise<any> {
        return new Promise((resolve, reject) => {
            Music.distinct('singer').exec((err, result) => {
                if (err) {
                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                } else {
                    resolve(ResultUtils.success(result));
                }
            });
        });
    }

}

