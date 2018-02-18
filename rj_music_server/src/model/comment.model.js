"use strict";
/**
 * Created by GyjLoveLh on  2018/2/18
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const db_1 = require("../db-config/db");
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
exports.Comment = db_1.Db.getInstance().getConnection().model('Comment', CommentSchema);
