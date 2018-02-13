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


module.exports = router;
