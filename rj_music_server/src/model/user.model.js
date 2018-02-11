"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by GyjLoveLh on  2018/2/9
 */
const mongoose = require("mongoose");
const db_1 = require("../db-config/db");
//
// default/doValidate/get/getDefault/index/required/select/set/sparse/unique/validate/_idRef
exports.User = db_1.Db.getInstance().getConnection().model('User', new mongoose.Schema({
    userId: {
        type: String,
        select: true,
        required: true
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
    }
}));
