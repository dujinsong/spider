var mysqlRepository = require('../../../core/datasource/mysql/mysqlRepository');
var spiderSchema = require('../entity/spiderEntity');
var responseWrapper = require('../../../core/wrapper/responseWrapper');

var superAgent = require('superagent');
var cheerio = require('cheerio');
var events = require('events');
var emitter = new events.EventEmitter();
emitter.on('loadAndParseNextPage', function (url) {
    functions.loadAndParsePage(url);
});

var functions = {};

functions.start = function () {
    var spider = spiderSchema.columns();
    spider.name = 'name';

    mysqlRepository.save(spiderSchema.tableName, spider);

    return responseWrapper('success', '操作成功');
};

functions.loadAndParsePage = function (url) {

    console.log('抓取url：' + url);
    superAgent.get(url).end(function (error, res) {
        var $ = cheerio.load(res.text);

        $('#post_list .post_item').each(function (index, element) {
            var articleBean = {};
            articleBean.title = $(element).find('h3 a').text();
            // articleBean.summary = $(element).find('.post_item_summary').text();
            articleBean.publisher = $(element).find('.post_item_foot > a').text();
            // articleBean.comment = $(element).find('.article_comment .gray').text();
            console.log(articleBean);
        });

        var currentPage = $('#paging_block .pager a.current');
        var nextPage = $(currentPage).next();
        var nextPageUrl = nextPage ? $(nextPage).attr('href') : '';
        if (nextPage && nextPageUrl) emitter.emit('loadAndParseNextPage', 'https://www.cnblogs.com' + nextPageUrl);
    });

    return responseWrapper('success', '操作成功');
};

functions.loadAndParseRequest = function (page) {
    superAgent.get('https://www.youjiapiaoju.com/order/all?json=1&limit=15&start=' + page).end(function (error, res) {
        var responseBody = JSON.parse(res.text);
        var rows = responseBody.rows;
        console.log(rows);
    });
};

module.exports = functions;
