"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by GyjLoveLh on  2018/2/9
 */
const mongoose = require("mongoose");
const db_1 = require("../db-config/db");
//
module.exports = db_1.Db.getInstance().getConnection().model('User', new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    sex: {
        type: Number,
        default: 3
    },
    nickName: {
        type: String,
        unique: true,
        default: ''
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
        type: String
    }
}));
