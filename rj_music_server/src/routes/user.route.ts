/**
 * Created by GyjLoveLh on  2018/2/9
 */
import * as express from 'express';
import { UserService } from "../service/user.service";

let router = express();
let userService = new UserService();

router.get('/', (req, res, next) => {
    res.send('this is userItem');
});

router.get('/:id', (req, res, next) => {
    userService.getItemByPrimary(req.params.id).then(result => {
        res.send(result);
    }, failed => res.send(failed));
});

router.put('/', (req, res, next) => {
    userService.register(req.body).then(result => {
        res.send(result);
    }, failed => {
        res.send(failed);
    });
});

module.exports = router;
