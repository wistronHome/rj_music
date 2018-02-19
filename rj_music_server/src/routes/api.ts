/**
 * Created by GyjLoveLh on  2018/2/9
 */
import * as express from "express";
import * as user  from './user.route'
import * as music from './music.route'
import * as comment from './comment.route';
import * as playlist from './playlist.route';

const routers = {
    user,
    music,
    comment,
    playlist
};

let router = express();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

Object.keys(routers).forEach(key => {
    router.use(`/${key}`, routers[key]);
});

module.exports = router;
