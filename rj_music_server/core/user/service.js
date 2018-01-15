import promise from "../db";

var User = require('../user');
module.exports = {
    /**
     * 用户注册
     * @param param
     * @param cb
     */
    register: (param, cb) => {
        User.create(param, function(err) {
            User.findOne(param, {username: 1, password: 1, nickname: 1, cover: 1}, {} ,function(err, result) {
                if (err) throw err;
                cb(result);
            });
        });
        Promise.resolve().then();
        User.create(param).then(user => {

        });
    }
};