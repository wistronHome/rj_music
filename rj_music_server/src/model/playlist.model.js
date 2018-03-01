"use strict";
/**
 * Created by GyjLoveLh on  2018/2/19
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const db_1 = require("../db-config/db");
let PlaylistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    favorite: {
        type: Boolean,
        default: false
    },
    types: [String],
    cover: {
        type: String,
        select: true,
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
exports.Playlist = db_1.Db.getInstance().getConnection().model('Playlist', PlaylistSchema);
