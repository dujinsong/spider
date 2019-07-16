var mysqlRepository = require('mysql');

var pool = mysqlRepository.createPool({
    host: "localhost",
    user: "root",
    password: "Root@123",
    database: 'test',
    port: 3306
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
    console.log(sql);

    var obj = {};
    var callbackFn = function (err, val, fields) {
        obj.err = err;
        obj.val = val;
        obj.fields = fields;
        console.log(obj);
        if (err) throw err;
    };
    connection(sql, callbackFn);
    return obj;
};

module.exports = repository;
