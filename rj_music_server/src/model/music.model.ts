/**
 * Created by GyjLoveLh on  2018/2/13
 */
import * as mongoose from 'mongoose';
import { Db } from "../db-config/db";

let MusicSchema = new mongoose.Schema({
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
    types: [ String ],
    cover: {
        type: String,
        default: ''
    },
    src: {
        type: String,
        required: true
    },
    comments: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
    ],
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
});


export let Music = Db.getInstance().getConnection().model('Music', MusicSchema);
