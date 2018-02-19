/**
 * Created by GyjLoveLh on  2018/2/19
 */

import * as express from 'express';
import { PlaylistInterface } from "../interface/playlist.interface";
import { PlaylistService } from "../service/playlist.service";

let router = express();
let plService: PlaylistInterface = new PlaylistService();

router.get('/', (req, res, next) => {
    res.send('this is userItem');
});

router.post('/', (req, res) => {
    plService.insertPl(req.body).then(s => res.send(s), r => res.send(r));
});

module.exports = router;
