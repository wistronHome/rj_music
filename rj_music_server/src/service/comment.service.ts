/**
 * Created by GyjLoveLh on  2018/2/18
 */

import { ResultUtils, ResultCode } from "../utils";

import { CommonService } from "./common.service";
import { CommentInterface } from "../interface/comment.interface";
import { Comment } from "../model/comment.model";
import { Music } from "../model/music.model";

export class CommentService extends CommonService implements CommentInterface {
    constructor() {
        super();
    }

    getItemByPrimary(id: string) {

    }

    deleteItemByPrimary(id: string) {
    }

    updateItem(item: any) {
    }

    insertItem(item: any) {
    }

    commitReply(body): Promise<any> {
        return new Promise((resolve, reject) => {
            Comment.create({
                commenter: body.userId,
                beCommenter: body.commentId,
                content: body.content,
                createdtime: new Date()
            }, (err, result) => {
                if (err) {
                    reject(ResultUtils.error(ResultCode.PARAMETER_ERROR));
                } else {
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
            })
        });
    }

}

