"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by GyjLoveLh on  2018/2/13
 */
const express = require("express");
const music_service_1 = require("../service/music.service");
let router = express();
let musicService = new music_service_1.MusicService();
router.get('/', (req, res, next) => {
    res.send('this is userItem');
});
module.exports = router;
