var express = require('express');
var router = express.Router();
var spiderService = require('../service/spider-service');

router.get('/start', function (req, res, next) {
    spiderService.start();
    res.send('start');
});

module.exports = {
    controllerMapping: '/spider',
    requestMappings: router
};

