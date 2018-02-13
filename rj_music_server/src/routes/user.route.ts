/**
 * Created by GyjLoveLh on  2018/2/9
 */
import * as express from 'express';
import { UserService } from "../service/user.service";
import { UserInterface } from '../interface/user.interface';

let router = express();
let userService: UserInterface = new UserService();

router.get('/', (req, res, next) => {
    res.send('this is userItem');
});

router.get('/:id', (req, res, next) => {
    userService.getItemByPrimary(req.params.id).then(result => res.send(result), failed => res.send(failed));
});

router.put('/', (req, res, next) => {
    userService.register(req.body).then(result => res.send(result), failed => res.send(failed));
});

router.post('/', (req, res, next) => {
    userService.updateItem(req.body).then(result => res.send(result), failed => res.send(failed));
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
