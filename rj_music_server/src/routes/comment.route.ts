/**
 * Created by GyjLoveLh on  2018/2/18
 */

import * as express from 'express';
import { CommentInterface } from "../interface/comment.interface";
import { CommentService } from "../service/comment.service";

let router = express();
let commentService: CommentInterface = new CommentService();

router.get('/', (req, res, next) => {
    res.send('this is userItem');
});

router.post('/reply', (req, res) => {
    commentService.commitReply(req.body).then(s => res.send(s), r => res.send(r));
});


module.exports = router;
