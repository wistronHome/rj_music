/**
 * Created by GyjLoveLh on  2018/2/9
 */
import * as mongoose from 'mongoose';
import { Db } from "../db-config/db";
//

module.exports = Db.getInstance().getConnection().model('User', new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    sex: {
        type: Number, // 1: 男 2: 女 3: 未知
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
