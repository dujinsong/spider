var mysqlRepository = require('mysql');

var pool = mysqlRepository.createPool({
    host: "192.168.0.11",
    user: "ydf",
    password: "Yiduifu@1",
    database: 'spider_db',
    port: 3311
});

var connection = function (sql, callbackFn) {
    pool.getConnection(function (err, conn) {
        if (err) callbackFn(err);
        else {
            conn.query(sql, function (err, val, fields) {
                conn.release();
                callbackFn(err, val, fields);
            })
        }
    });
};

var repository = {};

repository.save = function (table, columns) {

    var insertSql = 'insert into ' + table + ' ';
    var columnSql = '';
    var valueSql = '';

    for (var column in columns) {
        columnSql += ',' + column;
        valueSql += ',' + (columns[column] ? '\'' + columns[column] + '\'' : columns[column]);
    }
    columnSql = '(' + columnSql.substring(1) + ')';
    valueSql = '(' + valueSql.substring(1) + ')';

    var sql = insertSql + columnSql + ' values ' + valueSql;

    var callbackFn = function (err, val, fields) {
        if (err) throw err;
    };
    connection(sql, callbackFn);
};

module.exports = repository;
