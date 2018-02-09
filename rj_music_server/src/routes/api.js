"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by GyjLoveLh on  2018/2/9
 */
const express = require("express");
const user = require("./user.route");
let router = express();
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.use('/user', user);
module.exports = router;
