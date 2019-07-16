var mysqlRepository = require('../../../core/datasource/mysql/mysql-repository');
var spiderSchema = require('../entity/spider-entity');
var responseWrapper = require('../../../core/wrapper/response-wrapper');

var functions = {};

functions.start = function () {
    var spider = spiderSchema.columns();
    // spider.id = 1;
    spider.name = 'kajsaklSjlk';

    mysqlRepository.save(spiderSchema.tableName, spider);
};


module.exports = functions;
