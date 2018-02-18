"use strict";
/**
 * Created by GyjLoveLh on  2018/2/18
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const common_service_1 = require("./common.service");
const comment_model_1 = require("../model/comment.model");
const music_model_1 = require("../model/music.model");
class CommentService extends common_service_1.CommonService {
    constructor() {
        super();
    }
    getItemByPrimary(id) {
    }
    deleteItemByPrimary(id) {
    }
    updateItem(item) {
    }
    insertItem(item) {
    }
    commitReply(body) {
        return new Promise((resolve, reject) => {
            comment_model_1.Comment.create({
                commenter: body.userId,
                beCommenter: body.commentId,
                content: body.content,
                createdtime: new Date()
            }, (err, result) => {
                if (err) {
                    reject(utils_1.ResultUtils.error(utils_1.ResultCode.PARAMETER_ERROR));
                }
                else {
                    music_model_1.Music.update({ _id: body.musicId }, { $push: { comments: result._id } }, err => {
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
exports.CommentService = CommentService;
