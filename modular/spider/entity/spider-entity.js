var schema = {};

schema.tableName = 'spider_tbl';
schema.columns = getColumns;

function getColumns() {
    return {
        id: null,
        name: null
    }
}


module.exports = schema;
