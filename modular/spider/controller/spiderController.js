var express = require('express');
var router = express.Router();
var spiderService = require('../service/spiderService');

router.get('/restful/start/:a', function (req, res, next) {
    console.log('restful风格get参数：' + req.params.a);
    var result = spiderService.start();
    res.send(result);
});

router.post('/restful/start/:a', function (req, res, next) {
    console.log('restful风格post参数：' + req.params.a);
    var result = spiderService.start();
    res.send(result);
});

router.get('/start', function (req, res, next) {
    console.log('get参数：' + req.query.a);
    var result = spiderService.start();
    res.send(result);
});

router.post('/start', function (req, res, next) {
    var params = req.body;
    console.log('post参数：' + params.name);
    var result = spiderService.start();
    res.send(result);
});

router.get('/loadAndParsePage', function (req, res, next) {
    var result = spiderService.loadAndParsePage('https://www.cnblogs.com');
    res.send(result);
});

router.get('/loadAndParseRequest', function (req, res, next) {
    var result = spiderService.loadAndParseRequest(1);
    res.send(result);
});

module.exports = {
    controllerMapping: '/spider',
    requestMappings: router
};

