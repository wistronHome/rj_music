/**
 * Created by GyjLoveLh on  2018/2/13
 */
import * as mongoose from 'mongoose';
import { Db } from "../db-config/db";

export let Music = Db.getInstance().getConnection().model('Music', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    singer: {
        type: String,
        required: true
    },
    types: [String],
    cover: {
        type: String,
        default: ''
    },
    src: {
        type: String,
        required: true
    },
    createdtime: {
        type: Date,
        select: true,
        default: new Date()
    },
    updatedtime: {
        type: Date,
        select: true,
        default: new Date()
    },
}));
