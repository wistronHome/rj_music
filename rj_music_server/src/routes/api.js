"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by GyjLoveLh on  2018/2/9
 */
const express = require("express");
const user = require("./user.route");
const music = require("./music.route");
const comment = require("./comment.route");
const playlist = require("./playlist.route");
const routers = {
    user,
    music,
    comment,
    playlist
};
let router = express();
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
Object.keys(routers).forEach(key => {
    router.use(`/${key}`, routers[key]);
});
module.exports = router;
