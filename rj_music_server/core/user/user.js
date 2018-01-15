var mongoose = require('mongoose');
var db = require('../db.js');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    nickname: {
        type: String,
        default: '匿名用户' + (1000 + Math.floor(Math.random() * 90000))
    },
    cover: {
        type: String,
        default: 'http://localhost:3000/images/default.jpg'
    },
    desc: {
        type: String,
        default: '该用户很懒~什么都没留下~'
    },
    sex: {
        type: Number,
        default: 3
    },
    birthday: {
        type: Date,
        default: Date.now
    },
    collections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GeDan'
        }
    ]
});

module.exports = db.model('User', UserSchema);
