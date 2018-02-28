"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by GyjLoveLh on  2018/2/9
 */
const mongoose = require("mongoose");
const db_1 = require("../db-config/db");
let userSchema = new mongoose.Schema({
    userCode: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    sex: {
        type: Number,
        default: 3
    },
    nickName: {
        type: String,
        unique: true,
        select: true,
        default: '',
        validate: [
            { validator: (val) => { return val !== 'abcde'; }, msg: '啦啦啦啦' }
        ]
    },
    photo: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    description: {
        type: String,
        select: true
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
    birthday: {
        type: Date,
        default: new Date().setFullYear(1990, 0, 1)
    },
    follows: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    fans: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    createdPls: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }
    ],
    storePls: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }
    ]
});
exports.User = db_1.Db.getInstance().getConnection().model('User', userSchema);
