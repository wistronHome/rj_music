"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by GyjLoveLh on  2018/2/9
 */
const express = require("express");
const user_service_1 = require("../service/user.service");
let router = express();
let userService = new user_service_1.UserService();
router.get('/', (req, res, next) => {
    res.send('this is userItem');
});
router.get('/:id', (req, res, next) => {
    userService.getItemByPrimary(req.params.id).then(result => res.send(result), failed => res.send(failed));
});
router.get('/follows/:id', (req, res) => {
    userService.getUserFollows(req.params.id).then(result => res.send(result), failed => res.send(failed));
});
router.get('/fans/:id', (req, res) => {
    userService.getUserFans(req.params.id).then(result => res.send(result), failed => res.send(failed));
});
router.get('/pls/:id', (req, res) => {
    userService.getUserPls(req.params.id).then(s => res.send(s), r => res.send(r));
});
router.put('/', (req, res, next) => {
    userService.register(req.body).then(result => res.send(result), failed => res.send(failed));
});
router.post('/', (req, res, next) => {
    userService.updateItem(req.body).then(result => res.send(result), failed => res.send(failed));
});
router.post('/search', (req, res) => {
    userService.commonSearch(req.body).then(s => res.send(s), r => res.send(r));
});
router.post('/login', (req, res) => {
    userService.login(req.body).then(result => res.send(result), failed => res.send(failed));
});
router.post('/validateNickName', (req, res) => {
    userService.validateNickName(req.body).then(result => res.send(result), failed => res.send(failed));
});
router.post('/relationship', (req, res) => {
    userService.getRelationship(req.body).then(result => res.send(result), failed => res.send(failed));
});
router.post('/follow', (req, res) => {
    userService.handleFollow(req.body).then(result => res.send(result), failed => res.send(failed));
});
module.exports = router;
