/**
 * Created by GyjLoveLh on  2018/2/19
 */

import * as mongoose from 'mongoose';
import { Db } from "../db-config/db";

let PlaylistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    types: [ String ],
    cover: {
        type: String,
        default: ''
    },
    comments: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
    ],
    description: String,
    songs: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Music' }
    ],
    stores: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
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
    }
});


export let Playlist = Db.getInstance().getConnection().model('Playlist', PlaylistSchema);
