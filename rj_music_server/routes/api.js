var express = require('express');
var router = express.Router();
var user = require('./users');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.use('/user', user);

module.exports = router;