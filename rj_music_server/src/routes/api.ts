/**
 * Created by GyjLoveLh on  2018/2/9
 */
import * as express from "express";
import * as user  from './user.route'
let router = express();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.use('/user', user);

module.exports = router;
