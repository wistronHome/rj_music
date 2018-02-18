"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by GyjLoveLh on  2018/2/13
 */
const mongoose = require("mongoose");
const db_1 = require("../db-config/db");
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
    types: [String],
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
exports.Music = db_1.Db.getInstance().getConnection().model('Music', MusicSchema);
