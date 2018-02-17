/**
 * Created by GyjLoveLh on  2018/2/13
 */
import * as express from 'express';
import { MusicService } from "../service/music.service";
import { MusicInterface } from '../interface/music.interface';

let router = express();
let musicService: MusicInterface = new MusicService();

router.get('/', (req, res, next) => {
    res.send('this is userItem');
});

router.get('/:id', (req, res) => {
    musicService.getItemByPrimary(req.params.id) .then(s => res.send(s), r => res.send(r));
});

router.post('/upload', (req, res) => {
    musicService.uploadMusic(req).then(s => res.send(s), r => res.send(r));
});

router.post('/search', (req, res) => {
    musicService.commonSearch(req.body).then(s => res.send(s), r => res.send(r));
});


module.exports = router;
