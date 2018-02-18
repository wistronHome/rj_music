"use strict";
/**
 * Created by GyjLoveLh on  2018/2/18
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const comment_service_1 = require("../service/comment.service");
let router = express();
let commentService = new comment_service_1.CommentService();
router.get('/', (req, res, next) => {
    res.send('this is userItem');
});
router.post('/reply', (req, res) => {
    commentService.commitReply(req.body).then(s => res.send(s), r => res.send(r));
});
module.exports = router;
