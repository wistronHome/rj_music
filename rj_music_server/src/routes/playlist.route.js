"use strict";
/**
 * Created by GyjLoveLh on  2018/2/19
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const playlist_service_1 = require("../service/playlist.service");
let router = express();
let plService = new playlist_service_1.PlaylistService();
router.get('/', (req, res, next) => {
    res.send('this is userItem');
});
router.post('/', (req, res) => {
    plService.insertPl(req.body).then(s => res.send(s), r => res.send(r));
});
module.exports = router;
