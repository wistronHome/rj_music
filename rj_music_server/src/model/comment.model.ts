/**
 * Created by GyjLoveLh on  2018/2/18
 */

import * as mongoose from 'mongoose';
import { Db } from "../db-config/db";

let CommentSchema = new mongoose.Schema({
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    beCommenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    content: String,
    createdtime: {
        type: Date,
        select: true,
        default: new Date()
    },
    updatedtime: {
        type: Date,
        select: true,
        default: new Date()
    }
});


export let Comment = Db.getInstance().getConnection().model('Comment', CommentSchema);
