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
router.get('/types', (req, res) => {
    plService.getTypes().then(s => res.send(s), r => res.send(r));
});
router.get('/:id', (req, res) => {
    plService.getItemByPrimary(req.params.id).then(s => res.send(s), r => res.send(r));
});
router.post('/', (req, res) => {
    plService.insertPl(req.body).then(s => res.send(s), r => res.send(r));
});
router.put('/', (req, res) => {
    plService.modifyPlaylist(req.body).then(s => res.send(s), r => res.send(r));
});
router.put('/song', (req, res) => {
    plService.addMusic(req.body).then(s => res.send(s), r => res.send(r));
});
module.exports = router;
