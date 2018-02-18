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
router.get('/:id', (req, res) => {
    musicService.getItemByPrimary(req.params.id).then(s => res.send(s), r => res.send(r));
});
router.post('/upload', (req, res) => {
    musicService.uploadMusic(req).then(s => res.send(s), r => res.send(r));
});
router.post('/search', (req, res) => {
    musicService.commonSearch(req.body).then(s => res.send(s), r => res.send(r));
});
router.post('/comment', (req, res) => {
    musicService.commitComment(req.body).then(s => res.send(s), r => res.send(r));
});
module.exports = router;
